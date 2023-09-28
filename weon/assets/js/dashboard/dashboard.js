
 import configs from '../modules/configs.js'
import DashboardRequests from './classes/dashRequests.js'
 import ApiRequests from '../services/ApiRequests.js'
 import Messaging from '../services/Messaging.js'
 import Token from '../services/Token.js'
 import Loading from '../services/Loading.js'

google.charts.load('current', { 'packages': ['corechart'] });
class Dashboard {
  constructor(container, containerCenter, containerCreateDash, dashboardRequests, apiRequests, messaging){
    this.container = container
    this.containerCenter = containerCenter
    this.containerCreateDash = containerCreateDash
    this.messaging = messaging
    this.dashboardRequests = dashboardRequests
    this.apiRequests = apiRequests

    this.field01 = document.querySelector('#field01')
    this.field02 = document.querySelector('#field02')
    this.preset = document.querySelector('#presets')

    this.valuesMap = new Map()
    this.collectionData = []
    this.presetSelected = ''
    this.field01Selected = ''
  }

  async setCollectionData(){
    try {
      const collectionData = await this.apiRequests.getApiCollections()
      this.collectionData = collectionData.response
      this.messaging.msg('Sucesso', true)
    } catch (error) {
      this.messaging.msg(error.message || 'Ocorreu um erro inesperado!', false)
    }
  }

  async initSelects(){
    await this.setCollectionData()
    this.listDashs()
    this.addEnventOnBtns()
  }

  async listDashs(){
    const contDashboards = document.querySelector('#contDashboards')
    contDashboards.innerHTML = ''
    const response = await this.dashboardRequests.indexDashboards()
    for(let dash of response){
      const card = document.createElement('div')
      card.classList.add('cardDash')
    
      const configContent = document.createElement('div')
      configContent.id = 'configContent'
      configContent.classList.add('configContent')

      const name = document.createElement('label')
      name.innerHTML = `<strong>Nome:</strong> ${dash.name}`

      const preset = document.createElement('label')
      preset.innerHTML = `<strong>Predefinição:</strong> ${dash.preset}`

      const textField = document.createElement('label')
      textField.innerHTML = `<strong>Campo tipo texto:</strong> ${dash.textField}`

      const numberField = document.createElement('label')
      numberField.innerHTML = `<strong>Campo tipo número:</strong> ${dash.numberField}`
      
      const typeChart = document.createElement('label')
      typeChart.innerHTML = `<strong>Tipo do gráfico:</strong> ${dash.typeChart}` 

      configContent.appendChild(name)
      configContent.appendChild(preset)
      configContent.appendChild(textField)
      configContent.appendChild(numberField)
      configContent.appendChild(typeChart)
      
      const chartContent = document.createElement('div')
      chartContent.id = `chartContent_${dash.preset}_${dash.typeChart}`
      chartContent.classList.add('chartContent')
      
      card.appendChild(chartContent)
      card.appendChild(configContent)
      contDashboards.appendChild(card)
      
      await this.generateChart(dash)
    }
  }

  async generateChart(dash){
    // Define the chart to be drawn.
    if(!this.valuesMap.get(dash.preset)){
      let response = await this.apiRequests.getVeluesApi(dash.preset)
      this.valuesMap.set(dash.preset, response)
    }

    const dataOfPreset = this.valuesMap.get(dash.preset)
    
    let data = new google.visualization.DataTable();
    data.addColumn('string', dash.textField);
    data.addColumn('number', dash.numberField);

    for(const dados of dataOfPreset){
      data.addRows([
        [dados[dash.textField] ,dados[dash.numberField]]
      ]);
    }

    // Instantiate and draw the chart.
    const container = document.getElementById(`chartContent_${dash.preset}_${dash.typeChart}`)
    const typeChart = {
      pie: new google.visualization.PieChart(container),
      column: new google.visualization.ColumnChart(container),
      area: new google.visualization.AreaChart(container),
      line: new google.visualization.LineChart(container)
    }

    let chart = typeChart[dash.typeChart]
    chart.draw(data, null);
  }



