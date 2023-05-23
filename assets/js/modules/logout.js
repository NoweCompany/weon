const urlWebsite   = document.location.href
const logaout      = document.querySelector('#Logaout') 
logaout.addEventListener('click', (e) => {
    document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    window.location.assign(urlWebsite)
  })