import configs from "./modules/configs.js";

const url = configs.urlApi
const urlWebsite = configs.urlWebsiteRelativa()

import Logado from "./modules/Logado.js";

window.addEventListener('load', async (e) => {
    const logado = new Logado();
    if (!(await logado.userLogado())) {
        return window.location.assign(`${urlWebsite}`);
    } else {
        return;
    }
});

class Drive{
    constructor(containerMsg, container, requests, select2Collections){
        this.container = container
        this.containerMsg = containerMsg
        this.select2Collections = select2Collections

        this.requests = requests

        this.collectionData = []
        this.presetSelected = null
    }

    async init(inicialization = false){
        //this.showForm('clientes')
        if(inicialization) {
            await this.addOptions()
        }
        this.initializeSelect2()
    }

    initializeSelect2() {
        $(this.select2Collections).select2({
            placeholder: 'Selecione uma predefinição',
            closeOnSelect: false,
            language: 'pt',
        });
        $(this.select2Collections).on('change', (e) => this.showDocument(e.target.value));
    }

    async showDocument(collectionName){
        try {
            this.presetSelected = collectionName

            const {btnCad, thead, tbody} = this.renderTableHtml()

            //Promise.all
            const fieldsCollection = await this.requests.getApiFields(this.presetSelected)
            const valuesCollection = await this.requests.getVeluesApi(this.presetSelected)

            this.buildTable(thead, tbody, fieldsCollection, valuesCollection)
        } catch (error) {    
            this.container.innerHTML = ''
            return this.msg(error.message || "Ocorreu um erro inesperado")
       }
    }

