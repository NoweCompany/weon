import configs from '../js/modules/configs.js'

const url = configs.urlApi
const urlWebsite = configs.urlWebsiteRelativa()

const container = document.querySelector('.container')
const containerMsg = document.querySelector('#msg')

import Logado from "./modules/Logado.js";

window.addEventListener('load', async (e) => {
    containerMsg.innerHTML = ''
    const logado = new Logado()
    if (!(await logado.userLogado())) {
        return window.location.assign(`${urlWebsite}`)
    } else {
        return
    }
})

class Admin {
    token() {
        const token = document.cookie
            .split("; ")
            .find((row) => row.startsWith("token="))
            .split("=")[1];
        return token
    }

}

class Preset extends Admin {
    async preset() {
        this.cleanMsg()
        this.creteTablePresets()

    }

    async msg(msg, success) {
        if (!success) {
            containerMsg.className = 'error'
            containerMsg.textContent = msg

            setTimeout(() => {
                this.cleanMsg()
            }, 1000)

            return
        } else {
            containerMsg.className = 'success'
            containerMsg.textContent = msg

            setTimeout(() => {
                this.cleanMsg()
            }, 1000);

            return
        }

    }

    cleanMsg() {
        return containerMsg.className = 'msg'
    }

    maiorLength(data) {
        let maiorLength = 0

        for (const preset of data.response) {
            for (let i = 0; i < preset.fields.length; i++) {
                if (i > maiorLength) maiorLength = i
            }
        }

        return maiorLength
    }

    event() {
        document.addEventListener('click', (e) => {
            const el = e.target
            const id = el.getAttribute('id')
            if (id === 'createPreset') this.rederFormPreset()
            if (id === 'cancelPresetForm') this.preset()
        })
    }

    async createPreset(e) {
        e.preventDefault()

        const namePreset = document.querySelector('#name').value

        if (!namePreset) {
            return this.msg('Campo vazio', false)

        }
        const response = await this.postApiPreset(namePreset)

        if (!response) return

        this.preset()
    }

    rederFormPreset() {
        container.innerHTML = `
        <form id="formPreset">
            <h1> Criar Predefinição </h1>
            <div>
                <label for="name">Nome</label>
                <input type="text" id="name">
            </div>

            <div class="btn1">
            <input type="button"  id="cancelPresetForm" value=" x " />
            </div>
            <div class="btn2">
                <input type="submit"  id="createPresetForm" value=" Próximo" />
            </div> 
        </form>   
        `
        const formPreset = document.querySelector('#formPreset')
        formPreset.addEventListener('submit', e => this.createPreset(e))
    }

    rederTable() {
        container.innerHTML = `
        
        <h1 id="tituloPrincipal">Tabelas</h1>

        <div class="table-container">
        <table>
            <thead>
                <tr id="thead">
                    <th>Campos</th>
                </tr>
            </thead>
            <tbody id="tbody"></tbody>
        </table>
    </div>
    <button id="createPreset" class="criarnovatabela">Criar</button>
    
        `
    }

