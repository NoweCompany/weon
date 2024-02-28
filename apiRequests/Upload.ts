import ApiConfig from './apiConfig';
import Auth from '@/services/Auth';

export default class Upload extends ApiConfig {
  private auth
  constructor(auth: Auth){
    super()
    this.auth = auth
  }

  public async postApi(formData: FormData) {
    try {
      const response = await fetch(this.url + `/upload`,
        {
          method: "POST",
          headers:{
            "authorization": `Bearer ${this.auth.getToken()}`
          },
          body: formData
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