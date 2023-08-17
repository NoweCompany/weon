import configs from './configs.js'
const urlWebsite = configs.urlWebsiteRelativa()

const logaout = document.querySelector('#Logaout') 
logaout.addEventListener('click', (e) => {
    document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    window.location.assign(urlWebsite)
  })