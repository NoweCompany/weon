import sty from "../styles/Form-login/formlogin.module.css"
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
                    <button className={sty.button}> acessar </button>
                </form>


                <img className={sty.img} src="/img/black.png" alt="" />
                <img className={sty.icon} src="/img/blackIco.png" alt="" />
            </div>
        </div>
    )
}