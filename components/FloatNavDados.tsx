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

import ButtonContent from '@/interfaces/ButtonContent';
interface FloatNavDadosProps {
  title: string;
  buttonContent: ButtonContent[]
  variant?: "link" | "default" | "destructive" | "outline" | "secondary" | "ghost" | null | undefined;
  variantType?: string;
}

const FloatNavDados: React.FC<FloatNavDadosProps> = ({
  title,
  buttonContent,
  variant,
  variantType,
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
            {
              buttonContent.map((content, index) => {
                const { name, className, id, functionOnClick} = content
                return  (
                  <Button key={index} className={className} variant={variantType} id={id} onClick={functionOnClick ? functionOnClick : () => {}}>
                    {name}
                  </Button>
                )
              })
            }
            <Select>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder='placeholderSelect'/>
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>labelSelect</SelectLabel>
                  <SelectItem value="download">Baixar</SelectItem>
                  <SelectItem value="upload">Upload</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </Card>
      </div>

      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Procurar" />
        <CommandList>
          <CommandEmpty>Nada encontrado...</CommandEmpty>
          <CommandGroup heading="tabelas">

          </CommandGroup>
        </CommandList>
      </CommandDialog>

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
                          <Button
                            className={sty.mobileButtonDrawerContent}
                            onClick={toggleDialog}
                          >
                            Pesquisar
                          </Button>
                            <Select>
                              <SelectTrigger className="w-[180px]">
                                <SelectValue placeholder="placeholderSelect"/>
                              </SelectTrigger>
                              <SelectContent>
                                <SelectGroup>
                                  <SelectLabel>labelSelect</SelectLabel>
                                  <SelectItem value="download">Baixar</SelectItem>
                                  <SelectItem value="upload">Upload</SelectItem>
                                </SelectGroup>
                              </SelectContent>
                            </Select>
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

export default FloatNavDados;
