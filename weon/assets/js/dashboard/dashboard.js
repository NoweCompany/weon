import configs from '../modules/configs.js'
import ApiRequests from '../services/ApiRequests.js'
import Messaging from '../services/Messaging.js'
import Token from '../services/Token.js'
import Loading from '../services/loading.js'

class Dashboard {
  constructor(form, selectPreset, selectField01, selectField02, api, messaging){
    this.form = form
    this.selectPreset = selectPreset
    this.selectField01 = selectField01
    this.selectField02 = selectField02
    this.messaging = messaging
    this.api = api

    this.collectionData = []
    this.presetSelected = ''
    this.field01Selected = ''
  }

  async setCollectionData(){
    try {
      const collectionData = await this.api.getApiCollections()
      this.collectionData = collectionData.response
      this.messaging.msg('Sucesso', true)
    } catch (error) {
      this.messaging.msg(error.message || 'Ocorreu um erro inesperado!', false)
    }
  }

  async initSelects(){
    await this.setCollectionData()
    
    this.addOptionsInSelectPresets()
    this.addEventOnSelectPresets()
    
    // this.addOptionsInSelectField01()
    // this.addOptionsInSelectField02()
  }

  addOptionsInSelectPresets(){
    this.collectionData.forEach((value) => {
      if(value.fields.length <= 1) return
      const option = document.createElement('option')
      option.innerText = value.collectionName
      this.selectPreset.appendChild(option)
    })
  }

  addOptionsInSelectField01(){
    this.selectField01.innerHTML  = ''
    const optionDefault = document.createElement('option')
    optionDefault.innerText = 'Selecione um campo do tipo String'
    optionDefault.setAttribute('selected', 'selected')
    this.selectField01.appendChild(optionDefault)
    
    this.collectionData.forEach((collection, i) => {
      if(collection.collectionName !== this.presetSelected) return
      collection.fields.forEach((field) => {
        const option = document.createElement('option')
        option.innerText = field.key
        this.selectField01.appendChild(option)
      })
    })

    this.addEventOnSelectField01()
  }

  addEventOnSelectField01(){
    this.selectField01.addEventListener('change', (e) => {
      this.field01Selected = e.target.value
      this.selectField02.parentNode.style.display = 'block'
    })
  }

  addOptionsInSelectField02(){
    this.selectField02.innerHTML  = ''
    const optionDefault = document.createElement('option')
    optionDefault.innerText = 'Selecione um campo do tipo Number'
    optionDefault.setAttribute('selected', 'selected')
    this.selectField02.appendChild(optionDefault)
    
    this.collectionData.forEach((collection, i) => {
      if(collection.collectionName !== this.presetSelected) return
      collection.fields.forEach((field) => {
        const option = document.createElement('option')
        option.innerText = field.key
        this.selectField02.appendChild(option)
      })
    })

    this.addEventOnSelectField01()
  }

  addEventOnSelectPresets(){
    this.selectPreset.addEventListener('change', (e) => {
      this.presetSelected = e.target.value
      this.selectField01.parentNode.style.display = 'block'
      this.addOptionsInSelectField01()
      this.addOptionsInSelectField02()

    })
  }
}

const loading = new Loading(document.querySelector('#loading'))
const messaging = new Messaging(document.querySelector('.msg'))
const token = new Token()
const api = new ApiRequests(configs.urlApi, token, loading) 

const form = document.querySelector('#fromDash')
const selectPreset = document.querySelector('#presets')
const selectField01 = document.querySelector('#field01')
const selectField02 = document.querySelector('#field02')

const dash = new Dashboard(form, selectPreset, selectField01, selectField02, api, messaging)
dash.initSelects()
  .then(resolve => resolve)
  .catch(err => console.log(err))