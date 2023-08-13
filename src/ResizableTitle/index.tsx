import { ProColumns } from "@ant-design/pro-components"
import { CSSProperties, memo, useRef, useState } from "react"

export type ResizableColumn<T = any, ValueType = "text"> = ProColumns<T, ValueType> & {
  resiable?: boolean,
}

export const ResizableTitle = memo((props: {
  style?: CSSProperties
  onResize?: (width?: number) => void,
  children?: React.ReactNode,
}) => {
  const { style, onResize, children, ...other } = props;
  const [width, setWidth] = useState<number>()
  const ref = useRef<HTMLTableCellElement>(null)
  return (
    <th ref={ref} style={{ ...style || {}, position: "relative" }} {...other}>
      {children}
    </th>
  )
})