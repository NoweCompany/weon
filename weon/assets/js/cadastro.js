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




class Drive {
    constructor(containerMsg, container, requests, sideBar) {
        this.container = container;
        this.containerMsg = containerMsg;
        this.sideBar = sideBar;

        this.itemsPerPage = 10;
        this.currentPage = 1;
        this.totalPages = Infinity;

        this.requests = requests;

        this.collectionData = [];
        this.isEdit = false;
        this.valuesPreset = {};

        this.presetSelected = null;   
    }

    async init(inicialization = false) {
        if (inicialization) {
            await this.addOptions();
        }
    }

    calculateTotalPages(totalItems) {
        this.totalPages = Math.ceil(totalItems / this.itemsPerPage);
    }

    createPaginationButtons() {
        const paginationContainer = document.querySelector('#paginationContainer');
        if (!paginationContainer) {
            return;
        }
    
        paginationContainer.innerHTML = ''; 
    
        const maxPageButtons = 5;
        const middlePage = Math.floor(maxPageButtons / 2);
    
        let startPage = Math.max(this.currentPage - middlePage, 1);
        let endPage = Math.min(this.currentPage + middlePage, this.totalPages);
    
        if (this.currentPage <= middlePage) {
            endPage = maxPageButtons;
        } else if (this.totalPages - this.currentPage < middlePage) {
            startPage = this.totalPages - maxPageButtons + 1;
        }
    
        if (this.totalPages <= maxPageButtons) {
            startPage = 1;
            endPage = this.totalPages;
        }
    
        const prevButton = document.createElement('button');
        prevButton.innerText = 'Anterior';
        prevButton.classList.add('btn', 'btn-outline-secondary', 'm-1');
        prevButton.disabled = this.currentPage === 1;
    
        prevButton.addEventListener('click', () => {
            if (this.currentPage > 1) {
                this.currentPage--;
                this.showDocument(this.presetSelected);
                updatePageButtons();
            }
        });

        paginationContainer.appendChild(prevButton);

        for (let i = startPage; i <= endPage; i++) {
            const pageButton = document.createElement('button');
            pageButton.innerText = i;
            pageButton.classList.add('btn', 'btn-outline-secondary', 'm-1', 'page-button');

            if (i === this.currentPage) {
                pageButton.classList.remove('btn-outline-secondary');
                pageButton.classList.add('btn-primary');
            }

  
            pageButton.addEventListener('click', () => {
                this.currentPage = i;
                this.showDocument(this.presetSelected);
                updatePageButtons();
            });

            paginationContainer.appendChild(pageButton);
        }

        const nextButton = document.createElement('button');
        nextButton.innerText = 'Próximo';
        nextButton.classList.add('btn', 'btn-outline-secondary', 'm-1');
        nextButton.disabled = this.currentPage === this.totalPages; 

        nextButton.addEventListener('click', () => {
            if (this.currentPage < this.totalPages) {
                this.currentPage++;
                this.showDocument(this.presetSelected);
                updatePageButtons();
            }
        });

        paginationContainer.appendChild(nextButton);

    
        const updatePageButtons = () => {
            const pageButtons = document.querySelectorAll('.page-button');
            pageButtons.forEach(button => {
                button.classList.remove('btn-primary'); 
                if (parseInt(button.innerText) === this.currentPage) {
                    button.classList.add('btn-primary'); 
                }
            });

            prevButton.disabled = this.currentPage === 1;
            nextButton.disabled = this.currentPage === this.totalPages;

           
            if (this.paginationVisible) {
                paginationContainer.style.display = 'block';
            } else {
                paginationContainer.style.display = 'none';
            }
        };

        const addButton = document.querySelector('#btnCad');
        const backButton = document.querySelector('#back');

        if (addButton) {
            addButton.addEventListener('click', () => {
                this.togglePaginationVisibility(false); 
            });
        }

       if (backButton) {
            backButton.addEventListener('click', () => {
                this.togglePaginationVisibility(true); 
            });
        }
    }