  async addEnventOnBtns(){
    this.containerCreateDash = document.querySelector('#containerCreateDash');
    const btnToFormCreate = document.querySelector('#btnToFormCreate')
    const btnCreateDash = document.querySelector('#btnCreateDash')
    const btnBack = document.querySelector('#btnBack')

    this.containerCreateDash.style.display = 'none';

    btnToFormCreate.addEventListener('click', (e) => {
      e.preventDefault()
      this.containerCreateDash.style.display = 'flex'
      this.containerCenter.style.display = 'none'

      this.addOptionsInSelectPresets()
      this.addEventOnSelectPresets()
    })
    //Evento para criar um dashBoard
    btnCreateDash.addEventListener('click', async (e) => {
      e.preventDefault()
      const tittleChart = document.querySelector('#tittleChart').value
      const prestNameChart = this.preset.value
      const textField = this.field01.value
      const numberField = this.field02.value
      const typeChart = document.querySelector('#typeChart').value
      if(!tittleChart || !prestNameChart || !textField || !numberField || !typeChart) {
        this.messaging.msg('Preencha todos os campos corretamente', false)
        return
      }
      
      try{
        await this.dashboardRequests.postDashboards(tittleChart, prestNameChart, textField, numberField, typeChart)
        this.messaging.msg('Dashboard criado com sucesso', true)
        this.containerCenter.style.display = 'flex'
        this.containerCreateDash.style.display = 'none' 
        this.listDashs()
      }catch(error){
        this.messaging.msg(error, false)
      }
    })
    //Evento para ocultar formulario e mostrar graficos
    btnBack.addEventListener('click', (e) => {
      e.preventDefault()
      this.containerCenter.style.display = 'flex'
      this.containerCreateDash.style.display = 'none'
    })
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

  addEventOnSelectPresets(){
    this.preset.parentNode.addEventListener('change', (e) => {
      this.presetSelected = e.target.value
      this.field01.parentNode.style.display = 'block'
      this.addOptionsInSelectField01()
      this.addOptionsInSelectField02()

    })
  }
}

  

const loading = new Loading(document.querySelector('#loading'))
const messaging = new Messaging(document.querySelector('.msg'))
const token = new Token()
const dashboardRequests = new DashboardRequests(configs.urlApi, token, loading) 
const apiRequests = new ApiRequests(configs.urlApi, token, loading) 

const form = document.querySelector('#fromDash')
const containerCenter = document.querySelector('#containerCenter')
const containerCreateDash = document.querySelector('#containerCreateDash')
const container = document.querySelector('.container')

const dash = new Dashboard(container, containerCenter, containerCreateDash, dashboardRequests, apiRequests, messaging)
dash.initSelects()
  .then(resolve => resolve)
  .catch(err => console.log(err))
 

  //sidebarr
  function activateSidebarToggle() {
    var toggleSidebarButton = document.getElementById('toggle-sidebar');
    var sidebar = document.querySelector('.sidebar');
    var title = document.getElementById('sidebar-title');
    var predefinicaoButton = document.getElementById('predefinicao');
    var isSidebarCollapsed = false;
    var hasBeenActivated = false;
  
    function toggleSidebar() {
      if (predefinicaoButton.textContent.trim() === 'dashboard') {
        predefinicaoButton.innerHTML = '<i class="fa-solid fa-chart-line"></i>';
      } else {
        predefinicaoButton.innerHTML = 'dashboard <i class="fa-solid fa-chart-line"></i>';
      }
  
      isSidebarCollapsed = !isSidebarCollapsed;
      sidebar.classList.toggle('collapsed', isSidebarCollapsed);
      title.classList.toggle('hidden', isSidebarCollapsed);
    }
    
    toggleSidebarButton.addEventListener('click', toggleSidebar);
  
    function checkSidebarState() {
      var screenWidth = window.innerWidth;
      var screenHeight = window.innerHeight;
      if (screenWidth < 1297) {
        if (!hasBeenActivated) {
          toggleSidebar();
          hasBeenActivated = true;
        }
      } else {
        hasBeenActivated = false;
      }
    }
    window.addEventListener('resize', checkSidebarState);
    checkSidebarState();
  }
  activateSidebarToggle();
  
  