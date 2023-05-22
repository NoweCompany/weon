const conteinerMsg = document.querySelector('.msg')
const table        = document.querySelector('#table')
const url = 'https://instrutorcerto.com.br'
const urlWebsite   = document.location.href

import Logado from "./modules/Logado.js";

window.addEventListener('load', async (e) => {
  conteinerMsg.innerHTML = ' '
  const logado = new Logado()
  if(!(await logado.userLogado())){
    return window.location.assign(`${urlWebsite.split('/').slice(0, -2).join('/')}/index.html`)
  }else{
    return
  }
})



class TableContas{
    constructor(){}

    msg(msg){
        conteinerMsg.classList.add('errors')
        return conteinerMsg.innerHTML = msg
    };

    token(){
      const token = document.cookie
            .split("; ")
            .find((row) => row.startsWith("token="))
            .split("=")[1];
      return token 
    }

    async getApi(){
        try{
          const auht = "Bearer " + String(document.cookie.split('=').pop())
           
          const myHeader = new Headers
          ({
                "Content-Type":  "application/json",
                "authorization": auht,
          })

          const response = await fetch(url + '/contas', {
            method: 'GET',
            mode: "cors",
            headers: myHeader
        });
          if(!response){
            return this.msg('Request Failed');
          }
          const data = await response.json();
          if(data.length <= 0 || !data){
            this.msg('Não há nenhum valor cadastrado')
            return false
          }
          return data;
        }catch(e){
            this.msg(e);
        }
    };

    async createTable(){
        const response = await this.getApi()
        if(!response) return

        response.forEach(el => {
            const linha = document.createElement('tr')
            const {documento, forma_pagamento, banco, valor, data_pagamento, data_vencimento, fornecedor, id} = el
 
            const doc   = document.createElement('td')
            const txtDoc   = document.createTextNode(documento)
            doc.appendChild(txtDoc)

            const vl    = document.createElement('td')
            const txtVl    = document.createTextNode(valor)
            vl.appendChild(txtVl)

            const dataP = document.createElement('td')
            const txtDataP = document.createTextNode(data_pagamento)
            dataP.appendChild(txtDataP)

            const dataV = document.createElement('td')
            const txtDataV = document.createTextNode(data_vencimento)
            dataV.appendChild(txtDataV)

            const forne = document.createElement('td')
            const txtForne = document.createTextNode(fornecedor)
            forne.appendChild(txtForne)

            const formaP   = document.createElement('td')
            const txtformaP   = document.createTextNode(forma_pagamento)
            formaP.appendChild(txtformaP)

            const banc   = document.createElement('td')
            const txtbanco   = document.createTextNode(banco)
            banc.appendChild(txtbanco)

            const edit = document.createElement('td')
            const txtEdit = document.createTextNode('Edit')
            edit.appendChild(txtEdit)

            const delet = document.createElement('td')
            const txtDelet = document.createTextNode('Delete')
            delet.appendChild(txtDelet)

            edit.setAttribute('id','edit')
            delet.setAttribute('id','delet')

            edit.setAttribute('value', id)
            delet.setAttribute('value', id) 

            linha.appendChild(forne)
            linha.appendChild(dataP)
            linha.appendChild(dataV)
            linha.appendChild(vl)
            linha.appendChild(formaP)
            linha.appendChild(banc)
            linha.appendChild(doc)
            linha.appendChild(edit)
            linha.appendChild(delet)

            table.append(linha)
        });
    }

    async deletApi(id){
      if(!id) return

      const confirm = window.confirm('Deseja excluir este registro ?')

      if(!confirm) return false

      const token = this.token()

      const header = new Headers(
        {
          "Content-Type":  "application/json",
          "authorization": `Bearer ${token}` 
        }
      )
      const response = await fetch(`${url}/contas/${id}`, 
      {
        method: "DELETE",
        headers: header,
        mode: "cors"
      })

      return response
    }

    async postApi(){

    }

    async events(e){
      const el = e.target

      if(el.getAttribute('id') === 'edit'){
        const id = el.getAttribute('value')
        const response = await this.updateApi(id)
      }
      if(el.getAttribute('id') === 'delet'){
        const id = el.getAttribute('value')
        const response = await this.deletApi(id)
        if(!response) return
        const data = await response.json()
        if(response.status !== 200) return this.msg(`Não foi possivel excluir este registro <br> ${data.errors}`)
        return window.location.reload()
      }

      if(el.getAttribute('id') === 'post'){
        window.location.assign(`${urlWebsite.split('/').slice(0, -1).join('/')}/contas.html`)
      }
    }

    async init(){
      this.createTable()
      document.addEventListener('click', (e) => this.events(e))
    };
}

const tabela = new TableContas();
tabela.init()
