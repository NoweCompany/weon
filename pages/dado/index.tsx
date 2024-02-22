import NavBar from "../../components/global/Navbar"
import FloatNav from "../../components/global/FloatNav"
import DataSideBar from "../../components/sidebar/DataSidebar"
import NoContentDisplay from "../../components/global/NoContentDisplay";

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

import Field from '@/interfaces/Field';
import Table from '@/components/Table';

import { collection, value } from '@/apiRequests';
import { messaging } from '@/services/';
interface CollectionInfo {
    collectionName: string,
    fields: Field[]
}
type Data = { _id: string; [key: string]: any };

type tableColumns = Field[];
type tableRows = Data[];

interface DadosProps {
  collectionNameUrl?: string
}

export default function Dados({collectionNameUrl}: DadosProps) {
  const router = useRouter();
  const buttonContent = ["Adicionar", "Deletar"];

  const [text, setText] = useState("Selecione uma tabela para começar.")
  const [collectionsInfos, setCollectionInfos] = useState<CollectionInfo[] | null>(null);
  
  const [collectionName, setCollectionName] = useState<string>(collectionNameUrl || '')
  const [existCollection, setExistCollection] = useState(false)
  const [tableColumns, setTableColumns] = useState<tableColumns>([])
  const [tableRows, setTableRows] = useState<tableRows>([])
  


  useEffect(() => {  
    console.log('effect');
      
    collection.getApi()
        .then((info: CollectionInfo[] | {error: string}) => {
          if('error' in info) return messaging.send(info.error, false)
          setCollectionInfos(info)
          console.log(collectionsInfos);
        })
        .catch((error) => messaging.send(error, false))

    if(collectionName){ 
      generateTable(collectionName)
    }
  }, []);

function generateTable(collectionName: string){
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
  router.push(`${collectionName}`)
  setCollectionName(collectionName)
  generateTable(collectionName)
}

return (
    <>
        <NavBar />
        {
        collectionsInfos ?(
            <>
              {
                existCollection ? (
                  <>
                    <FloatNav title={collectionName}
                    buttonContent={buttonContent}
                    placeholderSelect="Exportação"
                    labelSelect="Execel"
                    showSelect={true}
                    showSearch={true} /> 
                    <NoContentDisplay text={text} />
                    <DataSideBar collectionsInfo={collectionsInfos} handleClickInCollectionBtn={handleClickInCollectionBtn} />
                    <Table  
                      collectionName={collectionName}
                      tableColumns={tableColumns}
                      tableRows={tableRows}>
                    </Table>
                  </>
                ) : (
                  <>
                    <DataSideBar collectionsInfo={collectionsInfos} handleClickInCollectionBtn={handleClickInCollectionBtn} />
                    <NoContentDisplay text={text} />
                  </>
                )
              }
            </>
            ):(
            <>
                <NoContentDisplay 
                    text={"Não há nenhuma tabela criada."} 
                    link={"/admin"} 
                    linText={"Link para administração para realizar a criação das tabelas"}    
                />
            </>
            )
        }
    </>
  )
}