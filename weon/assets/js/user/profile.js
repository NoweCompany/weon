import Messaging from '../services/Messaging.js'
import logout from '../modules/logout.js'

const messaging = new Messaging(document.querySelector('.msg'))
const pEmail = document.querySelector('#userEmail')
const pCompany = document.querySelector('#userCompany')

const dataUser = JSON.parse(window.localStorage.getItem('weonDataUser'))

if(dataUser) {
  pEmail.innerHTML = dataUser.email
  pCompany.innerHTML = dataUser.nameCompany
}else {
  messaging.msg('Não foi possível obter dados do usuário')
  logout()
}