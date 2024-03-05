import React, { useState } from 'react';
import sty from "../../styles/style-components/tableListagem.module.css";
import Pagination from '@/components/dataComponents/Pagination'

import CollectionInfo from '@/interfaces/CollectionInfo';
import Field from '@/interfaces/Field';
interface PropsTable {
  tableColumns: string[];
  tableRows: CollectionInfo[];
  onCLickInRow: (e: React.MouseEvent<HTMLTableRowElement>) => void;
}

export default function TableListagem(props: PropsTable) {
  const { onCLickInRow, tableRows, tableColumns } = props;

  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = tableRows.slice(indexOfFirstRow, indexOfLastRow);


  return (
    <div className={sty.containerColumn}>
      <div className={sty.containerMain}>
        <table className={`${sty.tableBody}`}>
          <thead>
            <tr className={sty.tableRow}>
              {tableColumns.map((header, i) => {
                return ( 
                  <th key={i} className={sty.tableHeader}>
                    {header}
                  </th>)
              })}
            </tr>
          </thead>
          <tbody className={sty.tbody}>
            {currentRows.map((clInf, i) => (
              <tr key={i} id={clInf.collectionName} onClick={(e) => onCLickInRow(e)} className={sty.tableRow}>
                <td id={clInf.collectionName} className={sty.tableCell}>
                  {clInf.collectionName}
                </td>
                {
                clInf.fields.map((field: Field) => {
                  return (
                    <td key={field.originalName} id={field.originalName} className={sty.tableCell}>
                      {field.currentName}
                    </td>
                  );
                })
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
  );
}
