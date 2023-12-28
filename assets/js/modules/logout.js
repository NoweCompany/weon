<<<<<<< HEAD
const urlWebsite   = document.location.href
const logaout      = document.querySelector('#Logaout') 
logaout.addEventListener('click', (e) => {
    document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    window.location.assign(urlWebsite)
  })
=======
import configs from './configs.js'
const urlWebsite = configs.urlWebsiteRelativa()
const btnLogout = document.querySelector('#Logout')

function logout() {
  document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
  window.localStorage.removeItem('weonDataUser')
  window.location.assign('/weon')
}

btnLogout.addEventListener('click', (e) => {
  logout()
})

export default logout
>>>>>>> e6531ba7ccee4d08b394482305ba6818a33b1292
