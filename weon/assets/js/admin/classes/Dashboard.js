import configs from '../../modules/configs.js'

export default class Dashboard {
  constructor(container, messaging, requests){
    this.messaging = messaging
    this.api = requests
    this.container = container
  }

  async dashboard(){
    const { table, thead, tbody, btnCreatePreset } = this.rederTable()
    await this.creteTablePresets(thead, tbody)

    this.addEvent(btnCreatePreset)
  }
  
  addEvent(btnCreatePreset){
    btnCreatePreset.addEventListener('click', () => {
      this.renderForm()
    })
  }

  async creteTablePresets(thead, tbody) {
    try {
      const data = await this.api.getApiDashBoards()
      
      for (const dash of data) {
        const tr = document.createElement('tr')

        const td = document.createElement('td')
        td.innerText = dash.name.replace('dashboard_', '').split('_').join(' ')

        tr.appendChild(td)
        tbody.appendChild(tr)
      }
      
    } catch (error) {
        const msgError = error.message
        this.messaging.msg(msgError || 'Algo deu errado tente novamente mais tarde 😢', false)
    }
  }

  rederTable() {
    this.container.innerHTML = `
    <div class="d-flex justify-content-center align-items-center mb-5">
      <div class="border border-horizontal p-5 d-flex justify-content-between align-items-center">
          <div class="titulo">
              <h1 id="tituloPrincipal" class="display-6">Dashboard</h1>
          </div>
              <div class="newfield me-3">
                  <button id="createPreset" class="btn btn-outline-primary">Adicionar</button>
              </div> 
          </div>
      </div>
    </div>
    <div class="table-container">
      <table id="table-dash">
        <thead id="thead-dash">
          <th>Nome do dashboard</th>
        </thead>
        <tbody id="tbody-dash"></tbody>
      </table>
      </div>
    `
    const table = document.querySelector('#table-dash')
    const thead = document.querySelector('#thead-dash')
    const tbody = document.querySelector('#tbody-dash')
    const btnCreatePreset = document.querySelector('#createPreset')
    return {table, thead, tbody, btnCreatePreset}
  }
  
  renderForm() {
    this.container.innerHTML = `
    <div class="container">
      <form id="formDashboard" class="p-5 rounded rounded-10 popreset mx-auto mt-5 text-center">
          <h1 class="text-center mb-4">Dê um nome ao seu dashboard </h1>
          <div class="form-group">
            <input id="dashboardName" type="text" class="form-control" id="name" placeholder="nome do dashboard">
          </div>
      </form>
    </div>

    <div class="d-flex justify-content-center align-items-center mb-5">
      <div class="border border-horizontal p-5 d-flex justify-content-between align-items-center">
        <div class="ml-auto">
          <h1 class="mb-0 display-6"> Crie seu Dashboard</h1>
        </div>
        <div> 
          <button id="cancelDashboardForm" form="formDashboard" class="btn btn-outline-danger btn-sm-4">Voltar</button>
          <button id="createDashboardForm" form="formDashboard" class="btn btn-outline-primary sm-4 ms-2">Salvar</button>
        </div>
      </div>
    </div>`

    const nameDashboard = document.querySelector('#dashboardName')
    
    const formDashboard = document.querySelector('#formDashboard')
    formDashboard.addEventListener('submit', async e => await this.createDashboard(e, nameDashboard.value))
    
    const cancelDashboardForm = document.querySelector('#cancelDashboardForm')
    cancelDashboardForm.addEventListener('click', () => this.dashboard())
  }

  async createDashboard(e, nameDashboard){
    e.preventDefault()
    
    try {
      if(!nameDashboard) this.messaging.msg('Defina um nome vlido para seu Dashboard', false)

      await this.api.postApiDashboard(nameDashboard)

      this.messaging.msg('Dashboard criado com sucesso', true)
      window.location.assign(`${configs.urlWebsiteRelativa()}/dashboard.html?dashboardCreation=true&dashboardName=${nameDashboard}`)
      return
    } catch (error) {
      this.messaging.msg('Error', false)
    }
  }
}