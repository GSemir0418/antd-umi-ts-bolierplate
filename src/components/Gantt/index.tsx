import type { Cell } from '@antv/x6'
import type { Graph } from '@antv/x6'
import { Tooltip } from 'antd'
import { useEffect, useRef, useState } from 'react'
import ReactDOM from 'react-dom'
import { positionXTotime, pxToMillionSecond } from './dataTransFormLib'
import s from './Gantt.module.less'
import { generateColumns, generateData, generateRows } from './generateConfig'
import { initGraph } from './initGraph'
const Gantt = (props: any) => {
  const { dateRange, data } = props
  const [graph, setGraph] = useState<Graph>()
  // 暂时没用
  const refKnob = useRef<HTMLDivElement>(null)
  // 初始化甘特图画布
  useEffect(() => {
    setGraph(initGraph)
  }, [])
  // 暂时没用
  const toggleTooltip = (visible: boolean) => {
    if (!refKnob.current) return
    ReactDOM.unmountComponentAtNode(refKnob.current)
    if (visible) {
      ReactDOM.render(
        <Tooltip title={'111'} visible={true} destroyTooltipOnHide>
          <div />
        </Tooltip>,
        refKnob.current,
      )
    }
  }
  // 计算并渲染全部图元
  useEffect(() => {
    if (!graph) return
    const cells: Cell[] = []
    const d = [
      ...generateColumns(data, dateRange),
      ...generateRows(data, dateRange),
      ...generateData(data),
    ]
    console.log(d)
    d.forEach((item: any) => {
      cells.push(graph.createNode(item))
    })
    graph.resetCells(cells)
    graph.on('node:mouseenter', ({ e, node }) => {
      if (node.id.includes('n') || !refKnob.current) return
      const p = graph.clientToGraph(e.clientX, e.clientY)
      refKnob.current.style.display = 'block'
      refKnob.current.style.position = 'absolute'
      refKnob.current.style.left = `${p.x}px`
      refKnob.current.style.top = `${p.y}px`
      toggleTooltip(true)
    })
    graph.on('node:mouseleave', ({ node }) => {
      if (node.id.includes('n') || !refKnob.current) return
      refKnob.current.style.display = 'none'
      refKnob.current.style.left = `-1000px`
      refKnob.current.style.top = `-1000px`
      toggleTooltip(false)
    })
    graph.on('node:mousemove', ({ node }) => {
      if (node.id.includes('n') || !refKnob.current) return
      refKnob.current.style.display = 'none'
      refKnob.current.style.left = `-1000px`
      refKnob.current.style.top = `-1000px`
      toggleTooltip(false)
    })
    // graph.centerContent()
    // graph.scaleContentToFit()
    // graph.zoomToFit({ padding: 10 })
    // graph.zoom(0.2)
  }, [data, dateRange, graph])

  return (
    <div className={s.wrapper}>
      <div style={{ position: 'absolute' }} ref={refKnob} />
      <div id="container" className={s.container} />
      <div
        onClick={() => {
          const originResult = graph?.toJSON().cells
          const result = originResult?.map(item => {
            item.scheduleStartDate = positionXTotime(item.position.x)
            item.scheduleEndDate =
              positionXTotime(item.position.x) + pxToMillionSecond(item.size.width)
            return !item.id?.includes('n') && item
          })
          console.log(result?.filter(i => i))
        }}
      >
        111
      </div>
    </div>
  )
}
export default Gantt
