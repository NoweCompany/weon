function activateSidebarToggle() {
  var toggleSidebarButton = document.getElementById('toggle-sidebar');
  var sidebar = document.querySelector('.sidebar');
  var titles = document.querySelectorAll('.sidebar h1');
  var predefinicaoButton = document.getElementById('predefinicao');
  var dashboardButton = document.getElementById('dashboard-button');
  var isSidebarCollapsed = false;

  function toggleSidebar() {
      isSidebarCollapsed = !isSidebarCollapsed;

      // Toggle the sidebar's state.
      sidebar.classList.toggle('collapsed', isSidebarCollapsed);

      // Hide or show the titles.
      titles.forEach(title => {
          title.classList.toggle('hidden', isSidebarCollapsed);
      });

      // Adjust the button's content.
      if (isSidebarCollapsed) {
          predefinicaoButton.innerHTML = '<i id="predefinicao" class="fa-solid fa-bars-staggered"></i>';
          dashboardButton.innerHTML = '<i id="dashboard" class="fa-solid fa-chart-line"></i>';
      } else {
          predefinicaoButton.innerHTML = 'Predefinições <i class="fa-solid fa-bars-staggered"></i>';
          dashboardButton.innerHTML = 'Dashboards <i class="fa-solid fa-chart-line"></i>';
      }
  }

  toggleSidebarButton.addEventListener('click', toggleSidebar);
}

activateSidebarToggle();
