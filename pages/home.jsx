import NavBar from "../components/Navbar"
import sty from "../styles/Style-Pages/home.module.css"
import IconeNowe from "../components/IconeNowe";
export default function home(){

    return(
        <>
        <NavBar />
        <div className={sty.containerCenter}>
            <img className={sty.img} src="./img/black.png" alt="" />
            <h1 className={sty.imgDescription}> Bem-vindo a weon</h1>
        </div>


<IconeNowe />
        </>
    )
}