import sty from "../styles/Style-Pages/user.module.css"
import Navbar from "../components/Navbar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, } from "@/components/ui/card"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger, } from "@/components/ui/tooltip"
import { Info } from 'lucide-react';

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
          <form>
            <div className="grid w-full items-center gap-4">

            <div className={sty.cardContent}>
            <div className={sty.tooltipArea}>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger>
                        <h1 className={sty.subtitle}>Email</h1>
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
                        <h1 className={sty.subtitle} >Companhia</h1>
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
                <h1 className={sty.subtitle} >Informação do sistema</h1>
                <h2 className={sty.info}>Versão beta (00.00.01)</h2>
              </div>

            </div>
          </form>
        </CardContent>
      </Card>
    </>
  )
}
