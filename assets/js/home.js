import Logado from './modules/Logado.js'
const urlWebsite   = document.location.href

window.addEventListener('load', async (e) => {
console.log('chamei');
  const logado = new Logado()
  if(!(await logado.userLogado())){
    return window.location.assign(`${urlWebsite.split('/').slice(0, -2).join('/')}/index.html`)
  }else{
    return
  }
})

const logaout = document.querySelector("#sair")

logaout.addEventListener('click', (e) => {
    document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    window.location.assign(urlWebsite)
  })