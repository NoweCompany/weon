import Navbar from "../../components/global/Navbar"
import Sidebar from "../../components/sidebar/AdminSidebar"
import FloatNav from "../../components/global/FloatNav"
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