import Navbar from "../../components/Navbar"
import Sidebar from "../../components/Sidebar"
export default function admiTables(){
    return(
        <>
        <Navbar adminPages={true}/>
        <Sidebar routeTable={true}/>


        </>
    )
}