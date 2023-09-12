// Função para verificar a proporção e aplicar o estilo específico
function verificarProporcao() {
    const largura = window.innerWidth;
    const altura = window.innerHeight;
    const proporcaoDesejada = 711 / 761; // Proporção 711x761

    if (largura / altura === proporcaoDesejada) {
        // A proporção da janela corresponde à proporção desejada
        document.querySelector('.screen').classList.add('.responsive-screen');
    } else {
        // A proporção da janela não corresponde à proporção desejada
        document.querySelector('.screen').classList.remove('responsive-screen');
    }
}

// Verificar a proporção quando a janela for redimensionada
window.addEventListener('resize', verificarProporcao);

// Verificar a proporção quando a página for carregada
window.addEventListener('load', verificarProporcao);
