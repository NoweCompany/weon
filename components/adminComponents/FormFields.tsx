import TableFields from '@/interfaces/TableFields';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import sty from "../../styles/style-components/formfield.module.css"
import { Trash } from 'lucide-react';

import {
  Card,
} from "@/components/ui/card"

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"


import { Input } from "@/components/ui/input"

interface FormFields {
  tableFields: TableFields[]
  setTableFields: Dispatch<SetStateAction<TableFields[]>>
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
    newTableFields[index] = { ...newTableFields[index], name: value, wasChanged: value !== nameWithoutChange}

    setTableFields(newTableFields);
  }

  function onChangeType(e: React.ChangeEvent<HTMLSelectElement>, index: number) {
    const { value } = e.target;

    const newTableFields = [...tableFields]
    const typeWithoutChange = fieldsWithoutChange[index]?.type || ''
    newTableFields[index] = { ...newTableFields[index], type: value, wasChanged: value !== typeWithoutChange }

    setTableFields(newTableFields);
  }

  function onChangeRequired(e: React.ChangeEvent<HTMLInputElement>, index: number) {
    const { checked } = e.target;

    const newTableFields = [...tableFields]
    const requiredWithoutChange = fieldsWithoutChange[index]?.required || false

    newTableFields[index] = { ...newTableFields[index], required: checked, wasChanged: requiredWithoutChange !==  checked}
    setTableFields(newTableFields);
  }

  function onClickDel(e: React.MouseEvent<HTMLHeadingElement, MouseEvent>){
  const btnDel = e.target as HTMLElement
  const td = btnDel.parentElement
  const tr = td?.parentElement

    tr?.remove();
  }

  const fieldTypes = ['string', 'long', 'double', 'bool', 'date'];

  return (
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
                <option selected={!fieldTypes.includes(tableField.type)}>Selecione um tipo</option>
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
                <TooltipProvider >
                  <Tooltip >
                    <TooltipTrigger><span onClick={onClickDel}> <Trash className={sty.deletButton} /></span></TooltipTrigger>
                    <TooltipContent side="right">
                      apagar campo
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Card>
  )
}
