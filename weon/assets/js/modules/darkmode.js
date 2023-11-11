const darkModeSwitch = document.getElementById("darkModeSwitch") || null;
const htmlElement = document.documentElement;
let stylesheet;

function setLocalStorageItem(name, value) {
    localStorage.setItem(name, value);
}

function getLocalStorageItem(name) {    
    return localStorage.getItem(name) || "";
}

function applyLightTheme() {
    
    const homelogo = document.getElementById('homelogo')
    if (homelogo){
        homelogo.src = "../assets/img/weonpreto.png"
    }

    htmlElement.setAttribute("data-bs-theme", "light");
    htmlElement.classList.add("light-mode");
    stylesheet = document.createElement("link");
    stylesheet.rel = "stylesheet";
    stylesheet.href = "../assets/css/lightmode.css";
    document.head.appendChild(stylesheet);
    setLocalStorageItem("theme", "light");
}

function applyDarkTheme() {

    const homelogo = document.getElementById('homelogo')
    if (homelogo){
        homelogo.src = "../assets/img/weonbranco.png"
    }

    htmlElement.setAttribute("data-bs-theme", "dark");
    htmlElement.classList.add("dark-mode");

    stylesheet = document.createElement("link");
    stylesheet.rel = "stylesheet";
    stylesheet.href = "../assets/css/darkmode.css";
    document.head.appendChild(stylesheet);
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
