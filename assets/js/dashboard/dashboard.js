//Modules
import configs from '../modules/configs.js'
import Logado from "../modules/Logado.js";
//Services
import ApiRequests from '../services/ApiRequests.js'
import Messaging from '../services/Messaging.js'
import Token from '../services/Token.js'
import Loading from '../services/Loading.js'
import formaterNameDash from './services/formaterNameDash.js'
import Charts from './services/Charts.js'
import Kpi from './services/Kpi.js'
//Class
import FormCreateChart from './classes/FormCreateChart.js'
import FormCreateKpi from './classes/FormCreateKpi.js'
import DashboardRequests from './classes/dashRequests.js'

const urlWebsite = configs.urlWebsiteDefault

window.addEventListener('load', async (e) => {
    const logado = new Logado();
    if (!(await logado.userLogado())) {
        return window.location.assign(`${urlWebsite}`);
    } else {
        return;
    }
});


google.charts.load('current', { 'packages': ['corechart'] });

class Dashboard {
  constructor(container,
  formHeader,
  containerFormCreateChart,
  dashboardRequests,
  apiRequests,
  messaging,
  formCreateChart,
  formCreateKpi,
  charts,
  kpi
  ){
    
    this.container = container
    this.formHeader = formHeader
    this.containerFormCreateChart = containerFormCreateChart
    this.messaging = messaging
    this.dashboardRequests = dashboardRequests
    this.apiRequests = apiRequests
    this.formCreateChart = formCreateChart
    this.formCreateKpi = formCreateKpi
    this.charts = charts
    this.kpi = kpi

    this.valuesMap = new Map()
    this.currentDashboard = {}
  }

  async initSelects(){
    await this.formCreateChart.setCollectionData()
    await this.formCreateKpi.setCollectionData()
    await this.listDashs()
    this.addEnventOnBtns()
  }

  async refreshValuesOfCurrentDashboard(){
    try {
      if(Object.values(this.currentDashboard).length <= 0) throw new Error('Não há nenhum dashBoard selecionado')

      const dashBoardName = this.currentDashboard.nameFormated
      const valuesUpdated = await this.dashboardRequests.showetDashboard(dashBoardName)
      this.currentDashboard.values = valuesUpdated
      return true
    } catch (error) {
      this.messaging.msg(error.message, false)
    }
  }

  
async addOptions() {
  try {
      const response = await this.requests.getApiDashBoards();

      this.dataDashboard = response.response; 
      this.filteredData = [...this.dataDashboard]; 

      const sidebarContent = document.getElementById('SidebarElement');
      const searchInput = document.getElementById('searchInput');

      searchInput.addEventListener('input', () => {
          const searchTerm = searchInput.value.toLowerCase();
          this.filteredData = this.dataDashboard.filter((item) =>
              item.dataDashboard.toLowerCase().includes(searchTerm)
          );
          this.showItems(this.filteredData, sidebar);
      });

      // Exibe todos os itens cadastrados inicialmente na barra lateral
      this.showItems(this.filteredData, sidebar);
  } catch (error) {
      this.msg(error.message, false);
  }
}

  async listDashs(){
    try {
      const modalbtnsSideBar = document.querySelector('.modalbtnsSideBar')
      const dataDashboard = await this.apiRequests.getApiDashBoards()
      console.log(dataDashboard);
      //armazenar "dataDashboard(dados)" para otimizar o carregamento de dados
      for (const dash of dataDashboard) {
        const dashName = formaterNameDash(dash.name)
        
        const btnDash = document.createElement('button')
        btnDash.className = 'toggle-button'
        btnDash.id = `dashBtn_${dash.name}`
        btnDash.innerHTML += `${dashName}`
        modalbtnsSideBar.appendChild(btnDash)
      
        

        btnDash.addEventListener('click', (e) => {
          this.formHeader.style.display = 'block'
          this.currentDashboard = {name: dash.name, nameFormated: dashName, values: dash.values}
          this.loadDashBoard(this.currentDashboard)
        })
      }
    } catch (error) {
      return this.messaging.msg(error)
    }
  }

