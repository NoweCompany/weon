import Navbar from "../../components/global/Navbar"
import Sidebar from "../../components/sidebar/AdminSidebar"
import FloatNav from "../../components/global/FloatNav"
import BreadCrumber from "@/components/global/BreadCrumber"
export default function adminTrash(){
    const buttonContent = ["apagar"]
    const BreadCrumberRoute = ["Lixeira"]
    return(
        <>
        <BreadCrumber page={BreadCrumberRoute} />
        <Navbar adminPages={true}/>
        <Sidebar routeTrash={true}/>
        <FloatNav title="Lixeira" buttonContent={buttonContent}/>
        
        </>
    )
}