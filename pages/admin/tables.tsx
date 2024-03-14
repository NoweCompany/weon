//Componentes
import Navbar from "../../components/global/Navbar"
import Sidebar from "../../components/sidebar/AdminSidebar"
import FloatNavTables from "../../components/adminComponents/FloatNavTables"
import BreadCrumber from "@/components/global/BreadCrumber"
import TableListagem from "./../../components/adminComponents/TableListagem";
import NoContentDisplay from '@/components/global/NoContentDisplay';
import { FormFields } from '@/components/adminComponents/FormFields';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

import { Button } from "@/components/ui/button";


//Interfaces
import CollectionInfo from '@/interfaces/CollectionInfo';
import ButtonContent from '@/interfaces/ButtonContent';
import TableName from '@/interfaces/TableName';
import TableFields from '@/interfaces/TableFields';

//Services
import { messaging } from "@/services";
import { collection, field } from '@/apiRequests';

import React, { useEffect, useState } from "react";
import FloatNavFields from '@/components/adminComponents/FloatNavFields';
import { table } from 'console';

function useAdminTables() {
    const [dialogOpen, setDialogOpen] = useState(false)
    const [collectionInfo, setCollectionInfos] = useState<CollectionInfo[]>([])
    const [tableColumns, setTableColumns] = useState<string[]>([])
    const [tableRows, setTableRows] = useState<CollectionInfo[]>([])
    const [showFormFields, setShowFormFields] = useState<boolean>(false)
    const [tableFields, setTableFields] = useState<TableFields[]>([])
    const [tableName, setTableName] = useState<TableName>(
        {
            currentTableName: '',
            tableSelected: ''
        })

    useEffect(() => {
        setTableFields([])
        getCollections()
    }, [])

    useEffect(() => {
        if (collectionInfo) {
            const rows = collectionInfo
            setTableRows(rows)

            let numberOfColumns = 1
            collectionInfo.forEach((vl) => {
                const numberOfFields = vl.fields.length
                if (numberOfFields > numberOfColumns) numberOfColumns = numberOfFields
            }, [])

            const arrNumberOfColumns = Array.from({ length: numberOfColumns }, (_, vl) => {
                return 'Campo ' + String(vl + 1)
            })
            arrNumberOfColumns.unshift('Tabelas')
            setTableColumns(arrNumberOfColumns)
        }
    }, [collectionInfo])

    function getCollections() {
        collection.getApi()
            .then((info: any[] | { error: string }) => {
                if (info && 'error' in info) return messaging.send(info.error, false)
                setCollectionInfos(info)
            })
            .catch((error) => {
                messaging.send(error, false)
            })
    }

    function onButtonClickAdd() {
        setShowFormFields(true)
        const newTableFields: TableFields = {
            name: '',
            originalName: '',
            type: '',
            required: false,
            deleteValidationLevel: 'none',
            state: 'register',
            wasChanged: true
        }
        setTableFields([newTableFields])
    }

    function onButtonClickBack() {
        setShowFormFields(false)
        setTableFields([])
        setTableName({
            currentTableName: '',
            tableSelected: ''
        })
    }

    async function onButtonClickSave(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
        e.preventDefault();

        const collectionName = tableName.currentTableName;
        let collectionError = false;

        if ((tableName.tableSelected !== tableName.currentTableName) && tableName.tableSelected) {
            console.log('Atualiza o nome da tabela para => ' + tableName.currentTableName);
        } else if (!tableName.tableSelected) {
            try {
                const response = await collection.postApi(collectionName);
                if (response && response?.error) {
                    collectionError = true;
                    console.log(collectionError);
                    return messaging.send(response.error, false);
                }
                setTableName({
                    currentTableName: collectionName,
                    tableSelected: collectionName,
                })
                messaging.send(`Tabela ${collectionName} criada com sucesso.`, true);
            } catch (error: any) {
                collectionError = true;
                return messaging.send(error, false);
            }
        }

        if (collectionError) return;

        for (let i = 0; i < tableFields.length; i++) {
            const tablefield = tableFields[i];
            if (!tablefield.wasChanged) continue;
            console.log(tablefield);
            if (tablefield.state === 'register') {
                try {
                    const response = await field.postApi(collectionName, tablefield.name, {
                        type: tablefield.type,
                        description: '',
                        required: tablefield.required
                    });
                    if (response && response?.error) return messaging.send(response.error, false);

                    const newTableFields = [...tableFields]
                    newTableFields[i] = { ...newTableFields[i], state: 'updating', wasChanged: false }
                    setTableFields(newTableFields)

                    messaging.send('Alterações salvas com sucesso', true);
                } catch (error: any) {
                    return messaging.send(error.toString(), false);
                }
            } else if (tablefield.state === 'updating') {
                try {
                    const response = await field.putApi(collectionName, tablefield.originalName, {
                        newFieldName: tablefield.name,
                        fieldRequired: tablefield.required,
                        type: tablefield.type,
                        description: ''
                    });
                    if (response && response?.error) return messaging.send(response.error, false);

                    const newTableFields = [...tableFields]
                    newTableFields[i] = { ...newTableFields[i], wasChanged: false }
                    setTableFields(newTableFields)

                    messaging.send('Alterações salvas com sucesso', true);
                } catch (error: any) {
                    return messaging.send(error.toString(), false);
                }
            }
        }
    }


    function onButtonClickAddField(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
        e.preventDefault()
        const newTableFields: TableFields = {
            name: '',
            type: '',
            required: false,
            deleteValidationLevel: 'none',
            originalName: '',
            state: 'register',
            wasChanged: true
        }

        setTableFields([...tableFields, newTableFields])
    }

    function onClickInRow(e: React.MouseEvent<HTMLTableRowElement, MouseEvent>, collectionInfo: CollectionInfo) {
        const newTableField: TableFields[] = collectionInfo.fields.map((field) => {
            return {
                name: field.currentName,
                originalName: field.originalName,
                type: field.type,
                required: field.required,
                deleteValidationLevel: 'confirm',
                state: 'updating',
                wasChanged: false
            }
        })

        setTableName({
            currentTableName: collectionInfo.collectionName,
            tableSelected: collectionInfo.collectionName
        })
        setTableFields(newTableField)
        setShowFormFields(true)
    }

    function onChangeInputNameCollection(e: React.ChangeEvent<HTMLInputElement>) {
        setTableName({
            currentTableName: e.target.value,
            tableSelected: tableName.tableSelected
        })
    }

    function openDialog(){
        setDialogOpen(true)
    }

    function C(){
        setDialogOpen(false)
    }

    return {
        collectionInfo,
        tableColumns,
        tableRows,
        showFormFields,
        tableFields,
        setTableFields,
        tableName,
        setTableName,
        onClickInRow,
        onButtonClickAddField,
        onChangeInputNameCollection,
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
        setTableName,
        tableName,
        setTableFields,
        onButtonClickAdd,
        onClickInRow,
        onButtonClickBack,
        onChangeInputNameCollection,
        onButtonClickSave,
        onButtonClickAddField
    } = useAdminTables()

    useEffect(() => {
        console.log(tableFields);
        console.log(tableName);


    }, [tableFields, tableName])

    const BreadCrumberRoute = ["Tabelas"]
    const buttonContentNavTables: ButtonContent[] = [
        {
            name: 'Adicionar',
            functionOnClick: onButtonClickAdd,
        }
    ]

    const buttonContentNavFields: ButtonContent[] = [
        {
            name: 'novo campo',
            functionOnClick: onButtonClickAddField,
            variant: 'default',
        },
        {
            name: 'deletar',
            functionOnClick: openDialog,
            variant: 'destructive',
        },
        {
            name: 'Salvar',
            functionOnClick: onButtonClickSave,
            variant: 'save',
            id: "save"
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
                    <form>
                        <FloatNavFields
                            title="Tabela"
                            buttonContent={buttonContentNavFields}
                            input={{
                                value: tableName.currentTableName,
                                tittle: 'Nome da tabela',
                                onChangeInput: onChangeInputNameCollection
                            }}
                        />
                        <FormFields
                            tableFields={tableFields}
                            setTableFields={setTableFields}
                        />
                    </form>
                ) : (
                    <>
                        <FloatNavTables
                            title="Tabelas"
                            buttonContent={buttonContentNavTables}
                        />
                        {
                            (collectionInfo?.length >= 1 && collectionInfo) ? (
                                <TableListagem
                                    tableColumns={tableColumns}
                                    tableRows={tableRows}
                                    onCLickInRow={onClickInRow}
                                />
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

            {/* alert confirmação para delete */}
            <AlertDialog>
                <AlertDialogTrigger>Open</AlertDialogTrigger>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Deseja deletar essa tabela?</AlertDialogTitle>
                        <AlertDialogDescription>
                            Essa ação irá mover essa tabela e os dados
                            diretamente para a lixeira, para confirmar 
                            sua deleção favor reescreva {tableName.currentTableName}
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <Button variant="secondary">cancelar</Button>
                        <Button onClick={closeD} variant="destructive">deletar</Button>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </>
    )
}