    async creteTablePresets() {
        const data = await this.getApiPresets()

        //validar
        if (data.msg) return this.msg(data.msg, false)

        this.rederTable()
        this.event()

        const tbody = document.querySelector('#tbody')
        const thead = document.querySelector('#thead')

        //retorna a lengtn do maior array de 'fields'
        const maiorLength = this.maiorLength(data)

        //thead enumerado
        for (let i = 0; i <= maiorLength; i++) {
            const th = document.createElement('th')
            const thText = document.createTextNode(`${i + 1}`)

            th.appendChild(thText)
            thead.appendChild(th)
        }

        //tbody
        for (const preset of data.response) {
            const { collectionName, fields } = preset
            //collectionName
            const tr = document.createElement('tr')
            const thTable = document.createElement('td')
            const thTextTable = document.createTextNode(collectionName)

            thTable.appendChild(thTextTable)
            tr.appendChild(thTable)
            tbody.appendChild(tr)

            //fields
            for (let i = 0; i <= maiorLength; i++) {
                const thfield = document.createElement('td')
                const thTextfield = document.createTextNode(fields[i] ? fields[i].key : '')

                thfield.appendChild(thTextfield)
                tr.appendChild(thfield)
            }

            const tdEdit = document.createElement('td')
            tdEdit.setAttribute('id', collectionName + '_edit')
            tdEdit.addEventListener('click', e => this.editPreset(e))

            const tdDelet = document.createElement('td')
            tdDelet.setAttribute('id', collectionName + '_delete'),
            tdDelet.addEventListener('click', e => {
                const popUpAlert = document.querySelector('.popupConfirmation')
                if(popUpAlert) this.showPopUp(popUpAlert, e)
                
                console.log(popUpAlert);
            })

            tdEdit.className = 'editPreset'
            tdDelet.className = 'deletPreset'

            const tdTextEdit = document.createTextNode('Editar')
            const tdTextDelet = document.createTextNode('Apagar')

            tdDelet.appendChild(tdTextDelet)
            tdEdit.appendChild(tdTextEdit)

            tr.appendChild(tdEdit)
            tr.appendChild(tdDelet)

        }
    }

    showPopUp(popUpAlert, e){
        popUpAlert.classList.add('show')

        const labelAlertConfirmation = document.querySelector('#labelAlertConfirmation')
        const inputAlertConfimation = document.querySelector('#inputAlertConfimation')
        const formAlertConfirmation = document.querySelector('#formAlertConfirmation')
        const btnClosePopUp = document.querySelector('#btnClosePopUp')

        const el = e.target
        const collectionName = el.id.split('_')[0]

        labelAlertConfirmation.innerText = `Digite o nome da predefinição há ser excluida ${collectionName}`
        
        btnClosePopUp.addEventListener('click', (e) => {
            popUpAlert.classList.remove("show")
        })

        formAlertConfirmation.addEventListener('submit', async (e) => {
            e.preventDefault()
            const valueInput = inputAlertConfimation.value
            if(valueInput === collectionName){
                await this.deletePreset(collectionName)
                console.log('Mano');
            }else{
                console.log("Erro");
                this.msg('Escreva o nome correto para excluir a predefinição!', false)
            }
        })
    }

    editPreset(e) {
        console.log(e.target.id);
    }

    async deletePreset(collectionName) {

        const headers = new Headers({
            "Content-Type": "application/json",
            "authorization": `Bearer ${super.token()}`
        })

        const request = await fetch(`${url}/collection`, {
            method: 'DELETE',
            headers: headers,


            body: JSON.stringify({ collectionName: collectionName })
        })

        const data = await request.json()
        if (request.status !== 200) {
            this.msg(data.errors, false)

        }
        else {
            this.msg('susceso', true)
            this.preset()
        }

    }

    async getApiPresets() {
        try {
            const headers = new Headers({
                "Content-Type": "application/json",
                "authorization": `Bearer ${super.token()}`
            })

            const response = await fetch(`${url}/collection`, {
                headers: headers
            })

            const data = await response.json()
            return data
        } catch (e) {
            //validar
            return false
        }
    }

    async postApiPreset(namePreset) {
        try {
            namePreset = namePreset.trim()
            const myBody = JSON.stringify({ collectionName: namePreset })

            const headers = new Headers({
                "Content-Type": "application/json",
                "authorization": `Bearer ${super.token()}`
            })

            const response = await fetch(`${url}/collection`, {
                method: 'POST',

                headers: headers,

                body: myBody
            })

            if (response.status !== 200) {
                const data = await response.json()
                if (data) return this.msg(data.errors, false)

                return this.msg("Falha ao cria predefinição", false)
            }

            this.msg("Predefinição criada com sucesso", true)
            setTimeout(() => {
                return fields.fields(namePreset)
            }, 300)
        } catch (e) {
            return this.msg("Falha ao cria predefinição", false)
        }
    }
}

class Fields extends Admin {

