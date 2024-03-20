import React, { useState, useEffect } from 'react'
import sty from '../../styles/style-components/floatnav.module.css'
import BreadCrumber from "../global/BreadCrumber"

import { MoveDown, Plus } from 'lucide-react'

import {
  Drawer,
  DrawerTrigger,
  DrawerContent,
  DrawerHeader,
  DrawerDescription,
  DrawerFooter,
  DrawerClose,
} from '@/components/ui/drawer'

import {
  CommandDialog,
  CommandInput,
  CommandList,
  CommandItem,
  CommandEmpty,
  CommandGroup,
} from '@/components/ui/command'

import {
  Button
} from '@/components/ui/button'

import {
  Card,
  CardHeader,
  CardTitle
} from "@/components/ui/card"

import ButtonContent from '@/interfaces/ButtonContent'
import { Input } from "@/components/ui/input"
import { value } from '@/apiRequests'

interface FloatNavTablesProps {
  title: string
  buttonContent: ButtonContent[]
  input: {
    tittle: string,
    value: string,
    onChangeInput: (e: React.ChangeEvent<HTMLInputElement>) => void
  }
}

const FloatNavTables: React.FC<FloatNavTablesProps> = ({
  title,
  buttonContent,
  input
}) => {
  const [open, setOpen] = useState(false)
  const [inputWithoutChange, setInputWithoutChange] = useState(input.value)

  const toggleDialog = () => {
    setOpen((prevOpen) => !prevOpen)
  }

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === '' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        toggleDialog()
      }
    }

    document.addEventListener('keydown', down)
    return () => document.removeEventListener('keydown', down)
  }, [])

  const screen = "Tabelas"
  const page = [title]
  const route = "none"

  return (
    <>

      <BreadCrumber screen={screen} route={route} page={page} />

      {/* Desktop */}
      <div className={sty.containerDesktop}>
        <Card className={sty.card}>
          <CardHeader className={sty.cardHeader}>
            <CardTitle className={sty.cardTitle}>{title}</CardTitle>
          </CardHeader>
            <Input 
            className={ input.value === inputWithoutChange ? sty.input : sty.inputChanged} 
            type="text" 
            id='collectionName' 
            placeholder={input.tittle} 
            value={input.value}
            onChange={(e) => input.onChangeInput(e)}
            />
          <div className={sty.buttonContainer}>
            {
              buttonContent && buttonContent.map((content, index) => {
                const { name, className, disabled, id, functionOnClick, variant } = content
                return (
                  <Button
                    key={index}
                    className={className}
                    variant={variant ? variant : undefined}
                    id={id}
                    onClick={(event) => {
                      functionOnClick ?
                        functionOnClick(event) :
                        () => { }
                    }}
                    disabled={disabled}
                  >
                    {name}
                  </Button>
                )
              })
            }
          </div>
        </Card>
      </div>

      <CommandDialog open={open} onOpenChange={setOpen}>
              <CommandInput placeholder="Procurar" />
              <CommandList>
                <CommandEmpty>Nada encontrado...</CommandEmpty>
                <CommandGroup heading="tabelas">
                  {/* {
                    collectionName.map((collectionName, index) => (
                      <CommandItem key={index}>{collectionName.collectionName}</CommandItem>
                    ))
                  } */}
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
                  <Button className={sty.mobileButtonAction}><Plus /></Button>
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

                          {buttonContent && buttonContent.map((content, index) => {
                            const { name, className, disabled, id, functionOnClick, variant } = content
                            return (
                              <Button
                                key={index}
                                className={className}
                                variant={variant ? variant : undefined}
                                id={id}
                                onClick={(event) => {
                                  functionOnClick ?
                                    functionOnClick(event) :
                                    () => { }
                                }}
                                disabled={disabled}
                              >
                                {name}
                              </Button>
                            )
                          })}
                        </div>
                      </div>
                    </div>
                    <DrawerFooter>
                      <DrawerClose asChild>
                        <Button variant="ghost"> <MoveDown/></Button>
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
  )
}

export default FloatNavTables
