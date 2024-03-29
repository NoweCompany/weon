import Navbar from "../../components/global/Navbar"
import Sidebar from "../../components/sidebar/AdminSidebar"
import FloatNav from "../../components/global/FloatNav"
import BreadCrumber from "@/components/global/BreadCrumber"
export default function adminDash(){
    const buttonContent = ["Adicionar"]
    const BreadCrumberRoute = ["Route"]
    return(
        <>
        <BreadCrumber page={BreadCrumberRoute} screen={''} route={''} />
        <Navbar adminPages={true}/>
        <Sidebar routeDash={true}/>
        <FloatNav title="Dashboard" buttonContent={buttonContent}/>
        </>
    )
}