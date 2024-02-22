import Navbar from "../../components/global/Navbar"
import Sidebar from "../../components/sidebar/AdminSidebar"
import FloatNav from "../../components/global/FloatNav"
import { Breadcrumbs, BreadcrumbItem } from "@nextui-org/react";
import sty from "../../styles/Style-Pages/router.module.css"
import Link from "next/link";
export default function adminTrash(){
    const buttonContent = ["apagar"]
    return(
        <>
         <div className={sty.navegationMobile}>
                <Breadcrumbs>
                    <BreadcrumbItem> <Link href="/admin">Gestão</Link></BreadcrumbItem>
                    <BreadcrumbItem>Lixeira</BreadcrumbItem>
                </Breadcrumbs>
            </div>

        <Navbar adminPages={true}/>
        <Sidebar routeTrash={true}/>
        <FloatNav title="Lixeira" buttonContent={buttonContent}/>
        
        </>
    )
}