import sty from "../styles/style-components/sidebar.module.css";
import { Users, FileSliders, History, Trash, BarChart4 } from 'lucide-react';
import { Button } from "@/components/ui/button"
import { Tooltip } from "@nextui-org/react";
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from "@/components/ui/drawer"

import Link from "next/link";

export default function Sidebar({ routeUsers, routeTable, routeHistory, routeTrash, routeDash, routeLog }) {
    return (
        <>
            <div className={sty.desktopSidebar}>
                <div className={sty.sidebar}>
                    <div className={sty.sidebarItems}>

                        <Tooltip className={sty.toolTip} content="Tabelas" placement="right">
                            <Link href="/admin/tables">
                                <FileSliders className={routeTable ? sty.onRoute : ''} />
                            </Link>
                        </Tooltip>


                        <Tooltip className={sty.toolTip} content="Dashboard" placement="right">
                            <Link href="/admin/dash">
                                <BarChart4 className={routeDash ? sty.onRoute : ''} />
                            </Link>
                        </Tooltip>


                        <Tooltip className={sty.toolTip} content="Histórico" placement="right">
                            <Link href="/admin/history">
                                <History className={routeHistory ? sty.onRoute : ''} />
                            </Link>
                        </Tooltip>


                        <Tooltip className={sty.toolTip} content="Lixeira" placement="right">
                            <Link href="/admin/trash">
                                <Trash className={routeTrash ? sty.onRoute : ''} />
                            </Link>
                        </Tooltip>

                        
                        <Tooltip className={sty.toolTip} content="Usuários" placement="right">
                            <Link href="/admin/users">
                                <Users className={routeUsers ? sty.onRoute : ''} />
                            </Link>
                        </Tooltip>

                    </div>
                </div>
            </div>

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
