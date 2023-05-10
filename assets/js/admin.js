const menuaLteral = document.querySelector('.modal-body')
const url = 'https://instrutorcerto.com.br'

const predefinicao = document.querySelector('#predefinicao')
const conteiner = document.querySelector('.conteiner')

class Admin{
    constructor(){
        this.preset = new Preset()
        this.campos = new Campos()
    }

    async init(){
        await this.event()
        //this.predefinicao()
    }

    async event(){
        document.addEventListener('click', (e) => {
            const el = e.target
            const id = el.getAttribute('id')
            if( id === 'predefinicao')  this.preset.predefinicao()
            if( id === 'campos') this.campos.campos()
        })
    }

}

class Preset{
    async predefinicao(){
        conteiner.innerHTML = ''
        conteiner.innerHTML = `
        <table>
            <thead>
            <tr id="thead">
                <th>Nome</th>
            </tr>
            </thead>
            <tbody id="tbody">
  
            </tbody>
        </table>`

        this.creteTablePresets()

    }
    
    maiorLength(data){
        let maiorLength = 0

        for(const preset of data.response){
            for(let i = 0; i < preset.filds.length; i++){
                if(i > maiorLength) maiorLength = i
            }
        }

        return maiorLength
    }

    async creteTablePresets(){
        const tbody = document.querySelector('#tbody')
        const thead = document.querySelector('#thead')

        const data = await this.getApiPresets()

        //validar
        if(!data) return alert('erro')

        //retorna a lengtn do maior array de 'filds'
        const maiorLength = this.maiorLength(data)

       //thead enumerado
        for (let i = 0; i <= maiorLength; i++) {
            const th = document.createElement('th')
            const thText = document.createTextNode(`${i}`)
    
            th.appendChild(thText)  
            thead.appendChild(th)
        }

        //tbody
        for(const preset of data.response){
            const {tableName, filds} = preset
            //tableName
            const tr = document.createElement('tr')
            const thTable = document.createElement('td')
            const thTextTable = document.createTextNode(tableName)

            thTable.appendChild(thTextTable)
            tr.appendChild(thTable)
            tbody.appendChild(tr)

            //filds
            for(let i = 0; i <= maiorLength; i++){
                const thFild = document.createElement('td')
                const thTextFild = document.createTextNode(filds[i] ? filds[i].key : '')
                
                thFild.appendChild(thTextFild)
                tr.appendChild(thFild)
            }

        }
    }
    async getApiPresets(){
        try{
            const response = await fetch(`${url}/template/table`)
            const data = await response.json()

            return data
        }catch(e){
            //validar
            return false
        }
    }
}

class Campos{
    campos(){
        conteiner.innerHTML = ''
        conteiner.innerHTML = '<h1>Campos</h1>'
    }
}

const admin = new Admin()

admin.init()