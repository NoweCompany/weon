export default class Trash{
    constructor(container, messaging, api){
        this.container = container
        this.messaging = messaging
        this.api = api
    }
    async renderTrashItems() {
        try {
            const trashItems = await this.api.getIndexItemsInTrash()
            console.log(trashItems);
            // Limpar o container antes de renderizar os itens
            this.container.innerHTML = 'Lixeira';

            // Renderizar os itens da lixeira
            trashItems.forEach(collection => {
                const label = document.createElement('div')
                const textLabel = document.createTextNode(collection.collectionName)
                console.log('collection')
                label.appendChild(textLabel)
                this.container.appendChild(label)
                collection.values.forEach((documents, index) => {
                    console.log(documents);
                })
            })
        } catch (error) {
            
        }
    }
    
    // Chamar este método para exibir os itens da lixeira
    trash() {
        this.renderTrashItems();
    }
}