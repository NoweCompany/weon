import sty from "../../styles/style-components/dataform.module.css";
import Field from '@/interfaces/Field';
import React, { ChangeEvent } from 'react';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface Props {
  id: string;
  labelValue: string;

  placeholder: string;
  value: string;

  field: Field
  inputType: string 
  onChangeInput: (e: ChangeEvent<HTMLInputElement>, field: Field) => void;
}

export default function InputGeneric({
  id,
  labelValue,
  placeholder,
  value,
  field,
  inputType,
  onChangeInput,
}: Props) {
  return (
    <div>
      <Label htmlFor={id}>
        {labelValue}
      </Label>
      <Input
        className={sty.input}
        id={id}
        type={inputType}
        value={value}
        onChange={(e: ChangeEvent<HTMLInputElement>) => onChangeInput(e, field)}
        placeholder={placeholder}
      />
    </div>
  );
}
