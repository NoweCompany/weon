import sty from "../styles/Style-Pages/user.module.css"
import Navbar from "../components/global/Navbar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, } from "@/components/ui/card"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger, } from "@/components/ui/tooltip"
import { Button } from "@/components/ui/button"
import { Mails, Building2, TerminalSquare, Palette } from 'lucide-react';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger, } from "@/components/ui/alert-dialog"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import Link from "next/link"
export default function CardWithForm() {
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
                <AlertDialogCancel>Cancelar</AlertDialogCancel>
                <Button variant="destructive">Encerrar</Button>         
                     </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </CardContent>
      </Card>

      {/* <Card className={sty.card}>
        <CardHeader className={sty.cardHeader}>
          <CardTitle className={sty.title}>Temas</CardTitle>
          <CardDescription>deixe a casa como preferir</CardDescription>
        </CardHeader>
        <CardContent>
          <RadioGroup defaultValue="option-one">
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="option-one" id="option-one" />
              <Label className={sty.option} htmlFor="option-one">Light</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="option-two" id="option-two" />
              <Label className={sty.option} htmlFor="option-two">Night</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="option-three" id="option-two" />
              <Label className={sty.option} htmlFor="option-two">Red</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="option-four" id="option-two" />
              <Label className={sty.option} htmlFor="option-two">Blue</Label>
            </div>
          </RadioGroup>
        </CardContent>
      </Card> */}

      <div className={sty.margin}></div>

    </>
  )
}
