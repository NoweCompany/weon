import ApiConfig from './apiConfig';
import Auth from '@/services/Auth';

export default class Values extends ApiConfig {
  private auth
  constructor(auth: Auth){
    super()
    this.auth = auth
  }

  public async getApi(collectionName: string) {
    try {
      const response = await fetch(this.url + `/value/${collectionName}/${10000}`,
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
      return { error:'Falha na conexão com o servidor'}
    }
  };

  public async postApi(collectionName: string, values: any[]) {
    try {
      const response = await fetch(this.url + `/value`,
        {
          method: "POST",
          headers:{ 
            "Content-Type": "application/json",
            "authorization": `Bearer ${this.auth.getToken()}`
          },
          body: JSON.stringify({ // Converta o array para uma string JSON
            collectionName,
            values
          })
        });
        
      const data = await response.json();
      
      if(response.status !== 200){
        return { error: data.error }
      }
      
      return data;
    } catch (e) {
      console.log(e);      
      return { error:'Falha na conexão com o servidor'}
    }
  };

  public async deleteApi(collectionName: string, valuesId: any[], permanent: boolean) {
    try {
      const response = await fetch(this.url + `/value/${collectionName}/${permanent}`,
        {
          method: "DELETE",
          headers:{ 
            "Content-Type": "application/json",
            "authorization": `Bearer ${this.auth.getToken()}`
          },
          body: JSON.stringify({ // Converta o array para uma string JSON
            valuesId
          })
        });
        
      const data = await response.json();
      
      if(response.status !== 200){
        return { error: data.error }
      }
      
      return data;
    } catch (e) {
      console.log(e);      
      return { error:'Falha na conexão com o servidor'}
    }
  };

  public async updateApi(collectionName: string, value: {[key: string]: any}, id: string) {
    try {
      const response = await fetch(this.url + `/value/${id}`,
        {
          method: "PUT",
          headers:{ 
            "Content-Type": "application/json",
            "authorization": `Bearer ${this.auth.getToken()}`
          },
          body: JSON.stringify({ // Converta o array para uma string JSON
            collectionName: collectionName,
            values: value
          })
        });
        
      const data = await response.json();
      
      if(response.status !== 200){
        return { error: data.error }
      }
      
      return data;
    } catch (e) {
      console.log(e);      
      return { error:'Falha na conexão com o servidor'}
    }
  };
}