    togglePaginationVisibility(visible) {
        this.paginationVisible = visible;
        const paginationContainer = document.querySelector('#paginationContainer');
        if (paginationContainer) {
            paginationContainer.style.display = visible ? 'block' : 'none';
        }
    }
    showItems(items, container) {
        container.classList.remove('hidden');

        container.innerHTML = '';

        if (items.length === 0) {
            const noItemsMessage = document.createElement('p');
            noItemsMessage.textContent = 'Nenhum item encontrado.';
            container.appendChild(noItemsMessage);
        } else {
            for (const key of items) {
                const btn = document.createElement('button');
                btn.setAttribute('value', key.collectionName);
                const textbtn = document.createTextNode(key.collectionName);
                btn.className = 'modal-button';

                btn.appendChild(textbtn);
                container.appendChild(btn);

                btn.addEventListener('click', (e) => this.showDocument(e.target.value));
            }
        }
    }

    async showDocument(collectionName = this.presetSelected) {
        try {
            this.presetSelected = collectionName;
            
            const fieldsCollection = await this.requests.getApiFields(this.presetSelected);
            const valuesCollection = await this.requests.getVeluesApi(this.presetSelected);
    
            if (fieldsCollection.fields.length <= 0) {
                this.container.innerHTML = `
                    <div class="alert alert-warning w-50 mx-auto role="alert">
                        <h4 class="galert-headin">Aviso</h4>
                        <p>Não há nenhum campo criado para essa predefinição</p>
                        <hr>
                        <p class="mb-0">Crie seus campos em <a class="alert-link" href="/weon/pages/admin.html"> administração </a> </p>
                    </div>
                `;
                return;
            }
    
            // Calcular o número total de páginas com base nos valores recuperados
            this.calculateTotalPages(valuesCollection.length);
    
            const { form, btnCad, thead, tbody, btnDownload, btnDownloadDefault, btnUpload, btnDelet } = this.renderTableHtml(collectionName);
        
            document.querySelector('#paginationContainer').style.display = 'block'
            const childresOfTBody = tbody.children;

            btnDelet.addEventListener('click', async (e) => {
                try {
                    const checkboxes = document.querySelectorAll('.checkBoxDelet');
                    for (const checkbox of checkboxes) {
                        if (checkbox.checked) {
                            const response = await requests.deleteApiValues(this.presetSelected, checkbox.id);
                            this.msg(response.success, true);
                            checkbox.parentNode.remove();
                        }
                    }
                } catch (error) {
                    this.msg(error.message || 'Ocorreu um erro inesperado 😢', false);
                }
            });
    
            btnDownload.addEventListener('click', async (e) => {
                try {
                    const response = await this.requests.download(collectionName);
                    const data = await response.json();
                    if (response.status !== 200) {
                        return this.msg(data.errors, false);
                    }
    
                    window.location.assign(data.url);
                } catch (error) {
                    return this.msg('Ocorreu um erro inesperado 😢', false);
                }
            });
            
            btnDownloadDefault.addEventListener('click', async (e) => {
                try {
                    const response = await this.requests.downloadDefaultSheet(collectionName);
                    const data = await response.json();
                    if (response.status !== 200) {
                        return this.msg(data.errors, false);
                    }
    
                    window.location.assign(data.url);
                } catch (error) {
                    console.log(error);
                    return this.msg('Ocorreu um erro inesperado 😢', false);
                }
            });

            btnUpload.addEventListener('click', (e) => {
                const { form, inputFile, back,} = this.renderFormUpload()

                back.addEventListener('click', (e) => this.showDocument())

                form.addEventListener('submit', async (e) => {
                    e.preventDefault()

                    const file = inputFile.files[0]
                    const formData = new FormData()
                    formData.append('file', file)
                    formData.append('collectionName', this.presetSelected)

                    try {
                        console.log(file, this.presetSelected);
                        const response = await this.requests.upload(formData);
                        const data = await response.json();
                        if (response.status !== 200) {
                            return this.msg(data.errors, false);
                        }
        
                        this.showDocument()
                    } catch (error) {
                        console.log(error);
                        return this.msg('Ocorreu um erro inesperado 😢', false);
                    }
                })
            })
    
            // Paginação
            const startIndex = (this.currentPage - 1) * this.itemsPerPage;
            const endIndex = startIndex + this.itemsPerPage;
            const valuesToShow = valuesCollection.slice(startIndex, endIndex);
    
            this.buildTable(thead, tbody, fieldsCollection, valuesToShow);
    
            // Criar os botões de paginação
            this.createPaginationButtons();
        } catch (error) {
            this.container.innerHTML = '';
            return this.msg(error.message || "Ocorreu um erro inesperado");
        }
    }

