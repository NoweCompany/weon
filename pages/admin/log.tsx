import Navbar from "../../components/global/Navbar"
import Sidebar from "../../components/sidebar/AdminSidebar"
export default function adminLog(){
    return(
        <>
        <Navbar adminPages={true}/>
        <Sidebar />


        </>
    )
}