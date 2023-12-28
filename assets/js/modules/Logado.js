<<<<<<< HEAD
const url = 'https://instrutorcerto.com.br'
export default class Logado{
    async userLogado(){
      try{
        if(!document.cookie) return false
        const token = document.cookie
            .split("; ")
            .find((row) => row.startsWith("token="))
            .split("=")[1];
        const objBody = {token}
        const myBody = JSON.stringify(objBody)    
        const response = await fetch(url + '/token/logado', {
            method: "POST",
            headers: 
            {
              "Content-Type": "application/json",
            },
            body: myBody
        })
    
        if(response.status !== 200){
          const output = document.getElementById("cookies");
          output.textContent = "";
          return false
        } 
        return true
      }catch(e){
        console.log("erro");
      }
    }
    
  }
  
=======
import configs from './configs.js'
const url = configs.urlApi

export default class Logado {
  async userLogado() {
    try {
      if (!document.cookie) return false
      const token = document.cookie
        .split("; ")
        .find((row) => row.startsWith("token="))
        .split("=")[1];
      const objBody = { token }
      const myBody = JSON.stringify(objBody)
      const response = await fetch(url + '/token/logado', {
        method: "POST",
        headers:
        {
          "Content-Type": "application/json",
        },
        body: myBody
      })

      if (response.status !== 200) {
        const output = document.getElementById("cookies");
        output.textContent = "";
        return false
      }
      return true
    } catch (e) {
      console.log("erro");
    }
  }

}
>>>>>>> e6531ba7ccee4d08b394482305ba6818a33b1292
