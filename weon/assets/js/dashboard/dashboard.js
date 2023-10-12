
import configs from '../modules/configs.js'
import DashboardRequests from './classes/dashRequests.js'
import ApiRequests from '../services/ApiRequests.js'
import Messaging from '../services/Messaging.js'
import Token from '../services/Token.js'
import Loading from '../services/Loading.js'
import FormCreateChart from './classes/FormCreateChart.js'
import formaterNameDash from './services/formaterNameDash.js'
import Charts from './services/Charts.js'

google.charts.load('current', { 'packages': ['corechart'] });
class Dashboard {
  constructor(container,
  containerCenter,
  containerCreateDash,
  dashboardRequests,
  apiRequests,
  messaging,
  formCreateChart,
  charts
  ){
    
    this.container = container
    this.containerCenter = containerCenter
    this.containerCreateDash = containerCreateDash
    this.messaging = messaging
    this.dashboardRequests = dashboardRequests
    this.apiRequests = apiRequests
    this.formCreateChart = formCreateChart
    this.charts = charts

    this.valuesMap = new Map()
    this.currentDashboard = {}
  }

  async initSelects(){
    await this.formCreateChart.setCollectionData()
    await this.listDashs()
    this.addEnventOnBtns()
  }

  async listDashs(){
    try {
      const modalbtnsSideBar = document.querySelector('.modalbtnsSideBar')
      const data = await this.apiRequests.getApiDashBoards()
      //armazenar "data" para otimizar o carregamento de dados
      for (const dash of data) {
        const dashName = formaterNameDash(dash.name)
        
        const btnDash = document.createElement('button')
        btnDash.className = 'toggle-button'
        btnDash.id = `dashBtn_${dash.name}`
        btnDash.innerHTML += `${dashName}`
        const divisior  = document.createElement('hr')
        divisior.className = 'mx-auto w-75'
        modalbtnsSideBar.appendChild(btnDash)
        modalbtnsSideBar.appendChild(divisior)
        

        btnDash.addEventListener('click', (e) => {
          this.loadDashBoard({name: dash.name, nameFormated: dashName, values: dash.values})
        })
      }
    } catch (error) {
      return this.messaging.msg(error)
    }
  }

  async loadDashBoard(dashboardProps){
    this.currentDashboard = dashboardProps
    const contDashboards = document.querySelector('#contDashboards')
    contDashboards.innerHTML = ''
    const {name, nameFormated, values} = dashboardProps

    const title = document.querySelector('#title')
    title.innerText = nameFormated

    for (const entity of values) {
      if(entity.title === 'chart'){
        this.charts.listCharts(entity)
      }
      else if(entity.title === 'kpi'){
        console.log('KPI');
      }else{
        continue
      }
    }
  }

  async addEnventOnBtns(){
    this.containerCreateDash = document.querySelector('#containerCreateDash');
    
    const btnToFormCreate = document.querySelector('#btnToFormCreate')
    const btnCreateDash = document.querySelector('#btnCreateDash')
    const btnBack = document.querySelector('#btnBack')

    this.containerCreateDash.style.display = 'none';

    //Evendo de exibição do formulário de criação de dash
    btnToFormCreate.addEventListener('click', (e) => {
      if(Object.values(this.currentDashboard).length <= 0){
        return this.messaging.msg('Selecione um Dashboard para realizar a criação de seu gráfico!')
      }
      this.formCreateChart.initializeForm()
    })
    //Evento para criar um dashBoard
    btnCreateDash.addEventListener('click', async (e) => {
      e.preventDefault()
      await this.formCreateChart.createChart()
    })
    //Evento para ocultar formulario e mostrar graficos
    btnBack.addEventListener('click', (e) => {
      e.preventDefault()
      this.formCreateChart.finishForm()
    })
  }
}

const loading = new Loading(document.querySelector('#loading'))
const messaging = new Messaging(document.querySelector('.msg'))
const token = new Token()
const dashboardRequests = new DashboardRequests(configs.urlApi, token, loading) 
const apiRequests = new ApiRequests(configs.urlApi, token, loading) 

const containerCenter = document.querySelector('#containerCenter')
const containerCreateDash = document.querySelector('#containerCreateDash')
const container = document.querySelector('.container')

const formCreateChart = new FormCreateChart(apiRequests, messaging, containerCreateDash, containerCenter)
const charts = new Charts(apiRequests, messaging)
const dash = new Dashboard(
  container,
  containerCenter,
  containerCreateDash,
  dashboardRequests,
  apiRequests,
  messaging,
  formCreateChart,
  charts
)

dash.initSelects()
  .then(resolve => resolve)
  .catch(err => console.log(err ))