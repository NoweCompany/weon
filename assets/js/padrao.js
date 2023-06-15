const navbar = document.getElementById("navbar");
const select = document.getElementById("select");

// Define a posição de rolagem que ativa a mudança de cor
const scrollPosition = 200; // Ajuste o valor conforme necessário

// Função para verificar a posição de rolagem e adicionar/remover as classes conforme necessário
function handleScroll() {
  if (window.pageYOffset >= scrollPosition) {
    navbar.classList.add("navbar-scrolled");
    select.classList.add("select-scrolled");
  } else {
    navbar.classList.remove("navbar-scrolled");
    select.classList.remove("select-scrolled");
  }
}

// Adiciona um ouvinte de evento para verificar a posição de rolagem durante o scroll
window.addEventListener("scroll", handleScroll);

window.addEventListener('scroll', function() {
var selectElement = document.getElementById('selected');
var bounding = selectElement.getBoundingClientRect();

if (bounding.top < window.innerHeight && bounding.bottom >= 30) {
  selectElement.classList.add('change-color');
} else {
  selectElement.classList.remove('change-color');
}
});