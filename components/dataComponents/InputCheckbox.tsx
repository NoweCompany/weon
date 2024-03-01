import sty from "../../styles/style-components/dataform.module.css"
import Field from '@/interfaces/Field'
import React, { ChangeEvent, useEffect, useState } from 'react'
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";


interface Props {
  id: string
  labelValue: string
  placeholder: string
  checked: boolean
  field: Field
  inputType: string
  onChangeInput: (e: ChangeEvent<HTMLInputElement>, field: Field) => void
}

export default function InputCheckbox({
  id,
  labelValue,
  placeholder,
  checked,
  field,
  inputType,
  onChangeInput,
}: Props) {
  const [checkBoxChecked, setCheckBoxChecked] = useState(checked)

  useEffect(() => {
    setCheckBoxChecked(checked)
  }, [checked])

  function onClickInput(e: React.MouseEvent<HTMLInputElement>) {
    const checkBox = e.target as HTMLInputElement
    setCheckBoxChecked(checkBox.checked)
  }

  return (
    <div>
      <Label htmlFor={id}>
        {labelValue}
      </Label>
      <Input
        className={sty.input}
        id={id}
        type={inputType}
        checked={checkBoxChecked}
        onChange={(e: ChangeEvent<HTMLInputElement>) => onChangeInput(e, field)}
        onClick={onClickInput}
        placeholder={placeholder}
      />
    </div>
  )
}
