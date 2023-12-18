    function activateSidebarToggle() {
    var toggleSidebarButton = document.getElementById('toggle-sidebar');
    var sidebar = document.querySelector('.sidebar');
    var titles = document.querySelectorAll('.sidebar h1');
    var predefinicaoButton = document.getElementById('predefinicao');
    var historicoButton = document.getElementById('historico');
    var dashboardButton = document.getElementById('dashboard');
    var UsuarioButton = document.getElementById('usuarios');
    var LixeiraButton = document.getElementById('Lixeira')

    var isSidebarCollapsed = false;
  
    function toggleSidebar() {
      if (isSidebarCollapsed) {
          predefinicaoButton.innerHTML = '<i id="predefinicao" class="fa-solid fa-bars-staggered"></i>';
          historicoButton.innerHTML = '<i class="fa-solid fa-clock-rotate-left"></i>';
          dashboardButton.innerHTML = '<i class="fa-solid fa-chart-line"></i>';
          UsuarioButton.innerHTML = '<i class="fa-solid fa-users"></i>'
          LixeiraButton.innerHTML = '<i class="fa-solid fa-trash-can"></i>'
      } else {
          predefinicaoButton.innerHTML = 'Predefinições <i class="fa-solid fa-bars-staggered"></i>';
          historicoButton.innerHTML = ' Histórico <span id="historico" class="beta">BETA</span> <i class="fa-solid fa-clock-rotate-left"></i>';
          dashboardButton.innerHTML = 'Dashboards <i class="fa-solid fa-chart-line"></i>';
          UsuarioButton.innerHTML =' Usuários <span id="usuarios" class="beta">BETA</span> <i class="fa-solid fa-users"></i>';
          LixeiraButton.innerHTML = ' Lixeira<span id="Lixeira" class="beta">BETA</span> <i class="fa-solid fa-trash-can"></i>';
      }

      titles.forEach(title => {
          title.classList.toggle('hidden', isSidebarCollapsed);
      });

     
      sidebar.classList.toggle('collapsed', isSidebarCollapsed);


      isSidebarCollapsed = !isSidebarCollapsed;
    }

    toggleSidebarButton.addEventListener('click', toggleSidebar);
}

activateSidebarToggle();



  
