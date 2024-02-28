import ApiConfig from './apiConfig';
import Auth from '@/services/Auth';

export default class Collection extends ApiConfig {
  private auth
  constructor(auth: Auth){
    super()
    this.auth = auth
  }

  public async getApi() {
    try {
      const response = await fetch(this.url + '/collection',
        {
          headers:{ 
            "Content-Type": "application/json",
            "Cache-Control": 'max-age=10000',
            "authorization": `Bearer ${this.auth.getToken()}`
          },
        });

      const data = await response.json();
      
      if(response.status !== 200){
        return { error: data.error }
      }
      
      return data.response;
    } catch (e) {
      console.log(e);      
      return { error: 'Falha na conexão com o servidor'}
    }
  };
}