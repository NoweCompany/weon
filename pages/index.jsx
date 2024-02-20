import { Button } from "@/components/ui/button";
import sty from "../styles/Form-login/formlogin.module.css";
import IconeNowe from "../components/global/IconeNowe";
import { useEffect, useState } from 'react';

import { token } from '@/apiRequests/';
import { messaging, auth } from '@/services/'
import { useRouter } from 'next/router';

export default function FormLogin() {
    const router = useRouter()
    
    const [email, setEmail] = useState(''); 
    const [password, setPassword] = useState(''); 

    useEffect(() => {
        if(auth.getToken()) router.replace('/home')
    }, [])

    async function handleSubmit(event) {
        event.preventDefault();

        if(!email || !password) return messaging.send('Valores invalidos', false)
        
        const response = await token.postApi(email, password)
            
        if(response?.error) return messaging.send(response.error, false)
    
        const { token: userToken, ...userData} = response
        auth.setToken(userToken)
        auth.setUserData(userData)

        router.replace('/home')
        return
    }

    return (
        <div className={sty.background}>
            <div className={sty.mainContainer}>
                <form className={sty.mainform} onSubmit={handleSubmit}>
                    <h1 className={sty.formTitle}>Entrar</h1>

                    <div className={sty.inputGroup}>
                        <label className={sty.label} htmlFor="username">Usuário</label>
                        <input 
                            className={sty.input} 
                            type="text" 
                            placeholder="Usuário" 
                            name="username" 
                            value={email} 
                            onChange={(e) => setEmail(e.target.value)} 
                        />
                    </div>

                    <div className={sty.inputGroup}>
                        <label className={sty.label} htmlFor="password">Senha</label>
                        <input 
                            className={sty.input} 
                            type="password" 
                            placeholder="Senha" 
                            name="password" 
                            value={password} 
                            onChange={(e) => setPassword(e.target.value)} 
                        />
                    </div>

                    <Button type="submit">Acessar</Button>
                </form>

                <img className={sty.img} src="/img/black.png" alt="" />
                <IconeNowe />
            </div>
        </div>
    );
}
