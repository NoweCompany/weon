const url = 'https://instrutorcerto.com.br'
const urlWebsite   = document.location.href

const container = document.querySelector('.container')
const containerMsg = document.querySelector('#msg')

import Logado from "./modules/Logado.js";

window.addEventListener('load', async (e) => {
    containerMsg.innerHTML = ''
    const logado = new Logado()
    if(!(await logado.userLogado())){
      return window.location.assign(`${urlWebsite.split('/').slice(0, -2).join('/')}/index.html`)
    }else{
      return
    }
})

class Admin{
    constructor(){
        this.preset = new Preset()
        this.fields = new Fields()
    }

    init(){
        this.event()
    }

    async event(){
        document.addEventListener('click', (e) => {
            const el = e.target
            const id = el.getAttribute('id')
            if( id === 'predefinicao')  this.preset.preset()
            if( id === 'campos') this.fields.fields()
        })
    }

}

class Preset{
    async preset(){
        this.cleanMsg()
        this.creteTablePresets()

    }
    
    async msg(msg, success){
        if(!success){
            containerMsg.className = 'error'
            containerMsg.textContent = msg

            setTimeout(() => {
                this.cleanMsg()
            }, 1000)

            return
        }else{
            containerMsg.className = 'success'
            containerMsg.textContent = msg

            setTimeout(() => {
                this.cleanMsg()
            }, 1000);

           return
        }
        
    }

    cleanMsg(){
        return containerMsg.className = 'msg'
    }   

    maiorLength(data){
        let maiorLength = 0

        for(const preset of data.response){
            for(let i = 0; i < preset.fields.length; i++){
                if(i > maiorLength) maiorLength = i
            }
        }

        return maiorLength
    }

    event(){
        document.addEventListener('click', (e) => {
            const el = e.target
            const id = el.getAttribute('id')
            if( id === 'createPreset')  this.rederFormPreset()
            if( id === 'cancelPresetForm') this.preset()
        })
    }

    async createPreset(e){
        e.preventDefault()

        const namePreset = document.querySelector('#name').value

        if(!namePreset){
            return this.msg('Campo vazio', false)
    
     }   
        const response = await this.postApiPreset(namePreset)

        if(!response) return

        this.preset()
    }   

    rederFormPreset(){
        container.innerHTML = `
        <form id="formPreset">
            <h1> Criar Predefinição </h1>
            <div>
                <label for="name">Nome</label>
                <input type="text" id="name">
            </div>
            <div class="cont-btn-form-preset">
                <input type="button" class="modal-button" id="cancelPresetForm" value="Voltar" />
                <input type="submit" class="modal-button" id="createPresetForm" value="Criar" />
            </div>
        </form>   
        `
    
        const formPreset = document.querySelector('#formPreset')
        formPreset.addEventListener('submit', e => this.createPreset(e))
    }    

    rederTable(){
        container.innerHTML = `
        <table>
            <thead>
                <tr id="thead">
                    <th>Nome</th>
                </tr>
            </thead>
            <tbody id="tbody">
  
            </tbody>
        </table>
        <button id="createPreset" class="modal-button">Criar</button>
        `
    }

