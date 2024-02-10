import Navbar from "../../components/Navbar"
import Sidebar from "../../components/Sidebar"
export default function adminTables(){
    return(
        <>
        <Navbar adminPages={true}/>
        <Sidebar routeUsers={true}/>


        </>
    )
}