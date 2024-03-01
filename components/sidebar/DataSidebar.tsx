import React, { useState, useEffect } from 'react';
import sty from '../../styles/style-components/dataSidebar.module.css';
import { Button } from '@/components/ui/button';
import { Tooltip } from '@nextui-org/react';
import { MoveDown, Plus } from 'lucide-react';
import {
  CommandDialog,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
} from '@/components/ui/command';

import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTrigger,
} from "@/components/ui/drawer"


import Field from '@/interfaces/Field';
interface CollectionInfo {
  collectionName: string,
  fields: Field[]
}

interface SidebarProps {
  collectionsInfo: CollectionInfo[];
  placeholderSelect?: string;
  labelSelect?: string;
  showSelect?: boolean;
  handleClickInCollectionBtn: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>, collectionName: string) => void;
  onButtonClick?: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({
  collectionsInfo,
  placeholderSelect,
  labelSelect,
  showSelect,
  handleClickInCollectionBtn,
  onButtonClick
}) => {
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
                  {
                    collectionsInfo.map((collectionInfo, index) => (
                      <CommandItem key={index}>{collectionInfo.collectionName}</CommandItem>
                    ))
                  }
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
            {collectionsInfo.map((collectionInfo, index) => (
              <Button
                className={sty.sidebarItems}
                variant="outline"
                key={index}
                onClick={(e) => handleClickInCollectionBtn(e, collectionInfo.collectionName)}
              >
                {collectionInfo.collectionName}
              </Button>
            ))}
          </div>
        </div>
      </div>


      <div className={sty.mobileSidebar}>
        <div className={sty.mobileContentSidebar}>
          <div className={sty.mobileSidebarItems}>
            <Drawer>
              <DrawerTrigger asChild>
                <Button className={sty.mobileButtonAction}><Plus /></Button>
              </DrawerTrigger>
              <DrawerContent>
                <div className="mx-auto w-full max-w-sm">
                  <DrawerHeader>
                    <DrawerDescription> O que você deseja fazer?</DrawerDescription>
                  </DrawerHeader>
                  <div className="p-4 pb-0">
                    <div className="flex items-center justify-center space-x-2">
                      <div className={sty.mobileDrawerContent}>
                        <Button className={sty.mobileButtonDrawerContent} onClick={toggleDialog}>
                          Pesquisar
                        </Button>
                      </div>
                    </div>
                  </div>
                  <DrawerFooter>
                    <DrawerClose asChild>
                      <Button variant="ghost"> <MoveDown /> </Button>
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
};

export default Sidebar;
