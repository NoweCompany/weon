import Messaging from '@/services/Messaging';
import ApiConfig from './apiConfig';
import Auth from '@/services/Auth';

export default class Collection extends ApiConfig {
  private messagingService
  private auth
  constructor(messagingService: Messaging, auth: Auth){
    super()
    this.messagingService = messagingService
    this.auth = auth
  }

  public async getApi() {
    try {
      const response = await fetch(this.url + '/collection',
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
      
      return data.response;
    } catch (e) {
      console.log(e);      
      this.messagingService.send('Falha na conexão com o servidor', false);
    }
  };
}