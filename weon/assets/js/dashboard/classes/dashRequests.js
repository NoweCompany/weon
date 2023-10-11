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
        throw new Error("Erro ao listar DashBoards: " + error.message);
    }
  }

  async postDashboards(tittleChart, prestNameChart, textField, numberField, typeChart) {
    this.loading.addLoading()
    const headers = new Headers({
        "Content-Type": "application/json",
        "authorization": `Bearer ${this.token}`
    });

    try {
      const myBody = JSON.stringify( {
        name: tittleChart,
        preset: prestNameChart,
        textField: textField,
        numberField: numberField,
        typeChart: typeChart
      })

      const response = await fetch(`${this.apiUrl}/dashboard`, {
        method: 'POST',
        headers: headers,
        body: myBody
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
        throw new Error("Erro ao criar dashboard: " + error.message);
    }
  }
}