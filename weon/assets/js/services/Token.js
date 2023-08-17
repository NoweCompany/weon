export default class Token {
  token = this.getAndSetToken()
  constructor() {}

  set _token(token){
    this._token = token
  }

  get token(){
    return this.token
  }

  getAndSetToken(){
    const token = () => {
      const tokenFormated = document.cookie
        .split("; ")
        .find((row) => row.startsWith("token="))
        .split("=")[1];
      return tokenFormated
    }

    return token()
  }
}