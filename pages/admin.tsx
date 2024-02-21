import NavBar from "../components/global/Navbar"
import Sidebar from "../components/sidebar/AdminSidebar"

export default function Admin(){
    return(
        <>
        <NavBar adminPages={true} /> 
        <Sidebar />

        </>
    )
}