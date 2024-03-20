//Componentes
import Navbar from "../../components/global/Navbar"
import Sidebar from "../../components/sidebar/AdminSidebar"
import FloatNavTables from "../../components/adminComponents/FloatNavTables"
import BreadCrumber from "@/components/global/BreadCrumber"
import TableListagem from "./../../components/adminComponents/TableListagem"
import NoContentDisplay from '@/components/global/NoContentDisplay'
import { FormFields } from '@/components/adminComponents/FormFields'
import sty from "../../styles/style-components/alertConfirmationDelete.module.css"
import {
    CommandDialog,
} from "@/components/ui/command"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import FloatNavFields from '@/components/adminComponents/FloatNavFields'

//Interfaces
import CollectionInfo from '@/interfaces/CollectionInfo'
import ButtonContent from '@/interfaces/ButtonContent'
import TableName from '@/interfaces/TableName'
import TableFields from '@/interfaces/TableFields'

//Services
import { messaging } from "@/services"
import { collection, field, value } from '@/apiRequests'

import React, { useEffect, useState } from "react"

function useAdminTables() {
    const [open, setOpen] = useState(false)

    React.useEffect(() => {
        const down = (e: KeyboardEvent) => {
            if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
                e.preventDefault()
                setOpen((open) => !open)
            }
        }
        document.addEventListener("keydown", down)
        return () => document.removeEventListener("keydown", down)
    }, [])

    const [collectionInfo, setCollectionInfos] = useState<CollectionInfo[]>([])
    const [tableColumns, setTableColumns] = useState<string[]>([])
    const [tableRows, setTableRows] = useState<CollectionInfo[]>([])
    const [showFormFields, setShowFormFields] = useState<boolean>(false)
    const [inputDeletTable, setInputDeletTable] = useState<string>('')
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
            existValues: false,
            wasChanged: true
        }
        setTableFields([newTableFields])
    }

    function onButtonClickBack() {
        setShowFormFields(false)
        setTableFields([])
        getCollections()
        setTableName({
            currentTableName: '',
            tableSelected: ''
        })
    }
    
    async function onButtonClickDeleteTable(event: React.MouseEvent<HTMLButtonElement>){
        

        if(inputDeletTable !== tableName.tableSelected) return messaging.send('Ecreva o nome da tabela corretamente!', false)

        try {
            const response = await collection.deleteApi(tableName.tableSelected)
            if (response && response?.error) {
                return messaging.send(response.error, false)
            }
            
            getCollections()
            setShowFormFields(false)
            setInputDeletTable('')
            setTableName({currentTableName: "", tableSelected: ""})
            event.preventDefault()
            setOpen((prevOpen) => !prevOpen)
            messaging.send(`Tabela ${tableName.tableSelected} excluída com sucesso!`, true)
        } catch (error: any) {
            return messaging.send(error, false)
        }

    }

    function onChangeInputDeletTable(e: React.ChangeEvent<HTMLInputElement>){
        const input = e.target as HTMLInputElement
        setInputDeletTable(input.value)
    }

    function onButtonClickCancelRemoveTable(e: React.MouseEvent<HTMLButtonElement>) {
        e.preventDefault()
        setOpen(false)
    }

    async function onButtonClickSave(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
        e.preventDefault()

        const collectionName = tableName.currentTableName
        let collectionError = false
        const tableNameWasChanged = (tableName.tableSelected !== tableName.currentTableName) && tableName.tableSelected
        if (tableNameWasChanged) {
            try {
                const response = await collection.putApi(tableName.tableSelected, tableName.currentTableName)
                if (response && response?.error) {
                    collectionError = true
                    return messaging.send(response.error, false)
                }
                setTableName({
                    currentTableName: collectionName,
                    tableSelected: collectionName,
                })
                messaging.send(`Tabela ${tableName.tableSelected} alterada com sucesso para ${tableName.currentTableName}.`, true)
            } catch (error: any) {
                collectionError = true
                return messaging.send(error, false)
            }
        } else if (!tableName.tableSelected) {
            try {
                const response = await collection.postApi(collectionName)
                if (response && response?.error) {
                    collectionError = true
                    return messaging.send(response.error, false)
                }
                setTableName({
                    currentTableName: collectionName,
                    tableSelected: collectionName,
                })
                messaging.send(`Tabela ${collectionName} criada com sucesso.`, true)
            } catch (error: any) {
                collectionError = true
                return messaging.send(error, false)
            }
        }

        if (collectionError) return

        for (let i = 0; i < tableFields.length; i++) {
            const tablefield = tableFields[i]
            if (!tablefield.wasChanged) continue
            if (tablefield.state === 'register') {
                try {
                    const response = await field.postApi(collectionName, tablefield.name, {
                        type: tablefield.type,
                        description: '',
                        required: tablefield.required
                    })
                    if (response && response?.error) return messaging.send(response.error, false)

                    const newTableFields = [...tableFields]
                    newTableFields[i].state = 'updating'
                    newTableFields[i].deleteValidationLevel = 'confirm'
                    newTableFields[i].wasChanged = false
                    setTableFields(newTableFields)

                    messaging.send('Alterações salvas com sucesso', true)
                } catch (error: any) {
                    return messaging.send(error.toString(), false)
                }
            } else if (tablefield.state === 'updating') {
                try {
                    const response = await field.putApi(collectionName, tablefield.originalName, {
                        newFieldName: tablefield.name,
                        fieldRequired: tablefield.required,
                        type: tablefield.type,
                        description: ''
                    })
                    if (response && response?.error) return messaging.send(response.error, false)

                    const newTableFields = [...tableFields]
                    
                    newTableFields[i].wasChanged = false
                    setTableFields(newTableFields)

                    messaging.send('Alterações salvas com sucesso', true)
                } catch (error: any) {
                    return messaging.send(error.toString(), false)
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
            existValues: false,
            wasChanged: true
        }

        setTableFields([...tableFields, newTableFields])
    }

    async function onClickInRow(e: React.MouseEvent<HTMLTableRowElement, MouseEvent>, collectionInfo: CollectionInfo) {
        let lastValue: {[key: string]: any} | null
        try {
            const data = await value.getApi(collectionInfo.collectionName)
        
            if(data?.error) return messaging.send(data?.error, false)
        
            lastValue = data[data.length - 1]
        } catch (error) {
        console.log(error);
        return messaging.send('Erro ao validar valores existente no campo!', false)
        }

        const newTableField: TableFields[] = collectionInfo.fields.map((field) => {      
            return {
                name: field.currentName,
                originalName: field.originalName,
                type: field.type,
                required: field.required,
                deleteValidationLevel: 'confirm',
                state: 'updating',
                existValues: lastValue ? !!lastValue[field.originalName] : false,
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

    const onClickDeleteButtonNav = (e:any) => {
        e.preventDefault()
        setOpen((prevOpen) => !prevOpen)
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
        onButtonClickDeleteTable,
        onButtonClickSave,
        onButtonClickAdd,
        onButtonClickBack,
        inputDeletTable,
        onClickDeleteButtonNav,
        onButtonClickCancelRemoveTable,
        onChangeInputDeletTable,
        open,
        setOpen
    }
}

export default function AdminTables() {
    const {
        collectionInfo,
        tableColumns,
        tableRows,
        showFormFields,
        tableFields,
        inputDeletTable,
        setTableName,
        tableName,
        setTableFields,
        onButtonClickAdd,
        onClickInRow,
        onButtonClickBack,
        onChangeInputNameCollection,
        onButtonClickSave,
        onButtonClickAddField,
        onButtonClickDeleteTable,
        onClickDeleteButtonNav,
        open,
        onButtonClickCancelRemoveTable,
        onChangeInputDeletTable,
        setOpen

    } = useAdminTables()

    useEffect(() => {
        // console.log(tableFields)
        // console.log(tableName)


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
            functionOnClick: onClickDeleteButtonNav,
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
                            tittle="Tabela"
                            buttonContent={buttonContentNavFields}
                            input={{
                                tittle: 'Nome da tabela',
                                value: tableName,
                                onChangeInput: onChangeInputNameCollection
                            }}
                        />
                        <FormFields
                            tableFields={tableFields}
                            setTableFields={setTableFields}
                            tableName={tableName}
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

        <CommandDialog open={open} onOpenChange={setOpen}>
            <div className={sty.cardcontainer}>
                <div className={sty.cardtitle}>
                    <h1 className={sty.title}> Deseja apagar essa tabela?</h1> 
                </div>
            <div className={sty.header}>
                <h1 className={sty.description}>
                    Essa ação irá mover essa tabela e os dados
                    diretamente para a lixeira, para confirmar
                    sua deleção reescreva <span className={sty.span}> {`'${tableName.currentTableName}'`} </span>
                </h1>
            </div>
            <div className={sty.footer}>
                <Input onChange={onChangeInputDeletTable} value={inputDeletTable} placeholder="Digite o nome da tabela aqui!"></Input>
                <Button variant="secondary" onClick={onButtonClickCancelRemoveTable}> cancelar </Button>
                <Button variant="destructive" onClick={onButtonClickDeleteTable}> sim, deletar. </Button>
            </div>
            </div>
        </CommandDialog>

        </>
    )
}