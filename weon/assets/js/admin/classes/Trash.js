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
                    li.className = 'd-flex';

                    const actionButton = document.createElement('button');
                    actionButton.className = 'dropdown-item';
                    actionButton.type = 'button';
                    actionButton.textContent = Object.entries(documents).slice(2).map(entry => entry.join(' ')).join(' ');

                    
                    const restoreButton = document.createElement('button');
                    restoreButton.className = 'btn btn-info ms-2';
                    restoreButton.textContent = 'Restaurar';
                    restoreButton.id = documents._id;
                    
                    restoreButton.addEventListener('click', () => this.restoreItem(documents._id, collection.collectionName));


                    li.appendChild(actionButton);
                    li.appendChild(restoreButton);
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
 
    async restoreItem(itemId, collectionName) {
        await this.api.restoreItem(itemId, collectionName)
        console.log(`Restaurando item com ID: ${itemId}`);
    }
    
    trash() {
        this.renderTrashItems();
    }
}
