export default class DashboardRequests{
  constructor(apiUrl, token, loading){
    this.apiUrl = apiUrl
    this.token = token.getAndSetToken()
    this.loading = loading
  } 

  async getApiDashBoards() {
    try {
        this.loading.addLoading()
        const headers = new Headers({
            "Content-Type": "application/json",
            "authorization": `Bearer ${this.token}`
        });

        const response = await fetch(`${this.apiUrl}/dashboard`, {
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

  async postChart(dashboardName, tittleChart, prestNameChart, textField, numberField, typeChart) {
    this.loading.addLoading()
    const headers = new Headers({
        "Content-Type": "application/json",
        "authorization": `Bearer ${this.token}`
    });

    try {
      const myBody = JSON.stringify( {
        dashboardName,
        name: tittleChart,
        preset: prestNameChart,
        textField: textField,
        numberField: numberField,
        typeChart: typeChart
      })

      const response = await fetch(`${this.apiUrl}/chart`, {
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

  async postKpi(dashboardName, tittleChart, prestNameChart, numberField, typeKpi) {
    this.loading.addLoading()
    const headers = new Headers({
        "Content-Type": "application/json",
        "authorization": `Bearer ${this.token}`
    });

    try {
      const myBody = JSON.stringify( {
        dashboardName: dashboardName,
        name: tittleChart,
        preset: prestNameChart,
        numberField: numberField,
        typekpi: typeKpi
      })
      
      const response = await fetch(`${this.apiUrl}/kpi`, {
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
      console.log(error);
      this.loading.removeLoading()
      throw new Error("Erro ao criar dashboard: " + error.message);
    }
  }

  async showetDashboard(dashboardName) {
    try {
        this.loading.addLoading()
        const response = await fetch(`${this.apiUrl}/dashboard/${dashboardName}`, {
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