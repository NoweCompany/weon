import React, { useEffect, useState } from 'react';
import sty from "../styles/style-components/table.module.css"
import Field from '../interfaces/Field'

type Data = { _id: string; [key: string]: any };

interface PropsTable {
  tableColumns: Field[];
  tableRows: Data[];
  onCLickInRow: (e: React.MouseEvent<HTMLTableRowElement>) => void
  setRowsSelected: React.Dispatch<React.SetStateAction<any>>
  rowsSelected: {[key: string]: any}
}

export default function Table(props: PropsTable) {  
  const { onCLickInRow, setRowsSelected, rowsSelected,  tableColumns, tableRows } = props;
  const [selectedAll, setSelectedAll] = useState(false);
  const [selectedItems, setSelectedItems] = useState<{ [key: string]: boolean }>({});
  const headerOrder: string[] = [];

  const handleSelectAll = () => {
    const newSelectedItems: { [key: string]: boolean } = {};

    if(!selectedAll) {
      tableRows.forEach((row) => newSelectedItems[row._id] = !selectedAll );
    }

    setRowsSelected(newSelectedItems)
    setSelectedItems(newSelectedItems);
    setSelectedAll(!selectedAll);
};

  const handleSelectItem = (id: string) => {
    const newSelectedItems = { ...selectedItems, [id]: !selectedItems[id] };
    setSelectedItems(newSelectedItems);

    const newRowsSelected = { ...rowsSelected };
    if (newSelectedItems[id]) {
      newRowsSelected[id] = true
    } else {
      delete newRowsSelected[id]
    }
    setRowsSelected(newRowsSelected);
    
    const allSelected = tableRows.every((row) => newSelectedItems[row._id]);
    setSelectedAll(allSelected);
  };

return (
  <div className={sty.containerMobile}> 
  <div className={sty.containerMain}>
    <table className={`${sty.tableBody}`}>
      <thead >
        <tr className={sty.tableRow}>
          <th className={sty.allCheck}>
            <input type="checkbox" className={sty.checkbox} checked={selectedAll} onChange={handleSelectAll} />
          </th>
            {
              tableColumns.map((fieldinf: Field) => {
                headerOrder.push(fieldinf.originalName);
                return (
                  <th key={fieldinf.originalName} className={sty.tableHeader}>{fieldinf.currentName}</th>
                );
              }
            )}
        </tr>
      </thead>
      <tbody className={sty.tbody}>
        {tableRows.map((currentData: Data) => (
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
              const microDataInOrder = headerOrder[index];
              const microDataValue = currentData[microDataInOrder];
              return (
                <td key={microDataInOrder} id={fieldinf.originalName} className={sty.tableCell}>{microDataValue}</td>
              );
            })}
          </tr>
        ))}
      </tbody>
    </table>
  </div>
  </div>
);
}