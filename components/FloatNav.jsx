import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import sty from "../styles/style-components/floatnav.module.css";
import { Drawer, DrawerClose, DrawerContent, DrawerDescription, DrawerFooter, DrawerHeader, DrawerTitle, DrawerTrigger, } from "@/components/ui/drawer"

export default function FloatNav({ title, buttonContent, placeholderSelect, labelSelect, showSelect }) {
    return (
        <>
            <div className={sty.containerDesktop}>
                <Card className={sty.card}>
                    <CardHeader className={sty.cardHeader}>
                        <CardTitle className={sty.cardTitle}>{title}</CardTitle>
                    </CardHeader>
                    <div className={sty.buttonContainer}>
                        {buttonContent.map((content, index) => (
                            <Button key={index}>{content}</Button>
                        ))}
                        {showSelect && (
                            <Select>
                                <SelectTrigger className="w-[180px]">
                                    <SelectValue placeholder={placeholderSelect} />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        <SelectLabel> {labelSelect} </SelectLabel>
                                        <SelectItem value="download"> Baixar</SelectItem>
                                        <SelectItem value="upload"> Upload</SelectItem>
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                        )}
                    </div>
                </Card>
            </div>

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
                                                    {buttonContent.map((content, index) => (
                                                        <Button variant="outline" className={sty.mobileButtonDrawerContent} key={index}>{content}</Button>
                                                    ))}
                                                    {showSelect && (
                                                        <Select>
                                                            <SelectTrigger className="w-[180px]">
                                                                <SelectValue placeholder={placeholderSelect} />
                                                            </SelectTrigger>
                                                            <SelectContent>
                                                                <SelectGroup>
                                                                    <SelectLabel> {labelSelect} </SelectLabel>
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
                                                <Button variant="outline">Fechar</Button>
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
