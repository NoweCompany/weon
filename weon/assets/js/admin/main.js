//configurações
import configs from '../modules/configs.js'
const url = configs.urlApi
const urlWebsite = configs.urlWebsiteRelativa()
//classes
import Presets from './classes/Preset.js'
import Fields from './classes/Field.js'
import Trash from './classes/Trash.js'
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
const loading = new Loading(document.querySelector('#loading'))
const token = new Token()
const api = new ApiRequests(configs.urlApi, token, loading) 
const messaging = new Messaging(document.querySelector('#msg'))

//Inicializando Classes
const preset = new Presets(document.querySelector('.container'), messaging, api)
const fields = new Fields(document.querySelector('.container'), messaging, api, preset)
const trash = new Trash(document.querySelector('.container'), messaging, api)

await fields.fields()
document.addEventListener('click', async (e) => {
    const el = e.target
    const id = el.getAttribute('id')
    if (id === 'predefinicao') await preset.preset()
    else if (id === 'campos') await fields.fields()
    else if (id === 'lixeira') await trash.trash()
})

