export default class Historic {
  constructor(container, messaging, requests) {
    this.messaging = messaging
    this.api = requests
    this.container = container
    this.valueHistoric = []
  }

  async historic() {
    const { table, thead, tbody, btnCreatePreset, filterForm } = this.rederTable()
    await this.setValueHistoric()
    this.loadRegister(tbody)
    this.setupFilterButton(filterForm, tbody)
  }

  rederTable() {
    this.container.innerHTML = `
      <div class="d-flex justify-content-center align-items-center mb-5">
        <div class="border border-horizontal p-5 d-flex justify-content-between align-items-center">
          <div class="titulo">
            <h1 id="tituloPrincipal" class="display-6">Histórico</h1>
          </div>
          <div>
            <form id="filter-form">
              <label for="email-filter">Filtrar por Email do Usuário:</label>
              <input type="text" id="email-filter" name="email-filter" />
              <label for="method-filter">Filtrar por Método:</label>
              <input type="text" id="method-filter" name="method-filter" />
              <button type="button" id="filter-button">Filtrar</button>
            </form>
          </div>
        </div>
      </div>
      <div class="table-container">
        <table id="table-historic">
          <thead id="thead-historic">
            <th>Operação</th>
            <th>E-mail usuário</th>
            <th>Rota do registro</th>
            <th>Data do registro</th>
          </thead>
          <tbody id="tbody-historic"></tbody>
        </table>
      </div>
    `
    const table = document.querySelector('#table-historic')
    const thead = document.querySelector('#thead-historic')
    const tbody = document.querySelector('#tbody-historic')
    const filterForm = document.querySelector('#filter-form')
    return { table, thead, tbody, filterForm }
  }

  setupFilterButton(filterForm, tbody) {
    const filterButton = filterForm.querySelector('#filter-button')
    filterButton.addEventListener('click', () => {
      const emailFilter = filterForm.querySelector('#email-filter').value
      const methodFilter = filterForm.querySelector('#method-filter').value
      const filteredHistoric = this.filterHistoric(emailFilter, methodFilter)

      tbody.innerHTML = ''
      this.loadRegister(tbody, filteredHistoric)
    })
  }

  filterHistoric(emailFilter, methodFilter) {
    return this.valueHistoric.filter((register) => {
      const userEmail = register.userEmail.toLowerCase()
      const method = register.method.toLowerCase()
      return userEmail.includes(emailFilter.toLowerCase()) && method.includes(methodFilter.toLowerCase())
    })
  }

  loadRegister(tbody, data) {
    const registers = data || this.valueHistoric

    if (registers.length <= 0) {
      throw new Error('"valueHistoric" não pode ser vazio')
    }

    for (const register of registers) {
      const tr = document.createElement('tr')

      const tdMethod = document.createElement('td')
      tdMethod.innerText = register.method

      const tdEmailUser = document.createElement('td')
      tdEmailUser.innerText = register.userEmail

      const tdRoute = document.createElement('td')
      tdRoute.innerText = register.route

      const tdDate = document.createElement('td')
      tdDate.innerText = new Date(register.currentDate).toLocaleString()

      const tdDeleteTr = document.createElement('td')
      tdDeleteTr.id = register._id
      tdDeleteTr.innerHTML = `<i class="fas fa-trash-alt"></i>`
      this.addEventOnBtnDelete(tr, tdDeleteTr)

      tr.appendChild(tdMethod)
      tr.appendChild(tdEmailUser)
      tr.appendChild(tdRoute)
      tr.appendChild(tdDate)
      tr.appendChild(tdDeleteTr)

      tbody.appendChild(tr)
    }
  }

  async setValueHistoric() {
    try {
      const historic = await this.api.indexHistoric()
      this.valueHistoric = historic.registers
    } catch (error) {
      this.messaging.msg('Erro ao obter os registros do histórico, tente novamente mais tarde.')
    }
  }

  addEventOnBtnDelete(row, button) {
    button.addEventListener('click', async (e) => {
      const confirmation = confirm(`Deseja mesmo excluir esse registro?`)
      if(confirmation){
        const id = e.target.id
        row.remove()
        await this.api.deleteHistoric(id)
      }
    })
  }
}
