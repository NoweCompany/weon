export default {
    urlApi: 'https://apiweon.nowecompany.com.br',
    urlWebsiteDefault: 'http://localhost:5500/weon/',
    urlWebsiteRelativa: () => {
        const urlWebsite = document.location.href
        let urlFormated = urlWebsite.split("/").slice(0, -1).join('/')

        if(urlFormated.charAt(urlFormated.length - 1) === '/'){
            urlFormated = urlFormated.slice(0, -1)
        } 

        return urlFormated
    }
}