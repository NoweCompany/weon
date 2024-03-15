import ButtonContent from '@/interfaces/ButtonContent';
import FloatNavFields from './FloatNavFields';
import TableFields from '@/interfaces/TableFields';
import { Dispatch, SetStateAction } from 'react';
import { setMaxIdleHTTPParsers } from 'http';

import sty from "../../styles/style-components/formfield.module.css"
import { X, Trash } from 'lucide-react';

import {
  Card,
} from "@/components/ui/card"

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select"

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

import { Input } from "@/components/ui/input"

import { SelectValue } from '@radix-ui/react-select';

interface FormFields {
  buttonContentNavFields: ButtonContent[],
  tableFields: TableFields[]
  setTableFields: Dispatch<SetStateAction<TableFields[]>>
  tableSelectedName: string
  setTableSelectedName: Dispatch<SetStateAction<string>>
}

export function FormFields({
  buttonContentNavFields,
  tableFields,
  setTableFields,
  tableSelectedName,
  setTableSelectedName
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

    const newTableFields = [...tableFields]
    newTableFields[index] = {...newTableFields[index], name: value} 
  
    setTableFields(newTableFields );
  }

  function onChangeType(e: React.ChangeEvent<HTMLSelectElement>, index: number){
    const { value } = e.target;

    const newTableFields = [...tableFields]
    newTableFields[index] = {...newTableFields[index], type: value} 
  
    setTableFields(newTableFields );
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

  function onChangeInputNameCollection(e: React.ChangeEvent<HTMLInputElement>) {   
    setTableSelectedName(e.target.value)
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
              <tr key={i}>
                <td>
                  <Input className={sty.input} type="text" onChange={(e) => onChangeFieldName(e, i)} value={tableField.name} />
                </td>
                <td>
                  <Select >
                    <SelectTrigger className={sty.inputSelect}>
                      <select className="w-500" onChange={(e) => onChangeType(e, i)} />
                      <SelectValue placeholder="Tipo do campo"></SelectValue>
                    </SelectTrigger>
                    <SelectGroup>
                      <SelectContent>
                        <SelectItem value="string" selected={tableField.type === 'string' ? true : false}>Texto pequeno</SelectItem>
                        <SelectItem value="long" selected={tableField.type === 'long' ? true : false}>Números inteiros</SelectItem>
                        <SelectItem value="double" selected={tableField.type === 'double' ? true : false}>Números decimais</SelectItem>
                        <SelectItem value="boll" selected={tableField.type === 'boll' ? true : false}>Sim ou não</SelectItem>
                        <SelectItem value="date" selected={tableField.type === 'date' ? true : false}>Data</SelectItem>
                      </SelectContent>
                    </SelectGroup>
                  </Select>
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
    </form>
    </div>
  )
}
