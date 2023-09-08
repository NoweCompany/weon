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
            const optionNamePreset = document.querySelector(`#${namePreset}`)
            optionNamePreset.selected = true
        }else{
            const select =  document.querySelector("#selectTableName")
            
            select.children[1].selected = true
            this.loadFields(select.children[1].value)
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
        this.dataCollection.forEach(collection => {
            if(collection.collectionName === collectionSelected){
                this.currentValuesCollection = {collectionName: collection.collectionName, fields: collection.fields}
                if(collection.fields.length <= 0){
                    this.createNewField()
                }else{
                    collection.fields.forEach(field => {    
                        this.createNewField(field.key, field.type, field.required)
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

            case 'int':
                return 'Número Inteiros'
            
            case 'bool':
                return 'Caixa de seleção'

            default:
                return type
        }
    }

    events() {
        this.container.addEventListener('click', async e => {
        let id = e.target.getAttribute('id')
            
        switch (id) {
            case 'createField':
                await this.createFields();
            break;
    
            case 'newField':
                this.createNewField();
            break;
            default:
                return
        }
        })
    }

    handleSelectTableName(){
        const select =  document.querySelector("#selectTableName")
        select.addEventListener('change', (e) => {
            const el = e.target
            const value = el.value
            if(value){
                this.loadFields(value)
            }
        })
    }

    renderFields() {
        this.container.innerHTML = `
        <div class="d-flex justify-content-center align-items-center mb-5">
            <div class="border border-horizontal p-5 d-flex justify-content-between align-items-center">
                <div class="titulo">
                    <h1 id="tituloPrincipal" class="display-6">Campos</h1>
                </div>
                <div class="d-flex align-items-center">
                    <div class="form-group me-3">
                        <select id="selectTableName" class="form-select">
                            <option value="" selected></option>
                        </select>
                    </div>
                    <div class="newfield me-3">
                        <button id="newField" class="btn btn-outline-primary">Criar Campo</button>
                    </div>
                    <div class="botãocreate">
                        <button id="createField" class="btn btn-outline-success">Salvar</button>
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
            option.setAttribute('id', key.collectionName)
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

    createNewField(inputValue = '', type = '', isRequired = false) {
        // Criação do container principal
        const trField = document.createElement("tr");
        trField.className = "create-field";
        
        // Criação do elemento para o nome com classe Bootstrap
        const tdName = document.createElement("td");
        tdName.className = "mb-4";
    
        
        const nameInput = document.createElement("input");
        nameInput.setAttribute("type", "text");
        
        if (inputValue) {
            nameInput.setAttribute('value', inputValue);
            nameInput.classList.add("update", "form-control"); 
        } else {
            nameInput.classList.add("post", "form-control"); 
        }
        
        
        // Criação do elemento para o tipo com classe Bootstrap
        const tdType = document.createElement("td");
        tdType.className = "mb-4";
        
        const typeSelect = document.createElement("select");
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

        // Criação da caixa de seleção (checkbox) e rótulo
        const tdRequired = document.createElement("td");
        tdRequired.className = "mb-4";

        const isRequiredCheckbox = document.createElement("input");
        isRequiredCheckbox.setAttribute("type", "checkbox");
        isRequiredCheckbox.className = "form-check-input"; // Classe para a caixa de seleção Bootstrap
        isRequiredCheckbox.setAttribute("id", "isRequired");
        if (isRequired) {
            isRequiredCheckbox.checked = true;
        }

        const typeOptionBoolean = document.createElement("option");
        typeOptionBoolean.setAttribute("value", "bool");
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

        const tdBtnDelete = document.createElement("td");
        tdBtnDelete.className = "mb-4";
        const deleteButton = document.createElement("button");
        deleteButton.className = "btn btn-outline-danger";
        deleteButton.setAttribute("id", "deleteButton"); 
        deleteButton.innerHTML = '<i class="fa-solid fa-x"></i>';

        
    
        
        deleteButton.onclick = (e) => {
            e.preventDefault()
            if (form.elements.length > 3) {
                return trField.remove()
            } else {
                return this.messaging.msg('É necessário ter pelo menos um campo', false)
            }

        };

        tdName.appendChild(nameInput);
        tdType.appendChild(typeSelect);
        tdRequired.appendChild(isRequiredCheckbox)
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

    async createFields() {
        try{
            const form = document.querySelector('#form');

            if (form.elements.length < 3) {
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
                const method = elementOfRowForm.querySelector('input[type="text"]').className
                
                if(!inputValue || !valueSelectOfTypes ){
                    if(inputValue && !valueSelectOfTypes){
                        return this.messaging.msg(`O campo de nome ${inputValue} precisa especificar um tipo !`)
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
            if(!formErrors) setTimeout(() => {
                return this.presetController.preset()
            }, 1000)

            await this.loadFields(collectionName)
        }catch(error){
            this.messaging.msg(error.message, false)
        }
    }
}