    msg(msg, success) {
        if (!success) {
            containerMsg.className = 'error'
            containerMsg.textContent = msg

            setTimeout(() => {
                this.cleanMsg()
            }, 1000)

            return
        } else {
            containerMsg.className = 'success'
            containerMsg.textContent = msg

            setTimeout(() => {
                this.cleanMsg()
            }, 1000);

            return
        }
    }

    cleanMsg() {
        return containerMsg.className = 'msg'
    }

    async fields(namePreset) {
        this.renderFields()
        this.events()
        await this.addSelect()

        if (namePreset) {
            const optionNmePreset = document.querySelector(`#${namePreset}`)
            optionNmePreset.selected = true
        }
    }

    events() {
        container.addEventListener('click', e => {
            let id = e.target.getAttribute('id')

            if (id === 'createField') {
                this.createFields()
            }
            if (id === 'newField') {
                this.createNewField()
            }
        })
    }

    renderFields() {
        container.innerHTML = `
        <div class="titulo">
        <h1 id="tituloPrincipal" class="display-4">Criar Predefinições</h1>
        </div>


        <!-- Botão Criar -->

        <div class="newfield">
        <button id="newField" class="btn btn-primary">
          <i class="fas fa-plus"></i> Criar Campos
        </button>
      </div>
      
        
          <!-- Botão Salvar-->

          <div class="botãocreate">
          <button id="createField" class="btn btn-success">
            <i class="fas fa-save"></i> Salvar
          </button>
        </div>
           

          <!-- Botão select tabelas-->
            <div class="cont-selecTableName"> 
               

            <!-- Botão select tipo-->  
            <div class="form-group">
            <select id="selectTableName" class="form-select">
              <option value="" selected></option>
            </select>
          </div>
          


            <!-- bloco titulo form-->  
            

            <div class="table-responsive">

            <div class="table-responsive mt-4">
            <table class="table table-dark table-striped rounded mb-0" id="titulotabela">
                <thead class="text-center">
                <tr>
                    <th class="fw-normal">Nome</th>
                    <th class="fw-normal">Tipo</th>
                    <th class="fw-normal">Obrigatório</th>
                    <th class="fw-normal">Delete</th>
                </tr>
                </thead>
            </table>
            </div>


            
            <form id="form">
            </form>
        `
        this.createNewField()
    }

    async addSelect() {
        const headers = new Headers({
            "Content-Type": "application/json",
            "authorization": `Bearer ${super.token()}`
        })

        const response = await fetch(`${url}/collection`, {
            method: 'GET',
            headers: headers
        })

        if (response.status !== 200) this.msg('Algo deu errado', false)

        const data = await response.json()
        for (const key of data.response) {
            const select = document.querySelector('#selectTableName')
            const option = document.createElement('option');
            option.setAttribute('id', key.collectionName)
            const textOption = document.createTextNode(key.collectionName);
            option.appendChild(textOption);
            select.appendChild(option);
        }

    }

