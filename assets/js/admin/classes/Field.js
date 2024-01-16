export default class Fields{
    _presetController = null

    constructor(container, messaging, requests){
        this.messaging = messaging
        this.api = requests
        this.container = container

        this.currentValuesCollection = null
        this.collectionSelected = null
    }

    set presetController(instancePreset){
        if(instancePreset){
            return this._presetController = instancePreset
        }
        
        throw new Error("Instância de Preset inválida")
    }

    get presetController(){
        return this._presetController
    }

    async fields(namePreset) {
        this.renderFields()
        await this.addSelect()
        this.handleSelectTableName();
        this.events()

        if (namePreset) {
            this.loadFields(namePreset)
            this.collectionSelected = namePreset
            const namePresetFormatedId = namePreset.replace(/ /g, "_")
            const optionNamePreset = document.querySelector(`#${namePresetFormatedId}`)
            optionNamePreset.selected = true
        }else{
            const select =  document.querySelector("#selectTableName")
            
            select.children[1].selected = true
            this.collectionSelected = select.children[1].value
            this.loadFields(this.collectionSelected)
        }
    }

    async loadFields(collectionSelected){
        const form = document.querySelector("#form");
        form.innerHTML = `
            <table class="table table-striped" id="titulotabela">
                <thead class="text-center">
                    <tr>
                        <th class="fw-normal">Nome</th>
                        <th class="fw-normal">Tipo</th>
                        <th class="fw-normal">Obrigatório</th>
                        <th class="fw-normal">Delete</th>
                    </tr>
                </thead>
                <tbody class="tbody" id="tbody">
                </tbody>
            </table>
        `
        await this.setDataColletion()
        const valuesPreset = await this.api.getVeluesApi(this.collectionSelected)
        console.log(valuesPreset);
        this.dataCollection.forEach(collection => {
            if(collection.collectionName === collectionSelected){
                this.currentValuesCollection = {collectionName: collection.collectionName, fields: collection.fields}
                if(collection.fields.length <= 0){
                    this.createNewField()
                }else{
                    collection.fields.forEach(field => {    
                        this.createNewField(field.key, field.type, field.required, valuesPreset)
                    })
                }
            }
        });
    
        return true
    }

    tranformType(type){
        switch (type) {
            case 'string':
                return 'Texto pequeno'

            case 'double':
                return 'Número Decimal'
    
            case 'date':
                return 'Data'

            case 'long':
                return 'Número Inteiros'
            
            case 'bool':
                return 'Caixa de seleção'

            default:
                return type
        }
    }

    events() {
        const form = document.querySelector('#form');
        const newField = document.querySelector('#newField')
        
        form.addEventListener('submit', (e) => this.createFields(e))
        newField.addEventListener('click', () => this.createNewField())
    }

    handleSelectTableName(){
        const select =  document.querySelector("#selectTableName")
        const handleChange = (e) => {
            const el = e.target
            const value = el.value
            if(value){
                this.collectionSelected = value
                this.loadFields(value)
            }
        } 
        select.removeEventListener('change', handleChange)
        select.addEventListener('change', handleChange)
    }

    renderFields() {
        this.container.innerHTML = ''
        this.container.innerHTML = `
        <div class="d-flex justify-content-center align-items-center mb-5">
            <div class="border border-horizontal p-5 d-flex justify-content-between align-items-center">
                <div class="titulo">
                <div class="row align-items-center">
                    <div class="col-6">
                    <h1 id="tituloPrincipal" class="display-6">Predefinição:</h1>
                    </div>
                </div>
                </div>
                <div class="form-group ms-3">
                        <select id="selectTableName" class="form-select">
                        <option value="" selected></option>
                        </select>
                    </div>
                <div class="d-flex align-items-center">
                    <div class="newfield me-3">
                        <button id="newField" class="btn btn-outline-primary">Adicionar Campo</button>
                    </div>
                    <div class="botãocreate">
                        <button id="createField" form="form" class="btn btn-outline-success">Salvar</button>
                    </div>
                </div>
            </div>
        </div>
        
        <form id="form">
        </form>
        `;
    }

    async addSelect() {
        await this.setDataColletion()
        for (const key of this.dataCollection) {
            const select = document.querySelector('#selectTableName')
            const option = document.createElement('option');
            const idFormated = key.collectionName.replace(/ /g, "_")
            option.setAttribute('id', idFormated)
            const textOption = document.createTextNode(key.collectionName);
            option.appendChild(textOption);
            select.appendChild(option);
        }

    }

    async setDataColletion(){
        try {
            const {response} = await this.api.getApiCollection()
            this.dataCollection = response
            return response
        } catch (error) {
            this.msg('Ocorreu um erro inesperado tente novamente mais tarde!')
        }
    }

    async existValuesInField(fieldName, valuesPreset){
        for (const value of valuesPreset) {
            if(value?.[fieldName]) return true
        }
        return false
    }

    async createNewField(inputValue = '', type = '', isRequired = false, valuesPreset = []) {
        const trField = document.createElement("tr");
        trField.className = "create-field";
        
        const tdName = document.createElement("td");
        tdName.className = "mb-4";
    
        const nameInput = document.createElement("input");
        nameInput.setAttribute("type", "text");

        const tdType = document.createElement("td");
        tdType.className = "mb-4";

        if (inputValue) {
            nameInput.setAttribute('value', inputValue);
            nameInput.classList.add("form-control");
            nameInput.classList.add("input-fild"); 
            nameInput.id = 'update';
        } else {
            nameInput.classList.add("form-control");
            nameInput.classList.add("input-fild"); 
            nameInput.id = 'post';
        }
        
        const typeSelect = document.createElement("select");
        const existValueField = await this.existValuesInField(inputValue, valuesPreset)
        if(inputValue && existValueField) {
            typeSelect.setAttribute('arial-label', 'Disabled')
            typeSelect.disabled = true
        }
        typeSelect.classList.add("form-select");
        typeSelect.classList.add("select1");
        
  
        const typeOptionSelected = document.createElement("option");
        typeOptionSelected.selected = true
        typeOptionSelected.setAttribute("value", type);
        typeOptionSelected.innerText = type ? this.tranformType(type) : 'Escolha um tipo'
        typeSelect.appendChild(typeOptionSelected)

        const typeOptionStrg = document.createElement("option");
        typeOptionStrg.setAttribute("value", "string");
        typeOptionStrg.innerText = 'Texto pequeno'
        typeSelect.appendChild(typeOptionStrg)

        // Criação da obrigatoriedade com um switch
        const tdRequired = document.createElement("td");
        tdRequired.className = "d-flex justify-content-center align-items-center p-3";

        const switchLabel = document.createElement("label");
        switchLabel.className = "d-flex justify-content-center align-items-center";

        // Criação do switch
        const isRequiredSwitch = document.createElement("input");
        isRequiredSwitch.setAttribute("type", "checkbox");
        isRequiredSwitch.className = "form-check-input d-flex justify-content-center align-items-center";
        isRequiredSwitch.setAttribute("role", "switch")
        isRequiredSwitch.setAttribute("id", "isRequired");
        if (isRequired) {
            isRequiredSwitch.checked = true;
        }

        const divSwitch = document.createElement('div')
        divSwitch.className = "form-check form-switch d-flex justify-content-center align-items-center"
        divSwitch.appendChild(switchLabel)
        divSwitch.appendChild(isRequiredSwitch)

        const typeOptionBoolean = document.createElement("option");
        typeOptionBoolean.setAttribute("value", "bool");
        typeOptionBoolean.innerText = 'Caixa de seleção'
        typeSelect.appendChild(typeOptionBoolean)

        const typeOptionInt = document.createElement("option");
        typeOptionInt.setAttribute("value", "long");
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

        const tdBtnDelete = document.createElement("td");
        tdBtnDelete.className = "mb-4";
        const deleteButton = document.createElement("button");
        deleteButton.className = "btn btn-outline-danger ";
        deleteButton.setAttribute("id", "deleteButton"); 
        deleteButton.innerHTML = '<i class="fa-solid fa-x"></i>';

        
        const handleClickDeleteButton = async (e) => {
            e.preventDefault()
            if (table.parentNode.elements.length > 4) {
                try {
                    if(inputValue && existValueField){ 
                        this.showPopUp(trField, inputValue)
                    }else if(inputValue && !existValueField){
                        await this.api.deleteField(this.collectionSelected, inputValue)
                        trField?.remove();
                        this.messaging.msg("Campo excluido com sucesso.", true)
                    }else{
                        return trField.remove()
                    }
                } catch (error) {
                    console.log(error);
                    this.messaging.msg('Ocorreu um erro inesperado ao excluir seu campo.')
                }
            } else {
                return this.messaging.msg('É necessário ter pelo menos um campo', false)
            }

        };
        deleteButton.addEventListener('click', (e) => handleClickDeleteButton(e))

        tdName.appendChild(nameInput);
        tdType.appendChild(typeSelect);
        tdRequired.appendChild(divSwitch);
        tdBtnDelete.appendChild(deleteButton)

        trField.appendChild(tdName);
        trField.appendChild(tdType);
        trField.appendChild(tdRequired)
        trField.appendChild(tdBtnDelete)

        const table = document.querySelector(".table");
        const tbody = document.querySelector('#tbody')
        tbody.appendChild(trField)
        table.appendChild(tbody)
    }

    showPopUp(trField, fieldName){
        const containerModal = document.createElement('div')
        containerModal.innerHTML = `
            <div class="popupConfirmation alert alert-secondary alert-dismissible position-fixed" role="alert">
                <h4>Tem certeza que deseja <strong>excluir</strong> o campo <strong>"${fieldName}"</strong></h4>
                <p>Lembre-se de que os dados que esse campo contém serão apagados completamente.</p>
                <form id="formAlertConfirmation">
                    <div class="mb-3">
                        <label for="inputPopUpFields" id="" class="form-label">Digite o nome do campo a ser excluido: "${fieldName}"</label>
                        <input type="text" class="form-control" id="inputPopUpFields" aria-describedby="">
                    </div>
                    <button type="submit" id="btnConfirmationPopUpFields" class="btn btn-primary">Enviar</button>
                </form>
                <button type="button" id="btnClosePopUpFields" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
            </div>`   
            this.container.appendChild(containerModal)
            const btnClose = document.querySelector('#btnClosePopUpFields')
            const btnConfirmation = document.querySelector('#btnConfirmationPopUpFields')

            btnClose.addEventListener('click', (e) => {
                e.preventDefault()
                modal.remove()
            })
            btnConfirmation.addEventListener('click', async (e) => {
                e.preventDefault()
                const textToConfirmation = String(document.querySelector('#inputPopUpFields').value)

                if(textToConfirmation === fieldName){
                    await this.api.deleteField(this.collectionSelected, fieldName)
                    this.messaging.msg("Campo excluido com sucesso.", true)
                    containerModal.remove()
                    trField.remove()
                    //this.fields(this.collectionSelected)
                    return
                }

                this.messaging.msg("Digite o nome do campo correto para que ele seje excluído.", false)
            })
    }

    async createFields(e) {
        try{
            e.preventDefault()
            const form = document.querySelector('#form');

            if (form.elements.length < 4) {
                return this.messaging.msg('É necessário ter pelo menos um campo', false)
            }

            const collectionName = document.querySelector('#selectTableName').value
            const rowsOfForm = document.querySelector('#tbody').children
            let dados = {};
            for (let i = 0; i < rowsOfForm.length; i++) {
                const elementOfRowForm = rowsOfForm[i]

                const validationCheckbox = elementOfRowForm.querySelector('#isRequired');
                const inputValue = elementOfRowForm.querySelector('input[type="text"]').value
                const valueSelectOfTypes = elementOfRowForm.querySelector('select').value
                const method = elementOfRowForm.querySelector('input[type="text"]').id
                
                if(!inputValue || !valueSelectOfTypes ){
                    if(inputValue && !valueSelectOfTypes){
                        return this.messaging.msg(`O campo de nome "${inputValue}" deve especificar um tipo!`)
                    }
                    else{
                        return this.messaging.msg(`O ${i+1}º campo Não foi preenchido corretamente!`)
                    }
                }

                 // Verifica se a caixa de seleção está marcada e se o campo está vazio
                if (validationCheckbox.checked && inputValue.trim() === '') {
                    return this.messaging.msg(`O campo de nome ${inputValue} não pode estar vazio quando a validação está marcada!`);
                }

                dados[i] = {
                    name: inputValue,
                    type: valueSelectOfTypes,
                    method: method,
                    fieldName: this.currentValuesCollection?.fields[i]?.key,
                    fieldRequired: validationCheckbox.checked,
                }
            } 

            let formErrors = false

            for (let i in dados) {
                const field = dados[i]
                const {name, type, fieldName, fieldRequired, method} = field
                let response = {}
                if(method ===  'post'){
                    response = await this.api.postApiTemplate(name, type, collectionName, fieldRequired)
                }else if(method ===  'update'){
                    const newValues = {type: type, description: ''}
                    response = await this.api.updateApiTemplate(
                        collectionName,
                        fieldName,
                        name,
                        fieldRequired,
                        newValues
                    )
                }else{  
                    return this.messaging.msg("Não foi possível completar sua modificação😢")
                }
                
                if (!response || response.status !== 200) {
                    formErrors = true
                    const data = await response.json()
                    if (data.errors) {
                        this.messaging.msg(`Campo ${name}: ${data.errors}`, false)
                    }else{
                        this.messaging.msg(`Falha ao criar o campo ${name}`, false)
                    }
                    continue
                }

                this.messaging.msg(`O campo ${name} foi Criado/Alterado com sucesso`, true)
                
            }
            if(!formErrors) {
                return this.presetController.preset()
            }

            await this.loadFields(collectionName)
        }catch(error){
            this.messaging.msg(error.message, false)
        }
    }
}