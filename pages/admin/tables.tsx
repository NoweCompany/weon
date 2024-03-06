import Navbar from "../../components/global/Navbar"
import Sidebar from "../../components/sidebar/AdminSidebar"
import FloatNavTables from "../../components/adminComponents/FloatNavTables"
import BreadCrumber from "@/components/global/BreadCrumber"

import TableListagem from "./../../components/adminComponents/TableListagem";
import { collection } from '@/apiRequests';
import { messaging } from "@/services";
import { useEffect, useState } from "react";
import CollectionInfo from '@/interfaces/CollectionInfo';
import NoContentDisplay from '@/components/global/NoContentDisplay';
import ButtonContent from '@/interfaces/ButtonContent';

export default function AdminTables() {
    const BreadCrumberRoute = ["Tabelas"]

    const [collectionInfo, setCollectionInfos] = useState<CollectionInfo[]>([])
    const [tableColumns, setTableColumns] = useState<string[]>([])
    const [tableRows, setTableRows] = useState<CollectionInfo[]>([])
    const [showFormFields, setShowFormFields] = useState<boolean>(false)

    useEffect(() => {
        getCollections()
    },[])

    useEffect(() => {
        if(collectionInfo){        
            const rows = collectionInfo
            setTableRows(rows)

            let numberOfColumns = 1
            collectionInfo.forEach((vl) => {
                const numberOfFields = vl.fields.length
                if(numberOfFields > numberOfColumns) numberOfColumns = numberOfFields
            }, [])

            const arrNumberOfColumns = Array.from({length: numberOfColumns}, (_, vl) => {
                return 'Campo ' + String(vl + 1)
            })
            arrNumberOfColumns.unshift('Tabelas')
            setTableColumns(arrNumberOfColumns)
        }
    }, [ collectionInfo ])

    function getCollections(){
        collection.getApi()
            .then((info: any[] | {error: string}) => {
                if(info && 'error' in info) return messaging.send(info.error, false)
                setCollectionInfos(info)          
            })
            .catch((error) => {
                messaging.send(error, false)
            })
    }

    function onButtonClickAdd(){
        setShowFormFields(true)
    }

    function onButtonClickBack(){
        setShowFormFields(false)
    }

    const buttonContentNavFields: ButtonContent[] = [
        {
            name: 'voltar',
            functionOnClick: onButtonClickBack,
            variant: 'secondary'
        }
    ]

    const buttonContentNavTables: ButtonContent[] = [
        {
            name: 'Adicionar',
            functionOnClick: onButtonClickAdd,
        }
    ]

    return (
        <>
            <Navbar adminPages={true} />
            <Sidebar routeTable={true} />
            <BreadCrumber page={BreadCrumberRoute} screen={''} route={''} />
            {
                showFormFields ? (
                    <>
                        <FloatNavTables 
                        title="Campos" 
                        buttonContent={buttonContentNavFields} 
                        />
                        <NoContentDisplay
                        text={`Form Campos`}
                        />
                    </>
                ) : (
                    <>
                    {
                    (collectionInfo?.length >= 1 &&  collectionInfo) ? (
                        <>
                            <FloatNavTables 
                            title="Tabelas" 
                            buttonContent={buttonContentNavTables} 
                            />
                            <TableListagem
                            tableColumns={tableColumns}
                            tableRows={tableRows}
                            onCLickInRow={() => {}}
                            />
                        </>
                    ) : (
                        <NoContentDisplay
                        text={`Não há nenhuma tabela criada. \n 
                        Clique em criar para registar uma nova tabela.`}
                        />
                    )
                    }
                    </>
                )
            }
        </>
    )
}