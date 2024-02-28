import FloatNavDados from './FloatNavDados';
import ButtonContent from '@/interfaces/ButtonContent';

import { upload } from '@/apiRequests/'
import { messaging } from '@/services';

interface DataFormProps {
  collectionName: string,
  setShowFormUpload: React.Dispatch<React.SetStateAction<boolean>>
}

export default function DataForm(
  { collectionName, setShowFormUpload }: DataFormProps) 
{

  function onButtonClickBack(): void{
    setShowFormUpload(false)
  }
  
  function onButtonClickSend(): void{
    const inputFile = document.querySelector<HTMLInputElement>('#fileInput')
    const form = document.querySelector<HTMLFormElement>('#uploadForm')
    
    if (inputFile && form) {
      const file = inputFile.files?.[0];
      const formData = new FormData();
      
      formData.append('file', file as Blob);
      formData.append('collectionName', collectionName);

      upload.postApi(formData)
        .then(response => {   
          if(response?.error ) {
            const { error } = response
            return messaging.send(error , false)
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
      <FloatNavDados 
        title={collectionName}
        buttonContent={buttonContentForm}
      />
      <form className="flex flex-col items-center" id="uploadForm">
        <div className="text-center mb-4">
            <h1 className="text-2xl font-bold">Arraste e solte os arquivos JSON ou XLSX:</h1>
            <h4 className="text-sm">Faça upload de arquivos</h4>
        </div>
        <label htmlFor="fileInput" className="relative flex flex-col items-center justify-center w-64 px-4 py-6 bg-white text-blue rounded-lg shadow-lg tracking-wide uppercase border border-blue cursor-pointer hover:bg-blue hover:text-white">
            <i id="fileIcon" className="mb-2 text-3xl fas fa-cloud-upload-alt"></i>
            <span className="text-base">Selecione um arquivo</span>
            <input type="file" id="fileInput" accept=".json, .xlsx" className="hidden" required/>
        </label>
      </form>
    </>
  );
}
