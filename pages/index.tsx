import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { Button } from "@/components/ui/button";
import sty from "../styles/Form-login/formlogin.module.css";
import IconeNowe from "../components/global/IconeNowe";
import { token } from '@/apiRequests/';
import { messaging, auth } from '@/services/';
import { Eye, EyeOff } from 'lucide-react';

export default function FormLogin() {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false); // Novo state

    useEffect(() => {
        if (auth.getToken()) router.replace('/home');
    }, []);

    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();

        if (!email || !password) return messaging.send('Valores invalidos', false);

        const response = await token.postApi(email, password);

        if (response?.error) return messaging.send(response.error, false);

        const { token: userToken, ...userData } = response;
        auth.setToken(userToken);
        auth.setUserData(userData);

        router.replace('/home');
        return;
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

                    <div className={`${sty.inputGroup} ${sty.inputPassword}`}>
                        <label className={sty.label} htmlFor="password">Senha</label>
                        <div className={sty.inputPassword}>
                            <input
                                className={sty.input}
                                type={showPassword ? 'text' : 'password'}
                                placeholder="Senha"
                                name="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />

                            <div className={sty.showPasswordButtonWrapper}>
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className={sty.showPasswordButton}
                                >
                                    {showPassword ? <EyeOff /> : <Eye />}
                                </button>
                            </div>
                        </div>
                    </div>

                    <Button type="submit">Acessar</Button>
                </form>

                <Image className={sty.img} width={300} height={200} src="/img/black.png" alt="" />
                <IconeNowe />
            </div>
        </div>
    );
}
