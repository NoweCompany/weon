import Navbar from "../../components/global/Navbar"
import Sidebar from "../../components/sidebar/AdminSidebar"
import FloatNav from "../../components/global/FloatNav"
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