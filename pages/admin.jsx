import NavBar from "../components/global/Navbar"
import Sidebar from "../components/sidebar/AdminSidebar"
export default function admin(){
    return(
        <>
         <NavBar adminPages={true} /> 
        <Sidebar />

        </>
    )
}