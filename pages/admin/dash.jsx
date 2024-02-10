import Navbar from "../../components/Navbar"
import Sidebar from "../../components/Sidebar"
export default function adminDash(){
    return(
        <>
        <Navbar adminPages={true}/>
        <Sidebar routeDash={true}/>


        </>
    )
}