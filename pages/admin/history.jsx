import Navbar from "../../components/global/Navbar"
import Sidebar from "../../components/sidebar/AdminSidebar"
import FloatNav from "../../components/global/FloatNav"
export default function adminHistory(){
  
    const buttonContent = ["Filtrar"]
    return(
        <>
        <Navbar adminPages={true}/>
        <FloatNav title="Histórico" buttonContent={buttonContent}/>
        <Sidebar routeHistory={true}/>

        </>
    )
}