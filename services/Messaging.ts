import { toast } from 'sonner'

export default class Messaging{
  send(msg: string, success: boolean){
    if(success){
      toast.success(msg, {
        position: 'top-right',
      })
    }else{
      console.error(msg)
      toast.error(msg, {
        position: 'top-right',
      })
    }
  }
}