  async loadDashBoard(dashboardProps){
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
        this.kpi.listKpi(entity)
      }else{
        continue
      }
    }
  }

  async addEnventOnBtns(){
    this.containerFormCreateChart = document.querySelector('#containerFormCreateChart')
    this.containerFormCreateKpi = document.querySelector('#containerFormCreateKpi')

    const btnToFormCreateChart = document.querySelector('#btnToFormCreateChart')
    const btnToFormCreateKpi = document.querySelector('#btnToFormCreateKpi')
    
    const btnBackChart = document.querySelector('#btnBackChart')
    const btnBackKpi = document.querySelector('#btnBackKpi')

    const btnCreateChart = document.querySelector('#btnCreateChart')
    const btnCreateKpi = document.querySelector('#btnCreateKpi')

    //Evento de exibição de formulário
    btnToFormCreateChart.addEventListener('click', (e) => {
      if(Object.values(this.currentDashboard).length <= 0){
        return this.messaging.msg('Selecione um Dashboard para realizar a criação de seu gráfico!')
      }
      this.formCreateChart.initializeForm()
    })
    btnToFormCreateKpi.addEventListener('click', (e) => {
      if(Object.values(this.currentDashboard).length <= 0){
        return this.messaging.msg('Selecione um Dashboard para realizar a criação de seu Indicador!')
      }
      this.formCreateKpi.initializeForm()
    })
    
    //Evento para criar um Gráfico
    btnCreateChart.addEventListener('click', async (e) => {
      e.preventDefault()
      try {
        const response = await this.formCreateChart.createChart(this.currentDashboard)
        if(response) {
          await this.refreshValuesOfCurrentDashboard()
          this.loadDashBoard(this.currentDashboard)
        }

      } catch (error) {
        this.messaging.msg(error.message, false)
      }
    })
     //Evento para criar um Gráfico
    btnCreateKpi.addEventListener('click', async (e) => {
      e.preventDefault()
      try{
        const response = await this.formCreateKpi.createKpi(this.currentDashboard)
        if(response) {
          await this.refreshValuesOfCurrentDashboard()
          this.loadDashBoard(this.currentDashboard)
        }
      }catch (error) {
        this.messaging.msg(error.message, false)
      }
    })



    //Evento para ocultar formulario
    btnBackChart.addEventListener('click', (e) => {
      e.preventDefault()
      this.formCreateChart.finishForm()
    })
    btnBackKpi.addEventListener('click', (e) => {
      e.preventDefault()
      this.formCreateKpi.finishForm()
    })
  }
}

const loading = new Loading(document.querySelector('#loading'))
const messaging = new Messaging(document.querySelector('.msg'))
const token = new Token()
const dashboardRequests = new DashboardRequests(configs.urlApi, token, loading) 
const apiRequests = new ApiRequests(configs.urlApi, token, loading) 

const formHeader = document.querySelector('#formHeader')
const containerFormCreateChart = document.querySelector('#containerFormCreateChart')
const containerFormCreateKpi = document.querySelector('#containerFormCreateKpi')
const container = document.querySelector('.container')

const formCreateChart = new FormCreateChart(
  apiRequests,
  dashboardRequests,
  messaging,
  containerFormCreateChart,
  formHeader
)

const formCreateKpi = new FormCreateKpi(
  apiRequests,
  dashboardRequests,
  messaging,
  containerFormCreateKpi,
  formHeader
)

const charts = new Charts(apiRequests, messaging)
const kpi = new Kpi(apiRequests, messaging)

const dash = new Dashboard(
  container,
  formHeader,
  containerFormCreateChart,
  dashboardRequests,
  apiRequests,
  messaging,
  formCreateChart,
  formCreateKpi,
  charts,
  kpi
)

dash.initSelects()
  .then(resolve => resolve)
  .catch(err => console.log(err ))

//filtro
