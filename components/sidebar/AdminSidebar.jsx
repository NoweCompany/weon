import sty from "../../styles/style-components/sidebar.module.css";
import { Users, FileSliders, History, Trash, BarChart4 } from 'lucide-react';
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Drawer, DrawerClose, DrawerContent, DrawerDescription, DrawerFooter, DrawerHeader, DrawerTrigger } from "@/components/ui/drawer"
import Link from "next/link";

export default function Sidebar({ routeUsers, routeTable, routeHistory, routeTrash, routeDash, routeLog }) {
    return (
        <>
            <div className={sty.desktopSidebar}>
                <div className={sty.sidebar}>
                    <div className={sty.sidebarHeader}>
                        <h1 className={sty.sidebarHeaderContent}> Gestão </h1>
                    </div>
                    <div className={sty.sidebarItems}>
                        <Link href="/admin/tables">
                            <div className={sty.iconContainer}>
                                <FileSliders className={`${sty.customIcon} ${routeTable ? sty.onRoute : ''}`} />
                                <h1 className={routeTable ? sty.onRoute : ''}> Tabelas </h1>
                            </div>
                        </Link>
                        <Link href="/admin/dash">
                            <div className={sty.iconContainer}>
                                <BarChart4 className={`${sty.customIcon} ${routeDash ? sty.onRoute : ''}`} />
                                <h1 className={routeDash ? sty.onRoute : ''}> Dashboard </h1>
                            </div>
                        </Link>
                        <Separator />
                    </div>

                    <div className={sty.sidebarHeaderMid}>
                        <h1 className={sty.sidebarHeaderContent}> Controle </h1>
                    </div>

                    <div className={sty.sidebarItems}>
                    <Link href="/admin/history">
                        <div className={sty.iconContainer}>
                            <History className={`${sty.customIcon} ${routeHistory ? sty.onRoute : ''}`} />
                            <h1 className={routeHistory ? sty.onRoute : ''}> Histórico </h1>
                        </div>
                    </Link>

                    <Link href="/admin/trash">
                        <div className={sty.iconContainer}>
                            <Trash className={`${sty.customIcon} ${routeTrash ? sty.onRoute : ''}`} />
                            <h1 className={routeTrash ? sty.onRoute : ''}> Lixeira </h1>
                        </div>
                    </Link>
                  
                   
                    <Link href="/admin/users">
                        <div className={sty.iconContainer}>
                            <Users className={`${sty.customIcon} ${routeUsers ? sty.onRoute : ''}`} />
                            <h1 className={routeUsers ? sty.onRoute : ''}> Usuários </h1>
                        </div>
                    </Link>
                     </div>
                </div>
            </div>

            <Separator />
            <div className={sty.mobileSidebar}>
                <div className={sty.mobileContentSidebar}>
                    <div className={sty.mobileSidebarItems}>
                        <Drawer>
                            <DrawerTrigger asChild>
                                <Button className={sty.mobileButtonAbas}>abas</Button>
                            </DrawerTrigger>
                            <DrawerContent>
                                <div className="mx-auto w-full max-w-sm">
                                    <DrawerHeader>
                                        <DrawerDescription>Escolha onde quiser ir</DrawerDescription>
                                    </DrawerHeader>
                                    <div className="p-4 pb-0">
                                        <div className="flex items-center justify-center space-x-2">
                                            <div className={sty.mobileDrawerContent}>
                                                <Link href="/admin/tables">
                                                    <Button className={`${sty.mobileButtonDrawerContent} ${routeTable ? sty.onRoute : ''}`} variant="outline">
                                                        Tabelas
                                                    </Button>
                                                </Link>
                                                <Link href="/admin/dash">
                                                    <Button className={`${sty.mobileButtonDrawerContent} ${routeDash ? sty.onRoute : ''}`} variant="outline">
                                                        Dashboard
                                                    </Button>
                                                </Link>
                                                <Link href="/admin/history">
                                                    <Button className={`${sty.mobileButtonDrawerContent} ${routeHistory ? sty.onRoute : ''}`} variant="outline">
                                                        Historico
                                                    </Button>
                                                </Link>
                                                <Link href="/admin/trash">
                                                    <Button className={`${sty.mobileButtonDrawerContent} ${routeTrash ? sty.onRoute : ''}`} variant="outline">
                                                        Lixeira
                                                    </Button>
                                                </Link>
                                                <Link href="/admin/users">
                                                    <Button className={`${sty.mobileButtonDrawerContent} ${routeUsers ? sty.onRoute : ''}`} variant="outline">
                                                        Usuário
                                                    </Button>
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                    <DrawerFooter>
                                        <DrawerClose asChild>
                                            <Button>Fechar</Button>
                                        </DrawerClose>
                                    </DrawerFooter>
                                </div>
                            </DrawerContent>
                        </Drawer>
                    </div>
                </div>
            </div>
        </>
    );
}