    renderTableHtml(){
        this.container.innerHTML = `
        <div class="btn-cad">
        <div class="container d-flex justify-content-end h-100">
        <button id="btnCad" name="btnCad" class="btn btn-outline-success btn-lg">Cadastrar</button>
      </div>
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

        btnCad.addEventListener('click', () => {this.showForm()})

        return {btnCad, thead, tbody}
    }

    renderFormHtml(presetSelected) {
        this.container.innerHTML = `
        <h1 class="display-3">${presetSelected}</h1>
            <form id="form" class="formPreset">
            <input type="submit" class="btn btn-primary" value="Enviar">
            </form>

            <div class='dangerbtn'>
            <div class="Cont-btn">
        <button id="back" class="btn btn-outline-danger btn-lg">
            <i class="bi bi-arrow-left"></i> Voltar
        </button>
        </div>
        </div> 

        `

        const form = document.querySelector('#form')
        const btnBack = document.querySelector('#back')

        btnBack.addEventListener('click', () => {
            this.showDocument(this.presetSelected)
        })

        return { form, btnBack }
    }

    buildTable(thead, tbody, fieldsCollection, valuesCollection) {
        for (const field of fieldsCollection.fields) {
            const th = document.createElement('th');
            const textTh = document.createTextNode(field.key);
            th.appendChild(textTh);
            thead.appendChild(th);
        }

        for (const field of valuesCollection) {
            const tr = document.createElement('tr');
            for (const key in field) {
                if(key === '_id') continue
                const value = field[key];
                const td = document.createElement('td');
                const textTd = document.createTextNode(value);

                td.appendChild(textTd);
                tr.appendChild(td);
                tbody.appendChild(tr);
            }
        }
    }

    async showForm(presetSelected = this.presetSelected) {
        const { form } = this.renderFormHtml(presetSelected)
        await this.addInputsToForm(form, presetSelected)
        
        form.addEventListener('submit', async (e) => {
            try {
                e.preventDefault()
                const elements = e.target.elements

                let valuesForm = {}
                for(const element of elements){
                    if(!element.id || !element.type) continue
                    let valueInput = element.value

                    switch(element.type){
                        case 'number':
                        valueInput = Number(valueInput)
                        break

                        case 'checkbox':
                            valueInput = Boolean(valueInput)
                    }

                    valuesForm[element.id] = valueInput
                }

            const response = await this.requests.postApiValues(presetSelected, [valuesForm])
            this.msg('Cadastro bem sucedido')

        } catch (error) {
            this.msg(error.message, false)
        }})
        }

    async addInputsToForm(form, presetSelected = this.presetSelected){
        try {
            if(!presetSelected || !form) return  

            const response = await requests.getApiFields(presetSelected)
            response.fields.reverse().forEach((field, index, array) => {
                const containerInputLabel = document.createElement('div')
                containerInputLabel.classList.add('containerInputLabel')

                const {key, type, required} = field
                const typeInput = this.transformType(type)

                const input = document.createElement('input')
                input.setAttribute('id', key)
                
                input.setAttribute('required', required)
                input.setAttribute('type', typeInput)
                if(type === 'int') input.setAttribute('step', '1')
                const label = document.createElement('label')
                label.setAttribute('for', key)
                label.innerText = key

                containerInputLabel.appendChild(label)
                containerInputLabel.appendChild(input)
                form.insertBefore(containerInputLabel, form.firstChild)
            });
            
        } catch (error) {
            this.msg(error.message, false)
        }
    }
    
    transformType(type){
        switch (type) {
            case 'string':
                return 'text'
                break;

            case 'number':
                return 'number'
                break;

            case 'date':
                return 'date'
                break;

            case 'int':
                return 'number'
                break;

            default:
                return 'text'
                break;
        }
    }

    async addOptions() {
        try {
            const response = await this.requests.getApiCollections()
            
            this.collectionData = response.response; // Salva os dados da tabela para uso posterior
            for (const key of this.collectionData) {
                const option = document.createElement('option');
                const textOption = document.createTextNode(key.collectionName);
                option.appendChild(textOption);
                this.select2Collections.appendChild(option);
            }
        } catch (error) {
            this.msg(error.message, false)
        }
        
    }

    msg(msg, success) {
        if (!success) {
            this.containerMsg.className = 'error';
            this.containerMsg.textContent = msg;

            setTimeout(() => {
                this.cleanMsg();
            }, 2000);

            return;
        } else {
            this.containerMsg.className = 'success';
            this.containerMsg.textContent = msg;

            setTimeout(() => {
                this.cleanMsg();
            }, 2000);

            return;
        }
    }

    cleanMsg() {
        this.containerMsg.className = 'msg';
    }
}

class Requests{
    constructor(token, apiUrl, loading){
        this.token = token
        this.apiUrl = apiUrl
        this.loading = loading
    }

    async postApiValues(collectionName, values) {
        try {
            this.addLoading()
            const response = await fetch(`${this.apiUrl}/value`, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                    "authorization": `Bearer ${this.token}`
                },
                body: JSON.stringify({ collectionName, values })
            })

            const data = await response.json();
            if(response.status !== 200) throw new Error(data.errors)

            this.removeLoading()
            return response
        } catch (e) {
            console.log(e);
            this.removeLoading()
             throw new Error(e.message || 'Ocorreu um erro inesperado')
            return false
        }
    }

    async getApiCollections() {
        try {
            this.addLoading()
            const headers = new Headers({
                "Content-Type": "application/json",
                "authorization": `Bearer ${this.token}`
            });

            const response = await fetch(`${this.apiUrl}/collection`, {
                method: 'GET',
                headers: headers
            });

            const data = await response.json();

            if(response.status !== 200) throw new Error(data.errors)

            this.removeLoading()
            return data
        } catch (e) {
            this.removeLoading()
            throw new Error(e.message || 'Ocorreu um erro inesperado')
        }
    }

    async getApiFields(collectionName) {
        try {
            this.addLoading()
            const response = await fetch(`${this.apiUrl}/field/${collectionName}`,
                {
                    headers: {
                        "Content-Type": "application/json",
                        "authorization": `Bearer ${this.token}`
                    }
                })

            const data = await response.json()
            if(response.status !== 200) throw new Error(data.errors)
            
            this.removeLoading()
            return data
        } catch (e) {
            this.removeLoading()
            throw new Error(e.message || 'Ocorreu um erro inesperado')
        }
    }

    async getVeluesApi(tableName) {
        try {
            this.addLoading()
            const response = await fetch(`${this.apiUrl}/value/${tableName}`, {
                headers: {
                    "Content-Type": "application/json",
                    "authorization": `Bearer ${this.token}`
                }
            });
    
            const data = await response.json();
    
            if(response.status !== 200) throw new Error(data.errors)
            
            this.removeLoading()
            return data;
        } catch (error) {
            this.removeLoading()
            throw new Error(e.message || 'Ocorreu um erro inesperado')
        }
    }
    
    addLoading(){
        this.loading.style.display = 'flex'
    }

    removeLoading(){
        this.loading.style.display = 'none'
    }
}

const containerMsg = document.querySelector('.msg');
const container = document.querySelector('.container')
const loading = document.querySelector('.loading') 
const select2Collections = document.querySelector('.selectCollection')

const token = () => {
    const token = document.cookie
        .split("; ")
        .find((row) => row.startsWith("token="))
        .split("=")[1];
    return token
}

const requests = new Requests(token(), configs.urlApi, loading)
const drive = new Drive(containerMsg, container, requests, select2Collections)
drive.init(true)