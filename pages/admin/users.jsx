import Navbar from "../../components/Navbar"
import Sidebar from "../../components/AdminSidebar"
import FloatNav from "../../components/FloatNav"
import AdminUser from "../../components/admin user/AdminUser"
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