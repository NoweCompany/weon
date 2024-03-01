import { ChangeEvent } from 'react';
import Field from '@/interfaces/Field';

import InputNumber from './InputNumber';
import InputGeneric from './InputGeneric';
import InputCheckbox from './InputCheckbox';

interface Props {
  field: Field
  formValue: { _id: string, [key: string]: any} | null
  onChangeInput: (e: ChangeEvent<HTMLInputElement>, field: Field) => void
}

export default function InputFormData({ field, formValue, onChangeInput }: Props){
  function setInput(type: string) {

    if (type === 'date') {
      const value = formValue ? formValue[field.originalName] : '';
      return (
        <InputGeneric
          field={field}
          value={value}
          id={field.originalName}
          labelValue={field.currentName}
          placeholder={field.currentName}
          inputType='date'
          onChangeInput={onChangeInput}
        />
      );
      
    } 
    else if (type === 'bool') {
      const checked = formValue ? formValue[field.originalName] === "true" : false
      
      return (
        <InputCheckbox
          field={field}
          checked={checked}
          id={field.originalName}
          labelValue={field.currentName}
          placeholder={field.currentName}
          inputType='checkbox'
          onChangeInput={onChangeInput}
        />
      );
    } 

    else if (type === 'long' || type === 'double' ) {
      const value = formValue ? formValue[field.originalName] : 0;
      const step = type === 'long' ? '1' : '0.001'
      return (
        <InputNumber
          field={field}
          value={value}
          id={field.originalName}
          labelValue={field.currentName}
          placeholder={field.currentName}
          step={step}
          onChangeInput={onChangeInput}
        />
      )
    } 

    else {
      const value = formValue ? formValue[field.originalName] : '';
      
      return (
        <InputGeneric
          field={field}
          value={value}
          id={field.originalName}
          labelValue={field.currentName}
          placeholder={field.currentName}
          inputType='text'
          onChangeInput={onChangeInput}
        />
      );
    }

  }
  

  return (
    <>
      {
        setInput(field.type)
      }
    </>
  )
}