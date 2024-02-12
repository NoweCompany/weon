import Navbar from "../../components/Navbar"
import Sidebar from "../../components/AdminSidebar"
export default function adminLog(){
    return(
        <>
        <Navbar adminPages={true}/>
        <Sidebar />


        </>
    )
}