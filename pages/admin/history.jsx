import Navbar from "../../components/Navbar"
import Sidebar from "../../components/AdminSidebar"
import FloatNav from "../../components/FloatNav"
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