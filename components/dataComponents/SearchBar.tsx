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
import React, { useEffect, useState } from 'react';

import { Input } from "@/components/ui/input"
import Field from '@/interfaces/Field';
import { Value } from '@/interfaces/Values';
interface PropsSeachbar {
    tableColumns: Field[],
    setTableRows: React.Dispatch<React.SetStateAction<Value[]>>
    tableRows: Value[]
}

export default function SearchBar({
        tableColumns,
        setTableRows,
        tableRows
    }: PropsSeachbar) {

    const [tableRowOriginal, setTableRowOriginal] = useState<Value[]>(tableRows)
    const [fieldSelected, setFieldSelected] = useState<string>('');

    function onChageInputValue(e: React.ChangeEvent<HTMLInputElement>){
        if(!fieldSelected) return
        const inputvalue = String((e.target.value).trim())
        
        if(inputvalue){
            const arrFiltred = tableRows.filter((value) => {
                const valueTableRow = String(value[fieldSelected]).trim()
                
                if(valueTableRow.includes(inputvalue)){
                    return value
                }
            })

            setTableRows(arrFiltred)
        }else{
            setTableRows(tableRowOriginal)
        }
    }

    function onChageSelectValue(value: string){
        setFieldSelected(value)
    }

    return (
        <>
        <div className={sty.containerDesktop}>
            <Card className={sty.card}>
                <CardTitle className={sty.CardTitle}>
                    <h1> Buscar por </h1>
                </CardTitle>
                <CardHeader className={sty.cardHeader}>
                    <Input onChange={onChageInputValue} className={sty.input} type="text" placeholder="Valor" />
                </CardHeader>
                <CardTitle className={sty.CardTitle}>
                    <h1> no campo </h1>
                </CardTitle>
                <div className={sty.buttonContainer}>
                    <Select onValueChange={onChageSelectValue}>
                        <SelectTrigger className={sty.select}>
                            <SelectValue placeholder="Campos" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectLabel> Campos </SelectLabel>
                                {
                                    tableColumns.map((field) => {
                                        return (
                                            <SelectItem key={field.key} value={field.originalName}>
                                                {field.currentName}
                                            </SelectItem>
                                        )
                                    })
                                }
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                </div>
            </Card>
        </div>
        </>
    )
}