    async creteTablePresets(){
        const data = await this.getApiPresets()

        //validar
        if(data.msg) return this.msg(data.msg, false)

        this.rederTable()
        this.event()

        const tbody = document.querySelector('#tbody')
        const thead = document.querySelector('#thead')

        //retorna a lengtn do maior array de 'fields'
        const maiorLength = this.maiorLength(data)

       //thead enumerado
        for (let i = 0; i <= maiorLength; i++) {
            const th = document.createElement('th')
            const thText = document.createTextNode(`${i+1}`)
    
            th.appendChild(thText)  
            thead.appendChild(th)
        }

        //tbody
        for(const preset of data.response){
            const {tableName, fields} = preset
            //tableName
            const tr = document.createElement('tr')
            const thTable = document.createElement('td')
            const thTextTable = document.createTextNode(tableName)

            thTable.appendChild(thTextTable)
            tr.appendChild(thTable)
            tbody.appendChild(tr)

            //fields
            for(let i = 0; i <= maiorLength; i++){
                const thfield = document.createElement('td')
                const thTextfield = document.createTextNode(fields[i] ? fields[i].key : '')
                
                thfield.appendChild(thTextfield)
                tr.appendChild(thfield)
            }

            const tdEdit = document.createElement('td')
            tdEdit.setAttribute('id', tableName + '_edit')
            tdEdit.addEventListener('click', e => this.editPreset(e))

            const tdDelet = document.createElement('td')
            tdDelet.setAttribute('id', tableName + '_delete'),
            tdDelet.addEventListener('click', e => this.deletePreset(e))
            
            tdEdit.className = 'editPreset'
            tdDelet.className = 'deletPreset'

            const tdTextEdit = document.createTextNode('Edit')
            const tdTextDelet = document.createTextNode('Delet')

            tdDelet.appendChild(tdTextDelet)
            tdEdit.appendChild(tdTextEdit)

            tr.appendChild(tdEdit)
            tr.appendChild(tdDelet)

        }
    }

    editPreset(e){
        console.log(e.target.id);
    }

    deletePreset(e){
        console.log(e.target.id);
    }

    async getApiPresets(){
        try{
            const response = await fetch(`${url}/template/table`)
            
            const data = await response.json()
            return data
        }catch(e){
            //validar
            return false
        }
    }

    async postApiPreset(namePreset){
        try {
            const myBody = JSON.stringify({name: namePreset})

            const response = await fetch(`${url}/template/table`, {
                method: 'POST',

                headers:{
                    "Content-Type": "application/json",
                },
                
                body: myBody
            })

            if(response.status !== 200){
                const data = await response.json()
                if(data) return this.msg(data, false)

                return this.msg("Falha ao cria predefinição", false)
            }

            return this.msg("Predefinição criada com sucesso", true)
        } catch (e) {
            return this.msg("Falha ao cria predefinição", false)
        }
    }
}

class Fields{
        
    msg(msg, success){
        if(!success){
            containerMsg.className = 'error'
            containerMsg.textContent = msg

            setTimeout(() => {
                this.cleanMsg()
            }, 1000)

            return
        }else{
            containerMsg.className = 'success'
            containerMsg.textContent = msg

            setTimeout(() => {
                this.cleanMsg()
            }, 1000);

           return
        }
    }

    cleanMsg(){
        return containerMsg.className = 'msg'
    }  

    async fields(){
        this.renderFields()
        this.events()
        await this.addSelect()
    }

    events(){
        document.addEventListener('click', e => {
            const id = e.target.getAttribute('id')

            if(id === 'createField'){
                this.createFields()
            }
            if(id === 'newField') {
                this.newField()
            }
        })
    }

    renderFields(){
        container.innerHTML = `
            <div class="cont-btns-filds">
                <button id="newField" >Novo Campo</button>
                <button id="createField" >Criar campos</button> 
            </div>

            <div class="cont-selecTableName"> 
                <label>Selecione a predefinição</label>
                <select id="selectTableName">
                    <option value="" selected></option>
                </select>
            </div>
            
            <form id="form">
            </form>
        `
        this.newField()
    }

    async addSelect(){
        const response = await fetch(`${url}/template/table`)
        const data = await response.json()
        for(const key of data.response){
            const select = document.querySelector('#selectTableName')
            const option = document.createElement('option');
            const textOption = document.createTextNode(key.tableName);
            option.appendChild(textOption);
            select.appendChild(option);
        }

    }

