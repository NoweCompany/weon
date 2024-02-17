import React, { useState, useEffect } from 'react';
import sty from '../styles/style-components/floatnav.module.css';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";

import {
  Drawer,
  DrawerTrigger,
  DrawerContent,
  DrawerHeader,
  DrawerDescription,
  DrawerFooter,
  DrawerClose,
} from '@/components/ui/drawer';

import {
  CommandDialog,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
} from '@/components/ui/command';

import {
  Button
} from '@/components/ui/button';

import {
  Card,
  CardHeader,
  CardTitle
} from "@/components/ui/card";

interface FloatNavProps {
  title: string;
  buttonContent: string[];
  placeholderSelect?: string;
  labelSelect?: string;
  showSelect?: boolean;
  showSearch?: boolean;
  onButtonClick?: () => void;
  itens?: string; 
}

const FloatNav: React.FC<FloatNavProps> = ({
  title,
  buttonContent,
  placeholderSelect,
  labelSelect,
  showSelect,
  showSearch,
  onButtonClick,
  itens,
}) => {
  const [open, setOpen] = useState(false);

  const toggleDialog = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === '' && (e.metaKey || e.ctrlKey)) {
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
      <div className={sty.containerDesktop}>
        <Card className={sty.card}>
          <CardHeader className={sty.cardHeader}>
            <CardTitle className={sty.cardTitle}>{title}</CardTitle>
          </CardHeader>
          <div className={sty.buttonContainer}>
            {buttonContent.map((content, index) => (
              <Button key={index} onClick={onButtonClick}>
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
                    <SelectItem value="download">Baixar</SelectItem>
                    <SelectItem value="upload">Upload</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            )}
          </div>
        </Card>
      </div>

      {showSearch && (
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
      )}

      {/* Mobile */}
      <div className={sty.containerMobile}>
        <Card className={sty.card}>
          <CardHeader className={sty.cardHeader}>
            <CardTitle className={sty.cardTitle}>{title}</CardTitle>
          </CardHeader>
        </Card>

        <div className={sty.mobileSidebar}>
          <div className={sty.mobileContentSidebar}>
            <div className={sty.mobileSidebarItems}>
              <Drawer>
                <DrawerTrigger asChild>
                  <Button className={sty.mobileButtonAction}>abas</Button>
                </DrawerTrigger>
                <DrawerContent>
                  <div className="mx-auto w-full max-w-sm">
                    <DrawerHeader>
                      <DrawerDescription>O que você quer fazer?</DrawerDescription>
                    </DrawerHeader>
                    <div className="p-4 pb-0">
                      <div className="flex items-center justify-center space-x-2">
                        <div className={sty.mobileDrawerContent}>
                          {showSearch && (
                            <Button
                              className={sty.mobileButtonDrawerContent}
                              onClick={toggleDialog}
                            >
                              Pesquisar
                            </Button>
                          )}

                          {buttonContent.map((content, index) => (
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
                                  <SelectItem value="download">Baixar</SelectItem>
                                  <SelectItem value="upload">Upload</SelectItem>
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
              </Drawer>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default FloatNav;
