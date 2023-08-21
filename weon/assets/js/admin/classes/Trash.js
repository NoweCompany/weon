export default class Trashs{
  async renderTrashItems() {
      const trashItems = await super.getItemsInTrash('teste')
      console.log(trashItems)

      // Limpar o container antes de renderizar os itens
      container.innerHTML = '';

      // Renderizar os itens da lixeira
      trashItems.forEach(value => {
          for (const key in value) {
              const element = value[key]
              console.log(element)
              const itemElement = document.createElement('div');
              itemElement.innerHTML += element 

              container.appendChild(itemElement);
          }
      })
  }

  // Chamar este método para exibir os itens da lixeira
  trash() {
      this.renderTrashItems();
  }

  async getItemsInTrash(collectionName) {
    const headers = new Headers({
        "Content-Type": "application/json",
        "authorization": `Bearer ${this.token()}`
    });

    try {
        const response = await fetch(`${url}/trash/${collectionName}`, {
            headers: headers
        });

        if (response.status !== 200) {
            const data = await response.json();
            throw new Error(data.errors);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        throw new Error("Erro ao obter itens da lixeira: " + error.message);
    }
}
}