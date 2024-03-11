import ApiConfig from './apiConfig'
import Auth from '@/services/Auth'

export default class Field extends ApiConfig {
  private auth
  constructor(auth: Auth){
    super()
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
        })
        const data = await response.json()
      
      if(response.status !== 200){
        return { error: data.error }
      }
      
      return data
    } catch (e) {
      console.log(e)      
      return { error:'Falha na conexão com o servidor'}
    }
  }
  
  public async postApi(collectionName: string, fieldName: string, options: {type: string, description: string, required: boolean}) {
    try {
      const response = await fetch(this.url + `/field/${collectionName}`,
        {
          method: 'POST',
          headers:{ 
            "Content-Type": "application/json",
            "authorization": `Bearer ${this.auth.getToken()}`
          },
          body: JSON.stringify({
            collectionName: collectionName,
            fieldName: fieldName,
            options: options
          })
        })
        const data = await response.json()
      
      if(response.status !== 200){
        return { error: data.error }
      }
      
      return data
    } catch (e) {
      console.log(e)      
      return { error:'Falha na conexão com o servidor'}
    }
  }
}