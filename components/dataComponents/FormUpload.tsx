import sty from "../../styles/style-components/uploadForm.module.css"

import FloatNavDados from '../dataComponents/FloatNavDados';
import ButtonContent from '@/interfaces/ButtonContent';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"

import { UploadCloud } from 'lucide-react';

import { upload } from '@/apiRequests/'
import { messaging } from '@/services';

interface DataFormProps {
  collectionName: string,
  setShowFormUpload: React.Dispatch<React.SetStateAction<boolean>>
}


export default function DataForm(
  { collectionName, setShowFormUpload }: DataFormProps) {

  function onButtonClickBack(): void {
    setShowFormUpload(false)
  }

  function onButtonClickSend(): void {
    const inputFile = document.querySelector<HTMLInputElement>('#fileInput')
    const form = document.querySelector<HTMLFormElement>('#uploadForm')

    if (inputFile && form) {
      const file = inputFile.files?.[0];
      const formData = new FormData();

      formData.append('file', file as Blob);
      formData.append('collectionName', collectionName);

      upload.postApi(formData)
        .then(response => {
          if (response?.error) {
            const { error } = response
            return messaging.send(error, false)
          }

          return messaging.send('Enviado', true)
        })
        .catch(error => messaging.send(error, false))
        .finally(() => {
          setShowFormUpload(false)
        })
    }
  }

  const buttonContentForm: ButtonContent[] = [
    {
      name: 'Voltar',
      functionOnClick: onButtonClickBack,
      variant: "secondary"
    },
    {
      name: 'Enviar',
      functionOnClick: onButtonClickSend,
    }
  ]


  return (
    <>
    <BreadCrumber screen={screen} route={route} page={page} />

      <FloatNavDados
        title={collectionName}
        buttonContent={buttonContentForm}
      />
      <Card className={sty.cardBody}>
        <form id="uploadForm">
          <CardTitle className={sty.textContainer}>
            <h1 className={sty.title}>Upload de arquivos</h1>
          </CardTitle>

          <CardHeader className={sty.subtitle}>
            <h4>Arraste e solte os arquivos <span className={sty.destaque}> JSON ou XLSX</span></h4>
          </CardHeader>

          <CardContent className={sty.cardContent}>
            <label htmlFor="fileInput">
              <UploadCloud size="100" className={sty.iconCloud} />
              <input type="file" id="fileInput" accept=".json, .xlsx" className="hidden" required />
            </label>
          </CardContent>
          
          {/* <label htmlFor="fileInput" className={sty.buttonSelectArchive}>
            <span className="text-base">Selecionar arquivo</span>
            <input type="file" id="fileInput" accept=".json, .xlsx" className="hidden" required />
          </label> */}
        </form>
        <CardDescription>
        <Dialog>
      <DialogTrigger asChild>
        <h1 className={sty.needHelp}>Precisa de ajuda?</h1>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className={sty.helpTitle}>Ajuda com importação de arquivo.</DialogTitle>
        </DialogHeader>
         <ScrollArea> 
         <h1 className={sty.helpModalTitle}>1. Erro na importação </h1>
         <h2 className={sty.helpModalContent}>Clique em "Baixar Modelo" para iniciar.
           Após o download, preencha a tabela conforme 
           necessário e tente novamente. Certifique-se 
           de que os títulos da planilha sejam idênticos
           aos da tabela, observando maiúsculas e minúsculas.
           O sucesso do processo depende da atenção às etapas 
           iniciais.
           </h2>
         </ScrollArea>
        <DialogFooter>
        <DialogTrigger asChild>
        <h1 className={sty.close}>Entendi</h1>
      </DialogTrigger>
        </DialogFooter>
      </DialogContent>
    </Dialog>
        </CardDescription>
      </Card>
    </>
  );
}
