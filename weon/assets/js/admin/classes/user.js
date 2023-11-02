export default class User {
    constructor(container, messaging, requests) {
        this.messaging = messaging
        this.api = requests
        this.container = container

        this.valuesUsers = []
    }

    async user() {
        const { table, thead, tbody, btnCreateUser } = this.rederTable()
        //Definir evento para "btnCreateUser"
        await this.setValueUsers()
        this.loadRegister(tbody)
    }

    rederTable() {
        this.container.innerHTML = `
        <div class="d-flex justify-content-center align-items-center mb-5">
            <div class="border border-horizontal p-5 d-flex justify-content-between align-items-center">
                <div class="titulo">
                    <h1 id="tituloPrincipal" class="display-6">Usuários</h1>
                </div>
            <div>
            
            <div class="newfield me-3">
                <button id="createUser" class="btn btn-outline-primary">Criar usuário</button>
            </div> 
        
            </div>
            </div>
        </div>
        <div class="table-container">
            <table id="table-user">
            <thead id="thead-user">
                <th>E-mail usuário</th>
                <th>ADM</th>
                <th>Inserir</th>
                <th>Editar</th>
                <th>Deletar</th>
                <th>Data de criação</th>
                <th>Data de última modificação</th>
                <th></th>
            </thead>
            <tbody id="tbody-user"></tbody>
            </table>
        </div>

        <div class="pagination-container d-flex justify-content-center mt-4">
        <nav>
            <ul class="pagination">
            </ul>
        </nav>
    </div>
        `


        const table = document.querySelector('#table-user')
        const thead = document.querySelector('#thead-user')
        const tbody = document.querySelector('#tbody-user')
        const btnCreateUser = document.querySelector('#createUser')
        return { table, thead, tbody, btnCreateUser }
    }

    filterHistoric(emailFilter, methodFilter) {
        return this.valuesUsers.filter((user) => {
        const userEmail = user.userEmail.toLowerCase()
        const method = user.method.toLowerCase()
        return userEmail.includes(emailFilter.toLowerCase()) && method.includes(methodFilter.toLowerCase())
        })
    }

    loadRegister(tbody, data) {
        let users = data || this.valuesUsers;

        for (const user of users) {
            const tr = document.createElement('tr')

            const tdEmailUser = document.createElement('td')
            tdEmailUser.innerText = user.email

            const tdAdmP = document.createElement('td')
            tdAdmP.innerText = user.permission?.adm

            const tdinsertP = document.createElement('td')
            tdinsertP.innerText = user.permission?.insert

            const tdeditP = document.createElement('td')
            tdeditP.innerText = user.permission?.edit

            const tddeletP = document.createElement('td')
            tddeletP.innerText = user.permission?.delet

            const tdCreatedAt = document.createElement('td')
            tdCreatedAt.innerText = new Date(user.createdAt).toLocaleString()

            const tdUpdatedAt = document.createElement('td')
            tdUpdatedAt.innerText = new Date(user.updatedAt).toLocaleString()

            const tdDeleteTr = document.createElement('td')
            tdDeleteTr.id = user._id
            tdDeleteTr.innerHTML = `<i class="fas fa-trash-alt"></i>`
            this.addEventOnBtnDelete(tr, tdDeleteTr)

            tr.appendChild(tdEmailUser)
            tr.appendChild(tdAdmP)
            tr.appendChild(tdinsertP)
            tr.appendChild(tdeditP)
            tr.appendChild(tddeletP)
            tr.appendChild(tdCreatedAt)
            tr.appendChild(tdUpdatedAt)
            tr.appendChild(tdDeleteTr)

            tbody.appendChild(tr)
        }
    }

    async setValueUsers() {
        try {
            const user = await this.api.getIndexUser()
            this.valuesUsers = user
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
            alert('Usuário romovido ;)')
        }
        })
    }

    sortByDateDescending(users) {
        return users.sort((a, b) => {
        const dateA = new Date(a.currentDate);
        const dateB = new Date(b.currentDate);
        return dateB - dateA;
        });
    }
}
