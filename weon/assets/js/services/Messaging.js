export default  class Messaging {
  constructor(containerMsg){
    this.containerMsg = containerMsg
  }

  msg(msg, success) {
    if (!success) {
        this.containerMsg.className = 'alert alert-danger d-flex mt-4 position-absolute bottom-0 end-0 h5 mr-5';
        this.containerMsg.setAttribute('role', 'alert')
        this.containerMsg.textContent = msg;

        setTimeout(() => {
            this.cleanMsg();
        }, 3000);

        return;
    } else {
        this.containerMsg.className = 'alert alert-success d-flex mt-4 position-absolute bottom-0 end-0 h5 mr-5';

        this.containerMsg.setAttribute('role', 'alert')
        this.containerMsg.textContent = msg;

        setTimeout(() => {
            this.cleanMsg();
        }, 3000);

        return;
    }
  }

  cleanMsg() {
      this.containerMsg.className = 'msg';
  }
}