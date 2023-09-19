export default class DashboardRequests{
  constructor(apiUrl, token, loading){
    this.apiUrl = apiUrl
    this.token = token.getAndSetToken()
    this.loading = loading
  } 

  async indexDashboards() {
    this.loading.addLoading()
    const headers = new Headers({
        "Content-Type": "application/json",
        "authorization": `Bearer ${this.token}`
    });

    try {
        const response = await fetch(`${this.apiUrl}/dashboard`, {
            headers: headers
        });

        if (response.status !== 200) {
            const data = await response.json();
            throw new Error(data.errors);
        }

        const data = await response.json();
        this.loading.removeLoading()
        return data;
    } catch (error) {
        this.loading.removeLoading()
        throw new Error("Erro ao obter itens da lixeira: " + error.message);
    }
  } 

  async getVeluesApi(tableName) {
    try {
        this.loading.addLoading()
        const response = await fetch(`${this.apiUrl}/value/${tableName}`, {
            headers: {
                "Content-Type": "application/json",
                "authorization": `Bearer ${this.token}`
            }
        });

        const data = await response.json();

        if(response.status !== 200) throw new Error(data.errors)
        
        this.loading.removeLoading()
        return data;
    } catch (error) {
        this.loading.removeLoading()
        throw new Error(e.message || 'Ocorreu um erro inesperado')
    }
  }
}