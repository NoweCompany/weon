import ButtonContent from '@/interfaces/ButtonContent';
import FloatNavFields from './FloatNavFields';
import { Card } from '../ui/card';
import TableFields from '@/interfaces/TableFields';
import { Dispatch, SetStateAction } from 'react';
import { setMaxIdleHTTPParsers } from 'http';

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

  function onChangeFieldName(e: React.ChangeEvent<HTMLInputElement>, index: number){
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
    newTableFields[index] = {...newTableFields[index], required: checked} 
  
    setTableFields(newTableFields );
  }

  function onClickDel(e: React.ChangeEvent<HTMLElement>){
  const td = e.target.parentElement
  const tr = td?.parentElement

  tr?.remove()
  }

  function onChangeInputNameCollection(e: React.ChangeEvent<HTMLInputElement>) {   
    setTableSelectedName(e.target.value)
  }
  
  return (
    <div className="flex justify-center"> {/* Centraliza o formulário */}
      <form action="">
        <FloatNavFields 
          title="Tabela"
          buttonContent={buttonContentNavFields} 
          input={{
            value: tableSelectedName,
            tittle: 'Nome da tabela',
            onChangeInput: onChangeInputNameCollection
          }}      
        />

        <Card>
          <table className="table-auto w-full border-collapse border border-gray-300" id="titulotabela">
            <thead className="text-center">
                <tr>
                    <th className="px-4 py-2 font-normal">Nome</th>
                    <th className="px-4 py-2 font-normal">Tipo</th>
                    <th className="px-4 py-2 font-normal">Obrigatório</th>
                    <th className="px-4 py-2 font-normal">Delete</th>
                </tr>
            </thead>
            <tbody className="tbody" id="tbody">
              {
                tableFields.map((tableField, i) => {
                  return (
                    <tr key={i}>
                      <td>
                        <input type="text" onChange={(e) => onChangeFieldName(e, i)} value={tableField.name}/>
                      </td>
                      <td>
                        <select onChange={(e) => onChangeType(e, i)}>
                          <option value="string" selected={tableField.type === 'string' ? true : false} >Texto pequeno</option>
                          <option value="long" selected={tableField.type === 'long' ? true : false}>Números inteiros</option>
                          <option value="double" selected={tableField.type === 'double' ? true : false}>Números decimais</option>
                          <option value="boll" selected={tableField.type === 'boll' ? true : false}>Sim ou não</option>
                          <option value="date" selected={tableField.type === 'date' ? true : false}>Data</option>
                        </select>
                      </td>
                      <td>
                        <input type='checkbox' onChange={(e) => onChangeRequired(e, i)} checked={tableField.required}/>
                      </td>
                      <td>
                        <h1 onClick={(e) => onClickDel(e)}>X</h1>
                      </td>
                    </tr>
                  )
                })
              }
            </tbody>
          </table>
        </Card>
      </form>
    </div>
  )
}
