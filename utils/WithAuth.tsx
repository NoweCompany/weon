import { auth } from '@/services';
import { useRouter } from 'next/router';
import { ElementType, useEffect } from 'react';

export default function WithAuth(WrappedComponent: ElementType) {
  const Wrapper = (props: Object) => {
    const router = useRouter()

    useEffect(() => {
      const token = auth.getToken()
      if(!token){
        window.localStorage.removeItem('weonDataUser')
        router.replace('/')
      }
    }, [])

    return <WrappedComponent {...props} />
  }

  return Wrapper
}
