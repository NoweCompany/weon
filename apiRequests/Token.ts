import Messaging from '@/services/Messaging';
import ApiConfig from './apiConfig';

export default class Token extends ApiConfig {
  private messagingService
  constructor(messagingService: Messaging){
    super()
    this.messagingService = messagingService
  }

  public async postApi(email: string, password: string) {
    try {
      const body = JSON.stringify({email, password})
      const response = await fetch(this.url + '/token',
        {
          method: "POST",
          headers:{ "Content-Type": "application/json"},
          body: body

        });

      const data = await response.json();
      
      if(response.status !== 200){
        
      }
      
      console.log(data);      
      return data;
    } catch (e) {
      return { error: 'Falha na conexão com o servidor' }
    }
  };
}