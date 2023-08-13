import { useCallback, useEffect, useState } from "react";
import { ResizableColumn } from ".";

//给列附加Resizable信息
export function useTransColumns<T = any, ValueType = "text">(columns: ResizableColumn<T, ValueType>[]): ResizableColumn<T, ValueType>[] {
  const [cols, setCols] = useState<ResizableColumn<T, ValueType>[]>([])

  const handleResize = useCallback((width: number, index: number) => {
    console.log("哈哈", width)
    setCols(cols => cols.map((col, i) => i === index ? { ...col, width } : col))
  }, [])

  useEffect(() => {
    const newCols = columns.map((col, index) => {
      return {
        ...col,
        onHeaderCell: (col: ResizableColumn<T, ValueType>, index) => {
          return {
            resizable: col.resizable,
            onReWidth: (width: number) => handleResize(width, index || 0)
          }
        }
      } as ResizableColumn<T, ValueType>
    })

    setCols(newCols)
  }, [columns, handleResize])


  return cols
}