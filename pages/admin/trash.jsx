import Navbar from "../../components/Navbar"
import Sidebar from "../../components/Sidebar"
export default function adminTrash(){
    return(
        <>
        <Navbar adminPages={true}/>
        <Sidebar routeTrash={true}/>


        </>
    )
}