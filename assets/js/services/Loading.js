export default class Loading {
  constructor(loadingComponent){
    this.loadingComponent = loadingComponent
  }

  addLoading(){
    this.loadingComponent.style.display = 'flex'
  }

  removeLoading(){
    this.loadingComponent.style.display = 'none'
  }
}