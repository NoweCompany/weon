document.addEventListener("DOMContentLoaded", function () {
    const darkModeSwitch = document.getElementById("darkModeSwitch") || null;
    const htmlElement = document.documentElement;
    let darkModeStylesheet;

    function setCookie(name, value, days) {
        const date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        const expires = "expires=" + date.toUTCString();
        document.cookie = name + "=" + value + ";" + expires + ";path=/";
    }

    function getCookie(name) {
        const decodedCookie = decodeURIComponent(document.cookie);
        const cookies = decodedCookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            if (cookie.startsWith(name + '=')) {
                return cookie.substring(name.length + 1);
            }
        }
        return "";
    }

    function applyLightTheme() {
        htmlElement.setAttribute("data-bs-theme", "light");
        if (darkModeStylesheet) {
            darkModeStylesheet.remove();
        }
        setCookie("theme", "light", 365);
    }

    function applyDarkTheme() {
        htmlElement.setAttribute("data-bs-theme", "dark");
        htmlElement.classList.add("dark-mode");
        darkModeStylesheet = document.createElement("link");
        darkModeStylesheet.rel = "stylesheet";
        darkModeStylesheet.href = "../assets/css/darkmode.css";
        document.head.appendChild(darkModeStylesheet);
        setCookie("theme", "dark", 365);
    }

    function applyThemeFromCookie() {
        const themeCookie = getCookie("theme");
        if(darkModeSwitch){
            if (themeCookie === "dark") {
                applyDarkTheme();
                darkModeSwitch.checked = true;
            } else {
                applyLightTheme();
                darkModeSwitch.checked = false;
            }
        }else{
            if (themeCookie === "dark") {
                applyDarkTheme();
            } else {
                applyLightTheme();
            }
        }
    }

    if(darkModeSwitch){
        darkModeSwitch.addEventListener("change", function () {
            if (darkModeSwitch.checked) {
                applyDarkTheme();
            } else {
                applyLightTheme();
            }
        });
    }

    applyThemeFromCookie();
});
