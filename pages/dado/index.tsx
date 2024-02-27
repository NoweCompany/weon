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
  const [collectionsInfos, setCollectionInfos] = useState<CollectionInfo[] | null>(null);
  const [method, setMethod] = useState<"POST" | "PUT">("POST")

  const [collectionName, setCollectionName] = useState<string>(collectionNameUrl || '')
  const [existCollection, setExistCollection] = useState(false)
  const [tableColumns, setTableColumns] = useState<tableColumnsType>([])
  const [tableRows, setTableRows] = useState<tableRowsType>([])
  const [showFormData, setShowFormData] = useState<boolean>(false)

  useEffect(() => {
    console.log(collectionsInfos);
    if(!collectionsInfos) loadSideBarOptions()
  }, []);

  useEffect(() => {
    if(collectionName && collectionsInfos){
      generateTable(collectionName, collectionsInfos)    
    }
  }, [collectionName, collectionsInfos])

async function loadSideBarOptions(){
  try {
    collection.getApi()
        .then((info: CollectionInfo[] | {error: string}) => {
          if('error' in info) return messaging.send(info.error, false)

          setCollectionInfos(info)          
        })
        .catch((error) => messaging.send(error, false))
  } catch (error: any) {
    messaging.send(error, false);
  }
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
        if('error' in fieldsInfo) return messaging.send(fieldsInfo.error, false)
        setTableRows(fieldsInfo)
    })
    .catch(error => messaging.send(error, false))
  setText('')
}

function handleClickInCollectionBtn(e: React.MouseEvent<HTMLButtonElement, MouseEvent>, collectionName: string){
  setCollectionName(collectionName)
}

function onButtonClickAdd(): void{
  setShowFormData(true)
}
function onButtonClickDel(): void{
  console.log('Del');
}

const buttonContentTable: ButtonContent[] = [
  {
    name: 'Adicionar',
    functionOnClick: onButtonClickAdd,
  },
  {
    name: 'Deletar',
    functionOnClick: onButtonClickDel,
    variant: "secondary",
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
                          fields={tableColumns}
                          collectionName={collectionName}
                          method={method}
                          setShowFormData={setShowFormData}
                        />
                      ) : (
                        <>
                          <FloatNavDados 
                            title={collectionName}
                            buttonContent={buttonContentTable}/>  
                          <Table  
                            collectionName={collectionName}
                            tableColumns={tableColumns}
                            tableRows={tableRows}>
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