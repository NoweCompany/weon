import Navbar from "../../components/global/Navbar"
import Sidebar from "../../components/sidebar/AdminSidebar"
import FloatNav from "../../components/global/FloatNav"
import BreadCrumber from "@/components/global/BreadCrumber"

import TableListagem from "./../../components/adminComponents/TableListagem";
import { collection } from '@/apiRequests';
import { messaging } from "@/services";
import { useEffect, useState } from "react";
import CollectionInfo from '@/interfaces/CollectionInfo';

export default function AdminTables() {
    const buttonContent = ["Criar"]
    const BreadCrumberRoute = ["Tabelas"]

    const [collectionInfo, setCollectionInfos] = useState<CollectionInfo[]>([])
    const [tableColumns, setTableColumns] = useState<string[]>([])
    const [tableRows, setTableRows] = useState<CollectionInfo[]>([])

    useEffect(() => {
        getCollections()
    },[])

    useEffect(() => {
        if(collectionInfo){
            console.log(collectionInfo)
        
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
                console.log(error)
                messaging.send(error, false)
            })
    }

    return (
        <>
            <Navbar adminPages={true} />
            <Sidebar routeTable={true} />
            <FloatNav title="Tabelas" buttonContent={buttonContent} />
            <BreadCrumber page={BreadCrumberRoute} screen={''} route={''} />
            {
                (collectionInfo?.length >= 1 &&  collectionInfo) ? (
                    <TableListagem
                        tableColumns={tableColumns}
                        tableRows={tableRows}
                        onCLickInRow={() => {}}
                    />
                ) : (
                    <h1>Não há nenhuma tabela criada</h1>
                )
            }
        </>
    )
}