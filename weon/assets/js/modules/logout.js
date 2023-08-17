<<<<<<< HEAD
import configs from './configs.js'
const urlWebsite = configs.urlWebsiteRelativa()
=======
import configs from './configs'
const urlWebsite = configs.urlWebsiteDefault
>>>>>>> cb8b504dbe455047fa6a57779366e581b70e856b

const logaout = document.querySelector('#Logaout') 
logaout.addEventListener('click', (e) => {
    document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    window.location.assign(urlWebsite)
  })