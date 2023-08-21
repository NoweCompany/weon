export default class Fields{
    constructor(container, messaging, requests, preset){
        this.messaging = messaging
        this.api = requests
        this.container = container

        this.preset = preset
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
       this.container.addEventListener('click', e => {
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
        this.container.innerHTML = `
        <div class="titulo">
        <h1 id="tituloPrincipal" class="display-6">Campos</h1>
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
            


            <!-- bloco   form-->  
            

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
        const data = await this.api.getApiCollection()
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


        const deleteButton = document.createElement("button");
        deleteButton.className = "btn-delete"; // Usando a classe personalizada para estilização
        deleteButton.setAttribute("id", "deleteButton"); // Adicione o id desejado, por exemplo, "deleteButton";
        deleteButton.innerHTML = '<i class="fas fa-trash"></i>';
        
    
        
        deleteButton.onclick = (e) => {
            e.preventDefault()
            if (form.elements.length > 3) {
                return containerDiv.remove()
            } else {
                return this.messaging.msg('É necessário ter pelo menos um campo', false)
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
            return this.messaging.msg('É necessário ter pelo menos um campo', false)
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
                    return this.messaging.msg('Campos Inválidos', false)
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
            response = await this.api.postApiTemplate(name, type, collectionName)
        }

        if (!response || response.status !== 200) {
            const data = await response.json()
            if (data.errors) return this.messaging.msg(data.errors, false)

            return this.messaging.msg("Falha ao cria campos", false)
        }

        this.messaging.msg("Campos criados com sucesso", true)
        setTimeout(() => {
            this.preset.preset()
        }, 300)
    }
}