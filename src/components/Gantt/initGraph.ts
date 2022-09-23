import { registerNodes } from './registerNodes'
import type { CellView, Node } from '@antv/x6'
import { Graph } from '@antv/x6'
import type { TIME_MODE } from './generateConfig'
import { TABLE_WIDTH } from './generateConfig'
import './Gantt.module.less'

export const initGraph = (mode: TIME_MODE) => {
  // 注册自定义图元
  registerNodes(mode)
  // 初始化画布
  const g = new Graph({
    container: document.getElementById('container')!,
    // 标线
    // snapline: true,
    // 最小移动距离
    grid: 1,
    // @ts-ignore-next-line
    height: '100%',
    scroller: {
      enabled: true,
      // autoResize: true,
      // 画布范围限制
      padding: 0,
      pageWidth: 0,
      minVisibleWidth: 0,
      minVisibleHeight: 0,
      pannable: true,
    },
    // autoResize: true,
    interacting: {
      nodeMovable: (cellView: CellView) => {
        const { cell } = cellView
        return !cell.id.includes('n')
      },
    },
    background: {
      // color: 'lightgreen',
    },
    connecting: {
      router: 'orth',
    },
    translating: {
      // 限制拖动范围
      restrict(cellView: CellView) {
        const cell = cellView.cell as Node
        const parentId = cell.prop('parent')
        if (parentId) {
          const parentNode = g.getCellById(parentId) as Node
          if (parentNode) {
            return parentNode.getBBox().moveAndExpand({
              x: TABLE_WIDTH,
              y: 10,
              width: -TABLE_WIDTH,
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
