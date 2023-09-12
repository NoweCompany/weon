export default class Presets {
    _fieldController = null

    constructor(container, messaging, requests){
        this.messaging = messaging
        this.api = requests

        this.container = container
    }

    set fieldController(instanceField){
        if(instanceField){
            return this._fieldController = instanceField
        }
        
        throw new Error("Instância de Preset inválida")
    }

    get fieldController(){
        return this._fieldController
    }

    async preset() {
        this.messaging.cleanMsg()
        this.creteTablePresets()
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

    addEventToBtnsOfTable() {
        const createPreset = document.querySelector('#createPreset')
        createPreset.addEventListener('click', () => this.rederFormPreset())
    }

    async createPreset(e) {
        try {
            e.preventDefault()

            const namePreset = document.querySelector('#name').value

            if (!namePreset) {
                return this.messaging.msg('Campo vazio', false)

            }
            const response = await this.api.postApiPreset(namePreset)
            if (!response) return
            
            this.messaging.msg(response.success, true)
            return this._fieldController.fields(namePreset)
        } catch (error) {
            return this.messaging.msg(error.message, false)
        }   
    }

    rederFormPreset() {
        this.container.innerHTML = `
        <div class="container">
        <form id="formPreset" class="p-5 rounded rounded-10 popreset">
            <h1 class="text-center mb-4">Criar Predefinição</h1>
            <div class="form-group">
                <label for="name">Nome</label>
                <input type="text" class="form-control" id="name" placeholder="Digite o nome da sua predefinição">
            </div>

            <div class="d-flex justify-content-between mt-4">
                <button type="button" class="btn btn-outline-danger" id="cancelPresetForm">Voltar</button>
                <button type="submit" class="btn btn-outline-primary" id="createPresetForm">Próximo</button>
            </div>
        </form>
        </div> 
        `
        const formPreset = document.querySelector('#formPreset')
        formPreset.addEventListener('submit', e => this.createPreset(e))
        
        const cancelPresetForm = document.querySelector('#cancelPresetForm')
        cancelPresetForm.addEventListener('click', () => this.preset())
    }

    rederTable() {
        this.container.innerHTML = `
        <div class="d-flex justify-content-center align-items-center mb-5">
        <div class="border border-horizontal p-5 d-flex justify-content-between align-items-center">
            <div class="titulo">
                <h1 id="tituloPrincipal" class="display-6">Predefinições</h1>
            </div>
                <div class="newfield me-3">
                    <button id="createPreset" class="btn btn-outline-primary">Adicionar</button>
                </div>
               
            </div>
        </div>
    </div>

     
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
      
        `
    }

    async creteTablePresets() {
        try {
            
            const data = await this.api.getApiPresets()
            
            this.rederTable()
            this.addEventToBtnsOfTable()

            if(!data?.response) {
                this.messaging.msg(data)
                return
            }

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

                //TdEdit
                const tdEdit = document.createElement('td');
                tdEdit.setAttribute('id', collectionName + '_edit');

                tdEdit.removeEventListener('click', this.editPreset)
                tdEdit.addEventListener('click', (e) => this.editPreset(e, collectionName ));

                //TdDelet
                const tdDelet = document.createElement('td');
                tdDelet.setAttribute('id', collectionName + '_delete');

                const handleClickTdDelet = (e) => {
                    const popUpAlert = document.querySelector('.popupConfirmation');
                    if (popUpAlert && !popUpAlert.classList.contains('show')) this.showPopUp(popUpAlert, e, collectionName);
                }
                tdDelet.removeEventListener('click', handleClickTdDelet)
                tdDelet.addEventListener('click', handleClickTdDelet);

                //Add Icons 
                const editIcon = document.createElement('i');
                editIcon.className = 'fas fa-edit';

                const deletIcon = document.createElement('i');
                deletIcon.className = 'fas fa-trash-alt';

           
                tdEdit.appendChild(editIcon);
                tdDelet.appendChild(deletIcon);

         
                const tdTextEdit = document.createTextNode('');
                const tdTextDelet = document.createTextNode('');

            
                tdEdit.appendChild(tdTextEdit);
                tdDelet.appendChild(tdTextDelet);

              
                tdEdit.className = 'editPreset';
                tdDelet.className = 'deletPreset';

            
                tr.appendChild(tdEdit);
                tr.appendChild(tdDelet);
            }
        } catch (error) {
            const msgError = error.message
            this.messaging.msg(msgError || 'Algo deu errado tente novamente mais tarde 😢', false)
        }
    }

    showPopUp(popUpAlert, e, collectionName){
        popUpAlert.classList.add('show')

        const labelAlertConfirmation = document.querySelector('#labelAlertConfirmation')
        const inputAlertConfimation = document.querySelector('#inputAlertConfimation')
        const formAlertConfirmation = document.querySelector('#formAlertConfirmation')
        const btnClosePopUp = document.querySelector('#btnClosePopUp')

        const el = e.target

        inputAlertConfimation.focus()
        labelAlertConfirmation.innerText = `Digite o nome da predefinição há ser excluida: "${collectionName}"`
        
        btnClosePopUp.addEventListener('click', (e) => {
            inputAlertConfimation.value = ''
            popUpAlert.classList.remove("show")
        })

        const handleSubmitFormAlertConfirmation = async (e) => {
            e.preventDefault()
            const valueInput = inputAlertConfimation.value
            try {
                if(valueInput === collectionName){
                    const data = await this.api.deletePreset(collectionName)
                    popUpAlert.classList.remove("show")
                    inputAlertConfimation.value = ''
                    this.preset()
                    return this.messaging.msg(data.success, true)
                }else{
                    this.messaging.msg('Escreva o nome correto para excluir a predefinição!', false)
                }
            } catch (error) {
                this.messaging.msg(error.message || "Algo deu errado tente novamente mais tarde 😢", false)
            }
        }

        formAlertConfirmation.removeEventListener('submit', handleSubmitFormAlertConfirmation)
        formAlertConfirmation.addEventListener('submit', handleSubmitFormAlertConfirmation)
    }

    async editPreset(e, namePreset) {
        console.log(namePreset);
        await this._fieldController.fields(namePreset)
    }
}