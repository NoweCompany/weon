import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import sty from "../../styles/style-components/alertConfirmationDelete.module.css"
import React, { useState } from "react"
import {
    CommandDialog,
} from "@/components/ui/command"

interface props{
    description: string,
    span: string,
    open: boolean,
    inputDelet: string
    onChangeInputDelet: (e: React.ChangeEvent<HTMLInputElement>) => void
    onButtonClickCancelRemove: (e: React.MouseEvent<HTMLButtonElement>) => void
    onButtonClickDelete: (e: React.MouseEvent<HTMLButtonElement>) => void

}
export default function AlertValidationDelete(
    { 
        description,
        span,
        open,
        inputDelet,
        onChangeInputDelet,
        onButtonClickCancelRemove,
        onButtonClickDelete,
    }: props) {
    
    return (
        <>
            <CommandDialog open={open}>
                <div className={sty.cardcontainer}>
                    <div className={sty.cardtitle}>
                        <h1 className={sty.title}> Deseja apagar essa tabela?</h1>
                    </div>
                    <div className={sty.header}>
                        <h1 className={sty.description}>
                            {description} <span className={sty.span}> {`"${span}"`} </span>
                        </h1>
                    </div>
                    <div className={sty.footer}>
                        <Input onChange={onChangeInputDelet} value={inputDelet} placeholder="Digite o nome da tabela aqui"></Input>
                        <Button variant="secondary" onClick={onButtonClickCancelRemove}> cancelar </Button>
                        <Button variant="destructive" onClick={onButtonClickDelete}> sim, deletar. </Button>
                    </div>
                </div>
            </CommandDialog>
        </>
    )
}
