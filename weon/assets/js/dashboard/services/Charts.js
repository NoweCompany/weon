export default class Charts{
  constructor(apiRequests, messaging){
    this.apiRequests = apiRequests
    this.messaging = messaging
    this.valuesMap = new Map()
  }

  async listCharts(dataChart){
    const contDashboards = document.querySelector('#contDashboards')
    const card = document.createElement('div')
    card.classList.add('cardDash')
  
    const configContent = document.createElement('div')
    configContent.id = 'configContent'
    configContent.classList.add('configContent')

    const name = document.createElement('label')
    name.innerHTML = `<strong>Nome:</strong> ${dataChart.name}`

    configContent.appendChild(name)
    
    const chartContent = document.createElement('div')
    chartContent.id = `chartContent_${dataChart.preset}_${dataChart._id}`
    chartContent.classList.add('chartContent')
    
    card.appendChild(chartContent)
    card.appendChild(configContent)
    contDashboards.appendChild(card)
    
    await this.generateChart(dataChart)
  }

  async generateChart(dataChart){
    if(!this.valuesMap.get(dataChart.preset)){
      let response = await this.apiRequests.getVeluesApi(dataChart.preset)
      this.valuesMap.set(dataChart.preset, response)
    }

    const dataOfPreset = this.valuesMap.get(dataChart.preset)
    
    let data = new google.visualization.DataTable();
    data.addColumn('string', dataChart.textField);
    data.addColumn('number', dataChart.numberField);

    for(const dados of dataOfPreset){
      data.addRows([
        [dados[dataChart.textField] ,dados[dataChart.numberField]]
      ]);
    }

    // Instantiate and draw the chart.
    const container = document.getElementById(`chartContent_${dataChart.preset}_${dataChart._id}`)
    const typeChart = {
      pie: new google.visualization.PieChart(container),
      column: new google.visualization.ColumnChart(container),
      area: new google.visualization.AreaChart(container),
      line: new google.visualization.LineChart(container)
    }

    let chart = typeChart[dataChart.typeChart]
    chart.draw(data, null);
  }
}