import { ProColumns } from "@ant-design/pro-components"
import { memo, useRef, useState } from "react"
import "./style.css"

export type ResizableColumn<T = any, ValueType = "text"> = ProColumns<T, ValueType> & {
  resiable?: boolean,
}

export const ResizableTitle = memo((props: {
  className?: string
  onResize?: (width?: number) => void,
  children?: React.ReactNode,
}) => {
  const { className, onResize, children, ...other } = props;
  const [width, setWidth] = useState<number>()
  const ref = useRef<HTMLTableCellElement>(null)
  return (
    <th ref={ref} className={"resizable-title" + (className ? (" " + className) : "")} {...other}>
      {children}
      <div
        className="resizable-title-handler"
      />
    </th>
  )
})