import { ProColumns } from "@ant-design/pro-components"
import { memo, useCallback, useEffect, useRef, useState } from "react"
import "./style.css"

export type ResizableColumn<T = any, ValueType = "text"> = ProColumns<T, ValueType> & {
  resiable?: boolean,
}

type StartInfo = {
  x: number,
  width?: number,
}

export const ResizableTitle = memo((props: {
  className?: string
  onResize?: (width?: number) => void,
  children?: React.ReactNode,
}) => {
  const { className, onResize, children, ...other } = props;
  const [lastX, setLastX] = useState<number>();
  const [startInfo, setStarInfo] = useState<StartInfo>();
  const ref = useRef<HTMLTableCellElement>(null)

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (startInfo?.width && e.clientX !== lastX) {
      setLastX(e.clientX)
      const diff = e.clientX - startInfo.x
      const width = Math.round(startInfo.width + diff)
      if (width > 10) {
        ref.current?.style.setProperty("width", `${width}px`)
        onResize?.(width)
      }
    }
  }, [lastX, onResize, startInfo])

  const handleMouseUp = useCallback(() => {
    setStarInfo(undefined)
  }, [])

  const handleMousDown = useCallback((e: React.MouseEvent) => {
    setLastX(e.clientX)
    setStarInfo({
      x: e.clientX,
      width: ref.current?.getBoundingClientRect().width
    })
  }, [])

  useEffect(() => {
    document.addEventListener("mousemove", handleMouseMove)
    document.addEventListener("mouseup", handleMouseUp)
    return () => {
      document.removeEventListener("mousemove", handleMouseMove)
      document.removeEventListener("mouseup", handleMouseUp)
    }
  }, [handleMouseMove, handleMouseUp])

  return (
    <th ref={ref} className={"resizable-title" + (className ? (" " + className) : "")} {...other}>
      {children}
      <div
        className="resizable-title-handler"
        onMouseDown={handleMousDown}
      />
    </th>
  )
})