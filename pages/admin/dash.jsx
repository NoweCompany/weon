import Navbar from "../../components/Navbar"
import Sidebar from "../../components/AdminSidebar"
import FloatNav from "../../components/FloatNav"
export default function adminDash(){
    const buttonContent = ["Adicionar"]
    return(
        <>
        <Navbar adminPages={true}/>
        <FloatNav title="Dashboard" buttonContent={buttonContent}/>
        <Sidebar routeDash={true}/>


        </>
    )
}