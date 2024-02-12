import Navbar from "../../components/Navbar"
import Sidebar from "../../components/AdminSidebar"
import FloatNav from "../../components/FloatNav"
export default function adminTrash(){
    const buttonContent = ["apagar"]
    return(
        <>
        <Navbar adminPages={true}/>
        <FloatNav title="Lixeira" buttonContent={buttonContent}/>
        <Sidebar routeTrash={true}/>
        
        </>
    )
}