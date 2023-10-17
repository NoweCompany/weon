export default class FormCreateKpi{
  constructor(apiRequests, dashboardRequests, messaging, containerFormCreateKpi, containerCenter){
    this.containerFormCreateKpi = containerFormCreateKpi
    this.containerCenter = containerCenter

    this.apiRequests = apiRequests
    this.dashboardRequests = dashboardRequests
    this.messaging = messaging

    this.tittleKpi = document.querySelector('#tittleKpi')
    this.field01 = document.querySelector('#field01Kpi')
    this.preset = document.querySelector('#presetsKpi')
    this.typeKpi = document.querySelector('#typeKpi')
    
    this.collectionData = []
  }

  initializeForm(){
    this.containerFormCreateKpi.style.display = 'block'
    this.containerCenter.style.display = 'none'

    this.addOptionsInSelectPresets()
    this.addEventOnSelectPresets()
  }

  finishForm(){
    this.containerCenter.style.display = 'flex'
    this.containerFormCreateKpi.style.display = 'none'
  }

  async setCollectionData(){
    try {
      const collectionData = await this.apiRequests.getApiCollections()
      this.collectionData = collectionData.response
    } catch (error) {
      this.messaging.msg(error.message || 'Ocorreu um erro inesperado!', false)
    }
  }

  addOptionsInSelectPresets(){
    this.preset.innerHTML = ''
    const optionDefault = document.createElement('option')
    optionDefault.innerText = 'Escolha uma predefinição'
    optionDefault.setAttribute('selected', 'selected')
    this.preset.appendChild(optionDefault)

    this.collectionData.forEach((value) => {
      if(value.fields.length <= 1) return
      const option = document.createElement('option')
      option.innerText = value.collectionName
      this.preset.appendChild(option)
    })
  }

  addEventOnSelectPresets(){
    this.preset.parentNode.addEventListener('change', (e) => {
      this.presetSelected = e.target.value
      this.field01.parentNode.style.display = 'block'
      this.addOptionsInSelectField01()

    })
  }

  
  addOptionsInSelectField01(){
    this.field01.innerHTML  = ''
    const optionDefault = document.createElement('option')
    optionDefault.innerText = 'Escolha um campo de numérico: '
    optionDefault.setAttribute('selected', 'selected')
    this.field01.appendChild(optionDefault)
    
    this.collectionData.forEach((collection, i) => {
      if(collection.collectionName !== this.presetSelected) return
        collection.fields.forEach((field) => {
          if(field.type === 'int' || field.type === 'double'){
            const option = document.createElement('option')
            option.innerText = field.key
            this.field01.appendChild(option)
          }
      })
    })

    this.addEventOnSelectField01()
  }

  addEventOnSelectField01(){
    this.field01.addEventListener('change', (e) => {
      this.field01Selected = e.target.value
    })
  }

  async createKpi(currentDashboard){
    const dashboardName = currentDashboard.nameFormated
    const tittleKpi = this.tittleKpi.value
    const prestNameKpi = this.preset.value
    const numerField = this.field01.value
    const typeKpi = this.typeKpi.value

    if(!tittleKpi || !prestNameKpi || !numerField || !typeKpi) {
      this.messaging.msg('Preencha todos os campos corretamente', false)
      return
    }
    
    try{
      await this.dashboardRequests.postKpi(dashboardName, tittleKpi, prestNameKpi, numerField, typeKpi)

      this.messaging.msg('Kpi criado com sucesso', true)

      this.containerCenter.style.display = 'flex'
      this.containerFormCreateKpi.style.display = 'none'
    }catch(error){
      throw new Error(error.message)
    }
  }
}