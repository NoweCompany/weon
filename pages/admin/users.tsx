import Navbar from "../../components/global/Navbar"
import Sidebar from "../../components/sidebar/AdminSidebar"
import FloatNav from "../../components/global/FloatNav"
import AdminUser from "../../components/adminComponents/AdminUser"
import BreadCrumber from "@/components/global/BreadCrumber"
export default function adminTables(){
    const buttonContent = ["Criar Usuário"]
    const caminho = ["usuário", "Criar Usuário"]
    return(
        <>
        <BreadCrumber page={caminho} screen={''} route={''} />
        <Navbar adminPages={true}/>
        <Sidebar routeUsers={true}/>
        <FloatNav title="Usuários" buttonContent={buttonContent}/>
        <AdminUser />
        
        </>
    )
}