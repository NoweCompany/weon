document.addEventListener("DOMContentLoaded", function () {
    const darkModeSwitch = document.getElementById("darkModeSwitch") || null;
    const htmlElement = document.documentElement;
    let darkModeStylesheet;

    function setLocalStorageItem(name, value) {
        localStorage.setItem(name, value);
    }

    function getLocalStorageItem(name) {    
        return localStorage.getItem(name) || "";
    }

    function applyLightTheme() {
        htmlElement.setAttribute("data-bs-theme", "light");
        if (darkModeStylesheet) {
            darkModeStylesheet.remove();
        }
        setLocalStorageItem("theme", "light");
    }

    function applyDarkTheme() {
        htmlElement.setAttribute("data-bs-theme", "dark");
        htmlElement.classList.add("dark-mode");
        darkModeStylesheet = document.createElement("link");
        darkModeStylesheet.rel = "stylesheet";
        darkModeStylesheet.href = "../assets/css/darkmode.css";
        document.head.appendChild(darkModeStylesheet);
        setLocalStorageItem("theme", "dark");
    }

    function applyThemeFromLocalStorage() {
        const themeLocalStorage = getLocalStorageItem("theme");
        if (darkModeSwitch) {
            if (themeLocalStorage === "dark") {
                applyDarkTheme();
                darkModeSwitch.checked = true;
            } else {
                applyLightTheme();
                darkModeSwitch.checked = false;
            }
        } else {
            if (themeLocalStorage === "dark") {
                applyDarkTheme();
            } else {
                applyLightTheme();
            }
        }
    }

    if (darkModeSwitch) {
        darkModeSwitch.addEventListener("change", function () {
            if (darkModeSwitch.checked) {
                applyDarkTheme();
            } else {
                applyLightTheme();
            }
        });
    }

    applyThemeFromLocalStorage();
});
