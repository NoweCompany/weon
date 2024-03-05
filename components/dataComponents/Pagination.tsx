import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
} from "../ui/pagination";
import React, { useEffect, useState } from "react";
import { MoveLeft, MoveRight } from "lucide-react";

import sty from "../../styles/style-components/pagination.module.css";
interface Props {
  rows: number;
  rowsPerPage: number;
  currentPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
}

export default function PaginationComponent({
  rows,
  rowsPerPage,
  currentPage,
  setCurrentPage,
}: Props) {
  useEffect(() => {
    const totalPages = Math.ceil(rows / rowsPerPage);
    const startPage = Math.max(1, currentPage - 2);
    const endPage = Math.min(startPage + 4, totalPages);

    setPagesItens(Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i));
  }, [rows, currentPage, rowsPerPage]);

  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const [pagesItens, setPagesItens] = useState<number[]>([1]);

  return (
    <>
      <Pagination className={sty.paginationContent}>
        <PaginationContent>
          <PaginationItem className={sty.pointer}>
            <a
              className={sty.navegationButton}
              onClick={() => {
                if (currentPage <= 1) return;
                setCurrentPage(currentPage - 1);
              }}
            >
              {<MoveLeft />}
            </a>
          </PaginationItem>
          {pagesItens.map((page, index) => (
            <PaginationItem
              onClick={() => {
                setCurrentPage(page);
              }}
              key={index}
            >
              <PaginationLink
                className={`${currentPage === page ? sty.paginationItemSelect : sty.paginationButton}`}
              >
                {page}
              </PaginationLink>
            </PaginationItem>
          ))}
          <PaginationItem className={sty.pointer}>
            <a
              className={sty.navegationButton}
              onClick={() => {
                const totalPages = Math.ceil(rows / rowsPerPage);
                if (currentPage >= totalPages) return;
                setCurrentPage(currentPage + 1);
              }}
            >
              {<MoveRight />}
            </a>
          </PaginationItem>
        </PaginationContent>
      </Pagination>
      <div>
        <p className={sty.comment}>
          <span>{indexOfFirstRow + 1}</span> - <span>{indexOfLastRow}</span> de{" "}
          <span>{rows}</span> resultados
        </p>
      </div>
    </>
  );
}
