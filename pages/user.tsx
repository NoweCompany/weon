import React from "react";
import sty from "../styles/Style-Pages/user.module.css"
import Navbar from "../components/global/Navbar"
import { Button } from "@/components/ui/button"
import { Mails, Building2, TerminalSquare } from 'lucide-react';
import Auth from "@/services/Auth";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

const user: React.FC = () => {
  const auth = new Auth()

  const handleLogout = () => {
    auth.logout()
  }

  return (
    <>
      <Navbar />
      <Card className={sty.card}>
        <CardHeader className={sty.cardHeader}>
          <CardTitle className={sty.title}>Informações do Usuário</CardTitle>
          <CardDescription>Veja suas informações</CardDescription>
        </CardHeader>
        <CardContent>
          <div className={sty.cardContent}>
            <div className={sty.tooltipArea}>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    <div className={sty.tooltipArea}>
                      <Mails />
                      <h1 className={sty.subtitle}>Email</h1>
                    </div>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Email qual esta em ultilizacao</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
            <h2 className={sty.info}>Nowe@nowe.com</h2>
          </div>
          <div className={sty.cardContent}>
            <div className={sty.tooltipArea}>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    <div className={sty.tooltipArea}>
                      <Building2 />
                      <h1 className={sty.subtitle}>Empresa</h1>
                    </div>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>A companhia a qual está em ultilização</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
            <h2 className={sty.info}>nowe company</h2>
          </div>
          <div className={sty.cardContent}>
            <div className={sty.tooltipArea}>
              <TerminalSquare />
              <h1 className={sty.subtitle}>Informação do sistema</h1>
            </div>
            <h2 className={sty.info}>Versão beta (00.00.01)</h2>
          </div>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button className={sty.btnLogout} variant="destructive">Encerrar Sessão</Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Deseja realmente encerrar sessão?</AlertDialogTitle>
                <AlertDialogDescription>
                  Em futuros acessos à Weon, será necessário inserir novamente suas credenciais. Certifique-se de ter as informações de login à mão na próxima vez que precisar acessar.          </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>
                  Cancelar
                </AlertDialogCancel>
                <Button onClick={handleLogout} variant="destructive">Encerrar</Button>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </CardContent>
      </Card>
    </>
  )
}
export default user
