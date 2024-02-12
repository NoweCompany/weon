import Navbar from "../../components/Navbar"
import Sidebar from "../../components/AdminSidebar"
import FloatNav from "../../components/FloatNav"
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