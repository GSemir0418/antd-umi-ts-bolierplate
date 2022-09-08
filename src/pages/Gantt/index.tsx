import type { Cell, CellView, Node } from '@antv/x6'
import { Graph } from '@antv/x6'
import { Tooltip } from 'antd'
import { useEffect, useRef, useState } from 'react'
import ReactDOM from 'react-dom'
import fakeData from './fakeData.json'
import s from './Gantt.module.less'
import { columnWidth, generateColumns, generateData, generateRows } from './generateConfig'

import { registerNodes } from './registerNodes'
const Gantt = () => {
  registerNodes()
  const [graph, setGraph] = useState<Graph>()
  const refKnob = useRef<HTMLDivElement>(null)
  // const [visible, setVisible] = useState<boolean>(false)
  const initGraph = () => {
    const g = new Graph({
      container: document.getElementById('container')!,
      scroller: {
        enabled: true,
        // minVisibleHeight: 500,
        // minVisibleWidth: 500,
        // autoResize: true,
        padding: 0,
        pageWidth: 0,
        pageHeight: 0,
      },
      autoResize: true,
      interacting: {
        nodeMovable: (cellView: CellView) => {
          const { cell } = cellView
          return !cell.id.includes('n')
        },
      },
      background: {
        color: 'lightgreen',
      },
      connecting: {
        router: 'orth',
      },
      translating: {
        restrict(cellView: CellView) {
          const cell = cellView.cell as Node
          const parentId = cell.prop('parent')
          if (parentId) {
            const parentNode = g.getCellById(parentId) as Node
            if (parentNode) {
              return parentNode.getBBox().moveAndExpand({
                x: columnWidth,
                y: 10,
                width: -columnWidth,
                height: -20,
              })
            }
          }
          return cell.getBBox()
        },
      },
    })
    return g
  }
  useEffect(() => {
    setGraph(initGraph)
  }, [])
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
  useEffect(() => {
    if (!graph) return
    const cells: Cell[] = []
    const d = [...generateColumns(), ...generateRows(), ...generateData(fakeData)]
    console.log(d)
    d.forEach((item: any) => {
      cells.push(graph.createNode(item))
    })
    cells.push(
      graph.createNode({
        id: '6',
        shape: 'lane-rect',
        width: 240,
        height: 40,
        position: {
          x: 320,
          y: 130,
        },
        label: 'Process',
        parent: '2',
      }),
    )
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
  }, [graph])

  return (
    <div className={s.wrapper}>
      <div style={{ position: 'absolute' }} ref={refKnob} />
      <div id="container" className={s.container} />
    </div>
  )
}
export default Gantt
