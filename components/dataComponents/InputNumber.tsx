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
  step: string

  field: Field
  onChangeInput: (e: ChangeEvent<HTMLInputElement>, field: Field) => void;
}

export default function InputText({
  id,
  labelValue,
  placeholder,
  value,
  field,
  step,
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
        type='number'
        value={value}
        step={step}
        onChange={(e: ChangeEvent<HTMLInputElement>) => onChangeInput(e, field)}
        placeholder={placeholder}
      />
    </div>
  );
}
