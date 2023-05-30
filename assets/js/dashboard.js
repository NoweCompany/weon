var options = {
  chart: {
      type: 'line'
      },
      grid: {
        borderColor: 'darkgray'
      },
      stroke: {
          curve: 'smooth'
      },
      series: [{
      name: 'Tabelas',
      data: [0,0,0,3,3,0,0,0,0,0,0,0]
  }],
      xaxis: {
      categories: ['Janeiro','Fevereiro','Março','Abril','Maio','Junho','Julho','Agosto','Setembro','Outubro','Novembro','Dezembro']
  }
  }

  var chart = new ApexCharts(document.querySelector("#chart"), options);

   chart.render();