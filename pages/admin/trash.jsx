import Navbar from "../../components/Navbar"
import Sidebar from "../../components/AdminSidebar"
import FloatNav from "../../components/FloatNav"
export default function adminTrash(){
    const buttonContent = ["apagar"]
    return(
        <>
        <Navbar adminPages={true}/>
        <Sidebar routeTrash={true}/>
        <FloatNav title="Lixeira" buttonContent={buttonContent}/>
        
        </>
    )
}