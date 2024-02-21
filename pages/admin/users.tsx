import Navbar from "../../components/global/Navbar"
import Sidebar from "../../components/sidebar/AdminSidebar"
import FloatNav from "../../components/global/FloatNav"
import AdminUser from "../../components/adminComponents/AdminUser"
export default function adminTables(){
    const buttonContent = ["Criar Usuário"]
    return(
        <>
        <Navbar adminPages={true}/>
        <Sidebar routeUsers={true}/>
        <FloatNav title="Usuários" buttonContent={buttonContent}/>
        <AdminUser />
        
        </>
    )
}