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

    event() {
        removeEventListener('click', document)
        document.addEventListener('click', async (e) => {
            const el = e.target
            const id = el.getAttribute('id')
            if (id === 'createPreset') this.rederFormPreset()
            else if (id === 'cancelPresetForm') await this.preset()
        })  
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
            return this.preset()
        } catch (error) {
            return this.messaging.msg(error.message, false)
        }   
    }

    rederFormPreset() {
        this.container.innerHTML = `
        <div class="container">
        <form id="formPreset" class="bg-white p-5 rounded rounded-10">
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
    }

    rederTable() {
        this.container.innerHTML = `
        
        <h1 id="tituloPrincipal" class="display-6">Predefinições</h1>
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
    <button id="createPreset" class="criarnovatabela btn btn-outline-primary">Criar</button>
    
        `
    }

    async creteTablePresets() {
        try {
            
            const data = await this.api.getApiPresets()
            
            this.rederTable()
            this.event()

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

                // Adicione ícones do FontAwesome aos elementos tdEdit e tdDelet
                const tdEdit = document.createElement('td');
                tdEdit.setAttribute('id', collectionName + '_edit');
                tdEdit.addEventListener('click', (e) => this.editPreset(e));

                const tdDelet = document.createElement('td');
                tdDelet.setAttribute('id', collectionName + '_delete');
                tdDelet.addEventListener('click', (e) => {
                const popUpAlert = document.querySelector('.popupConfirmation');
                if (popUpAlert) this.showPopUp(popUpAlert, e);
                });

                // Criar elementos de ícone para edição e exclusão
                const editIcon = document.createElement('i');
                editIcon.className = 'fas fa-edit'; // Classe do ícone de edição do FontAwesome

                const deletIcon = document.createElement('i');
                deletIcon.className = 'fas fa-trash-alt'; // Classe do ícone de exclusão do FontAwesome

                // Adicionar ícones aos elementos tdEdit e tdDelet
                tdEdit.appendChild(editIcon);
                tdDelet.appendChild(deletIcon);

                // Adicionar texto às células (Editar e Apagar)
                const tdTextEdit = document.createTextNode('');
                const tdTextDelet = document.createTextNode('');

                // Adicionar texto às células tdEdit e tdDelet (opcional, se desejar)
                tdEdit.appendChild(tdTextEdit);
                tdDelet.appendChild(tdTextDelet);

                // Definir classes CSS para as células tdEdit e tdDelet (se necessário)
                tdEdit.className = 'editPreset';
                tdDelet.className = 'deletPreset';

                // Adicione as células com ícones e texto à linha da tabela
                // Suponha que você já tenha uma linha (tr) criada anteriormente
                tr.appendChild(tdEdit);
                tr.appendChild(tdDelet);
            }
        } catch (error) {
            const msgError = error.message
            this.messaging.msg(msgError || 'Algo deu errado tente novamente mais tarde 😢', false)
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
            try {
                if(valueInput === collectionName){
                    const data = await this.api.deletePreset(collectionName)
                    popUpAlert.classList.remove("show")
                    this.preset()
                    return this.messaging.msg(data.success, true)
                }else{
                    this.messaging.msg('Escreva o nome correto para excluir a predefinição!', false)
                }
            } catch (error) {
                this.messaging.msg(error.message || "Algo deu errado tente novamente mais tarde 😢", false)
            }
        })
    }

    async editPreset(e) {
        const namePreset = e.target.id.split('_')[0]
        await this._fieldController.fields(namePreset)
    }
}