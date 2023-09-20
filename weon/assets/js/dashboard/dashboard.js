import configs from '../modules/configs.js'
import DashboardRequests from './classes/dashRequests.js'
import Messaging from '../services/Messaging.js'
import Token from '../services/Token.js'
import Loading from '../services/Loading.js'

google.charts.load('current', { 'packages': ['corechart'] });
class Dashboard {
  constructor(container, form, selectPreset, selectField01, selectField02, api, messaging){
    this.container = container
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
    // await this.setCollectionData()
    
    // this.addOptionsInSelectPresets()
    // this.addEventOnSelectPresets()
    this.listDashs()
  }

  async listDashs(){
    const response = await this.api.indexDashboards()
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
      this.container.appendChild(card)
      
      await this.generateChart(dash)
    }
  }

  async generateChart(dash){
    // Define the chart to be drawn.
    const dataOfPreset = await this.api.getVeluesApi(dash.preset)
    console.log(dataOfPreset);
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
const dashboardRequests = new DashboardRequests(configs.urlApi, token, loading) 

const form = document.querySelector('#fromDash')
const container = document.querySelector('.container')
const selectPreset = document.querySelector('#presets')
const selectField01 = document.querySelector('#field01')
const selectField02 = document.querySelector('#field02')

const dash = new Dashboard(container, form, selectPreset, selectField01, selectField02, dashboardRequests, messaging)
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
  
  