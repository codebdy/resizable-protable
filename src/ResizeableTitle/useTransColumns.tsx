import { useEffect, useState } from "react";
import { ResizableColumn } from ".";
import { ColumnType } from "antd/es/table";

//给列附加Resizable信息
export function useTransColumns<T = any>(columns: ColumnType<T>[]): ResizableColumn<T>[] {
  const [cols, setCols] = useState<ResizableColumn<T>[]>([])

  useEffect(() => {
    const newCols = columns.map((col) => {
      return {
        ...col,
        onHeaderCell: (col: ResizableColumn<T>) => {
          return {
            resizable: col.resizable,
          }
        }
      } as ResizableColumn<T>
    })

    setCols(newCols)
  }, [columns])

  return cols
}