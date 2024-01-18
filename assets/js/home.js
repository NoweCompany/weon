import Logado from './modules/Logado.js'
import configs from '../js/modules/configs.js'

const urlWebsite  = configs.urlWebsiteDefault
console.log('Home')
window.addEventListener('load', async (e) => {
  const logado = new Logado()
  if(!(await logado.userLogado())){
    return window.location.assign(`${urlWebsite.split('/').slice(0, -2).join('/')}/index.html`)
  }else{
    return
  }
})