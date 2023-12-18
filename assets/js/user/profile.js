import Messaging from '../services/Messaging.js'
import logout from '../modules/logout.js'
import Loading from '../services/Loading.js'

const messaging = new Messaging(document.querySelector('.msg'))
const loading   = new Loading(document.querySelector('#loading'))
const pEmail = document.querySelector('#userEmail')
const pCompany = document.querySelector('#userCompany')

const dataUser = JSON.parse(window.localStorage.getItem('weonDataUser'))

loading.addLoading()
setTimeout(()=> loading.removeLoading(),500)

if(dataUser) {
  pEmail.innerHTML = dataUser.email
  pCompany.innerHTML = dataUser.nameCompany
}else {
  messaging.msg('Não foi possível obter dados do usuário')
  logout()
}
