import Navbar from "../../components/global/Navbar"
import Sidebar from "../../components/sidebar/AdminSidebar"
import FloatNav from "../../components/global/FloatNav"
import BreadCrumber from "@/components/adminComponents/BreadCrumber"
export default function adminHistory() {
    const BreadCrumberRoute = ["histórico"]
    const buttonContent = ["Filtrar"]
    return (
        <>
            <BreadCrumber page={BreadCrumberRoute} />
            <Navbar adminPages={true} />
            <Sidebar routeHistory={true} />
            <FloatNav title="Histórico" buttonContent={buttonContent} />

        </>
    )
}