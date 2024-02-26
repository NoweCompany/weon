import sty from "../styles/style-components/dataform.module.css";
import {
  Card,
  CardContent,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";

import Field from '@/interfaces/Field';
import FloatNavDados from './FloatNavDados';
import ButtonContent from '@/interfaces/ButtonContent';

import { value } from '../apiRequests/'
import { messaging } from '@/services/';

interface DataFormProps {
  fields: Field[],
  collectionName: string,
  method: "POST" | "PUT",
  setShowFormData: React.Dispatch<React.SetStateAction<boolean>>
}

export default function DataForm({ fields, method, collectionName, setShowFormData }: DataFormProps) {

  function onButtonClickBack(): void{
    setShowFormData(false)
  }
  function onButtonClickSave(): void{
    
    const form = document.querySelector('.cardForm')
    const inputs = form?.querySelectorAll('input')

    if(!inputs || inputs.length <= 0) return messaging.send('Não há campos criados para cadastrar', false)

    let newData: {[key: string]: any} = {}
    let allInputsAreEmpty = true

    for (const input of Array.from(inputs)) {
      const { id, type } = input
      const isCheckBox = type === "checkbox"
      let value
      isCheckBox ? 
        value = input.checked:
        value = input.value

      if(value || isCheckBox) allInputsAreEmpty = false

      newData[id] = value
    }
    console.log(newData);
    if(allInputsAreEmpty) return messaging.send('Ao menos um campo deve ser preenchido.', false)

    value.postApi(collectionName, [newData])
      .then(response => {
        if(response.error) return messaging.send(response.error, false)
        return messaging.send('Cadastro realizado com sucesso', true)
      })
      .catch((error) => {
        return messaging.send(error, false)
      })
  }

  const buttonContentForm: ButtonContent[] = [
    {
      name: 'Voltar',
      functionOnClick: onButtonClickBack,
    },
    {
      name: 'Salvar',
      functionOnClick: onButtonClickSave,
    }
  ]

  return (
    <>
      <FloatNavDados 
        title={collectionName}
        buttonContent={buttonContentForm}
      />  
      <div className={sty.containerMain}>
        <Card className={sty.card}>
          <CardContent>
            <ScrollArea className={sty.scrollArea}>
              <form className="cardForm">
                <div className={sty.formContent}>
                  {fields && fields.map((field, index) => (
                    <div className={sty.inputGroup} key={index}>
                      <div className={sty.fragmentInput}>
                        <Label htmlFor={field.originalName}>{field.currentName}</Label>
                        <Input id={field.originalName} placeholder={field.currentName} />
                      </div>
                    </div>
                  ))}
                </div>
              </form>
            </ScrollArea>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
