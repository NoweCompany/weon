export default class Trash {
    constructor(container, messaging, api){
        this.container = container;
        this.messaging = messaging;
        this.api = api;
    }

    async renderTrashItems() {
        try {
            const trashItems = await this.api.getIndexItemsInTrash();
            this.container.innerHTML = '';

            const title = document.createElement('h3');
            title.textContent = 'Lixeira';
            this.container.appendChild(title);

            trashItems.forEach(collection => {
                const btnGroupDiv = document.createElement('div');
                btnGroupDiv.className = 'btn-group';
                
                const dropdownButton = document.createElement('button');
                dropdownButton.type = 'button';
                dropdownButton.className = 'btn btn-secondary dropdown-toggle';
                dropdownButton.setAttribute('data-bs-toggle', 'dropdown');
                dropdownButton.setAttribute('data-bs-display', 'static');
                dropdownButton.textContent = collection.collectionName;

                const dropdownMenu = document.createElement('ul');
                dropdownMenu.className = 'dropdown-menu dropdown-menu-lg-end';

                collection.values.forEach(documents => {
                    const li = document.createElement('li');
                    li.className = 'd-flex align-items-center';

                    const labelDocument = document.createElement('label');
                    labelDocument.className = 'dropdown-item';
                    labelDocument.type = 'button';
                    const valueLabel = Object.entries(documents).slice(1).map(entry => {
                        const key = `<strong>${entry[0]}</strong>`
                        const value = `<p>${entry[1]}</p>`

                        return key + value
                    }).join(' ');
                    labelDocument.innerHTML = valueLabel
                    
                    const restoreButton = document.createElement('button');
                    restoreButton.className = 'btn btn-info ms-2 h-100';
                    restoreButton.textContent = 'Restaurar';
                    restoreButton.addEventListener('click',
                        () => this.restoreItem(documents._id, collection.collectionName, li)
                    );

                    const deletePermanentButton = document.createElement('button');
                    deletePermanentButton.className = 'btn btn-warning ms-2 h-100';
                    deletePermanentButton.textContent = 'Deletear';
                    deletePermanentButton.addEventListener('click', 
                        () => this.deletePermanent(documents._id, collection.collectionName, li)
                    );


                    li.appendChild(labelDocument);
                    li.appendChild(restoreButton);
                    li.appendChild(deletePermanentButton);
                    dropdownMenu.appendChild(li);
                });

                btnGroupDiv.appendChild(dropdownButton);
                btnGroupDiv.appendChild(dropdownMenu);
                this.container.appendChild(btnGroupDiv);
            });
        } catch (error) {
            console.error('Erro ao renderizar os itens da lixeira:', error);
        }
    }

    async restoreItem(itemId, collectionName, li) {
        try {
            await this.api.restoreItem(itemId, collectionName)
            li.remove()
            this.messaging.msg('Documento restaurado com sucesso!', true)
        } catch (error) {
            this.messaging.msg('Ocorreu um erro ao restaurado o documento :(, tente novamente mais tarde.', false)
        }
    }

    async deletePermanent(itemId, collectionName, li) {
        try {
            await this.api.deletePermanent(itemId, collectionName)
            li.remove()
            this.messaging.msg('Documento deletado permanentemente!', true)
        } catch (error) {
            this.messaging.msg('Ocorreu um erro ao deletar o documento :(, tente novamente mais tarde.', false)
        }
    }
    
    trash() {
        this.renderTrashItems();
    }
}
