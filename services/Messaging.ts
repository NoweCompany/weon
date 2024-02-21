import { toast } from 'sonner'

export default class Messaging{
  send(msg: string, success: boolean){
    if(success){
      toast.success(msg, {
        position: 'top-center',
      })
    }else{
      console.error(msg)
      toast.error(msg, {
        position: 'top-center',
      })
    }
  }
}