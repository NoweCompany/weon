import React, { useState } from 'react'
import sty from "../../styles/style-components/tableListagem.module.css"
import Pagination from '@/components/dataComponents/Pagination'

import CollectionInfo from '@/interfaces/CollectionInfo'
interface PropsTable {
  tableColumns: string[]
  tableRows: CollectionInfo[]
  onCLickInRow: (e: React.MouseEvent<HTMLTableRowElement>, collectionInfo: CollectionInfo) => void
}

export default function TableListagem(props: PropsTable) {
  const { onCLickInRow, tableRows, tableColumns } = props

  const [currentPage, setCurrentPage] = useState(1)
  const [rowsPerPage, setRowsPerPage] = useState(10)

  const indexOfLastRow = currentPage * rowsPerPage
  const indexOfFirstRow = indexOfLastRow - rowsPerPage
  const currentRows = tableRows.slice(indexOfFirstRow, indexOfLastRow)


  return (
    <div className={sty.containerColumn}>
      <div className={sty.containerMain}>
        <table className={`${sty.tableBody}`}>
          <thead>
            <tr className={sty.tableRow}>
              {tableColumns.map((column, i) => {
                return ( 
                  <th key={column} className={sty.tableHeader}>
                    {column}
                  </th>)
              })}
            </tr>
          </thead>
          <tbody className={sty.tbody}>
            {currentRows.map((collectionInfo, i) => (
              <tr 
              key={`${collectionInfo.collectionName}_${i}`} 
              id={collectionInfo.collectionName} 
              onClick={(e) => onCLickInRow(e, collectionInfo)} 
              className={sty.tableRow}>
                <td id={collectionInfo.collectionName} className={sty.tableCell}>
                  {collectionInfo.collectionName}
                </td>
                {
                  
                (tableColumns.slice(1)).map((column, i) => {
                  const field = collectionInfo?.fields[i]
                  return (
                    <td key={field?.originalName} id={field?.originalName} className={sty.tableCell}>
                      {
                        field?.currentName || ''
                      }
                    </td>
                )})
                }
              </tr>
            ))}
          </tbody>
        </table>
      </div>
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
  )
}
