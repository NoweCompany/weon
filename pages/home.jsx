import NavBar from "../components/global/Navbar"
import sty from "../styles/Style-Pages/home.module.css"
import IconeNowe from "../components/global/IconeNowe";
export default function home(){

    return(
        <>
        <NavBar />
        <div className={sty.containerCenter}>
            <img className={sty.img} src="./img/black.png" alt="" />
            <h1 className={sty.imgDescription}> gerencie seus documentos com facilidade</h1>
        </div>


<IconeNowe />
        </>
    )
}