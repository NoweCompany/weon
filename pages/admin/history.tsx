import Navbar from "../../components/global/Navbar"
import Sidebar from "../../components/sidebar/AdminSidebar"
import FloatNav from "../../components/global/FloatNav"
import { Breadcrumbs, BreadcrumbItem } from "@nextui-org/react";
import sty from "../../styles/Style-Pages/router.module.css"
import Link from "next/link";
export default function adminHistory(){
  
    const buttonContent = ["Filtrar"]
    return(
        <>
         <div className={sty.navegationMobile}>
                <Breadcrumbs>
                    <BreadcrumbItem> <Link href="/admin">Gestão </Link> </BreadcrumbItem>
                    <BreadcrumbItem>Histórico</BreadcrumbItem>
                </Breadcrumbs>
            </div>

        <Navbar adminPages={true}/>
        <Sidebar routeHistory={true}/>
        <FloatNav title="Histórico" buttonContent={buttonContent}/>

        </>
    )
}