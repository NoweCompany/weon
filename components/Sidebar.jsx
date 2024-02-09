import sty from "../styles/style-components/sidebar.module.css";
import { Users, FileSliders, History, Trash, BarChart4 } from 'lucide-react';
import { Button } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger, } from "@/components/ui/tooltip"
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

export default function Sidebar({ title }) {
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
                <Button className={sty.mobileButtonDrawerContent} variant="outline"> Usuário</Button>
                <Button className={sty.mobileButtonDrawerContent} variant="outline"> Predefinições</Button>
                <Button className={sty.mobileButtonDrawerContent} variant="outline"> Historico</Button>
                <Button className={sty.mobileButtonDrawerContent} variant="outline"> Lixeira</Button>
                <Button className={sty.mobileButtonDrawerContent} variant="outline"> Dashboard</Button>
                </div>
            </div>
          </div>
          <DrawerFooter>
            <DrawerClose asChild>
              <Button variant="outline">Fechar</Button>
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