    createNewField() {
        // Criação do container principal
        const containerDiv = document.createElement("div");
        containerDiv.className = "create-field";
      
        // Criação do elemento para o nome com classe Bootstrap
        const divName = document.createElement("div");
        divName.className = "mb-4";

      
        const nameLabel = document.createElement("label");
        nameLabel.setAttribute("for", "name");
    
      
        const nameInput = document.createElement("input");
        nameInput.setAttribute("id", "name");
        nameInput.setAttribute("type", "text");
      
        // Criação do elemento para o tipo com classe Bootstrap
        const divType = document.createElement("div");
        divType.className = "divName";
      
        const typeLabel = document.createElement("label");
        typeLabel.setAttribute("for", "type");

      
        const typeSelect = document.createElement("select");
        typeSelect.classList.add("form-select", "w-50"); // Adicione a classe "w-50" para definir a largura do select
        

        const typeOptionSelected = document.createElement("option");
        typeOptionSelected.selected = true
        typeOptionSelected.setAttribute("value", "");
        typeOptionSelected.innerText = 'Escolha um tipo'
        typeSelect.appendChild(typeOptionSelected)

        const typeOptionStrg = document.createElement("option");
        typeOptionStrg.setAttribute("value", "string");
        typeOptionStrg.innerText = 'Texto pequeno'
        typeSelect.appendChild(typeOptionStrg)

        const typeOptionBoolean = document.createElement("option");
        typeOptionBoolean.setAttribute("value", "boolean");
        typeOptionBoolean.innerText = 'Caixa de seleção'
        typeSelect.appendChild(typeOptionBoolean)

        const typeOptionInt = document.createElement("option");
        typeOptionInt.setAttribute("value", "int");
        typeOptionInt.innerText = 'Número Inteiros'
        typeSelect.appendChild(typeOptionInt)

        const typeOptionDouble = document.createElement("option");
        typeOptionDouble.setAttribute("value","double");
        typeOptionDouble.innerText = 'Número Decimal'
        typeSelect.appendChild(typeOptionDouble)

        const typeOptionDate = document.createElement("option");
        typeOptionDate.setAttribute("value", "date");
        typeOptionDate.innerText = 'Data'
        typeSelect.appendChild(typeOptionDate)


        const deleteButton = document.createElement("button");
        deleteButton.className = "btn-delete"; // Usando a classe personalizada para estilização
        deleteButton.setAttribute("id", "deleteButton"); // Adicione o id desejado, por exemplo, "deleteButton";
        deleteButton.innerHTML = '<i class="fas fa-trash"></i>';
        
    
        
        deleteButton.onclick = (e) => {
            e.preventDefault()
            if (form.elements.length > 3) {
                return containerDiv.remove()
            } else {
                return this.msg('É necessário ter pelo menos um campo', false)
            }

        };

        divName.appendChild(nameLabel);
        divName.appendChild(nameInput);

        divType.appendChild(typeLabel);
        divType.appendChild(typeSelect);

        containerDiv.appendChild(divName);
        containerDiv.appendChild(divType);
        containerDiv.appendChild(deleteButton)

        const form = document.querySelector("#form");
        form.appendChild(containerDiv);
    }

    async createFields() {
        const form = document.querySelector('#form');

        if (form.elements.length < 3) {
            return this.msg('É necessário ter pelo menos um campo', false)
        }


        const elementosDoFormulario = form.elements;
        const collectionName = document.querySelector('#selectTableName').value

        let dados = {};
        let cont = 0

        for (let i = 0; i < elementosDoFormulario.length; i++) {
            if (elementosDoFormulario[i].id === 'name') {
                const name = i
                const type = i + 1

                if (!elementosDoFormulario[name].value || !elementosDoFormulario[type].value || !collectionName) {
                    return this.msg('Campos Inválidos', false)
                }
                dados[cont] = [
                    elementosDoFormulario[name].value,
                    elementosDoFormulario[type].value
                ];
                cont += 1
            }

        }
        let response

        for (let i in dados) {
            const array = dados[i]
            const name = array[0]
            const type = array[1]
            response = await this.postApiTemplate(name, type, collectionName)
        }

        if (!response || response.status !== 200) {
            const data = await response.json()
            if (data.errors) return this.msg(data.errors, false)

            return this.msg("Falha ao cria campos", false)
        }

        this.msg("Campos criados com sucesso", true)
        setTimeout(() => {
            preset.preset()
        }, 300)
    }

    async postApiTemplate(name, type, collectionName) {
        try {
            const headers = new Headers({
                "Content-Type": "application/json",
                "authorization": `Bearer ${super.token()}`
            })

            const myBody = JSON.stringify({
                collectionName: collectionName,
                fieldName: name,
                options: {
                    type: type,
                    description: "",
                    required: true
                }
            })
            const response = await fetch(`${url}/field`, {
                method: 'POST',

                headers: headers,

                body: myBody
            })

            return response
        } catch (e) {
            return this.msg("Falha ao cria campos", false)
        }
    }

}

const preset = new Preset()
const fields = new Fields()
preset.preset()
document.addEventListener('click', (e) => {
    const el = e.target
    const id = el.getAttribute('id')
    if (id === 'predefinicao') preset.preset()
    if (id === 'campos') fields.fields()
})

