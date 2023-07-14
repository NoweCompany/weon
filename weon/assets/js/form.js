const form = document.querySelector('.form');
const inpEmail = document.querySelector('#email');
const inpPassword = document.querySelector('#password');
const containerMsg = document.querySelector('.msg')
const url = 'http://localhost:3300'
const urlWebsite = document.location.href.split('/').slice(0, -1).join('/')

import Logado from './modules/Logado.js'

window.addEventListener('load', async e => {
  const logado = new Logado()
  if (await logado.userLogado()) {
    console.log('chamei 2');
    return window.location.assign(`${urlWebsite}/pages/home.html`)
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
      containerMsg.className = 'error'
      containerMsg.textContent = msg

      setTimeout(() => {
        this.cleanMsg()
      }, 1000)

      return
    } else {
      containerMsg.className = 'success'
      containerMsg.textContent = msg

      setTimeout(() => {
        this.cleanMsg()
      }, 1000);

      return
    }
  };

  cleanMsg() {
    containerMsg.innerHTML = ''
    containerMsg.className = 'msg'
    return
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
    if (response.errors) {
      this.msg(response.errors, false);
    } else {
      const token = response.token;
      const maxAge = 60 * 60 * 24 * 7
      document.cookie = `token=${token};max-age=${maxAge}; path=/`;
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