document.addEventListener("DOMContentLoaded", function () {
    const sidebar = document.getElementById("sidebar");
    const toggleButton = document.getElementById("toggleButton");
  
    toggleButton.addEventListener("click", function () {
      sidebar.classList.toggle("closed");
    });
  });
  