export default class User {
    constructor(container, messaging, requests) {
        this.messaging = messaging
        this.api = requests
        this.container = container

        this.valuesUsers = []
    }

    async user() {
        this.initializeTable()
    }

    async initializeTable(){
        const { table, thead, tbody, btnCreateUser } = this.rederTable()
        this.setEventOnbtnCreateUser(btnCreateUser)
        await this.setValueUsers()
        this.loadRegister(tbody)
    }

    setEventOnbtnCreateUser(btnCreateUser){
        btnCreateUser.addEventListener("click", () => {
            const {
            formUsers,
            emailInput,
            passwordInput,
            confirmPasswordUser,
            admCheckBox,
            insertCheckBox,
            editCheckBox,
            deleteCheckBox,
            btnCancelUserForm
            } = this.renderForm()
            
            btnCancelUserForm.addEventListener('click', () => {
                this.initializeTable()
            })
            formUsers.addEventListener('submit', async (e) => {
                e.preventDefault()
                
                const email           = (String(emailInput.value)).trim()
                const password        = (String(passwordInput.value)).trim()
                const confirmPassword = (String(confirmPasswordUser.value)).trim()
                const adm             = admCheckBox.checked
                const insert          = insertCheckBox.checked
                const edit            = editCheckBox.checked
                const delet           = deleteCheckBox.checked

                if(!email || !password || !confirmPassword){
                    this.messaging.msg('Preencha o formulário corretamente.')
                    return
                }else if(password.length < 6){
                    this.messaging.msg('A senha deve ter no minimo 6 caracteres!', false)
                    return
                }else if(password !== confirmPassword){
                    this.messaging.msg('Confirme sua senha novamente.', false)
                    return
                }

                try {
                    const permission = {adm, insert, edit, delet}
                    const response = await this.api.postApiUser(email, password, permission) 
                    this.messaging.msg('Usuário criado com sucesso!', true)
                    this.initializeTable()
                    return
                } catch (error) {
                    this.messaging.msg(error.message, false)
                    return
                }
            })
        })
    }

    renderForm() {
        this.container.innerHTML = `
            <div class="container">
                <form id="formUsers" class="p-5 rounded rounded-10 d-flex flex-column popreset mx-auto mt-2 text-start">
                    <h1 class="text-center mb-4">Criando usuário</h1>
                    <div class="mb-3">
                        <label for="emailUser" class="form-label">Email</label>
                        <input type="email" class="form-control" id="emailUser" placeholder="exemplo@exemplo.com" aria-describedby="emailHelp">
                    </div>
                    <div class="mb-3">
                        <label for="passwordUser" class="form-label">Senha</label>
                        <input type="password" class="form-control" id="passwordUser" placeholder="SenhaSegura123">
                    </div>
                    <div class="mb-3">
                        <label for="confirmPasswordUser" class="form-label">Confirme sua senha</label>
                        <input type="password" class="form-control" id="confirmPasswordUser" placeholder="SenhaSegura123">
                    </div>
                    <h4>Permissões</h4>
                    <div class="mb-1 form-check">
                        <input type="checkbox" class="form-check-input" id="admUserCheckBox">
                        <label class="form-check-label" for="admUserCheckBox">Administrador</label>
                    </div>

                    <div class="mb-1 form-check">
                        <input type="checkbox" class="form-check-input" id="insertUserCheckBox">
                        <label class="form-check-label" for="insertUserCheckBox">Inserção</label>
                    </div>

                    <div class="mb-1 form-check">
                        <input type="checkbox" class="form-check-input" id="EditUserCheckBox">
                        <label class="form-check-label" for="EditUserCheckBox">Edição</label>
                    </div>

                    <div class="mb-4 form-check">
                        <input type="checkbox" class="form-check-input" id="DeletUserCheckBox">
                        <label class="form-check-label" for="DeletUserCheckBox">Deleção</label>
                    </div>
                </form>
            </div>
        
            <div class="d-flex justify-content-center align-items-center mb-5">
                <div class="border border-horizontal p-5 d-flex justify-content-between align-items-center">
                    <div class="ml-auto">
                        <h1 class="mb-0 display-6"> Criando novo usuário </h1>
                    </div>
                    <div> 
                        <button id="btnCancelUserForm" class="btn btn-outline-danger btn-sm-4">Voltar</button>
                        <button id="createDashboardForm" form="formUsers" class="btn btn-outline-primary sm-4 ms-2">Salvar</button>
                    </div>
                </div>
            </div>`

        const formUsers = document.querySelector('#formUsers')
        const btnCancelUserForm = document.querySelector('#btnCancelUserForm')

        const emailInput = document.querySelector("#emailUser")
        const passwordInput = document.querySelector("#passwordUser")
        const confirmPasswordUser = document.querySelector("#confirmPasswordUser")

        const admCheckBox = document.querySelector("#admUserCheckBox")
        const insertCheckBox = document.querySelector("#insertUserCheckBox")
        const editCheckBox = document.querySelector("#EditUserCheckBox")
        const deleteCheckBox = document.querySelector("#DeletUserCheckBox")

        return {formUsers, emailInput, passwordInput, confirmPasswordUser, admCheckBox, insertCheckBox, editCheckBox, deleteCheckBox, btnCancelUserForm}
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

            function togglePermissionValue(value){
                return value 
                ? `<i class="fa-solid fa-circle-check" style="color: #0fff4b;"></i>` 
                : `<i class="fa-solid fa-circle-xmark" style="color: #ff0000;"></i>`
            }

            const tdEmailUser = document.createElement('td')
            tdEmailUser.innerText = user.email

            const tdAdmP = document.createElement('td')
            tdAdmP.innerHTML = togglePermissionValue(user.permission?.adm)

            const tdinsertP = document.createElement('td')
            tdinsertP.innerHTML = togglePermissionValue(user.permission?.insert)

            const tdeditP = document.createElement('td')
            tdeditP.innerHTML = togglePermissionValue(user.permission?.edit)

            const tddeletP = document.createElement('td')
            tddeletP.innerHTML = togglePermissionValue(user.permission?.delet)

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
