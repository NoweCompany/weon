import React, { Dispatch, SetStateAction, useState } from 'react';
import sty from "../../styles/style-components/formfield.module.css"

import {
  Card,
} from "@/components/ui/card"

import { Input } from "@/components/ui/input"
import { field } from '@/apiRequests';
import TableFields from '@/interfaces/TableFields';
import TableName from '@/interfaces/TableName';
import { messaging } from '@/services';
import AlertValidationDelete from '../alerts/AlertValidation';
import { Field } from 'react-hook-form';

interface FormFields {
  tableFields: TableFields[]
  setTableFields: Dispatch<SetStateAction<TableFields[]>>
  tableName: TableName,
}

export function FormFields({
  tableFields,
  setTableFields,
  tableName,
}: FormFields) {

  const [fieldsWithoutChange, setFieldsWithoutChange] = useState<TableFields[]>(tableFields)
  const [inputDeletField, setInputDeletField] = useState<string>('')
  const [showPopupDelete, setShowPopupDelete] = useState<boolean>(false)
  const [fieldSelected, setFieldSelected] = useState<TableFields>()
  
  function onChangeFieldName(e: React.ChangeEvent<HTMLInputElement>, index: number) {
    const value  = e.target.value.trim();
    const newTableFields = [...tableFields]
    const nameWithoutChange = fieldsWithoutChange[index]?.name || ''

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
    const typeWithoutChange = fieldsWithoutChange[index]?.type || false

    newTableFields[index] = { 
      ...newTableFields[index],
      type: value,
      wasChanged: typeWithoutChange !==  value || !typeWithoutChange
    };
    console.log(newTableFields);
    
    setTableFields(newTableFields);
  }

  function onChangeRequired(e: React.ChangeEvent<HTMLInputElement>, index: number){
    const { checked } = e.target;

    const newTableFields = [...tableFields]
    const requiredWithoutChange = fieldsWithoutChange[index]?.required || false
    console.log(requiredWithoutChange);
    
    newTableFields[index] = { 
      ...newTableFields[index], 
      required: checked, 
      wasChanged: requiredWithoutChange !==  checked
    }
    setTableFields(newTableFields);
  }

  function onClickDel(e: React.MouseEvent<HTMLHeadingElement, MouseEvent>, tableField: TableFields, index: number){
    const currentField = tableField
    
    if(currentField.deleteValidationLevel === 'confirm'){
      setFieldSelected(currentField)
      setShowPopupDelete(true)
      return
    }   
    const newTableFields = [...tableFields]
    newTableFields.splice(index, 1)
    setTableFields(newTableFields)
  }

  function onButtonClickDeleteField(){
    if(!fieldSelected) return messaging.send('Não há nenhum campo selecionado!', false)
    if(inputDeletField !== fieldSelected.name) return messaging.send('Ecreva o nome da tabela corretamente!', false)

    field.deleteApi(tableName.tableSelected, fieldSelected.originalName, fieldSelected.name)
        .then((info) => {
          if (info?.error) return messaging.send(info.error, false)

          setInputDeletField('')
          setShowPopupDelete(false)
          const newTableFields = [...tableFields]
          const indexRemovedField = newTableFields.findIndex((field) => field.name === fieldSelected.name)
          newTableFields.splice(indexRemovedField, 1)
          setTableFields(newTableFields)
          setFieldsWithoutChange(newTableFields)

          return messaging.send(`Campo ${fieldSelected.name} foi excluído com sucesso`, true)
        })
        .catch((error) => {
          messaging.send(error, false)
        })
  }

  function onButtonClickCancelRemoveField(){
    setShowPopupDelete(false)
  }

  function onChangeInputDeletField(e: React.ChangeEvent<HTMLInputElement>): void{
    const value = String(e.target.value).trim()
    setInputDeletField(value)
  }

  const fieldTypes = ['string', 'long', 'double', 'bool', 'date'];

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
                disabled={tableField.existValues}
                >
                <option value="" selected={!fieldTypes.includes(tableField.type)}>Selecione um tipo</option>
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
                <td onClick={(e) => onClickDel(e, tableField, i)}>
                  <div className={sty.deletButton}> Apagar </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
      </form>
      <AlertValidationDelete
        description='Essa ação irá mover este campo e os dados
        diretamente para a lixeira, para confirmar
        sua deleção reescreva '
        span={fieldSelected?.name || ''}
        inputDelet={inputDeletField}
        onButtonClickCancelRemove={onButtonClickCancelRemoveField}
        onChangeInputDelet={onChangeInputDeletField}
        onButtonClickDelete={onButtonClickDeleteField}
        open={showPopupDelete}
      />
    </div>
  )
}
