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