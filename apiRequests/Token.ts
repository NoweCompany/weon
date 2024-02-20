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
        return { error: data.errors[0] }
      }
      
      return data;
    } catch (e) {
      console.log(e);      
      this.messagingService.send('Falha na conexão com o servidor', false);
    }
  };
}