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
        <form id="formPreset" class="p-5 rounded rounded-10 popreset mx-auto mt-5 text-center">
            <h1 class="text-center mb-4">Dê nome a predefinição </h1>
            <div class="form-group">
                <input type="text" class="form-control" id="name" placeholder="nome da predefinição">
            </div>
        </form>
    </div>

    <div class="d-flex justify-content-center align-items-center mb-5">
        <div class="border border-horizontal p-5 d-flex justify-content-between align-items-center">
            <div class="ml-auto">
                <h1 class="mb-0 display-6"> Crie sua predefinição</h1>
            </div>
            <div> 
            <button id="cancelPresetForm" form="formPreset" class="btn btn-outline-danger btn-sm-4">Voltar</button>
            <button id="createPresetForm" form="formPreset" class="btn btn-outline-primary sm-4 ms-2">Salvar</button>
            </div>
        </div>
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
                        <th>Predefinição</th>
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
                const { collectionName, fields } = preset;
            
                // Crie a linha da tabela
                const tr = document.createElement('tr');
                tr.classList.add('editPreset');
            
                // Adicione um evento de clique à linha da tabela
                tr.addEventListener('click', (e) => {
                    // Verifique se o clique ocorreu no botão de exclusão (ou seus descendentes)
                    if (e.target.closest('.deletPreset')) {
                        // Se for o botão de exclusão, não faça nada ou realize a ação de exclusão aqui
                        return;
                    }
                    // Se não for o botão de exclusão, chame a função de edição
                    this.editPreset(e, collectionName);
                });
            
                // collectionName
                const thTable = document.createElement('td');
                const thTextTable = document.createTextNode(collectionName);
                thTable.appendChild(thTextTable);
                tr.appendChild(thTable);
            
                // fields
                for (let i = 0; i <= maiorLength; i++) {
                    const thfield = document.createElement('td');
                    const thTextfield = document.createTextNode(fields[i] ? fields[i].key : '');
                    thfield.appendChild(thTextfield);
                    tr.appendChild(thfield);
                }
            
                // TdDelet
                const tdDelet = document.createElement('td');
                tdDelet.setAttribute('id', collectionName + '_delete');
            
                const handleClickTdDelet = (e) => {
                    const popUpAlert = document.querySelector('.popupConfirmation');
                    if (popUpAlert && !popUpAlert.classList.contains('show')) this.showPopUp(popUpAlert, e, collectionName);
                }
                tdDelet.removeEventListener('click', handleClickTdDelet)
                tdDelet.addEventListener('click', handleClickTdDelet);
            
                // Add Icons
                const deletIcon = document.createElement('i');
                deletIcon.className = 'fas fa-trash-alt';
            
                tdDelet.appendChild(deletIcon);
            
                const tdTextDelet = document.createTextNode('');
                tdDelet.appendChild(tdTextDelet);
                tdDelet.className = 'deletPreset';
            
                tr.appendChild(tdDelet);
            
                tbody.appendChild(tr);
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