const menuaLteral = document.querySelector('.modal-body')
const url = 'https://instrutorcerto.com.br'

class Register{
    async init(){
        await this.listPresets()
        this.setEvents()
    }
    
    setEvents(){
        const btns = document.querySelectorAll('.modal-button')
        
        btns.forEach(e => {
            e.addEventListener('click', e => {
                this.renderTable(e.target.id)
            })
        });
    }

    renderTable(tableName){
        console.log(tableName)
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

const register = new Register()

register.init()