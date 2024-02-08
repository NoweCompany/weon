import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import sty from "../styles/style-components/floatnav.module.css";

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
           
            <Card className={sty.cardButtonMobile}>
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
        </>
    );
}
