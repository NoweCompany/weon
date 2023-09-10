// Função para verificar o tamanho da tela e controlar o modo colapsado
function checkWindowSize() {
  var sidebar = document.querySelector('.sidebar');
  var windowWidth = window.innerWidth;
  var windowHeight = window.innerHeight;

  if (windowWidth <= 1258 && windowHeight <= 848) { // Defina as dimensões limite para ativar o modo colapsado (por exemplo, 1258x848)
    sidebar.classList.add('collapsed');
    var title = document.getElementById('sidebar-title');
    var buttons = document.querySelectorAll('.toggle-button');
    var icons = document.querySelectorAll('.toggle-button i');
    
    title.classList.add('hidden');
    
    buttons.forEach(function (button) {
      button.querySelector('i').classList.add('icon-hidden');
    });
  } else {
    sidebar.classList.remove('collapsed');
    var title = document.getElementById('sidebar-title');
    var buttons = document.querySelectorAll('.toggle-button');
    var icons = document.querySelectorAll('.toggle-button i');
    
    title.classList.remove('hidden');
    
    buttons.forEach(function (button) {
      button.querySelector('i').classList.remove('icon-hidden');
    });
  }
}

// Execute a função quando a página for carregada e quando a janela for redimensionada
window.addEventListener('load', checkWindowSize);
window.addEventListener('resize', checkWindowSize);

// Adicione o evento de clique para alternar o modo colapsado quando o botão for clicado
document.getElementById('toggle-sidebar').addEventListener('click', function () {
  var sidebar = document.querySelector('.sidebar');
  var title = document.getElementById('sidebar-title');
  var buttons = document.querySelectorAll('.toggle-button');
  var icons = document.querySelectorAll('.toggle-button i');
  
  sidebar.classList.toggle('collapsed');
  
  if (sidebar.classList.contains('collapsed')) {
    title.classList.add('hidden');
    buttons.forEach(function (button) {
      button.querySelector('i').classList.add('icon-hidden');
    });
  } else {
    title.classList.remove('hidden');
    buttons.forEach(function (button) {
      button.querySelector('i').classList.remove('icon-hidden');
    });
  }
});
