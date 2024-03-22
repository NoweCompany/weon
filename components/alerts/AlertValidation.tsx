import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import sty from "../../styles/style-components/alertConfirmationDelete.module.css"
import { useState } from "react"
import {
    CommandDialog,
} from "@/components/ui/command"

interface props{
    description: string,
    span: string
}
export default function alertValidationDelete({ description, span }: props) {
    const [inputDeletTable, setInputDeletTable] = useState("")
    const [open, setOpen] = useState(false)

    const onChangeInputDeletTable = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInputDeletTable(event.target.value);
    };
    
    const onButtonClickCancelRemoveTable = () => {
        setOpen(false);
    };
    
    //nao sei como implemetna pra deletar elementos 
    
    return (
        <>
            <CommandDialog open={open} onOpenChange={setOpen}>
                <div className={sty.cardcontainer}>
                    <div className={sty.cardtitle}>
                        <h1 className={sty.title}> Deseja apagar essa tabela?</h1>
                    </div>
                    <div className={sty.header}>
                        <h1 className={sty.description}>
                            {description} <span className={sty.span}> {span} </span>
                        </h1>
                    </div>
                    <div className={sty.footer}>
                        <Input onChange={onChangeInputDeletTable} value={inputDeletTable} placeholder="Digite o nome da tabela aqui"></Input>
                        <Button variant="secondary" onClick={onButtonClickCancelRemoveTable}> cancelar </Button>
                        <Button variant="destructive"> sim, deletar. </Button>
                    </div>
                </div>
            </CommandDialog>
        </>
    )
}
