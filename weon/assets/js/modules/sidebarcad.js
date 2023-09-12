document.addEventListener("DOMContentLoaded", function () {
  const sidebar = document.getElementById("sidebar");
  const toggleButton = document.getElementById("toggleButton");

  // Função para verificar o tamanho da tela e ativar/desativar o código
  function checkScreenSize() {
    const screenWidth = window.innerWidth;

    // Verifique o tamanho da tela desejado, por exemplo, 768 pixels
    if (screenWidth >= 1407) {
      sidebar.classList.remove("closed");
      toggleButton.addEventListener("click", function () {
        sidebar.classList.toggle("closed");
      });
    } else {
      // Remova o evento de clique do botão e defina a classe "closed"
      toggleButton.removeEventListener("click", function () {
        sidebar.classList.toggle("closed");
      });
      sidebar.classList.add("closed");
    }
  }

  // Verifique o tamanho da tela quando a página for carregada
  checkScreenSize();

  // Adicione um ouvinte de redimensionamento da janela para verificar o tamanho da tela
  window.addEventListener("resize", checkScreenSize);
});
