export default class ApiRequests {
  constructor(apiUrl, token, loading){
    this.apiUrl = apiUrl
    this.token = token.getAndSetToken()
    this.loading = loading
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
}
