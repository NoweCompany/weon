import Navbar from "../../components/global/Navbar"
import Sidebar from "../../components/sidebar/AdminSidebar"
import FloatNav from "../../components/global/FloatNav"
import sty from "../../styles/Style-Pages/router.module.css"
import { Breadcrumbs, BreadcrumbItem } from "@nextui-org/react";
import Link from "next/link";
export default function adminTables(){
    const buttonContent = ["Criar"]

    return(
        <>
         <div className={sty.navegationMobile}>
                <Breadcrumbs>
                    <BreadcrumbItem> <Link href="/admin">Gestão </Link> </BreadcrumbItem>
                    <BreadcrumbItem>Tabelas</BreadcrumbItem>
                </Breadcrumbs>
            </div>

        <Navbar adminPages={true}/>
        <Sidebar routeTable={true}/>
        <FloatNav title="Tabelas" buttonContent={buttonContent}/>

        </>
    )
}