    renderFormUpload(){
        this.container.innerHTML = `
        <div class="d-flex justify-content-center align-items-center mb-5">
                <div class="border border-horizontal p-5 d-flex justify-content-between align-items-center">
                    <div class="ml-auto" >
                        <h1 class="mb-0">${this.presetSelected}</h1>
                    </div>
                    <div id="headerTable"> 
                        <button id="back" class="btn btn-outline-danger btn-sm-4">Voltar</button>
                        <button id="EnviarFormUpload" form="uploadForm" class="btn btn-outline-primary ms-2" type="submit">Enviar</button>
                    </div>
                </div>
            </div>
        <form id="uploadForm" enctype="multipart/form-data">
            <h1> Escolha um arquivo JSON ou XLSX:</h1>
            <input type="file" id="fileInput" name="file" accept=".json, .xlsx" required>
        </form>
        ` 

        const form = document.querySelector('#uploadForm');
        const back = document.querySelector('#back');
        const inputFile = document.querySelector('#fileInput');

        return {
            form,
            inputFile,
            back,
        };
    }

    renderTableHtml(presetSelected) {
        this.container.innerHTML = `
            <div class="d-flex justify-content-center align-items-center mb-5">
                <div class="border border-horizontal p-5 d-flex justify-content-between align-items-center">
                    <div class="ml-auto" >
                        <h1 class="mb-0">${presetSelected}</h1>
                    </div>


                    <div id="headerTable"> 
                    
                    <div class="dropdown">
                    <button class="dropdown-toggle" id="dropdownMenuButton">Arquivo</button>
                    <div class="dropdown-gaveta" aria-labelledby="dropdownMenuButton">
                      <a class="dropdown-a" id="btnUpload">Importar</a>
                      <a class="dropdown-a" id="btnDownload">Exportar</a>
                    </div>
                  </div>
                  
                        <button id="btnDelet" name="btnDelet" class="btn btn-outline-danger ms-2 disabled ">Deletar</button>
                        <button id="btnDownloadDefault" class="btn btn-outline-info ms-2"> <i class="fas fa-download"></i> Planilha padrão  </button>
                        <button id="btnCad" name="btnCad" class="btn btn-outline-primary sm-4 ms-2">Adicionar</button>
                    </div>
                </div>
            </div>
            <div class="container-center">  
                <table class="table table-striped">
                    <thead class="thead">
                    </thead>
                    <tbody class="tbody">
                    </tbody>
                </table>
            </div>
        `;
        const form = document.querySelector('#form')
        const btnCad = document.querySelector('#btnCad');
        const btnDownload = document.querySelector('#btnDownload');
        const btnDownloadDefault = document.querySelector('#btnDownloadDefault');
        const btnUpload = document.querySelector('#btnUpload');
        const btnDelet = document.querySelector('#btnDelet');
        const thead = document.querySelector('.thead');
        const tbody = document.querySelector('.tbody');
    
        btnCad.addEventListener('click', () => {
            this.showForm();
        });
    
        return { form, btnCad, thead, tbody, btnDownload, btnDownloadDefault, btnUpload, btnDelet };
    }
    
    
    renderFormHtml(presetSelected) {
        this.container.innerHTML = `
        <div class="d-flex justify-content-center align-items-center mb-5">
            <div class="border border-horizontal p-5 d-flex justify-content-between align-items-center">
                <div class="ml-auto">
                    <h1 class="mb-0">${presetSelected}</h1>
                </div>
                <div> 
                    <button id="back" name="btnCad" class="btn btn-outline-danger btn-sm-4">Voltar</button>
                    <button type="submit" form="form" class="btn btn-outline-primary sm-4 ms-2">Salvar</button>
                </div>
            </div>
        </div>
        <form id="form" class="formPreset"> </form>
        `

        const form = document.querySelector('#form')
        const btnBack = document.querySelector('#back')

        btnBack.addEventListener('click', () => {
            this.valuesPreset = {}
            this.isEdit = false
            this.showDocument(this.presetSelected)
        })

        return { form, btnBack }
    }

