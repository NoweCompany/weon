import configs from '../js/modules/configs.js'
import Logado from './modules/Logado.js'

const form = document.querySelector('.form');
const inpEmail = document.querySelector('#email');
const inpPassword = document.querySelector('#password');
const containerMsg = document.querySelector('.msg')

const url = configs.urlApi
const urlWebsite = configs.urlWebsiteRelativa()

window.addEventListener('load', async e => {
  const logado = new Logado()
  if (await logado.userLogado()) {
    return window.location.assign(`pages/home.html`)
  } else {
    return
  }
})

class FormLogin {
  constructor(email, password) {
    this.crateJsonBody(this.email, this.password)
    this.email = email;
    this.password = password;
  }
  crateJsonBody() {
    const obj =
    {
      email: this.email,
      password: this.password
    }


    return this.body = JSON.stringify(obj)
  }

  validate() {
    return true
  };

  msg(msg, success) {
    if (!success) {
        containerMsg.className = 'alert alert-danger alert-sm';
        containerMsg.textContent = msg;

        setTimeout(() => {
            this.cleanMsg();
        }, 2000); 

        return;
    } else {
        containerMsg.className = 'alert alert-success';
        containerMsg.textContent = msg;

        setTimeout(() => {
            this.cleanMsg();
        }, 1000);

        return;
    }
}

cleanMsg() {
    containerMsg.className = 'alert'; 
    containerMsg.textContent = ''; 
}

  async postApi() {
    try {
      if (!this.validate()) return this.msg('Valores inválidos', false)
      const body = this.crateJsonBody()
      const response = await fetch(url + '/token',
        {
          method: "POST",
          headers:
          {
            "Content-Type": "application/json",
          },
          body: body

        });
      const data = await response.json();
      return data;
    } catch (e) {
      this.msg('Falha na conexão com o servidor', false);
    }
  };

  async init() {
    const response = await this.postApi();
    console.log(response);
    if (response.errors) {
      this.msg(response.errors, false);
    } else {
      const { token } = response;

      console.log(response);
      const maxAge = 60 * 60 * 24 * 7
      document.cookie = `token=${token};max-age=${maxAge}; path=/`;
      const jsonDataUser = JSON.stringify(response.user)
      window.localStorage.setItem('weonDataUser', jsonDataUser)
      window.location.reload()
    }
  };
}

form.addEventListener('submit', e => {
  e.preventDefault();
  const form = new FormLogin(inpEmail.value, inpPassword.value);
  form.init()
  return
})

let btn = document.querySelector('.btn-outline-primary');
btn.addEventListener('click', function () {
  let input = document.querySelector('#password');
  if (input.getAttribute('type') == 'password') {
    input.setAttribute('type', 'text');
  } else {
    input.setAttribute('type', 'password');
  }
});