import { memo, useCallback, useEffect, useRef, useState } from "react"
import "./style.css"
import { ColumnType } from "antd/es/table"

export type ResizableColumn<T = any> = ColumnType<T> & {
  resizable?: boolean,
}

type StartInfo = {
  x: number,
  width?: number,
}

export const ResizableTitle = memo((props: {
  className?: string
  children?: React.ReactNode,
  resizable?: boolean,
}) => {
  const { className, children, resizable, ...other } = props;
  //上一次鼠标x坐标位置
  const [lastX, setLastX] = useState<number>();
  //开始信息
  const [startInfo, setStarInfo] = useState<StartInfo>();
  //把手引用
  const ref = useRef<HTMLTableCellElement>(null)
  //上一次鼠标x位置医用
  const lastXRef = useRef(lastX)
  lastXRef.current = lastX
  //开始信息引用
  const startInfoRef = useRef(startInfo)
  startInfoRef.current = startInfo

  //鼠标移动
  const handleMouseMove = useCallback((e: MouseEvent) => {
    const start = startInfoRef.current
    if (start?.width && e.clientX !== lastXRef.current) {
      setLastX(e.clientX)
      const diff = e.clientX - start.x
      const width = Math.round(start.width + diff)
      if (width > 10) {
        ref.current?.setAttribute("width", `${width}px`)
      }
    }
  }, [])

  //鼠标抬起
  const handleMouseUp = useCallback(() => {
    setStarInfo(undefined)
  }, [])

  //鼠标按下
  const handleMousDown = useCallback((e: React.MouseEvent) => {
    setLastX(e.clientX)
    setStarInfo({
      x: e.clientX,
      width: ref.current?.getBoundingClientRect().width
    })
  }, [])

  useEffect(() => {
    //添加鼠标移动事件
    document.addEventListener("mousemove", handleMouseMove)
    //添加鼠标抬起事件
    document.addEventListener("mouseup", handleMouseUp)
    return () => {
      document.removeEventListener("mousemove", handleMouseMove)
      document.removeEventListener("mouseup", handleMouseUp)
    }
  }, [handleMouseMove, handleMouseUp])

  return (
    <th ref={ref} className={"resizable-title" + (className ? (" " + className) : "")} {...other}>
      {children}
      {
        resizable && <div
          className="resizable-title-handler"
          onMouseDown={handleMousDown}
        />
      }
    </th>
  )
})