    buildTable(thead, tbody, fieldsCollection, valuesCollection) {
        thead.appendChild(document.createElement('th')).innerText = ''
        for (const field of fieldsCollection.fields) {
            const th = document.createElement('th');
            const textTh = document.createTextNode(field.key);
            th.appendChild(textTh);
            thead.appendChild(th);
        }

        const selectAllCheckbox = document.createElement('input');
        selectAllCheckbox.setAttribute('class', 'checkBox form-check-input form-check-input-lg d-flex m-0')
        selectAllCheckbox.setAttribute('type', 'checkbox');
        selectAllCheckbox.setAttribute('class', 'checkbox form-check-input form-check-input-lg d-flex')
        selectAllCheckbox.setAttribute('id', 'selectAllCheckbox'); // Adicione um ID
        selectAllCheckbox.addEventListener('click', () => {
            const checkboxes = document.querySelectorAll('.checkBoxDelet');
            checkboxes.forEach((checkbox) => {
                checkbox.checked = selectAllCheckbox.checked;
            });
        
            // Exiba o botão "Deletar Documentos" quando a checkbox geral estiver marcada
            const btnDelet = document.querySelector('#btnDelet');
            if (selectAllCheckbox.checked) {
                btnDelet.classList.remove('disabled'); // Remova a classe 'd-none' para exibir o botão
            } else {
                btnDelet.classList.add('disabled'); // Adicione a classe 'd-none' para ocultar o botão
            }
        });
        
        const selectAllTh = document.createElement('th');
        selectAllTh.appendChild(selectAllCheckbox);
        thead.children[0].insertBefore(selectAllTh, thead.children[0].firstChild);


        for (const field of valuesCollection) {
            const tr = document.createElement('tr');
        
            //checkbox
            const inputCheckBox = document.createElement('input') 
            inputCheckBox.setAttribute('type', 'checkbox')
            inputCheckBox.setAttribute('class', 'checkBoxDelet form-check-input form-check-input-lg d-flex ms-3 mt-2')
            tr.appendChild(inputCheckBox)
            inputCheckBox.addEventListener("click", () => {
                const btnDelet = document.querySelector('#btnDelet')
                const checkboxes = document.querySelectorAll('.checkBoxDelet')
                const containCheckBoxChecked = () => {
                    for(let checkbox of checkboxes){
                        if(checkbox.checked) return true
                    }
                    return false
                }
                if(btnDelet && containCheckBoxChecked()){
                    btnDelet.classList.remove('disabled')
                }else{
                    btnDelet.classList.add('disabled')
                }

            })
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
                        this.valuesPreset[idTd] = valueTd
                    })
                    this.valuesPreset._id = tr.getAttribute('id')
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
        document.querySelector('#paginationContainer').style.display = 'none'
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
                    this.isEdit = false
                }else{
                    
                    const response = await this.requests.updateApiValues(presetSelected, valuesForm, this.valuesPreset._id)
                    this.isEdit = false
                    this.valuesPreset = {}
                }
                this.msg('Atualização bem sucedida', true)
                for(const element of elements){
                    element.value = ''
                }
                return form
            } catch (error) {
                this.msg(error, false)
            }
        })

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
                
                if (typeInput !== 'checkbox') {
                    if(required){
                        input.setAttribute('required', true);
                    }
                }else{
                    input.className = 'form-check-input'
                }
    
                input.setAttribute('type', typeInput);

                if(type === 'int') input.setAttribute('step', '1')
                if(type === 'double') input.setAttribute('step', '0.1')
                if(this.isEdit && this.valuesPreset[key]){
                    const valuesOfField = this.valuesPreset[key]
                    
                    if(typeInput === 'checkbox'){
                        input.checked = valuesOfField === 'true'
                    }else{
                        input.value = valuesOfField
                    }
                }
                const label = document.createElement('label')
                label.setAttribute('for', key)
                label.innerText = key

                if (required) {
                    const asterisk = document.createElement('span');
                    asterisk.innerText = ' *';
                    asterisk.style.color = 'red'; 
                    label.appendChild(asterisk);
                }

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
            const response = await this.requests.getApiCollections();

            this.collectionData = response.response; // Salva os dados originais da tabela
            this.filteredData = [...this.collectionData]; // Inicialmente, os dados filtrados são os dados originais

            const sidebarContent = document.getElementById('sidebarContent');
            const searchInput = document.getElementById('searchInput');

            searchInput.addEventListener('input', () => {
                const searchTerm = searchInput.value.toLowerCase();
                this.filteredData = this.collectionData.filter((item) =>
                    item.collectionName.toLowerCase().includes(searchTerm)
                );
                this.showItems(this.filteredData, sidebarContent);
            });

            // Exibe todos os itens cadastrados inicialmente na barra lateral
            this.showItems(this.filteredData, sidebarContent);
        } catch (error) {
            this.msg(error.message, false);
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
        this.containerMsg.innerHTML = '';
        this.containerMsg.className = 'msg';
    }
}

