export default class ApiRequests {
    constructor(apiUrl, token, loading){
        this.apiUrl = apiUrl
        this.token = token.getAndSetToken()
        this.loading = loading
    }

    async getShowItemsInTrash(collectionName) {
        const headers = new Headers({
            "Content-Type": "application/json",
            "authorization": `Bearer ${this.token}`
        });

        try {
            const response = await fetch(`${this.apiUrl}/trash/${collectionName}`, {
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

    async getIndexItemsInTrash() {
        const headers = new Headers({
            "Content-Type": "application/json",
            "authorization": `Bearer ${this.token}`
        });
        this.loading.addLoading()
        try {
            const response = await fetch(`${this.apiUrl}/trash`, {
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
        }finally{
            this.loading.removeLoading()
        }
    }

    async getApiCollections() {
        try {
            this.loading.addLoading()
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

            this.loading.removeLoading()
            return data
        } catch (e) {
            this.loading.removeLoading()
            throw new Error(e.message || 'Ocorreu um erro inesperado')
        }

    }

    async deletePreset(collectionName) {
        try {
            this.loading.addLoading()
            const headers = new Headers({
                "Content-Type": "application/json",
                "authorization": `Bearer ${this.token}`
            })
        
            const response = await fetch(`${this.apiUrl}/collection`, {
                method: 'DELETE',
                headers: headers,
        
        
                body: JSON.stringify({ collectionName: collectionName })
            })

            const data = await response.json()
            if(response.status !== 200) throw new Error(data.errors)

            this.loading.removeLoading()
            return data
        } catch (error) {
            this.loading.removeLoading()
            throw new Error(error.message || 'Ocorreu um erro inesperado')
        }
    }

    async getApiPresets() {
        try {
                this.loading.addLoading()
                const headers = new Headers({
                    "Content-Type": "application/json",
                    "authorization": `Bearer ${this.token}`
                })
                
                const response = await fetch(`${this.apiUrl}/collection`, {
                    headers: headers
                })
                
                const data = await response.json()
                
                if(response.status !== 200) throw new Error(data.errors)

                this.loading.removeLoading()
                return data
        } catch (e) {
                console.log(e);
                this.loading.removeLoading()
                throw new Error(e.message || 'Ocorreu um erro inesperado')
        }
    }

    async postApiPreset(namePreset) {
        try {
                this.loading.addLoading()
                namePreset = namePreset.trim()
                const myBody = JSON.stringify({ collectionName: namePreset })

                const headers = new Headers({
                    "Content-Type": "application/json",
                    "authorization": `Bearer ${this.token}`
                })

                const response = await fetch(`${this.apiUrl}/collection`, {
                    method: 'POST',

                    headers: headers,

                    body: myBody
                })
                const data = await response.json()
                if(response.status !== 200) throw new Error(data.errors)

                this.loading.removeLoading()
                return data
        } catch (e) {
                this.loading.removeLoading()
                throw new Error(e.message || "Algo deu errado tente novamente mais tarde 😢")
        }
    }
  
    async postApiTemplate(name, type, collectionName) {
            try {
                this.loading.addLoading()
                const headers = new Headers({
                    "Content-Type": "application/json",
                    "authorization": `Bearer ${this.token}`
                })

                const myBody = JSON.stringify({
                    collectionName: collectionName,
                    fieldName: name,
                    options: {
                        type: type,
                        description: "",
                        required: true
                    }
                })
                const response = await fetch(`${this.apiUrl}/field`, {
                    method: 'POST',

                    headers: headers,

                    body: myBody
                })

                this.loading.removeLoading()
                return response
            } catch (e) {
                this.loading.removeLoading()
                throw new Error(e.message || "Algo deu errado tente novamente mais tarde 😢")
            }
    }

    async getApiCollection(){
        try{
            this.loading.addLoading()
            const headers = new Headers({
                "Content-Type": "application/json",
                "authorization": `Bearer ${this.token}`
            })
    
            const response = await fetch(`${this.apiUrl}/collection`, {
                method: 'GET',
                headers: headers
            })
    
            const data = await response.json()
            if (response.status !== 200) throw new Error(data.errors)
    
            this.loading.removeLoading()
            return data
        }catch(error){
            this.loading.removeLoading()
            throw new Error(e.message || "Algo deu errado tente novamente mais tarde 😢")
        }
    }
}
