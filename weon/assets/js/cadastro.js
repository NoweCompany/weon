import configs from "./modules/configs.js";

const url = configs.urlApi
const urlWebsite = configs.urlWebsiteDefault

import Logado from "./modules/Logado.js";

window.addEventListener('load', async (e) => {
    const logado = new Logado();
    if (!(await logado.userLogado())) {
        return window.location.assign(`${urlWebsite.split('/').slice(0, -2).join('/')}/index.html`);
    } else {
        return;
    }
});

class Controller {
    constructor(containerMsg, container) {
        this.container = container
        this.containerMsg = containerMsg

        this.drive = null
        this.register = null
    }

    init() {
        this.drive = new Drive()
        this.drive.init(this.container, this.containerMsg)
    }

    setEventOnButtonCad(presetName){
        const btnCad = document.querySelector(`#${presetName}`)
        btnCad.addEventListener('click', (e) => {
            const el = e.target
            this.renderFormHtml(el.id)
        })
    }

    setEventOnButtonBack(){
        this.back.addEventListener('click', () => {
            this.renderTableHTML()
        })
    }

    renderTableHTML() {
        this.container.innerHTML = `
        <div class="Cont-btn">
            <button id="btnCad" name="btnCad" class="btn-outline-success">Cadastrar</button>
        </div>
        <table class="table">
            <thead class="thead">
            </thead>
            
            <tbody class="tbody">
            </tbody>
        </table>
        `
        const btnCad = document.querySelector('#btnCad')
        const thead = document.querySelector('.thead')
        const tbody =  document.querySelector('.tbody')
        return {btnCad, thead, tbody}
    }

    renderFormHtml(presetName) {
        this.container.innerHTML = `
            <div class="Cont-btn">
                <button id="back" class="btn-outline-success">back</button>
            </div>
            <h1> ${presetName} </h1>
            <form id="form">
            </form>
        `

        const form = document.querySelector('#form')
        const back = document.querySelector('#back')

        return { form, back }
    }

    msg(msg, success) {
        console.log('chamei', this.containerMsg);
        if (!success) {
            this.containerMsg.className = 'error';
            this.containerMsg.textContent = msg;

            setTimeout(() => {
                this.cleanMsg();
            }, 1000);

            return;
        } else {
            this.containerMsg.className = 'success';
            this.containerMsg.textContent = msg;

            setTimeout(() => {
                this.cleanMsg();
            }, 1000);

            return;
        }
    }

    cleanMsg() {
        this.containerMsg.className = 'msg';
    }
}

class Register extends Controller {
    constructor() {
        super()
        
    }

    async init() {
        this.renderTableHTML()
        this.setEvents()
    }


    setEvents() {
        this.btnCad.addEventListener('click', e => {
            console.log(this.container);
            this.container.style.display = 'none'
            this.btnCad.style.display = 'none'

            this.rendercollection(e.target.id)
        })

        this.form.addEventListener('submit', (e) => this.submitForm(e))
    }

    async submitForm(e) {
        e.preventDefault()
        const elemenetsForm = e.target.elements

        let values = {}

        for (const el of elemenetsForm) {
            if (el.id === '') continue

            let vl = el.value

            if (!vl) return super.msg('Campos inválidos')

            else if (el.type === 'checkbox') vl = Boolean(el.checked)

            else if (el.type === 'number') vl = Number(vl)

            values[el.id] = vl
        }

        const collectionName = document.querySelector('#collectionName').textContent

        const response = await this.postApiValues(collectionName, [values])
        const data = await response.json()

        if (response.status !== 200) {
            return super.msg(data.errors, false)
        }

        return super.msg('Cadastro bem sucedido', true)
    }

    async postApiValues(collectionName, values) {
        try {
            const response = await fetch(`${url}/value`, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                    "authorization": `Bearer ${this.token()}`
                },
                body: JSON.stringify({ collectionName, values })
            })

