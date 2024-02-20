export default class Messaging{
  send(msg: string, success: boolean){
    if(success){
      console.log(msg)
    }else{
      console.error(msg)
    }
  }
}