class Requests{
    constructor(token, apiUrl, loading){
        this.token = token
        this.apiUrl = apiUrl
        this.loading = loading
    }
    async downloadDefaultSheet(collectionName){
        try {
            this.addLoading()
            const headers = new Headers({
                "Content-Type": "application/json",
                "authorization": `Bearer ${this.token}`
            })

            const response = await fetch(`${this.apiUrl}/download/${collectionName}`, {
                method: 'GET',

                headers: headers,
            })
            this.removeLoading()
            return response
        } catch (e) {
            this.removeLoading()
            throw new Error(e.message || "Algo deu errado tente novamente mais tarde 😢")
        }
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

    async download(collectionName){
        try {
            this.addLoading()
            const headers = new Headers({
                "Content-Type": "application/json",
                "authorization": `Bearer ${this.token}`
            })

            const response = await fetch(`${this.apiUrl}/download/${collectionName}`, {
                method: 'POST',

                headers: headers,
            })
            this.removeLoading()
            return response
        } catch (e) {
            this.removeLoading()
            throw new Error(e.message || "Algo deu errado tente novamente mais tarde 😢")
        }
    }

    async upload(formData){
        try {
            this.addLoading(formData)
            const headers = new Headers({
                "authorization": `Bearer ${this.token}`
            })

            const response = await fetch(`${this.apiUrl}/upload`, {
                method: 'POST',
                headers: headers,
                body: formData
            })
            this.removeLoading()
            return response
        } catch (e) {
            console.log(e);
            this.removeLoading()
            throw new Error(e.message || "Algo deu errado tente novamente mais tarde 😢")
        }
    }

    async updateApiValues(collectionName, values, id) {
        try {
            this.addLoading()
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
            this.removeLoading()
            throw new Error('Ocorreu um erro inesperado')
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
            this.removeLoading()
            throw new Error('Ocorreu um erro inesperado')
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
const container = document.querySelector('.container');
const loading = document.querySelector('.loading');
const sideBar = document.querySelector('.modal-body');
const token = () => {
    const token = document.cookie
        .split("; ")
        .find((row) => row.startsWith("token="))
        .split("=")[1];
    return token;
};

const requests = new Requests(token(), configs.urlApi, loading);
const drive = new Drive(containerMsg, container, requests, sideBar);

drive.init(true)