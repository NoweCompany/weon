import NavBar from "../components/global/Navbar"
import Sidebar from "../components/sidebar/AdminSidebar"
import sty from "../styles/Style-Pages/router.module.css"
import { Breadcrumbs, BreadcrumbItem } from "@nextui-org/react";
import Link from "next/link";

export default function Admin(){
    return(
        <>
         <div className={sty.navegationMobile}>
                <Breadcrumbs>
                    <BreadcrumbItem> <Link href="/admin">Gestão </Link> </BreadcrumbItem>
                </Breadcrumbs>
            </div>
        <NavBar adminPages={true} /> 
        <Sidebar />

        </>
    )
}