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
