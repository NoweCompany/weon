import Navbar from "../../components/global/Navbar"
import Sidebar from "../../components/sidebar/AdminSidebar"
import FloatNav from "../../components/global/FloatNav"
import AdminUser from "../../components/adminComponents/AdminUser"
import { Breadcrumbs, BreadcrumbItem } from "@nextui-org/react";
import sty from "../../styles/Style-Pages/router.module.css"
import Link from "next/link";
export default function adminTables(){
    const buttonContent = ["Criar Usuário"]
    return(
        <>
         <div className={sty.navegationMobile}>
                <Breadcrumbs>
                    <BreadcrumbItem> <Link href="/admin">Gestão </Link> </BreadcrumbItem>
                    <BreadcrumbItem>Usuário</BreadcrumbItem>
                    <BreadcrumbItem>Criar usuário</BreadcrumbItem>
                </Breadcrumbs>
            </div>

        <Navbar adminPages={true}/>
        <Sidebar routeUsers={true}/>
        <FloatNav title="Usuários" buttonContent={buttonContent}/>
        <AdminUser />
        
        </>
    )
}