import React, { useState } from 'react';
import sty from "../../styles/style-components/tableListagem.module.css";
import Pagination from '@/components/dataComponents/Pagination'
import Field from '@/interfaces/Field';

type Data = { _id: string; [key: string]: any };

interface PropsTable {
  tableRows: Field[];
  onCLickInRow: (e: React.MouseEvent<HTMLTableRowElement>) => void;
  rowsSelected: { [key: string]: any };
}

export default function TableListagem(props: PropsTable) {
  const { onCLickInRow, tableColumns, tableRows } = props;

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
              {tableColumns.map((fieldinf: string, i) => {
                return <th key={i} className={sty.tableHeader}>{i}</th>;
              })}
            </tr>
          </thead>
          <tbody className={sty.tbody}>
            {currentRows.map((currentData: Field) => (
              <tr key={currentData.originalName} id={currentData.currentName} onClick={(e) => onCLickInRow(e)} className={sty.tableRow}>
                {tableColumns.map((fieldinf: Field, index) => {
                  const microDataInOrder = fieldinf.originalName;
                  const microDataValue = formaterData(currentData[microDataInOrder], fieldinf.type);

                  return (
                    <td key={microDataInOrder} id={fieldinf.originalName} className={sty.tableCell}>
                      {microDataValue}
                    </td>
                  );
                })}
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
          tableRows={tableRows}
        />
        )
      }
    </div>
  );
}
