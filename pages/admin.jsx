import NavBar from "../components/Navbar"
import Sidebar from "../components/AdminSidebar"
export default function admin(){
    return(
        <>
         <NavBar adminPages={true} /> 
        <Sidebar />

        </>
    )
}