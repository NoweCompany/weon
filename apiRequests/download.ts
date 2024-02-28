import ApiConfig from './apiConfig';
import Auth from '@/services/Auth';

export default class Download extends ApiConfig {
  private auth
  constructor(auth: Auth){
    super()
    this.auth = auth
  }

  public async postApi(collectionName: string) {
    try {
      const response = await fetch(this.url + `/download/${collectionName}`,
        {
          method: "POST",
          headers:{ 
            "Content-Type": "application/json",
            "authorization": `Bearer ${this.auth.getToken()}`
          },
        });

      const data = await response.json();
      
      if(response.status !== 200){
        return { error: data.error }
      }
      
      return data;
    } catch (e) {
      console.log(e);      
      return { error: 'Falha na conexão com o servidor' }
    }
  };

  public async getApi(collectionName: string) {
    try {
      const response = await fetch(this.url + `/download/${collectionName}`,
        {
          headers:{ 
            "Content-Type": "application/json",
            "authorization": `Bearer ${this.auth.getToken()}`
          },
        });

      const data = await response.json();
      
      if(response.status !== 200){
        return { error: data.error }
      }
      
      return data;
    } catch (e) {
      console.log(e);      
      return { error: 'Falha na conexão com o servidor' }
    }
  };
}