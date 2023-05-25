const form = document.querySelector('#formCad')
const url = 'https://instrutorcerto.com.br'
const urlWebsite   = document.location.href

import Logado from "./modules/Logado.js"

window.addEventListener('load', async (e) => {
    const logado = new Logado()
    if(!(await logado.userLogado())){
      return window.location.assign(`${urlWebsite.split('/').slice(0, -2).join('/')}/index.html`)
    }else{
      return
    }
  })
  
class FormInsert{

    validate(){
        const dataForm = new FormData(form)

        for (const filds of dataForm) {
            if(!filds[1]){
                alert(`O campo '${filds[0]}' esta vazio `)
                return false
            }
        }

        return true
    }

    token(){
        const token = document.cookie
              .split("; ")
              .find((row) => row.startsWith("token="))
              .split("=")[1];
        return token 
      }

    body(){
        const dataForm = new FormData(form)


        const data = {
            documento: dataForm.get('documento'),
            fornecedor: dataForm.get('fornecedor'),
            dataPagamento: dataForm.get('dataPagamento'),
            dataVencimento: dataForm.get('dataVencimento'),
            valor: Number(dataForm.get('valor')),
            banco: dataForm.get('banco'),
            formaPagamento: dataForm.get('formaPagamento'),
            observacao: dataForm.get('observacao')
        };

        console.log(data);
        const jsonData = JSON.stringify(data)

        return jsonData
    }

    async postApi(){
        try{
            
            const headers = new Headers({
                "Content-Type": "application/json",
                "authorization": `Bearer ${this.token()}`
            })
            
            const body = this.body()
           
            const options = {
                method: 'POST',
                body: body,
                headers: headers,
            }

            const response = await fetch(`${url}/contas`, options)

            return response
        }catch(e){
            alert('Errors')
        }
    }

    async event(){
        form.addEventListener('submit', async (e) => {
            e.preventDefault()
        
            const valido = this.validate()
            if(!valido){
                return
            }
            
            const response = await this.postApi()

            const data = await response.json()  

            if(data.errors){
                alert(`Erros: ${data.errors}`)
                return
            }

            alert('cadastro bem sucedido')
            return
        })
    }

    init(){
        this.event()
    }
}

const formInsert = new FormInsert()
formInsert.init()