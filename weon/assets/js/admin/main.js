//configurações
import configs from '../modules/configs.js'
const url = configs.urlApi
const urlWebsite = configs.urlWebsiteRelativa()
//classes
import Presets from './classes/Preset.js'
import Fields from './classes/Field.js'
import Trash from './classes/Trash.js'
import Historic from './classes/Historic.js'
import Dashboard from './classes/Dashboard.js'
//Modulos
import Logado from "../modules/Logado.js";
//Services
import ApiRequests from '../services/ApiRequests.js'
import Messaging from '../services/Messaging.js'
import Token from '../services/Token.js'
import Loading from '../services/Loading.js'

window.addEventListener('load', async (e) => {
    const logado = new Logado()
    if (!(await logado.userLogado())) {
        return window.location.assign(`${urlWebsite}`)
    } else {
        return
    }
})

//Inicializando Services
const loading   = new Loading(document.querySelector('#loading'))
const token     = new Token()
const api       = new ApiRequests(configs.urlApi, token, loading) 
const messaging = new Messaging(document.querySelector('#msg'))

//Inicializando Classes
const preset = new Presets(document.querySelector('.container'), messaging, api)
const fields = new Fields(document.querySelector('.container'), messaging, api)
const trash  = new Trash(document.querySelector('.container'), messaging, api)
const dashboard = new Dashboard(document.querySelector('.container'), messaging, api)
const historic = new Historic(document.querySelector('.container'), messaging, api)

fields.presetController = preset
preset.fieldController = fields

await preset.preset()
async function handleClick(e){
    try {
        const el = e.target
        const id = el.getAttribute('id')

        if (id === 'predefinicao') await preset.preset()
        else if (id === 'campos')  await fields.fields()
        else if (id === 'lixeira') await trash.trash()
        else if (id === 'dashboard') await dashboard.dashboard()
        else if (id === 'historico') await historic.historic()
        else return
    } catch (error) {
        messaging.msg('Houve um erro inesperado, Tente novamente mais tarde !')
        setTimeout(()=> { 
            window.location.assign(`${urlWebsite}/home.html`)
        }, 1500)
        return 
    }
}

const modalBody = document.querySelector('.modal-body')
modalBody.addEventListener('click', handleClick)
