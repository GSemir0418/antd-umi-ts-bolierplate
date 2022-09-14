import type { ProFormInstance } from '@ant-design/pro-components'
import { ProFormDateRangePicker, QueryFilter } from '@ant-design/pro-components'
import type { Cell } from '@antv/x6'
import type { Graph } from '@antv/x6'
import { useEffect, useMemo, useRef, useState } from 'react'
import { minuteGap, positionXTotime, pxToMillionSecond } from './dataTransFormLib'
import s from './Gantt.module.less'
import { generateColumns, generateData, generateRows } from './generateConfig'
import { initGraph } from './initGraph'
import fakeData from '@/components/Gantt/fakeData.json'

const Gantt = () => {
  const [data, setData] = useState<any>()
  const [graph, setGraph] = useState<Graph>()
  const [dateRange, setDateRange] = useState<string[]>()
  const formRef = useRef<ProFormInstance<Record<string, any>> | undefined>()
  // 开局赋值
  useEffect(() => {
    formRef.current?.submit()
  }, [])
  // 计算timeMode
  const timeMode = useMemo(() => {
    // 默认值是当月的
    if (!dateRange) return 'default'
    const gapHours = minuteGap(dateRange[0], dateRange[1]) / 60
    // 如果小于或等于24小时，默认显示24小时
    if (gapHours <= 24) return 'hour'
    // 如果大于24小时，但小于12天，以天120px显示
    else if (gapHours <= 12 * 24) return 'day120'
    else return 'day'
  }, [dateRange])
  // 初始化甘特图画布
  useEffect(() => {
    if (data) {
      // 再次取消全部
      graph?.dispose()
      setGraph(initGraph(timeMode))
    }
    // eslint-disable-next-line
  }, [timeMode, data])

  // 计算并渲染全部图元
  useEffect(() => {
    if (!graph || !data) return
    const cells: Cell[] = []
    const d = [
      ...generateColumns(data, dateRange, timeMode),
      ...generateRows(data, dateRange, timeMode),
      ...generateData(data, timeMode),
    ]
    d.forEach((item: any) => {
      cells.push(graph.createNode(item))
    })
    graph.resetCells(cells)
    // graph.on('node:mouseenter', ({ e, node }) => {
    //   if (node.id.includes('n') || !refKnob.current) return
    //   const p = graph.clientToGraph(e.clientX, e.clientY)
    //   refKnob.current.style.display = 'block'
    //   refKnob.current.style.position = 'absolute'
    //   refKnob.current.style.left = `${p.x}px`
    //   refKnob.current.style.top = `${p.y}px`
    //   toggleTooltip(true)
    // })
    // graph.on('node:mouseleave', ({ node }) => {
    //   if (node.id.includes('n') || !refKnob.current) return
    //   refKnob.current.style.display = 'none'
    //   refKnob.current.style.left = `-1000px`
    //   refKnob.current.style.top = `-1000px`
    //   toggleTooltip(false)
    // })
    // graph.on('node:mousemove', ({ node }) => {
    //   if (node.id.includes('n') || !refKnob.current) return
    //   refKnob.current.style.display = 'none'
    //   refKnob.current.style.left = `-1000px`
    //   refKnob.current.style.top = `-1000px`
    //   toggleTooltip(false)
    // })
    // graph.centerContent()
    // graph.scaleContentToFit()
    // graph.zoomToFit({ padding: 10 })
    // graph.zoom(0.2)
  }, [data, dateRange, graph, timeMode])

  return (
    <div className={s.wrapper}>
      <QueryFilter
        formRef={formRef}
        onFinish={v => {
          // 销毁之前的
          graph?.dispose()
          setDateRange(v.dateRange || undefined)
          setData([...fakeData])
          return Promise.resolve()
        }}
        style={{ overflow: 'hidden' }}
      >
        <ProFormDateRangePicker name="dateRange" label="日期区间" />
      </QueryFilter>
      <div id="container" className={s.container} />
      <div
        onClick={() => {
          const originResult = graph?.toJSON().cells
          const result = originResult?.map(item => {
            item.scheduleStartDate = positionXTotime(item.position.x, timeMode)
            item.scheduleEndDate =
              positionXTotime(item.position.x, timeMode) + pxToMillionSecond(item.size.width)
            return !item.id?.includes('n') && item
          })
          // eslint-disable-next-line
          console.log(result?.filter(i => i))
        }}
      >
        111
      </div>
    </div>
  )
}
export default Gantt
