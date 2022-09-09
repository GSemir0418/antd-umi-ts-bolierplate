import { registerNodes } from './registerNodes'
import type { CellView, Node } from '@antv/x6'
import { Graph } from '@antv/x6'
import { COLUMN_WIDTH } from './generateConfig'

export const initGraph = () => {
  // 注册自定义图元
  registerNodes()
  // 初始化画布
  const g = new Graph({
    container: document.getElementById('container')!,
    // 标线
    // snapline: true,
    scroller: {
      enabled: true,
      // minVisibleHeight: 500,
      // minVisibleWidth: 500,
      // autoResize: true,
      padding: 0,
      pageWidth: 0,
      pageHeight: 0,
      pageVisible: false,
      pageBreak: false,
      pannable: true,
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
              x: COLUMN_WIDTH,
              y: 10,
              width: -COLUMN_WIDTH,
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
