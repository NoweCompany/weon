import NavBar from "../../components/global/Navbar"
import FloatNavDados from "../../components/FloatNavDados"
import DataSideBar from "../../components/sidebar/DataSidebar"
import NoContentDisplay from "../../components/global/NoContentDisplay";
import Table from '@/components/Table';
import DataForms from '@/components/DataForms';

import React, { useEffect, useState } from 'react';

import Field from '@/interfaces/Field';
import ButtonContent from '@/interfaces/ButtonContent';

import { collection, value } from '@/apiRequests';
import { messaging } from '@/services/';
interface CollectionInfo {
    collectionName: string,
    fields: Field[]
}
type Data = { _id: string; [key: string]: any };

type tableColumnsType = Field[];
type tableRowsType = Data[];

interface DadosProps {
  collectionNameUrl?: string
}

export default function Dados({ collectionNameUrl }: DadosProps)  {
  const [text, setText] = useState("Selecione uma tabela para começar.")
  const [method, setMethod] = useState<"POST" | "PUT">("POST")
  
  const [collectionsInfos, setCollectionInfos] = useState<CollectionInfo[] | null>(null);
  const [collectionName, setCollectionName] = useState<string>(collectionNameUrl || '')
  const [existCollection, setExistCollection] = useState(false)

  const [tableColumns, setTableColumns] = useState<tableColumnsType>([])
  const [tableRows, setTableRows] = useState<tableRowsType>([])
  const [rowsSelected, setRowsSelected] = useState<{[key: string]: boolean}>({})

  const [formValue, setFormValue] = useState<Data | null>(null)
  const [showFormData, setShowFormData] = useState<boolean>(false)

  useEffect(() => {
    console.log(collectionsInfos);
    if(!collectionsInfos) loadSideBarOptions()
  }, []);

  useEffect(() => {
    if(collectionName && collectionsInfos){
      generateTable(collectionName, collectionsInfos)    
    }
  }, [collectionName, collectionsInfos, showFormData])

async function loadSideBarOptions(){
  collection.getApi()
      .then((info: CollectionInfo[] | {error: string}) => {
        
        if(info && 'error' in info) return messaging.send(info.error, false)

        setCollectionInfos(info)          
      })
      .catch((error) => {
        console.log(error)
        messaging.send(error, false)
      })
}

function generateTable(collectionName: string, collectionsInfos: CollectionInfo[]){
  const currentCollection = collectionsInfos?.find((collectionInfo) => {
      return collectionInfo.collectionName === collectionName
    })     
  if(!currentCollection) {
    return setText(`A tabela ${collectionName} não existe, selecione uma tabela existente.`) 
  }
  setExistCollection(true)
  setTableColumns(currentCollection?.fields)

  value.getApi(collectionName)
    .then(fieldsInfo => {
        if(fieldsInfo?.error) return messaging.send(fieldsInfo.error, false)
        setTableRows(fieldsInfo)
    })
    .catch(error => messaging.send(error, false))
  setText('')
}

function handleClickInCollectionBtn(e: React.MouseEvent<HTMLButtonElement, MouseEvent>, collectionName: string){
  setCollectionName(collectionName)
}

function onCLickInRow(e: React.MouseEvent<HTMLTableRowElement>): void{
  const tdClicked = e.target as HTMLTableCellElement
  const tr = tdClicked.parentElement as HTMLTableRowElement

  const idDocument = tr.id
  const tds = tr.querySelectorAll('td')

  const value = Array.from(tds).reduce((ac: { [key: string]: string }, td) => {
    const originalName = td.id
    if(!originalName) return ac
    
    ac[originalName] = td.innerText;
    return ac;
  }, {});
  value._id = idDocument
  
  setFormValue(value as Data)
  setMethod('PUT')
  setShowFormData(true)
}

function onButtonClickAdd(): void{
  setShowFormData(true)
}

function onButtonClickDel(): void{
  const valueIds = Object.entries(rowsSelected).reduce((ac: string[], [id, isSelected]: [string, boolean]) => {
    if (isSelected) return [...ac, id];
    return ac;
  }, []);

  value.deleteApi(collectionName, valueIds, false)
    .then(response => {   
      if(response?.error ) {
        const { error } = response
        if(Array.isArray(error)) error.forEach((error: string) => messaging.send(error, false))
        else return messaging.send(error , false)
      }

      const newRows = tableRows.filter(row => !valueIds.includes(row._id))
      setRowsSelected({})
      setTableRows(newRows);

      return messaging.send('Valor deletado', true)
    })
    .catch(error => messaging.send(error, false))
}

const buttonContentTable: ButtonContent[] = [
  {
    name: 'Adicionar',
    functionOnClick: onButtonClickAdd,
  },
  {
    name: 'Deletar',
    functionOnClick: onButtonClickDel,
    disabled: Object.keys(rowsSelected).length <= 0
  }
]

return (
    <>
        <NavBar dataPages={true}/>
        {
          
          collectionsInfos ?(
            <>
              {
                
                existCollection ? (
                  <>
                    <DataSideBar collectionsInfo={collectionsInfos} handleClickInCollectionBtn={handleClickInCollectionBtn} />
                      {/* Renderiza o formulário se showFormData for verdadeiro */}
                      {showFormData ? (
                        <DataForms 
                          formValue={formValue}
                          setFormValue={setFormValue}
                          fields={tableColumns}
                          collectionName={collectionName}
                          method={method}
                          setMethod={setMethod}
                          setShowFormData={setShowFormData}
                        />
                      ) : (
                        <>
                          <FloatNavDados 
                            title={collectionName}
                            buttonContent={buttonContentTable}/>  
                          <Table  
                            onCLickInRow={onCLickInRow}
                            tableColumns={tableColumns}
                            tableRows={tableRows}
                            setRowsSelected={setRowsSelected}
                            rowsSelected={rowsSelected}>
                          </Table>
                        </>
                      )}
                  </>
                ) : (
                  <>
                    <NoContentDisplay text={text} />
                    <DataSideBar collectionsInfo={collectionsInfos} handleClickInCollectionBtn={handleClickInCollectionBtn} />
                  </>
                )
              }
            </>
            ):(
            <>
                <NoContentDisplay 
                    text={"Não há nenhuma tabela criada."} 
                    link={"/admin/tables"} 
                    linkText={"clique para começar"}    
                />
            </>
            )
        }
    </>
  )
}