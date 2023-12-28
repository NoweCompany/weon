export default class Historic {
  constructor(container, messaging, requests) {
    this.messaging = messaging
    this.api = requests
    this.container = container
    this.valueHistoric = []
    this.currentPage = 1;
    this.itemsPerPage = 10;
    this.totalPages = Math.ceil(this.valueHistoric.length / this.itemsPerPage);
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
          <div class="row align-items-center">
              <div class="col">
                  <input type="text" class="form-control" id="email-filter" name="email-filter" placeholder="Filtrar por Email" />
              </div>
      
                  <div class="col">
              <select class="form-control" id="order-filter" name="order-filter">
                <option value="desc">Mais Recente</option>
              <option value="asc">Mais Antigo</option>
            </select>
          </div>

              <div class="col">
                  <select class="form-control" id="method-filter" name="method-filter">
                      <option value="">Todos</option>
                      <option value="POST">Envios</option>
                      <option value="DELET">Deletados</option>
                      <option value="GET">Visualizado</option>
                  </select>
              </div>
      
              <div class="col-auto">
                  <button class="btn btn-outline-primary" type="button" id="filter-button">
                      <i class="fas fa-search"></i> 
                  </button>
              </div>
          </div>
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

      <div class="pagination-container d-flex justify-content-center mt-4">
    <nav>
        <ul class="pagination">
        </ul>
    </nav>
  </div>
    `


    const table = document.querySelector('#table-historic')
    const thead = document.querySelector('#thead-historic')
    const tbody = document.querySelector('#tbody-historic')
    const filterForm = document.querySelector('#filter-form')
    return { table, thead, tbody, filterForm }
  }

  setupFilterButton(filterForm, tbody) {
    const filterButton = filterForm.querySelector('#filter-button');
    filterButton.addEventListener('click', () => {
      const emailFilter = filterForm.querySelector('#email-filter').value;
      const methodFilter = filterForm.querySelector('#method-filter').value;
      const orderFilter = filterForm.querySelector('#order-filter').value;
      let filteredHistoric = this.filterHistoric(emailFilter, methodFilter);

      if (orderFilter === 'asc') {
        filteredHistoric = this.sortByDateAscending(filteredHistoric);
      } else {
        filteredHistoric = this.sortByDateDescending(filteredHistoric);
      }

      tbody.innerHTML = '';
      this.loadRegister(tbody, filteredHistoric);
    });
  }


  sortByDateAscending(registers) {
    return registers.sort((a, b) => {
      const dateA = new Date(a.currentDate);
      const dateB = new Date(b.currentDate);
      return dateA - dateB;
    });
  }

  sortByDateDescending(registers) {
    return registers.sort((a, b) => {
      const dateA = new Date(a.currentDate);
      const dateB = new Date(b.currentDate);
      return dateB - dateA;
    });
  }


  filterHistoric(emailFilter, methodFilter) {
    return this.valueHistoric.filter((register) => {
      const userEmail = register.userEmail.toLowerCase()
      const method = register.method.toLowerCase()
      return userEmail.includes(emailFilter.toLowerCase()) && method.includes(methodFilter.toLowerCase())
    })
  }

  loadRegister(tbody, data) {
    let registers = data || this.valueHistoric;

    if (!data) {
      registers = this.sortByDateDescending(registers);
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
      if (confirmation) {
        const id = e.target.id
        row.remove()
        await this.api.deleteHistoric(id)
      }
    })
  }

  sortByDateDescending(registers) {
    return registers.sort((a, b) => {
      const dateA = new Date(a.currentDate);
      const dateB = new Date(b.currentDate);
      return dateB - dateA;
    });
  }












}
