import { Breadcrumbs, BreadcrumbItem } from "@nextui-org/react";
import sty from "../../styles/Style-Pages/router.module.css"
import Link from "next/link";

interface BreadCrumberProps {
    page: string[];
}

const BreadCrumber: React.FC<BreadCrumberProps> = ({ page }) => {
    return (
        <>
            <div className={sty.navegationMobile}>
                <Breadcrumbs>

                    <BreadcrumbItem>
                        <Link href="/admin">Gestão </Link>
                    </BreadcrumbItem>

                    {page.map((page, index) => (
                        <BreadcrumbItem key={index}>
                            {page}
                        </BreadcrumbItem>
                    ))}
                </Breadcrumbs>
            </div>
        </>
    )
}

export default BreadCrumber