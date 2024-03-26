import React, { useEffect, useState } from 'react'
import sty from "../../styles/style-components/table.module.css"
import Field from '../../interfaces/Field'
import Pagination from '@/components/dataComponents/Pagination'
import { ChevronsUpDown } from 'lucide-react'
import { Value } from '@/interfaces/Values'

type Data = { _id: string, [key: string]: any }

interface PropsTable {
  tableColumns: Field[]
  tableRows: Data[]
  tableRowsWithoutChange: Data[]
  setTableRows: React.Dispatch<React.SetStateAction<Value[]>>
  onCLickInRow: (e: React.MouseEvent<HTMLTableRowElement>) => void
  setRowsSelected: React.Dispatch<React.SetStateAction<any>>
  rowsSelected: { [key: string]: any }
}

export default function Table(props: PropsTable) {
  const { onCLickInRow, setRowsSelected, rowsSelected, setTableRows, tableColumns, tableRows, tableRowsWithoutChange } = props
  const [selectedAll, setSelectedAll] = useState(false)
  const [selectedItems, setSelectedItems] = useState<{ [key: string]: boolean }>({})
  const [currentFilter, setCurrentFilter] = useState<'ascending' | 'decending' | 'normal'>('normal')
  

  const [currentPage, setCurrentPage] = useState(1)
  const [rowsPerPage, setRowsPerPage] = useState(10)

  const indexOfLastRow = currentPage * rowsPerPage
  const indexOfFirstRow = indexOfLastRow - rowsPerPage
  const currentRows = tableRows.slice(indexOfFirstRow, indexOfLastRow)

  const handleSelectAll = () => {
    const newSelectedItems: { [key: string]: boolean } = {}

    if (!selectedAll) {
      tableRows.forEach((row) => (newSelectedItems[row._id] = !selectedAll))
    }

    setRowsSelected(newSelectedItems)
    setSelectedItems(newSelectedItems)
    setSelectedAll(!selectedAll)
  }

  const handleSelectItem = (id: string) => {
    const newSelectedItems = { ...selectedItems, [id]: !selectedItems[id] }
    setSelectedItems(newSelectedItems)

    const newRowsSelected = { ...rowsSelected }
    if (newSelectedItems[id]) {
      newRowsSelected[id] = true
    } else {
      delete newRowsSelected[id]
    }
    setRowsSelected(newRowsSelected)

    const allSelected = tableRows.every((row) => newSelectedItems[row._id])
    setSelectedAll(allSelected)
  }

  function formaterData(data: string, type: string) {
    switch (type) {
      case 'string':
        return String(data)
      case 'date':
        return formaterDate(new Date(data))
      default:
        return String(data)
    }
  }

  function adicionaZero(numero: number) {
    if (numero < 10) {
      return '0' + numero
    }
    return numero
  }

  function formaterDate(data: Date) {
    var dia = adicionaZero(data.getDate())
    var mes = adicionaZero(data.getMonth() + 1)
    var ano = data.getFullYear()

    return dia + '/' + mes + '/' + ano
  }

  function quicksort(arr: Value[], fieldOriginalName: string): Value[]{  
    if(arr.length < 2) {
      return arr
    }

    const pivoIndex = Math.floor(arr.length / 2)
    const pivoRow = arr[pivoIndex]
    
    const pivot = pivoRow[fieldOriginalName] 
    
    const leftArray = []
    const rightArray = []

    for (let i = 0; i < arr.length; i++) {
      const field = arr[i]
      let value = field[fieldOriginalName]
      value = typeof value === "string" ? value.trim() : value

      if (i === pivoIndex) {
        continue
      }
      else if (value <= pivot) {       
        leftArray.push(arr[i])
      } 
      else if(value > pivot) {     
        rightArray.push(arr[i])
      }
    }
    
    return [
      ...quicksort(leftArray, fieldOriginalName),
      pivoRow,
      ...quicksort(rightArray, fieldOriginalName)
    ]
  }

  function onClickChevronsUpDown(e: React.MouseEvent<HTMLTableHeaderCellElement, MouseEvent>, originalName: string): void{ 
    switch(currentFilter){
      case 'normal':
        setCurrentFilter('ascending')
        setTableRows(quicksort(tableRows, originalName))
        break
        case 'ascending':
          setCurrentFilter('decending')
          setTableRows(tableRows.reverse())
      break

      case 'decending':
        setCurrentFilter('normal')
        setTableRows(tableRowsWithoutChange)
      break
      default:
        return
    }    
  }

  return (
    <div className={sty.containerColumn}>
      <div className={sty.containerMain}>
        <table className={`${sty.tableBody}`}>
          <thead className={sty.tableHeader}>
            <tr className={sty.tableRow}>
              <th className={sty.allCheck}>
                <input type="checkbox" className={sty.checkbox} checked={selectedAll} onChange={handleSelectAll} />
              </th>
              {tableColumns.map((fieldinf: Field) => {
                return (
                  <th 
                    key={fieldinf.originalName} 
                    onClick={(e) => onClickChevronsUpDown(e,  fieldinf.originalName)} 
                    className={sty.thTableHeader}>
                    <div>
                      {fieldinf.currentName}
                      <ChevronsUpDown />
                    </div>
                  </th>
                )
              })}
            </tr>
          </thead>
          <tbody className={sty.tbody}>
            {currentRows.map((currentData: Data) => (
              <tr key={currentData._id} id={currentData._id} onClick={(e) => onCLickInRow(e)} className={sty.tableRow}>
                <td>
                  <input
                    type="checkbox"
                    className={sty.checkbox}
                    checked={selectedItems[currentData._id] || false}
                    onChange={() => handleSelectItem(currentData._id)}
                    onClick={(e) => e.stopPropagation()}
                  />
                </td>
                {tableColumns.map((fieldinf: Field, index) => {
                  const microDataInOrder = fieldinf.originalName
                  const microDataValue = formaterData(currentData[microDataInOrder], fieldinf.type)

                  return (
                    <td key={microDataInOrder} id={fieldinf.originalName} className={sty.tableCell}>
                      {microDataValue}
                    </td>
                  )
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className={sty.containerMobilePagination}>
      {
        (tableRows.length / rowsPerPage) > 1 && (
          <Pagination 
          rowsPerPage={rowsPerPage}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          rows={tableRows.length}
        />
        )
      }
    </div>
    </div>
  )
}
