import ButtonContent from '@/interfaces/ButtonContent';
import TableFields from '@/interfaces/TableFields';
import { Dispatch, SetStateAction, useState } from 'react';
import sty from "../../styles/style-components/formfield.module.css"

import {
  Card,
} from "@/components/ui/card"

import { Input } from "@/components/ui/input"

interface FormFields {
  tableFields: TableFields[]
  setTableFields: Dispatch<SetStateAction<TableFields[]>>
}

interface OptionItem{
  buttonContent: ButtonContent[]

} 

export function FormFields({
  tableFields,
  setTableFields,
}: FormFields) {

  const [fieldsWithoutChange, setFieldsWithoutChange] = useState<TableFields[]>(tableFields)

  function onChangeFieldName(e: React.ChangeEvent<HTMLInputElement>, index: number) {
    const { value } = e.target;
    const newTableFields = [...tableFields]
    const nameWithoutChange = fieldsWithoutChange[index]?.name || ''
    console.log(!!nameWithoutChange)    
    newTableFields[index] = { 
      ...newTableFields[index],
      name: value,
      wasChanged: value !== nameWithoutChange||!nameWithoutChange
    }

    setTableFields(newTableFields);
  }

  function onChangeType(e: React.ChangeEvent<HTMLSelectElement>, index: number) {
    const { value } = e.target;
    const newTableFields = [...tableFields];
    newTableFields[index] = { ...newTableFields[index], type: value };
    setTableFields(newTableFields);
  }

  function onChangeRequired(e: React.ChangeEvent<HTMLInputElement>, index: number){
    const { checked } = e.target;

    const newTableFields = [...tableFields]
    const requiredWithoutChange = fieldsWithoutChange[index]?.required || false

    newTableFields[index] = { 
      ...newTableFields[index], 
      required: checked, 
      wasChanged: requiredWithoutChange !==  checked || !requiredWithoutChange
    }
    setTableFields(newTableFields);
  }

  function onClickDel(e: React.MouseEvent<HTMLHeadingElement, MouseEvent>){
  const btnDel = e.target as HTMLElement
  const td = btnDel.parentElement
  const tr = td?.parentElement
  tr?.remove()
  }
  return (
    <div className="flex justify-center"> 
      <form action="">
<Card className={sty.tableContainer}>
        <table className={sty.tableMain} id="titulotabela">
          <thead>
            <tr className={sty.titleTable}>
              <th className={sty.columnHeader}>Nome</th>
              <th className={sty.columnHeader}>Tipo</th>
              <th className={sty.columnHeader}>Obrigatório</th>
            </tr>
          </thead>
          <tbody className="tbody" id="tbody">
            {tableFields.map((tableField, i) => (
              <tr key={i} className={tableField.wasChanged ? sty.fieldChanged : sty.fieldWithoutChanged}>
                <td>
                  <Input className={sty.input} type="text" onChange={(e) => onChangeFieldName(e, i)} value={tableField.name} />
                </td>
                <td>
                <select
                onChange={(e) => onChangeType(e, i)}
                className="block p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-blue-500"
              >
                <option value="string" selected={tableField.type === 'string'}>Texto pequeno</option>
                <option value="long" selected={tableField.type === 'long'}>Números inteiros</option>
                <option value="double" selected={tableField.type === 'double'}>Números decimais</option>
                <option value="bool" selected={tableField.type === 'bool'}>Sim ou não</option>
                <option value="date" selected={tableField.type === 'date'}>Data</option>
              </select>
                </td>
                <td>
                  <input className={sty.checkbox} type='checkbox' onChange={(e) => onChangeRequired(e, i)} checked={tableField.required} />
                </td>
                <td>
                  <div className={sty.deletButton} onClick={(e) => onClickDel(e)}> Apagar </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </form>
    </div>
  )
}
