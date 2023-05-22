// Obtém o elemento da barra de navegação
const navbar = document.getElementById("navbar");

// Define a posição de rolagem que ativa a mudança de cor
const scrollPosition = 1; // Ajuste o valor conforme necessário

// Função para verificar a posição de rolagem e adicionar/remover a classe conforme necessário
function handleScroll() {
  if (window.pageYOffset >= scrollPosition) {
    navbar.classList.add("navbar-transparent");
    navbar.classList.remove("navbar-fixed");
  } else {
    navbar.classList.add("navbar-fixed");
    navbar.classList.remove("navbar-transparent");
  }
}

// Adiciona um ouvinte de evento para verificar a posição de rolagem durante o scroll
window.addEventListener("scroll", handleScroll);
