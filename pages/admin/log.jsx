import Navbar from "../../components/Navbar"
import Sidebar from "../../components/Sidebar"
export default function adminLog(){
    return(
        <>
        <Navbar adminPages={true}/>
        <Sidebar />


        </>
    )
}