const menuaLteral = document.querySelector('.modal-body')
const url = 'https://instrutorcerto.com.br'

class Admin{
    async init(){
        await this.listPresets()
    }

    async listPresets(){
        try{
            const response = await fetch(`${url}/template/table`)
            const data = await response.json()

            for(const key of data.response){
                const btn = document.createElement('button')
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

const admin = new Admin()

admin.init()