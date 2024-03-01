import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
} from "../ui/pagination"
import React, { useEffect, useState } from 'react';

type Data = { _id: string; [key: string]: any };
interface Props {
  tableRows: Data[]
  rowsPerPage: number,
  currentPage: number,
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>
}

export default function PaginationComponent({ 
  tableRows,
  rowsPerPage,
  currentPage,
  setCurrentPage
  }: Props){

  useEffect(() => {
    setPagesItens(Array.from({length: pages > 10 ? 10 : pages}, (_, i) => i+1))
  }, [tableRows])

  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const pages = Math.ceil(tableRows.length / rowsPerPage );
  const [ pagesItens, setPagesItens] = useState<number[]>([1])

  return (
    <>
      <div>
        <p className="text-sm text-gray-700">
          <span className="font-medium">{indexOfFirstRow + 1}</span> - <span className="font-medium">{indexOfLastRow}</span> de{' '}
          <span className="font-medium">{tableRows.length}</span> resultados
        </p>
      </div>
      <Pagination>
        <PaginationContent>
          <PaginationItem className='cursor-pointer'>
            <a 
              className="bg-gray-700 hover:bg-gray-900 text-white font-bold py-2 px-4 rounded"
              onClick={() => {            
                if(currentPage <= 1)  return 
                if(currentPage <= pagesItens[2] && currentPage >= 4) {
                  setCurrentPage(currentPage-1)
                  setPagesItens(pagesItens.map((vl) => vl-5)) 
                  return
                }          
                
                setCurrentPage(currentPage - 1)
              }}
            >
              {"< Anterior"}
            </a>
          </PaginationItem>
          {
            !pagesItens.includes(1) && (
            <>
              <PaginationItem 
                onClick={() => {
                  setCurrentPage(1)
                  setPagesItens(Array.from({length: 10}, (_, i) => i+1)) 
              }}
              >
              <PaginationLink
                className={`${currentPage===1 ? 'bg-gray-900' : 'bg-blue-500 hover:bg-white-500'} cursor-pointer rounded-md text-white`}
              >
                {1}
              </PaginationLink>
              </PaginationItem>
              <PaginationItem><PaginationLink>...</PaginationLink></PaginationItem>
            </>
            )
          }
        
          {
            pagesItens.map((page, index) => {             
              let item = pagesItens[index]
              if(!item) return

              return (
                <PaginationItem 
                  onClick={() => { 
                    setCurrentPage(item)  
                    
                    if(item > pagesItens[7]) {                   
                      if(pagesItens.every((vl => vl+6 !== pages))){
                        return setPagesItens(pagesItens.map((vl) => vl+6  )) 
                      }else{
                        return setPagesItens(Array.from({length: 10}, (_, i) => pages - i).reverse()) 
                      }
                    }
                    else if(item <= pagesItens[1] && item >= 7) {         
                      setCurrentPage(item)
                      setPagesItens(pagesItens.map((vl) => vl-6)) 
                      return
                    }        
                  }} key={index}
                >
                  <PaginationLink 
                  className={`${currentPage===item ? 'bg-gray-900' : 'bg-blue-500'} hover:bg-blue-700 cursor-pointer rounded-md text-white`}  
                  >
                    {item}
                  </PaginationLink>
                </PaginationItem>
              )
            })
          
          }
          {            
            !pagesItens.includes(pages) && (
              <>
              <PaginationItem><PaginationLink>...</PaginationLink></PaginationItem>
                <PaginationItem 
                  onClick={() => {
                    setCurrentPage(pages)
                    setPagesItens(Array.from({length: 10}, (_, i) => pages - i).reverse()) 
                }}
                >
                <PaginationLink 
                  className={`${currentPage===tableRows.length ? 'bg-gray-900 hover:bg-gray-900' : 'bg-blue-500 hover:bg-white-500'}  cursor-pointer rounded-md text-white`}
                >
                  {pages}
                </PaginationLink>
                </PaginationItem>
              </>
            )
          }
          <PaginationItem className='cursor-pointer'>
            <a 
              className="bg-gray-700 hover:bg-gray-900 text-white font-bold py-2 px-4 rounded"
              onClick={() => { 
                if(currentPage >= pages)  return         
                if(currentPage >= pagesItens[5]) {
                  setCurrentPage(currentPage+1)
                  if(pagesItens.every((vl => vl+5 !== pages))){
                    setPagesItens(pagesItens.map((vl) => vl+5)) 
                  }else{
                    setPagesItens(Array.from({length: 10}, (_, i) => pages - i).reverse()) 
                  }
                  return
                }          
                
                setCurrentPage(currentPage + 1)
              }}
            >
              {"Próxima >"}
            </a>
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </>
  )
}