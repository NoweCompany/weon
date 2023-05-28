const menuaLteral = document.querySelector('.modal-body')
const url = 'https://instrutorcerto.com.br'

class Register{
    constructor(container, containerMsg){
        this.container = container
        this.containerMsg = containerMsg
    }

    async init(){
        await this.listPresets()
        this.setEvents()
    }

    msg(msg, success){
        if(!success){
            containerMsg.className = 'error'
            containerMsg.textContent = msg

            setTimeout(() => {
                this.cleanMsg()
            }, 1000)

            return
        }else{
            containerMsg.className = 'success'
            containerMsg.textContent = msg

            setTimeout(() => {
                this.cleanMsg()
            }, 1000);

           return
        }
    }

    cleanMsg(){
        return containerMsg.className = 'msg'
    }  

    setEvents(){
        const form = document.querySelector('#form')
        const btns = document.querySelectorAll('.modal-button')
        
        btns.forEach(e => {
            e.addEventListener('click', e => {
                this.renderTable(e.target.id)
            })
        });

        form.addEventListener('submit', (e) => this.submitForm(e))
    }

    async submitForm(e){
        e.preventDefault()
        const elemenetsForm = e.target.elements

        let values = {}

        for(const el of elemenetsForm){
            if(el.id === '') continue

            let vl = el.value

            if(!vl) return this.msg('Campos inválidos')

            else if(el.type === 'checkbox')vl = Boolean(el.checked)

            else if(el.type === 'number') vl = Number(vl)

            values[el.id] = vl
        }
        console.log(values)
        const tableName = document.querySelector('#tableName').textContent

        const request = await this.postApiValues(tableName, values)
        const response = await request.json()

        if(request.status !== 200){
            return this.msg(response.errors, false)
        }

        return this.msg('Cadastro bem sucedido', true)
    }

    async postApiValues(tableName, values){
        try {
            const request = await fetch(`${url}/template/values`, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                    "authorization": `Bearer ${this.token()}`
                },
                body: JSON.stringify({tableName,values})
            })
    
            return request
        } catch (e) {
            this.msg('ERRO no servidor', false)
            return false
        }
    }

    async renderTable(tableName){     
        const request = await this.getApiFields(tableName)  
        const response = await request.json()

        if(request.status !== 200){
            return this.msg(response.errors, false)
        }

        const form = document.querySelector('#form')
        form.innerHTML = `
            <h1 id="tableName">${tableName}</h1>

            <div class="campos">

            </div>
        `

        const containerInputs = document.querySelector('.campos')
        
        for(const key in response){ 
            if(key === 'id') continue           
            const type = response[key].type.split('(').splice(0, 1).join()
            let typeInput 
            let atribute

            switch (type) {
                case 'INT':
                    typeInput = 'number'
                    atribute = ['step', '1']
                    break;

                case 'TINYINT':
                    typeInput = 'checkbox'
                    break;
                
                case 'FLOAT':
                    atribute = ['step', '0.01']
                    typeInput = 'number'
                    break;

                case 'VARCHAR':
                    typeInput = 'text'
                    break;

                case 'DATETIME':
                    typeInput = 'date'
                    break;

                default:
                    break;
            }
            const div = document.createElement('div')

            const input = document.createElement('input')
            input.setAttribute('type', typeInput)
            input.required = true
            
            if(typeInput === 'number'){
                input.setAttribute(atribute[0], atribute[1])
            }
            input.setAttribute('id', key)

            const label = document.createElement('label')
            label.setAttribute('for', key)
            label.innerHTML = key

            div.appendChild(label)
            div.appendChild(input)

            containerInputs.appendChild(div)
        }

        const inputSubmit = document.createElement('input')
        inputSubmit.className = 'btnEnviar'
        inputSubmit.setAttribute('type', 'submit')

        form.appendChild(inputSubmit)
    }

    async getApiFields(tableName){
        try {
            const request = await fetch(`${url}/template/field/${tableName}`, {
                method: 'GET',
                headers: {
                    "Content-Type": "application/json",
                    "authorization": `Bearer ${this.token()}`
                }
            })

            return request
        } catch (e) {
            this.msg('ERRO no servidor', false)
            return false
        }
    }

    token(){
        const token = document.cookie
              .split("; ")
              .find((row) => row.startsWith("token="))
              .split("=")[1];
        return token 
      }

    async listPresets(){
        try{
            const headers = new Headers({
                "Content-Type": "application/json",
                "authorization": `Bearer ${this.token()}`
            })

            const response = await fetch(`${url}/template/table`,{
                method: 'GET',
                headers: headers
            })
            const data = await response.json()

            for(const key of data.response){
                const btn = document.createElement('button')
                btn.setAttribute('id', key.tableName)
                const btnTxt = document.createTextNode(key.tableName)
                btn.classList.add('modal-button')
                
                btn.appendChild(btnTxt)
                menuaLteral.appendChild(btn)
            }
            return true
        }catch(e){
            //validar
            return false
        }
    }
}

const container = document.querySelector('.container')
const containerMsg   = document.querySelector('.msg')

const register = new Register(container, containerMsg)

register.init()