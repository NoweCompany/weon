class Presets {
    constructor(container) {
        this.container = container;
        this.event();
    }

    renderFormPreset() {
        this.container.innerHTML = `
            <form id="formPreset">
                <!-- Adicione os campos do formulário aqui -->
                <button type="submit">Salvar</button>
            </form>
        `;
        
        const formPreset = document.querySelector('#formPreset');
        formPreset.addEventListener('submit', e => this.createPreset(e));
    }

    createPreset(e) {
        e.preventDefault();
    }

    event() {
        const userButton = document.getElementById('user');

        userButton.addEventListener('click', () => {
            this.renderFormPreset();
        });
    }
}

const container = document.getElementById('container'); 
const presets = new Presets(container);
