import Logado from './modules/Logado.js'
<<<<<<< HEAD
const urlWebsite   = document.location.href

window.addEventListener('load', async (e) => {
console.log('chamei');
=======
import configs from '../js/modules/configs.js'

const urlWebsite  = configs.urlWebsiteDefault

window.addEventListener('load', async (e) => {
>>>>>>> e6531ba7ccee4d08b394482305ba6818a33b1292
  const logado = new Logado()
  if(!(await logado.userLogado())){
    return window.location.assign(`${urlWebsite.split('/').slice(0, -2).join('/')}/index.html`)
  }else{
    return
  }
})