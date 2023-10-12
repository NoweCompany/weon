export default class FormCreateChart{
  constructor(apiRequests, messaging, containerCreateDash, containerCenter){
    this.containerCreateDash = containerCreateDash
    this.containerCenter = containerCenter

    this.apiRequests = apiRequests
    this.messaging = messaging

    this.field01 = document.querySelector('#field01')
    this.field02 = document.querySelector('#field02')
    this.preset = document.querySelector('#presets')
    
    this.collectionData = []
  }

  initializeForm(){
    this.containerCreateDash.style.display = 'flex'
    this.containerCenter.style.display = 'none'

    this.addOptionsInSelectPresets()
    this.addEventOnSelectPresets()
  }

  finishForm(){
    this.containerCenter.style.display = 'flex'
    this.containerCreateDash.style.display = 'none'
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

  async createChart(){
    const tittleChart = document.querySelector('#tittleChart').value
    const prestNameChart = this.preset.value
    const textField = this.field01.value
    const numberField = this.field02.value
    const typeChart = document.querySelector('#typeChart').value

    if(!tittleChart || !prestNameChart || !textField || !numberField || !typeChart) {
      this.messaging.msg('Preencha todos os campos corretamente', false)
      return
    }else if(!this.currentDashboard.nameFormated){
      this.messaging.msg('Selecione um Dashboard antes de tentar criarum gráfico.')
      return
    }
    
    try{
      await this.dashboardRequests.postChart(this.currentDashboard.nameFormated, tittleChart, prestNameChart, textField, numberField, typeChart)

      this.messaging.msg('Dashboard criado com sucesso', true)

      this.containerCenter.style.display = 'flex'
      this.containerCreateDash.style.display = 'none'
    }catch(error){
      this.messaging.msg(error, false)
    }
  }
}