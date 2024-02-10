import Navbar from "../../components/Navbar"
import Sidebar from "../../components/Sidebar"
export default function adminHistory(){
    return(
        <>
        <Navbar adminPages={true}/>
        <Sidebar routeHistory={true}/>


        </>
    )
}