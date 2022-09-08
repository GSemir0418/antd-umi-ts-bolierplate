import type { Cell, CellView } from '@antv/x6'
import { Graph } from '@antv/x6'
import { useEffect, useState } from 'react'
import fakeData from './fakeData.json'
import s from './Gantt.module.less'
import { generateColumns, generateData, generateRows } from './generateConfig'

import { registerNodes } from './registerNodes'
const Gantt = () => {
  registerNodes()
  const [graph, setGraph] = useState<Graph>()
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
      //   autoResize: true,
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
      // translating: {
      // restrict(cellView: CellView) {
      //   const cell = cellView.cell as Node
      //   const parentId = cell.prop('parent')
      //   if (parentId) {
      //     const parentNode = g.getCellById(parentId) as Node
      //     if (parentNode) {
      //       return parentNode.getBBox().moveAndExpand({
      //         x: 0,
      //         y: 30,
      //         width: 0,
      //         height: -30,
      //       })
      //     }
      //   }
      //   return cell.getBBox()
      // },
      //   },
    })
    return g
  }
  useEffect(() => {
    setGraph(initGraph)
  }, [])
  useEffect(() => {
    if (!graph) return
    const cells: Cell[] = []
    const d = [...generateColumns(), ...generateRows(), ...generateData(fakeData)]
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
    // graph.centerContent()
    // graph.scaleContentToFit()
    // graph.zoomToFit({ padding: 10 })
    // graph.zoom(0.2)
  }, [graph])

  return (
    <div className={s.wrapper}>
      <div id="container" className={s.container} />
    </div>
  )
}
export default Gantt