    newField(){
        const containerDiv = document.createElement("div");
        containerDiv.className = "create-field";

        const divName = document.createElement("div");
        divName.className = "divName";

        const divType = document.createElement("div");
        divType.className = "divType";

        const nameLabel = document.createElement("label");
        nameLabel.setAttribute("for", "name");
        nameLabel.innerHTML = "Name";

        const nameInput = document.createElement("input");
        nameInput.setAttribute("id", "name");
        nameInput.setAttribute("type", "text");

        const typeLabel = document.createElement("label");
        typeLabel.setAttribute("for", "type");
        typeLabel.innerHTML = "Type";

        const typeSelect = document.createElement("select");

        const typeOptionSelected = document.createElement("option");
        typeOptionSelected.selected = true
        typeOptionSelected.setAttribute("value", "");
        typeOptionSelected.innerText = 'Escolha um tipo'
        typeSelect.appendChild(typeOptionSelected)

        const typeOptionStrg = document.createElement("option");
        typeOptionStrg.setAttribute("value", "STRING");
        typeOptionStrg.innerText = 'STRING'
        typeSelect.appendChild(typeOptionStrg)

        const typeOptionBoolean = document.createElement("option");
        typeOptionBoolean.setAttribute("value", "BOOLEAN");
        typeOptionBoolean.innerText = 'BOOLEAN'
        typeSelect.appendChild(typeOptionBoolean)

        const typeOptionInt = document.createElement("option");
        typeOptionInt.setAttribute("value", "TINYINT");
        typeOptionInt.innerText = 'TINYINT'
        typeSelect.appendChild(typeOptionInt)

        const typeOptionFloat = document.createElement("option");
        typeOptionFloat.setAttribute("value", "FLOAT");
        typeOptionFloat.innerText = 'FLOAT'
        typeSelect.appendChild(typeOptionFloat)

        const typeOptionDate = document.createElement("option");
        typeOptionDate.setAttribute("value", "DATE");
        typeOptionDate.innerText = 'DATE'
        typeSelect.appendChild(typeOptionDate)


        const deleteButton = document.createElement("button");
        deleteButton.setAttribute("class", "btn-delete")
        deleteButton.innerHTML = "Apagar";
        deleteButton.onclick = (e) => {
            e.preventDefault()
            if(form.elements.length > 3){
                return containerDiv.remove()
            }else{
                return this.msg('É necessário ter pelo menos um campo', false)
            }
            
        };

        divName.appendChild(nameLabel);
        divName.appendChild(nameInput);

        divType.appendChild(typeLabel);
        divType.appendChild(typeSelect);
        divType.appendChild(deleteButton)

        containerDiv.appendChild(divName);
        containerDiv.appendChild(divType);

        const form = document.querySelector("#form");
        form.appendChild(containerDiv);
    }

    createFields(){
        const form = document.querySelector('#form');

        if(form.elements.length < 3){
            return this.msg('É necessário ter pelo menos um campo', false)
        }
        
        
        const elementosDoFormulario = form.elements;
        const tableName = document.querySelector('#selectTableName').value

        let dados = {};
        let cont = 0

        for (let i = 0; i < elementosDoFormulario.length; i++) {
            if(elementosDoFormulario[i].id === 'name'){
                const name = i
                const type = i + 1

                if(!elementosDoFormulario[name].value || !elementosDoFormulario[type].value || !tableName){
                    return this.msg('Campos Inválidos', false)
                } 

                dados[cont] = [
                    elementosDoFormulario[name].value,
                    elementosDoFormulario[type].value
                ];
                cont += 1
            }

          }

        for(let i in dados){
            const array = dados[i]
            const name = array[0]
            const type = array[1]

            this.postApiTemplate(name, type, tableName)
        }
        
    }

    async postApiTemplate(name, type, tableName){
        try {
            const myBody = JSON.stringify({
                tableName: tableName,
                fieldName: name,
                options:{
                    type: type,
                    allowNull: true
                }
            })

            const response = await fetch(`${url}/template/field`, {
                method: 'POST',

                headers:{
                    "Content-Type": "application/json",
                },
                
                body: myBody
            })

            if(response.status !== 200){
                const data = await response.json()
                if(data.errors) return this.msg(data.errors, false)

                return this.msg("Falha ao cria campos", false)
            }

            return this.msg("Campos criados com sucesso", true)
        } catch (e) {
            return this.msg("Falha ao cria campos", false)
        }
    }

}

const admin = new Admin()

admin.init()