import Navbar from "../../components/Navbar"
import Sidebar from "../../components/AdminSidebar"
import FloatNav from "../../components/FloatNav"
export default function adminTables(){
    const buttonContent = ["Criar Usuário"]
    return(
        <>
        <Navbar adminPages={true}/>
        <FloatNav title="Usuários" buttonContent={buttonContent}/>
        <Sidebar routeUsers={true}/>

        </>
    )
}