

const url = 'https://instrutorcerto.com.br';
const urlWebsite = document.location.href;

import Logado from "./modules/Logado.js";

window.addEventListener('load', async (e) => {
  const logado = new Logado();
  if (!(await logado.userLogado())) {
    return window.location.assign(`${urlWebsite.split('/').slice(0, -2).join('/')}/index.html`);
  } else {
    return;
  }
});

class Drive {
  constructor(selectTable, containerTable, containerMsg, thead, tbody) {
    this.selectTable = selectTable;
    this.containerTable = containerTable;
    this.containerMsg = containerMsg;
    this.thead = thead;
    this.tbody = tbody;
    this.tableData = [];
  }

  async init() {
    await this.addOptions();
    this.initSelect2();
    this.events();
  }

  async addOptions() {
    const headers = new Headers({
      "Content-Type": "application/json",
      "authorization": `Bearer ${this.token()}`
    });

    const response = await fetch(`${url}/template/table`, {
      method: 'GET',
      headers: headers
    });

    if (response.status !== 200) {
      this.msg('Algo deu errado', false);
      return;
    }

    const data = await response.json();
    this.tableData = data.response; // Salva os dados da tabela para uso posterior

    for (const key of this.tableData) {
      const option = document.createElement('option');
      const textOption = document.createTextNode(key.tableName);
      option.appendChild(textOption);
      this.selectTable.appendChild(option);
    }
  }

  token() {
    const token = document.cookie
      .split("; ")
      .find((row) => row.startsWith("token="))
      .split("=")[1];
    return token;
  }

  initSelect2() {
    $(this.selectTable).select2();
  }

  events() {
    $(this.selectTable).on('change', (e) => this.renderTable(e.target.value));
  }

  async renderTable(selectedTable) {
 
    this.thead.innerHTML = '';
    this.tbody.innerHTML = '<button> cadastrar </button>';

    const table = this.tableData.find((data) => data.tableName === selectedTable);
    if (!table) {
      this.msg('Tabela não encontrada.', false);
      return;
    }

    for (const field of table.fields) {
      const th = document.createElement('th');
      const textTh = document.createTextNode(field.key);
      th.appendChild(textTh);
      this.thead.appendChild(th);
    }

    const responseValues = await this.getVeluesApi(table.tableName);
    if (responseValues.status !== 200) {
      const dataValues = await responseValues.json();
      this.msg(dataValues.errors, false);
      return;
    }

    const dataValues = await responseValues.json();
    for (const field of dataValues) {
      const tr = document.createElement('tr');
      for (const key in field) {
        const value = field[key];
        const td = document.createElement('td');
        const textTd = document.createTextNode(value);

        td.appendChild(textTd);
        tr.appendChild(td);
        this.tbody.appendChild(tr);
      }
    }
  }

  async getVeluesApi(tableName) {
    const response = await fetch(`${url}/template/values/${tableName}`, {
      headers: {
        "Content-Type": "application/json",
        "authorization": `Bearer ${this.token()}`
      }
    });

    return response;
  }

  msg(msg, success) {
    if (!success) {
      this.containerMsg.className = 'error';
      this.containerMsg.textContent = msg;

      setTimeout(() => {
        this.cleanMsg();
      }, 1000);

      return;
    } else {
      this.containerMsg.className = 'success';
      this.containerMsg.textContent = msg;

      setTimeout(() => {
        this.cleanMsg();
      }, 1000);

      return;
    }
  }

  cleanMsg() {
    this.containerMsg.className = 'msg';
  }
}

const select = document.querySelector('.selectTable');
const containerTable = document.querySelector('.table');
const thead = document.querySelector('.thead');
const tbody = document.querySelector('.tbody');
const containerMsg = document.querySelector('.msg');

const drive = new Drive(select, containerTable, containerMsg, thead, tbody);
drive.init()