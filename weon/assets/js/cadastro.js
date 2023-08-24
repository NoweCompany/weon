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
        this.isEdit = false
        this.valuePreset = {}
        
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

    async showDocument(collectionName = this.presetSelected){
        try {
            this.presetSelected = collectionName

            const {btnCad, thead, tbody} = this.renderTableHtml(collectionName)
            const btnDelet = document.querySelector("#btnDelet")
            const childresOfTBody = tbody.children
            btnDelet.addEventListener('click', async (e) => {
                try {
                    const checkboxes = document.querySelectorAll('.checkBoxDelet')
                    for(const checkbox of checkboxes){
                        if(checkbox.checked){
                            const response = await requests.deleteApiValues(this.presetSelected, checkbox.id)
                            this.msg(response.success, true)
                            checkbox.parentNode.remove()
                        }
                    }
                } catch (error) {
                    this.msg(error.message || 'Ocorreu um erro inesperado 😢', false)
                }
            })

            //Promise.all
            const fieldsCollection = await this.requests.getApiFields(this.presetSelected)
            const valuesCollection = await this.requests.getVeluesApi(this.presetSelected)

            this.buildTable(thead, tbody, fieldsCollection, valuesCollection)
        } catch (error) {    
            this.container.innerHTML = ''
            return this.msg(error.message || "Ocorreu um erro inesperado")
       }
    }

    renderTableHtml(presetSelected) {
        this.container.innerHTML = `
        <div class="d-flex justify-content-center align-items-center">
          <div class="border border-horizontal p-5 d-flex justify-content-between align-items-center">
            <h1 class="mb-0 order-1">${presetSelected}</h1>
            <button id="btnCad" name="btnCad" class="btn btn-outline-primary btn-sm-1 order-2">Adicionar Documento</button>
            <button id="btnDelet" name="btnDelet" class="btn btn-outline-secondary btn-sm-1 order-2">Deletar Documentos</button>
          </div>
        </div>
        
        <table class="table">
          <thead class="thead">
          </thead>
          
          <tbody class="tbody">
          </tbody>
        </table>
        `;
        const form = document.querySelector('#form')
        const btnCad = document.querySelector('#btnCad');
        const thead = document.querySelector('.thead');
        const tbody = document.querySelector('.tbody');
    
        btnCad.addEventListener('click', () => {
            this.showForm();
        });
    
        return { form, btnCad, thead, tbody };
    }
    
    
    renderFormHtml(presetSelected) {
        this.container.innerHTML = `
        <div class="d-flex justify-content-center align-items-center mb-5">
        <div class="border border-horizontal p-5 d-flex justify-content-between align-items-center">
            <div class="ml-auto">
                <h1 class="mb-0">${presetSelected}</h1>
            </div>
            <div> 
            <button id="back" name="btnCad" class="btn btn-outline-danger btn-sm-4 ml-2">
            <i class="bi bi-arrow-left"></i> Voltar
        </button>
        <button type="submit" form="form" class="btn btn-outline-primary btn-sm-1">
            <i class="bi bi-check"></i> Salvar
        </button>
            </div>
        </div>
    </div>
    <form id="form" class="formPreset"> </form>
        `

        const form = document.querySelector('#form')
        const btnBack = document.querySelector('#back')

        btnBack.addEventListener('click', () => {
            this.showDocument(this.presetSelected)
        })

        return { form, btnBack }
    }

    buildTable(thead, tbody, fieldsCollection, valuesCollection) {
        thead.appendChild(document.createElement('th')).innerText = 'Selecione'
        for (const field of fieldsCollection.fields) {
            const th = document.createElement('th');
            const textTh = document.createTextNode(field.key);
            th.appendChild(textTh);
            thead.appendChild(th);
        }

        for (const field of valuesCollection) {
            const tr = document.createElement('tr');
            //checkbox
            const inputCheckBox = document.createElement('input') 
            inputCheckBox.setAttribute('type', 'checkbox')
            inputCheckBox.setAttribute('class', 'checkBoxDelet')
            
            tr.appendChild(inputCheckBox)

            for (const key in field) {
                if(key === '_id') {
                    inputCheckBox.setAttribute('id', field[key])
                    tr.setAttribute('id', field[key])
                    continue
                }
                const value = field[key];
                const td = document.createElement('td');

                td.addEventListener('click', (e) => {
                    tr.childNodes.forEach((td, i) => {
                        const valueTd = td.innerText
                        const idTd = td.id
                        this.valuePreset[idTd] = valueTd
                    })
                    this.valuePreset._id = tr.getAttribute('id')
                    this.isEdit = true
                    this.showForm()
                })

                const textTd = document.createTextNode(value);
                td.appendChild(textTd);
                td.setAttribute('id', key)
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
                        let valueInput = ''
                        if(element.type !== 'checkbox') {
                            valueInput = element.value
                        }else {
                            valueInput = element.checked
                        }

                    switch(element.type){
                        case 'number':
                        valueInput = Number(valueInput)
                        break

                        case 'checkbox':
                            valueInput = Boolean(valueInput)
                            break

                        case 'date':
                            valueInput = new Date(valueInput).toISOString()
                    }

                    valuesForm[element.id] = valueInput
                }

            if(!this.isEdit){
                const response = await this.requests.postApiValues(presetSelected, [valuesForm])
            }else{
                const response = await this.requests.updateApiValues(presetSelected, valuesForm, this.valuePreset._id)
                this.valuePreset = {}
                this.isEdit = false
            }
            this.msg('Atualização bem sucedida', true)
            this.showDocument()
            return form

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
                console.log(field);

                const input = document.createElement('input')
                input.setAttribute('id', key)
                
                if(typeInput !== 'checkbox') input.setAttribute('required', required)
                input.setAttribute('type', typeInput)
                if(this.valuePreset[key]) input.value = this.valuePreset[key]
                else if(type === 'int') input.setAttribute('step', '1')
                else if(type === 'double') input.setAttribute('step', '0.1')
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

            case 'number':
                return 'number'

            case 'double':
                return 'number'
    
            case 'date':
                return 'date'

            case 'int':
                return 'number'
            
            case 'bool':
                return 'checkbox'

            default:
                return 'text'
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
            this.containerMsg.className = 'alert alert-danger d-flex mt-4 position-absolute bottom-0 end-0 h5 mr-5';
            this.containerMsg.setAttribute('role', 'alert')
            this.containerMsg.textContent = msg;

            setTimeout(() => {
                this.cleanMsg();
            }, 3000);

            return;
        } else {
            this.containerMsg.className = 'alert alert-success d-flex mt-4 position-absolute bottom-0 end-0 h5 mr-5';

            this.containerMsg.setAttribute('role', 'alert')
            this.containerMsg.textContent = msg;

            setTimeout(() => {
                this.cleanMsg();
            }, 3000);

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
            this.removeLoading()
             throw new Error(e.message || 'Ocorreu um erro inesperado')
        }
    }

    async updateApiValues(collectionName, values, id) {
        try {
            this.addLoading()
            console.log(values, collectionName, id);
            const response = await fetch(`${this.apiUrl}/value/${id}`, {
                method: 'PUT',
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
        }
    }

    async deleteApiValues(collectionName, id){
        try {
            this.addLoading()
            const response = await fetch(`${this.apiUrl}/value/${id}/${collectionName}/false`, {
                method: 'DELETE',
                headers: {
                    "Content-Type": "application/json",
                    "authorization": `Bearer ${this.token}`
                },
            })

            const data = await response.json();
            if(response.status !== 200) throw new Error(data.errors)

            this.removeLoading()
            return response
        } catch (e) {
            console.log(e);
            this.removeLoading()
            throw new Error(e.message || 'Ocorreu um erro inesperado')
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