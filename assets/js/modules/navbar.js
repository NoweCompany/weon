document.addEventListener('DOMContentLoaded', () => {
    const navbarToggle = document.getElementById('navbarToggle');
    const navbarLinks = document.getElementById('navbarLinks');

    navbarToggle.addEventListener('click', () => {
        // Alterna a visibilidade dos links da navbar
        if (navbarLinks.style.display === 'block') {
            navbarLinks.style.display = 'none';
        } else {
            navbarLinks.style.display = 'block';
        }
    });
});

