const menuaLteral = document.querySelector('.modal-body')
const url = 'https://instrutorcerto.com.br'
const urlWebsite   = document.location.href

const predefinicao = document.querySelector('#predefinicao')
const conteiner = document.querySelector('.conteiner')
const conteinerMsg = document.querySelector('#msg')

import Logado from "./modules/Logado.js";

window.addEventListener('load', async (e) => {
    conteinerMsg.innerHTML = ''
    const logado = new Logado()
    if(!(await logado.userLogado())){
      return window.location.assign(`${urlWebsite.split('/').slice(0, -2).join('/')}/index.html`)
    }else{
      return
    }
})

class Admin{
    constructor(){
        this.preset = new Preset()
        this.campos = new Campos()
    }

    async init(){
        conteinerMsg.innerHTML = ''
        conteiner.innerHTML = ''
        await this.event()
        //this.preset.predefinicao()
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
        this.creteTablePresets()

    }
    
    msg(msg){
        conteinerMsg.classList.remove('msg')
        conteinerMsg.classList.add('active')
        conteinerMsg.textContent = msg
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

    event(){
        document.addEventListener('click', (e) => {
            const el = e.target
            const id = el.getAttribute('id')
            if( id === 'createPreset')  this.rederFormPreset()
            if( id === 'cancelPresetForm') this.predefinicao()
            if( id === 'createPresetForm') this.createPreset()
        })
    }

    async createPreset(){
        
    }   

    rederFormPreset(){
        conteiner.innerHTML = `
        <form id="formPreset">
        <h1> Criar Predefinição </h1>
        <div>
          <label for="name">Nome</label>
          <input type="text" id="name">
        </div>
      </form>   
        <div class="cont-btn-form-preset">
            <button class="modal-button" id="cancelPresetForm"> Cancelar </button>
            <button class="modal-button" id="createPresetForm"> Criar </button>
        </div>
        `
    }

    rederTable(){
        conteiner.innerHTML = `
        <table>
            <thead>
            <tr id="thead">
                <th>Nome</th>
            </tr>
            </thead>
            <tbody id="tbody">
  
            </tbody>
        </table>
        <button id="createPreset" class="modal-button">Criar</button>
        `
    }

    async creteTablePresets(){
        const data = await this.getApiPresets()

        //validar
        if(data.msg) return this.msg(data.msg)

        this.rederTable()
        this.event()

        const tbody = document.querySelector('#tbody')
        const thead = document.querySelector('#thead')

        //retorna a lengtn do maior array de 'filds'
        const maiorLength = this.maiorLength(data)

       //thead enumerado
        for (let i = 0; i <= maiorLength; i++) {
            const th = document.createElement('th')
            const thText = document.createTextNode(`${i+1}`)
    
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
        
    msg(msg){
        conteinerMsg.classList.remove('msg')
        conteinerMsg.classList.add('active')
        conteinerMsg.textContent = msg
    }

    campos(){
        if(conteinerMsg.classList.contains('active')){
            conteinerMsg.classList.remove('active')
            conteinerMsg.classList.add('msg')
        }
        conteiner.innerHTML = '<h1>Campos</h1>'
    }
}

const admin = new Admin()

admin.init()