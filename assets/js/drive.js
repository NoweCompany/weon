const url = 'https://instrutorcerto.com.br'
const urlWebsite   = document.location.href

import Logado from "./modules/Logado.js";

window.addEventListener('load', async (e) => {
    const logado = new Logado()
    if(!(await logado.userLogado())){
      return window.location.assign(`${urlWebsite.split('/').slice(0, -2).join('/')}/index.html`)
    }else{
      return
    }
})

class Drive{
  constructor(selectTable, containerTable, containerMsg, thead, tbody){
    this.selectTable    = selectTable,
    this.containerTable = containerTable,
    this.containerMsg   = containerMsg,
    this.thead          = thead,
    this.tbody          = tbody
  }

  async init(){
    await this.addOptions()
    this.events()
  }

  async addOptions(){
    const headers = new Headers({
      "Content-Type": "application/json",
      "authorization": `Bearer ${this.token()}`
    })

    const response = await fetch(`${url}/template/table`,{
      method: 'GET',
      headers: headers
    })

    if(response.status !== 200) this.msg('Algo deu errado', false)

    const data = await response.json()
    for(const key of data.response){
      const option = document.createElement('option');
      const textOption = document.createTextNode(key.tableName);
      option.appendChild(textOption);
      this.selectTable.appendChild(option);
    }
  }

  token(){
    const token = document.cookie
      .split("; ")
      .find((row) => row.startsWith("token="))
      .split("=")[1];
    return token 
  }

  events(){
    this.selectTable  .addEventListener('change', e =>  this.renderTable(e))
  }

  async renderTable(e){
    this.thead.innerHTML = ''
    this.tbody.innerHTML = ''

    const responseTables = await this.getTablesApi()
    const dataTables = await responseTables.json()

    if(responseTables.status !== 200 ){
      return this.msg(dataTables.errors)
    }

    //procuro na response a tabela selecionado
    for(const key in dataTables.response){
      const optionSelected = e.target.value
      const tableName = dataTables.response[key].tableName
      //verifico é a tabela selecionado 
      if(tableName === optionSelected){
        //faço uma vrdura no array dentro da tabela para achar os campos
        for(const indexField in dataTables.response[key].fields){
          //monto a tabela
          const th = document.createElement('th')
          const fieldName = dataTables.response[key].fields[indexField].key
          const textTh = document.createTextNode(fieldName)
          th.appendChild(textTh)
          this.thead.appendChild(th)
        }

        const responseValues = await this.getVeluesApi(tableName)
        const dataValues = await responseValues.json()

        if(responseValues.status !== 200 ){
          return this.msg(dataValues.errors)
        }
        for(const field of dataValues){
          const tr = document.createElement('tr')
          for(const key in field){
            const value = field[key]
            const td = document.createElement('td')
            const textTd= document.createTextNode(value)

            td.appendChild(textTd)
            tr.appendChild(td)
            this.tbody.appendChild(tr)
          }
        }
      }
    }
    
  }

  async getVeluesApi(tableName){
    const response = await fetch(`${url}/template/values/${tableName}`, {
      headers: {
        "Content-Type": "application/json",
        "authorization": `Bearer ${this.token()}`
      }
    })

    return response
  }

  async getTablesApi(){
    const response = await fetch(`${url}/template/table`, {
      headers: {
        "Content-Type": "application/json",
        "authorization": `Bearer ${this.token()}`
      }
    })

    return response
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
}

const select         = document.querySelector('.selectTable')
const containerTable = document.querySelector('.table')
const thead          = document.querySelector('.thead')
const tbody          = document.querySelector('.tbody')
const containerMsg   = document.querySelector('.msg')

const drive = new Drive(select, containerTable, containerMsg, thead, tbody);
drive.init()
