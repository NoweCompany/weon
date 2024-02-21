import Navbar from "../../components/global/Navbar"
import Sidebar from "../../components/sidebar/AdminSidebar"
import FloatNav from "../../components/global/FloatNav"
export default function adminTables(){
    const buttonContent = ["Criar"]

    return(
        <>
        <Navbar adminPages={true}/>
        <FloatNav title="Tabelas" buttonContent={buttonContent}/>
        <Sidebar routeTable={true}/>

        </>
    )
}