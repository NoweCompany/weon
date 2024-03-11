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

import React, { useEffect, useState } from "react";
import TableFields from '@/interfaces/TableFields';

function useAdminTables() {
    const [collectionInfo, setCollectionInfos] = useState<CollectionInfo[]>([])
    const [tableColumns, setTableColumns] = useState<string[]>([])
    const [tableRows, setTableRows] = useState<CollectionInfo[]>([])
    const [showFormFields, setShowFormFields] = useState<boolean>(false)
    const [tableFields, setTableFields] = useState<TableFields[]>([])
    const [tableSelectedName, setTableSelectedName] = useState<string>('')

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
        const newTableFields: TableFields = {
            name: '',
            type: '',
            required: false,
            deleteValidationLevel: 'none',
            state: 'register'
        }
        setTableFields([newTableFields])
    }

    function onButtonClickBack(){
        setShowFormFields(false)
        setTableFields([])
    } 

    function onButtonClickSave(e: React.MouseEvent<HTMLButtonElement, MouseEvent>){
        e.preventDefault()
        
        const collectionName = tableSelectedName
        for(const field of tableFields){
            console.log(field);
            
        }
    } 

    function onButtonClickAddField(e: React.MouseEvent<HTMLButtonElement, MouseEvent>){
        e.preventDefault()
        const newTableFields: TableFields = {
            name: '',
            type: '',
            required: false,
            deleteValidationLevel: 'none',
            state: 'register'
        }

        setTableFields([...tableFields, newTableFields])
    } 

    function onClickInRow(e: React.MouseEvent<HTMLTableRowElement, MouseEvent>, collectionInfo: CollectionInfo){
        const newTableField: TableFields[] = collectionInfo.fields.map((field) => {
            return {
                name: field.currentName,
                type: field.type,
                required: field.required,
                deleteValidationLevel: 'confirm',
                state: 'updating'
            }
        }) 

        setTableSelectedName(collectionInfo.collectionName)
        setTableFields(newTableField)
        setShowFormFields(true)
    }

    return {collectionInfo,
        tableColumns,
        tableRows,
        showFormFields,
        tableFields,
        setTableFields,
        tableSelectedName,
        setTableSelectedName,
        onClickInRow,
        onButtonClickAddField,
        onButtonClickSave,
        onButtonClickAdd, 
        onButtonClickBack
    }
}


export default function AdminTables() {
    const { 
        collectionInfo,
        tableColumns,
        tableRows,
        showFormFields,
        tableFields,
        tableSelectedName,
        setTableSelectedName,
        setTableFields,
        onButtonClickAdd,
        onClickInRow,
        onButtonClickBack,
        onButtonClickSave,
        onButtonClickAddField
    } = useAdminTables()
    
    useEffect(() => {
        console.log(tableFields);
        
    }, [tableFields])

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
            functionOnClick: onButtonClickSave,
            variant: 'outline',
            id: "save"
        },
        {
            name: 'Adicionar novo campo',
            functionOnClick: onButtonClickAddField,
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
                        tableFields={tableFields}
                        setTableSelectedName={setTableSelectedName}
                        tableSelectedName={tableSelectedName}
                        setTableFields={setTableFields}
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
                            onCLickInRow={onClickInRow}
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