            return response
        } catch (e) {
            super.msg('ERRO no servidor', false)
            return false
        }
    }

    async rendercollection(collectionName) {
        this.form.style.display = 'flex'
        const response = await this.getApiFields(collectionName)

        this.form.innerHTML = `

            <h1 id="collectionName">${collectionName}</h1>

            <div class="campos">

            

            </div>
        `

        const containerInputs = document.querySelector('.campos')

        for (const field of response.fields) {
            const { key: fieldName, type: fieldType, required: fieldRequired } = field

            if (fieldName === 'id') continue

            let typeInput
            let atribute

            switch (fieldType) {
                case 'INT':
                    typeInput = 'number'
                    atribute = ['step', '1']
                    break;

                case 'TINYINT':
                    typeInput = 'checkbox'
                    break;

                case 'FLOAT':
                    atribute = ['step', '0.01']
                    typeInput = 'number'
                    break;

                case 'VARCHAR':
                    typeInput = 'text'
                    break;

                case 'DATETIME':
                    typeInput = 'date'
                    break;

                default:
                    break;
            }

            const div = document.createElement('div')
            div.className = "linha"
            const input = document.createElement('input')
            input.setAttribute('type', typeInput)

            if (typeInput === 'number') {
                input.setAttribute(atribute[0], atribute[1])
            }

            input.setAttribute('id', fieldName)

            const label = document.createElement('label')
            label.setAttribute('for', fieldName)
            label.innerHTML = fieldName

            div.appendChild(label)
            div.appendChild(input)

            containerInputs.appendChild(div)
        }

        const inputSubmit = document.createElement('input')
        inputSubmit.className = 'btnEnviar'
        inputSubmit.setAttribute('type', 'submit')

        form.appendChild(inputSubmit)
    }

    async getApiFields(collectionName) {
        try {
            const response = await fetch(`${url}/field/${collectionName}`, {
                method: 'GET',
                headers: {
                    "Content-Type": "application/json",
                    "authorization": `Bearer ${this.token()}`
                }
            })

            const data = await response.json()

            if (response.status !== 200) {
                return super.msg(data.errors, false)
            }

            return data
        } catch (e) {
            super.msg('ERRO no servidor', false)
            return false
        }
    }

    token() {
        const token = document.cookie
            .split("; ")
            .find((row) => row.startsWith("token="))
            .split("=")[1];
        return token
    }
}

class Drive extends Controller {
    constructor() {
        super()
        this.selectCollection = document.querySelector('.selectCollection'),
        this.cadBtn = document.querySelector
        this.collectionData = []

        this.container = null
        this.containerMsg = null

        this.collectinoPresetName = null

    }

    async init(container, containerMsg) {
        this.container = container 
        this.containerMsg = containerMsg 
        await this.addOptions();
        this.initSelect2();
        this.events();
    }

    async addOptions() {
        const data = await this.getApiCollections()
        
        this.collectionData = data.response; // Salva os dados da tabela para uso posterior
        for (const key of this.collectionData) {
            const option = document.createElement('option');
            const textOption = document.createTextNode(key.collectionName);
            option.appendChild(textOption);
            this.selectCollection.appendChild(option);
        }
    }

    token() {
        const token = document.cookie
            .split("; ")
            .find((row) => row.startsWith("token="))
            .split("=")[1];
        return token;
    }

    initSelect2() {
        $(this.selectCollection).select2({
            placeholder: 'Selecione uma predefinição',
            closeOnSelect: false,
            language: 'pt',
        });
    }

    events() {
        $(this.selectCollection).on('change', (e) => this.renderTable(e.target.value));
    }

    initializeTable(collectionName, tableElements){
        this.presetName = collectionName
        tableElements.btnCad.setAttribute('id', collectionName)
        super.setEventOnButtonCad(this.presetName)
    }

    async renderTable(collectionName) {
        const tableElements = super.renderTableHTML()
        this.initializeTable(collectionName, tableElements)

        const fieldsCollection = await this.getApiFields(collectionName)
        for (const field of fieldsCollection.fields) {
            console.log(field);
            const th = document.createElement('th');
            const textTh = document.createTextNode(field.key);
            th.appendChild(textTh);
            tableElements.thead.appendChild(th);
        }

        const valuesCollection = await this.getVeluesApi(collectionName);
        for (const field of valuesCollection) {
            const tr = document.createElement('tr');
            for (const key in field) {
                if(key === '_id') continue
                const value = field[key];
                const td = document.createElement('td');
                const textTd = document.createTextNode(value);

                td.appendChild(textTd);
                tr.appendChild(td);
                tableElements.tbody.appendChild(tr);
            }
        }
    }

    async getApiCollections() {
        try {
            const headers = new Headers({
                "Content-Type": "application/json",
                "authorization": `Bearer ${this.token()}`
            });

            const response = await fetch(`${url}/collection`, {
                method: 'GET',
                headers: headers
            });

            const data = await response.json();

            response.status !== 200 && super.msg(data.errors, false)

            return data
        } catch (e) {
            super.msg('Ocorreu um erro inesperado', false)
        }
    }

    async getApiFields(collectionName) {
        try {
            const response = await fetch(`${url}/field/${collectionName}`,
                {
                    headers: {
                        "Content-Type": "application/json",
                        "authorization": `Bearer ${this.token()}`
                    }
                })

            const data = await response.json()
            response.status !== 200 && super.msg(data.errors, false)

            return data
        } catch (e) {
            super.msg('Ocorreu um erro inesperado', false)
        }
    }

    async getVeluesApi(tableName) {
        const response = await fetch(`${url}/value/${tableName}`, {
            headers: {
                "Content-Type": "application/json",
                "authorization": `Bearer ${this.token()}`
            }
        });

        const valuesApi = await response.json();

        response.status !== 200 && super.msg(valuesApi.errors, false)

        return valuesApi;
    }
}

const containerMsg = document.querySelector('.msg');
const container = document.querySelector('.container')

const controller = new Controller(containerMsg, container)
controller.init()