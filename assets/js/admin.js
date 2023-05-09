const menuaLteral = document.querySelector('.modal-body')
const url = 'https://instrutorcerto.com.br'

const predefinicao = document.querySelector('#predefinicao')
const conteiner = document.querySelector('.conteiner')

const tbody = document.querySelector('.tbody')
const thead = document.querySelector('.thead')

class Admin{
    async init(){
        await this.event()
        this.predefinicao()
    }

    async event(){
        document.addEventListener('click', (e) => {
            const el = e.target
            if(el.getAttribute('id') === 'predefinicao') this.predefinicao()
        })
    }

    predefinicao(){
        this.listPresets()
    }
    async listPresets(){
        try{
            const response = await fetch(`${url}/template/table`)
            const data = await response.json()
            
            for(const key of data.response){
                console.log(key);
                const {tableName, filds} = key

                const th = document.createElement('th')
                const thText = doument.createTextNode(tableName)

                th.appendChild(thText)
                thead.appendChild(th)
                
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