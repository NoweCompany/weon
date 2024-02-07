import { Button } from "@/components/ui/button"
import sty from "../styles/Form-login/formlogin.module.css"
import IconeNowe from "../components/IconeNowe";
export default function formLogin() {
    return (
        <div className={sty.background}>
            <div className={sty.mainContainer}>
                <form action="" className={sty.mainform}>
                    <h1 className={sty.formTitle}>Entrar</h1>

                    <div className={sty.inputGroup}>
                        <label className={sty.label} htmlFor="username">Usuário</label>
                        <input className={sty.input} type="text" placeholder="Usúario" name="username" />
                    </div>
                    <div className={sty.inputGroup}>
                        <label className={sty.label} htmlFor="username">Senha</label>
                        <input className={sty.input} type="text" placeholder="Senha" name="password" />
                    </div>
                    <Button>Acessar</Button>

                </form>


                <img className={sty.img} src="/img/black.png" alt="" />
                <IconeNowe />
            </div>
        </div>
    )
}