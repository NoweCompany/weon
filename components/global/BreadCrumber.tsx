import { Breadcrumbs, BreadcrumbItem } from "@nextui-org/react";
import sty from "../../styles/Style-Pages/router.module.css";
import Link from "next/link";

interface BreadCrumbProps {
    screen: string;
    route: string;
    page: string[];
}

const BreadCrumb: React.FC<BreadCrumbProps> = ({ page, screen, route }) => {
    return (
        <div className={sty.navegationMobile}>
            <Breadcrumbs>
                <BreadcrumbItem>
                    <Link href={route}>{screen}</Link>
                </BreadcrumbItem>
                {page.map((pageItem, index) => (
                    <BreadcrumbItem key={index}>{pageItem}</BreadcrumbItem>
                ))}
            </Breadcrumbs>
        </div>
    );
};

export default BreadCrumb;
