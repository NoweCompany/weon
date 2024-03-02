import sty from '../../styles/style-components/searchBar.module.css'

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
    Card,
    CardHeader,
    CardTitle
} from "@/components/ui/card";

import { Input } from "@/components/ui/input"

export default function SearchBar() {
    return (
        <>
            <div className={sty.containerDesktop}>
                <Card className={sty.card}>
                    <CardTitle className={sty.CardTitle}>
                        <h1> Buscar por </h1>
                    </CardTitle>
                    <CardHeader className={sty.cardHeader}>
                        <Input className="w-[200px]" type="text" placeholder="elemento" />
                    </CardHeader>
                    <div className={sty.buttonContainer}>
                        <Select>
                            <SelectTrigger className="w-[300px]">
                                <SelectValue placeholder="Campos" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    <SelectLabel> Campos </SelectLabel>
                                    <SelectItem value="map"> map</SelectItem>
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                    </div>
                </Card>
            </div>
        </>
    )
}