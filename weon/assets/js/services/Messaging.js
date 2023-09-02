export default class Messaging {
  constructor(containerMsg){
    this.containerMsg = containerMsg
  }

  msg(msg, success) {
    if (!success) {
      const newPopUp = document.createElement('div')
      newPopUp.className = 'alert alert-danger d-flex mt-1 bottom-0 end-0 h5 mr-5';
      newPopUp.setAttribute('role', 'alert')
      newPopUp.innerHTML = msg;
    
      this.containerMsg.appendChild(newPopUp)

      setTimeout(() => {
          newPopUp.remove()
      }, 3000);

      return;
    } else {
      const newPopUp = document.createElement('div')
      newPopUp.className = 'alert alert-success d-flex mt-1 bottom-0 end-0 h5 mr-5';
      newPopUp.setAttribute('role', 'alert')
      newPopUp.innerHTML = msg;
      this.containerMsg.appendChild(newPopUp)

      setTimeout(() => {
          newPopUp.remove()
      }, 3000);

      return;
    }
  }

  cleanMsg() {
      this.containerMsg.innerHTML = '';
  }
}