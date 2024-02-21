import React, { useState } from 'react';

interface Field {
  key: string;
  type: string;
  required: boolean;
  allNames: string[];
  currentName: string;
  originalName: string;
}

type Data = { _id: string; [key: string]: any };

interface PropsTable {
  tableColumns: Field[];
  tableRows: Data[];
  collectionName: string;
}

export default function Test(props: PropsTable) {
  const { collectionName, tableColumns, tableRows } = props;
  const [selectedAll, setSelectedAll] = useState(false);
  const [selectedItems, setSelectedItems] = useState<{ [key: string]: boolean }>({});
  const headerOrder: string[] = [];

  const handleSelectAll = () => {
    setSelectedAll(!selectedAll);
    const newSelectedItems: { [key: string]: boolean } = {};
    tableRows.forEach((row) => {
      newSelectedItems[row._id] = !selectedAll;
    });
    setSelectedItems(newSelectedItems);
  };

  const handleSelectItem = (id: string) => {
    const newSelectedItems = { ...selectedItems, [id]: !selectedItems[id] };
    setSelectedItems(newSelectedItems);
    const allSelected = tableRows.every((row) => newSelectedItems[row._id]);
    setSelectedAll(allSelected);
  };

  return (
    <table>
      <caption>Aqui estão os dados da tabela {collectionName}</caption>
      <thead>
        <tr>
          <th>
            <input type="checkbox" checked={selectedAll} onChange={handleSelectAll} />
          </th>
          {tableColumns.map((fieldinf: Field) => {
            headerOrder.push(fieldinf.originalName);
            return (
              <th key={fieldinf.originalName}>{fieldinf.currentName}</th>
            );
          })}
        </tr>
      </thead>
      <tbody>
        {tableRows.map((currentData: Data) => (
          <tr key={currentData._id}>
            <td>
              <input type="checkbox" checked={selectedItems[currentData._id] || false} onChange={
                () => handleSelectItem(currentData._id)
              } />
            </td>
            {tableColumns.map((fieldinf: Field, index) => {
              const microDataInOrder = headerOrder[index];
              const microDataValue = currentData[microDataInOrder];
              return (
                <td key={microDataInOrder}>{microDataValue}</td>
              );
            })}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
