import { useEffect, useState } from "react";
import { ResizableColumn } from ".";

//给列附加Resizable信息
export function useTransColumns<T = any, ValueType = "text">(columns: ResizableColumn<T, ValueType>[]): ResizableColumn<T, ValueType>[] {
  const [cols, setCols] = useState<ResizableColumn<T, ValueType>[]>([])

  useEffect(() => {
    const newCols = columns.map((col) => {
      return {
        ...col,
        onHeaderCell: (col: ResizableColumn<T, ValueType>) => {
          return {
            resizable: col.resizable,
          }
        }
      } as ResizableColumn<T, ValueType>
    })

    setCols(newCols)
  }, [columns])


  return cols
}