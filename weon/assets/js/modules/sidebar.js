function activateSidebarToggle() {
  var toggleSidebarButton = document.getElementById('toggle-sidebar');
  var sidebar = document.querySelector('.sidebar');
  var title = document.getElementById('sidebar-title');
  var predefinicaoButton = document.getElementById('predefinicao');
  var isSidebarCollapsed = false;
  var hasBeenActivated = false;

  function toggleSidebar() {
    if (predefinicaoButton.textContent.trim() === 'Predefinição') {
      predefinicaoButton.innerHTML = '<i id="predefinicao" class="fa-solid fa-bars-staggered"></i>';
    } else {
      predefinicaoButton.innerHTML = 'Predefinição <i class="fa-solid fa-bars-staggered"></i>';
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
