function activateSidebarToggle() {
    var toggleSidebarButton = document.getElementById('toggle-sidebar');
    var sidebar = document.querySelector('.sidebar');
    var titles = document.querySelectorAll('.sidebar h1');
    var predefinicaoButton = document.getElementById('predefinicao');
    var historicoButton = document.getElementById('historico');
    var dashboardButton = document.getElementById('dashboard');

    var isSidebarCollapsed = false;
  
    function toggleSidebar() {
      // Alternando texto dos botões
      if (isSidebarCollapsed) {
          predefinicaoButton.innerHTML = '<i id="predefinicao" class="fa-solid fa-bars-staggered"></i>';
          historicoButton.innerHTML = '<i class="fa-solid fa-clock-rotate-left"></i>';
          dashboardButton.innerHTML = '<i class="fa-solid fa-chart-line"></i>';
      } else {
          predefinicaoButton.innerHTML = 'Predefinições <i class="fa-solid fa-bars-staggered"></i>';
          historicoButton.innerHTML = 'Histórico <i class="fa-solid fa-clock-rotate-left"></i>';
          dashboardButton.innerHTML = 'Dashboards <i class="fa-solid fa-chart-line"></i>';
      }

      // Alternando a visualização dos títulos
      titles.forEach(title => {
          title.classList.toggle('hidden', isSidebarCollapsed);
      });

      // Alternando o tamanho da sidebar
      sidebar.classList.toggle('collapsed', isSidebarCollapsed);

      // Alternando a flag
      isSidebarCollapsed = !isSidebarCollapsed;
    }

    // Associando a função ao evento de clique do botão
    toggleSidebarButton.addEventListener('click', toggleSidebar);
}

activateSidebarToggle();
