import React, { useState, useEffect } from 'react';
import sty from "../styles/style-components/dataSidebar.module.css";
import { Button } from "@/components/ui/button";
import {Tooltip, button} from "@nextui-org/react";
import {
    CommandDialog,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
    CommandShortcut,
} from "@/components/ui/command";

interface SidebarProps {
    itens: string[];
}

const Sidebar: React.FC<SidebarProps> = ({ itens }) => {
    const [open, setOpen] = useState(false);

    const toggleDialog = () => {
        setOpen((prevOpen) => !prevOpen);
    };

    useEffect(() => {
        const down = (e: KeyboardEvent) => {
            if (e.key === "s" && (e.metaKey || e.ctrlKey)) {
                e.preventDefault();
                toggleDialog();
            }
        };

        document.addEventListener("keydown", down);
        return () => document.removeEventListener("keydown", down);
    }, []);

    return (
        <>
            <div className={sty.desktopSidebar}>
                <div className={sty.sidebar}>
                    <div className={sty.sidebarHeader}>
                        <CommandDialog open={open} onOpenChange={setOpen}>
                            <CommandInput placeholder="Procurar" />
                            <CommandList>
                                <CommandEmpty>Nada encontrado...</CommandEmpty>
                                <CommandGroup heading="tabelas">
                                    {itens.map((item, index) => (
                                        <CommandItem key={index}>{item}</CommandItem>
                                    ))}
                                </CommandGroup>
                            </CommandList>
                        </CommandDialog>
                    </div>
                    <div className={sty.sidebarItems}>
                    <Tooltip className='toolTip' placement="top" content=" Ctrl + S"> 
                        <Button className={sty.buttonSearch} onClick={toggleDialog}>Pesquisar</Button>
                        </Tooltip>
                        {itens.map((item, index) =>(
                            <Button className={sty.sidebarItems} variant="outline"key={index}> {item} </Button>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
};

export default Sidebar;
