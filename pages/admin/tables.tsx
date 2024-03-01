import Navbar from "../../components/global/Navbar"
import Sidebar from "../../components/sidebar/AdminSidebar"
import FloatNav from "../../components/global/FloatNav"
import BreadCrumber from "@/components/global/BreadCrumber"
export default function adminTables() {
    const buttonContent = ["Criar"]
    const BreadCrumberRoute = ["Tabelas"]

    return (
        <>
            <Navbar adminPages={true} />
            <Sidebar routeTable={true} />
            <FloatNav title="Tabelas" buttonContent={buttonContent} />
            <BreadCrumber page={BreadCrumberRoute} />
        </>
    )
}