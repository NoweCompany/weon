import sty from "../../styles/style-components/dataform.module.css";
import {useRef, useEffect} from 'react'

import {
  Card,
  CardContent,
} from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";

import Field from '@/interfaces/Field';
import FloatNavDados from './FloatNavDados';
import ButtonContent from '@/interfaces/ButtonContent';

import { value } from '../../apiRequests/'
import { messaging } from '@/services/';
import { ChangeEvent } from 'react';
import InputFormData from './InputFormData';

interface DataFormProps {
  fields: Field[],
  collectionName: string,
  method: "POST" | "PUT",
  setMethod: React.Dispatch<React.SetStateAction<"POST" | "PUT">>
  setShowFormData: React.Dispatch<React.SetStateAction<boolean>>
  formValue: {_id: string, [key: string]: any} | null
  setFormValue: React.Dispatch<React.SetStateAction<any>>
}

export default function DataForm(
  { method, setMethod, formValue, setFormValue, fields, collectionName, setShowFormData }: DataFormProps) 
{

  const firstInputRef = useRef<HTMLInputElement>(null)

  useEffect(() =>{
    if(firstInputRef.current){
      firstInputRef.current.focus()
    }
  }, [])

  function cleanInputs(){
    const form = document.querySelector('.cardForm') as HTMLFormElement
    const inputs = form.querySelectorAll('input') as NodeListOf<HTMLInputElement>
    for(const input of Array.from(inputs)){
      input.value = ''
    }

    const firstInput = form.querySelector('input')
    if(firstInput){
      firstInput.focus()
    }
  }

  function onButtonClickBack(): void{
    setShowFormData(false)
    setMethod("POST")
    setFormValue({})
  }
  
  function onButtonClickSave(): void{
    const form = document.querySelector('.cardForm')
    const inputs = form?.querySelectorAll('input')

    console.log(formValue)
    

    if(!inputs || inputs.length <= 0) return messaging.send('Não há campos criados para cadastrar', false)
    const allInputsAreEmpty = !formValue || Object.entries(formValue).every(entrie => { 
      if(entrie[0] === "_id") return true
      return !entrie[1] 
    })
    if(allInputsAreEmpty) return messaging.send('Ao menos um campo deve ser preenchido.', false)

    for (const field of fields) {
      const { required, type, currentName, originalName } = field

      if(type === 'bool') continue
      if(required && !formValue[originalName]){
        return messaging.send(`O campo ${currentName} é obrigatório.`, false)
      }
    }

    if(method === 'POST'){
      value.postApi(collectionName, [formValue])
      .then(response => {
        if(response.error) return messaging.send(response.error, false)
        cleanInputs()
        return messaging.send('Cadastro realizado com sucesso', true)
      })
      .catch((error) => {
        return messaging.send(error, false)
      })
      .finally(() => {
        setFormValue({})
      })
    }else{
      const { _id, ...formDataValue} = formValue 
      value.updateApi(collectionName, formDataValue, _id)
      .then(response => {
        if(response.error) return messaging.send(response.error, false)
        return messaging.send('Cadastro realizado com sucesso', true)
      })
      .catch((error) => {
        return messaging.send(error, false)
      })
      .finally(() => {
        setMethod("POST")
        setShowFormData(false)
        setFormValue({})
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
      name: 'Salvar',
      functionOnClick: onButtonClickSave,
    }
  ]

  function onChangeInput(e: ChangeEvent<HTMLInputElement>, field: Field){
    console.log(formValue)
    
    let currentValue = (type: string) => {
      if(type === "bool") {
        const checkbox = e.target.checked
        return checkbox
      }
      else{
        return e.target.value || ''
      }
    }

    setFormValue((prevFormValue: any) => ({
      ...prevFormValue,
      [field.originalName]: currentValue(field.type)
    }))
  }

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
                  {
                  fields && fields.map((field, index) => {
                  
                  return (
                    <div className={sty.inputGroup} key={index}>
                      <div className={sty.fragmentInput}>
                        <InputFormData
                          field={field}
                          formValue={formValue}
                          onChangeInput={onChangeInput}
                        />
                      </div>
                    </div>
                  )
                  })
                  }
                </div>
              </form>
            </ScrollArea>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
