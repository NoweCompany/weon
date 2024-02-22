import Messaging from '@/services/Messaging';
import ApiConfig from './apiConfig';
import Auth from '@/services/Auth';

export default class Field extends ApiConfig {
  private messagingService
  private auth
  constructor(messagingService: Messaging, auth: Auth){
    super()
    this.messagingService = messagingService
    this.auth = auth
  }

  public async getApi(collectionName: string) {
    try {
      const response = await fetch(this.url + `/field/${collectionName}`,
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
      this.messagingService.send('Falha na conexão com o servidor', false);
    }
  };
}