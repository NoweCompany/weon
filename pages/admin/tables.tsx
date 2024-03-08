//Componentes
import Navbar from "../../components/global/Navbar"
import Sidebar from "../../components/sidebar/AdminSidebar"
import FloatNavTables from "../../components/adminComponents/FloatNavTables"
import BreadCrumber from "@/components/global/BreadCrumber"
import TableListagem from "./../../components/adminComponents/TableListagem";
import NoContentDisplay from '@/components/global/NoContentDisplay';
import { FormFields } from '@/components/adminComponents/FormFields';

//Interfaces
import CollectionInfo from '@/interfaces/CollectionInfo';
import ButtonContent from '@/interfaces/ButtonContent';

//Services
import { messaging } from "@/services";
import { collection } from '@/apiRequests';

import { useEffect, useState } from "react";

function useAdminTables() {
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
    

    return {collectionInfo, tableColumns, tableRows, showFormFields, onButtonClickAdd, onButtonClickBack}
}


export default function AdminTables() {
    const {collectionInfo, tableColumns, tableRows, showFormFields, onButtonClickAdd, onButtonClickBack} = useAdminTables()
    
    const BreadCrumberRoute = ["Tabelas"]
    const buttonContentNavTables: ButtonContent[] = [
        {
            name: 'Adicionar',
            functionOnClick: onButtonClickAdd,
        }
    ]

    const buttonContentNavFields: ButtonContent[] = [
        {
            name: 'Salvar',
            functionOnClick: () => {},
            variant: 'outline',
            id: "save"
        },
        {
            name: 'Adicionar novo campo',
            functionOnClick: () => {},
            variant: 'default',
        },
        {
            name: 'voltar',
            functionOnClick: onButtonClickBack,
            variant: 'secondary'
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
                        <FormFields
                        buttonContentNavFields={buttonContentNavFields}
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