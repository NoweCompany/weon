import sty from "../styles/style-components/sidebar.module.css";
import { AlertTriangle, ActivitySquare, Users, FileSliders, History, Trash, BarChart4 } from 'lucide-react';
import { Button } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger, } from "@/components/ui/tooltip"
import { DropdownMenu, DropdownMenuContent, DropdownMenuLabel, DropdownMenuRadioGroup, DropdownMenuRadioItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { useState } from "react";

export default function Sidebar({ title }) {
    const [position, setPosition] = useState("bottom")
    return (
        <>
            <div className={sty.desktopSidebar}>
                <div className={sty.sidebar}>
                    <div className={sty.sidebarHeader}>
                        <h3>{title}</h3>
                    </div>
                    <div className={sty.sidebarItems}>
                        <TooltipProvider>
                            <Tooltip >
                                <TooltipTrigger><Users /></TooltipTrigger>
                                <TooltipContent side="right">
                                    <p>Usuários</p>
                                </TooltipContent>
                            </Tooltip>
                        </TooltipProvider>
                        <TooltipProvider>
                            <Tooltip >
                                <TooltipTrigger><FileSliders /></TooltipTrigger>
                                <TooltipContent side="right">
                                    <p>Predefinições</p>
                                </TooltipContent>
                            </Tooltip>
                        </TooltipProvider>
                        <TooltipProvider>
                            <Tooltip >
                                <TooltipTrigger><History /></TooltipTrigger>
                                <TooltipContent side="right">
                                    <p>Historico</p>
                                </TooltipContent>
                            </Tooltip>
                        </TooltipProvider>
                        <TooltipProvider>
                            <Tooltip >
                                <TooltipTrigger><Trash /></TooltipTrigger>
                                <TooltipContent side="right">
                                    <p>Lixeira</p>
                                </TooltipContent>
                            </Tooltip>
                        </TooltipProvider>
                        <TooltipProvider>
                            <Tooltip >
                                <TooltipTrigger><BarChart4 /></TooltipTrigger>
                                <TooltipContent side="right">
                                    <p>Dashboard</p>
                                </TooltipContent>
                            </Tooltip>
                        </TooltipProvider>
                    </div>
                </div>
            </div>

            <div className={sty.mobileSidebar}>
                <div className={sty.mobileContentSidebar}>
                    <div className={sty.mobileSidebarItems}>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button className={sty.mobileButtonAbas}>Abas</Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent className="w-56">
                                <DropdownMenuLabel>Admin</DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <DropdownMenuRadioGroup value={position} onValueChange={setPosition}>
                                    <DropdownMenuRadioItem value="Usuários">Usuários</DropdownMenuRadioItem>
                                    <DropdownMenuRadioItem value="Predefinições">Predefinições</DropdownMenuRadioItem>
                                    <DropdownMenuRadioItem value="Historico">Historico</DropdownMenuRadioItem>
                                    <DropdownMenuRadioItem value="Lixeira">Lixeira</DropdownMenuRadioItem>
                                    <DropdownMenuRadioItem value="Dashboard">Dashboard</DropdownMenuRadioItem>
                                </DropdownMenuRadioGroup>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                </div>
            </div>
        </>
    );
}
