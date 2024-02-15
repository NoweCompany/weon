import React, { useState, useEffect } from 'react';
import sty from '../styles/style-components/dataSidebar.module.css';
import { Button } from '@/components/ui/button';
import { Tooltip} from '@nextui-org/react';
import {
  CommandDialog,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
} from '@/components/ui/command';

  
interface SidebarProps {
  itens: string[];
  placeholderSelect?: string;
  labelSelect?: string;
  showSelect?: boolean;
  onButtonClick?: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ itens, placeholderSelect, labelSelect, showSelect, onButtonClick }) => {
  const [open, setOpen] = useState(false);

  const toggleDialog = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 's' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        toggleDialog();
      }
    };

    document.addEventListener('keydown', down);
    return () => document.removeEventListener('keydown', down);
  }, []);

  return (
    <>
      {/* Desktop */}
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
            <Tooltip className="toolTip" placement="top" content=" Ctrl + S">
              <Button className={sty.buttonSearch} onClick={toggleDialog}>
                Pesquisar
              </Button>
            </Tooltip>
            {itens.map((item, index) => (
              <Button className={sty.sidebarItems} variant="outline" key={index}>
                {item}
              </Button>
            ))}
          </div>
        </div>
      </div>

      {/* Mobile
      <div className={sty.mobileSidebar}>
        <div className={sty.mobileContentSidebar}>
          <div className={sty.mobileSidebarItems}>
            <Drawer>
              <DrawerTrigger asChild>
                <Button className={sty.mobileButtonAction}>Dados</Button>
              </DrawerTrigger>
              <DrawerContent>
                <div className="mx-auto w-full max-w-sm">
                  <DrawerHeader>
                    <DrawerDescription> O que você deseja fazer?</DrawerDescription>
                  </DrawerHeader>
                  <div className="p-4 pb-0">
                    <div className="flex items-center justify-center space-x-2">
                      <div className={sty.mobileDrawerContent}>
                        {itens.map((content, index) => (
                          <Button
                            variant="outline"
                            className={sty.mobileButtonDrawerContent}
                            key={index}
                            onClick={onButtonClick}
                          >
                            {content}
                          </Button>
                        ))}

                        
                        {showSelect && (
                          <Select>
                            <SelectTrigger className="w-[180px]">
                              <SelectValue placeholder={placeholderSelect} />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectGroup>
                                <SelectLabel>{labelSelect}</SelectLabel>
                                <SelectItem value="download"> Baixar</SelectItem>
                                <SelectItem value="upload"> Upload</SelectItem>
                              </SelectGroup>
                            </SelectContent>
                          </Select>
                        )}
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
            </Drawer> */}
          {/* </div>
        </div>
      </div> */}
    </>
  );
};

export default Sidebar;
