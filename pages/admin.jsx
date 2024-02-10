import NavBar from "../components/Navbar"
import Sidebar from "../components/Sidebar"
export default function admin(){
    return(
        <>
         <NavBar adminPages={true} /> 
        <Sidebar />

        </>
    )
}