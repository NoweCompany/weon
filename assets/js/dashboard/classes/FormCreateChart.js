export default class FormCreateChart{
  constructor(apiRequests, dashboardRequests, messaging, containerFormCreateChart, formHeader){
    this.containerFormCreateChart = containerFormCreateChart
    this.formHeader = formHeader

    this.apiRequests = apiRequests
    this.dashboardRequests = dashboardRequests
    this.messaging = messaging

    this.tittleChart = document.querySelector('#tittleChart')
    this.field01 = document.querySelector('#field01Chart')
    this.field02 = document.querySelector('#field02Chart')
    this.preset = document.querySelector('#presetsChart')
    this.typeChart = document.querySelector('#typeChart')
    
    this.collectionData = []
  }

  initializeForm(){
    this.containerFormCreateChart.style.display = 'block'
    this.formHeader.style.display = 'none'

    this.addOptionsInSelectPresets()
    this.addEventOnSelectPresets()
  }

  finishForm(){
    this.formHeader.style.display = 'flex'
    this.containerFormCreateChart.style.display = 'none'
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
      this.addOptionsInSelectField02()

    })
  }

  
  addOptionsInSelectField01(){
    this.field01.innerHTML  = ''
    const optionDefault = document.createElement('option')
    optionDefault.innerText = 'Escolha um campo de texto: '
    optionDefault.setAttribute('selected', 'selected')
    this.field01.appendChild(optionDefault)
    
    this.collectionData.forEach((collection, i) => {
      if(collection.collectionName !== this.presetSelected) return
        collection.fields.forEach((field) => {
          if(field.type === 'string'){
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
      this.field02.parentNode.style.display = 'block'
    })
  }

  addOptionsInSelectField02(){
    this.field02.innerHTML  = ''
    const optionDefault = document.createElement('option')
    optionDefault.innerText = 'Escolha um campo numerico: '
    optionDefault.setAttribute('selected', 'selected')
    this.field02.appendChild(optionDefault)
    
    this.collectionData.forEach((collection, i) => {
      if(collection.collectionName !== this.presetSelected) return
      collection.fields.forEach((field) => {
        if(field.type === 'int' || field.type === 'double'){
          const option = document.createElement('option')
          option.innerText = field.key
          this.field02.appendChild(option)
        }
      })
    })

    this.addEventOnSelectField01()
  }

  async createChart(currentDashboard){
    const tittleChart = this.tittleChart.value
    const prestNameChart = this.preset.value
    const textField = this.field01.value
    const numberField = this.field02.value
    const typeChart = this.typeChart.value

    if(!tittleChart || !prestNameChart || !textField || !numberField || !typeChart) {
      this.messaging.msg('Preencha todos os campos corretamente', false)
      return
    }
    
    try{
      await this.dashboardRequests.postChart(currentDashboard.nameFormated, tittleChart, prestNameChart, textField, numberField, typeChart)

      this.messaging.msg('Gráfico criado com sucesso', true)

      this.formHeader.style.display = 'flex'
      this.containerFormCreateChart.style.display = 'none'
      return true
    }catch(error){
      this.messaging.msg(error, false)
    }
  }
}