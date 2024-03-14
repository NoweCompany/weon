import TableListagem from "../components/adminComponents/TableListagem";
import { collection } from '@/apiRequests';
import { messaging } from "@/services";
import { useEffect, useState } from "react";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input"
export default function Test() {

    return (
        <>
                   {/* alert confirmação para delete */}
                   <AlertDialog>
                <AlertDialogTrigger>Open</AlertDialogTrigger>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Deseja deletar essa tabela?</AlertDialogTitle>
                        <AlertDialogDescription>
                            Essa ação irá mover essa tabela e os dados
                            diretamente para a lixeira, para confirmar 
                            sua deleção favor reescreva <span> (nome tabela) </span> 
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <Input placeholder="Reescreva aqui"></Input>
                        <Button variant="secondary">Cancelar</Button>
                        <AlertDialogCancel> Deletar </AlertDialogCancel>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>

        </>
    );
}
