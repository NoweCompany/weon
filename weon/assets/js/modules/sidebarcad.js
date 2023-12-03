document.addEventListener("DOMContentLoaded", function () {
  const sidebar = document.getElementById("sidebar");
  const toggleButton = document.getElementById("toggleButton");

  function openSidebar() {
    sidebar.classList.remove("closed");
    toggleButton.removeEventListener("click", openSidebar);
    toggleButton.addEventListener("click", closeSidebar);
  }

  function closeSidebar() {
    sidebar.classList.add("closed");
    toggleButton.removeEventListener("click", closeSidebar);
    toggleButton.addEventListener("click", openSidebar);
  }

 function AbreFecha() {

    if (openSidebar) {
      closeSidebar();
    } else {
      openSidebar();
    }
  }

  document.getElementById('toggleButton').addEventListener("click", AbreFecha);
});