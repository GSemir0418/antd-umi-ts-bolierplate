import ReactDom from 'react-dom'
import { Tooltip } from 'antd'
import type { EdgeView } from '@antv/x6'
import { ToolsView } from '@antv/x6'
export class TooltipTool extends ToolsView.ToolItem<EdgeView, TooltipToolOptions> {
  private knob!: HTMLDivElement

  render() {
    if (!this.knob) {
      this.knob = ToolsView.createElement('div', false) as HTMLDivElement
      this.knob.style.position = 'absolute'
      this.container.appendChild(this.knob)
    }
    return this
  }

  private toggleTooltip(visible: boolean) {
    ReactDom.unmountComponentAtNode(this.knob)
    if (visible) {
      ReactDom.render(
        <Tooltip
          title={
            <>
              <div>
                <span>订单号：{this.options.tooltip}</span>
              </div>
              <div>
                <span>开始时间：{this.options.startTime}</span>
              </div>
              <div>
                <span>结束时间：{this.options.endTime}</span>
              </div>
              <div>
                <span>物料名称：{this.options.materialName}</span>
              </div>
              <div>
                <span>数量：{this.options.scheduleNum}</span>
              </div>
              <div>
                <span>备注1：{this.options.remark}</span>
              </div>
            </>
          }
          visible={true}
          destroyTooltipOnHide
        />,
        this.knob,
      )
    }
  }

  private onMosueEnter({ e }: { e: MouseEvent }) {
    this.updatePosition(e)
    this.toggleTooltip(true)
  }

  private onMouseLeave() {
    this.updatePosition()
    this.toggleTooltip(false)
  }

  private onMouseMove() {
    this.updatePosition()
    this.toggleTooltip(false)
  }

  private onMouseDown() {
    this.updatePosition()
    this.toggleTooltip(false)
  }

  delegateEvents() {
    this.cellView.on('cell:mouseenter', this.onMosueEnter, this)
    this.cellView.on('cell:mouseleave', this.onMouseLeave, this)
    this.cellView.on('cell:mousemove', this.onMouseMove, this)
    this.cellView.on('cell:mousedown', this.onMouseDown, this)
    return super.delegateEvents()
  }

  private updatePosition(e?: MouseEvent) {
    const { style } = this.knob
    if (e) {
      const p = this.graph.clientToGraph(e.clientX, e.clientY)
      style.display = 'block'
      style.left = `${p.x}px`
      style.top = `${p.y}px`
    } else {
      style.display = 'none'
      style.left = '-1000px'
      style.top = '-1000px'
    }
  }

  protected onRemove() {
    this.cellView.off('cell:mouseenter', this.onMosueEnter, this)
    this.cellView.off('cell:mouseleave', this.onMouseLeave, this)
    this.cellView.off('cell:mousemove', this.onMouseMove, this)
  }
}

TooltipTool.config({
  tagName: 'div',
  isSVGElement: false,
})

export interface TooltipToolOptions extends ToolsView.ToolItem.Options {
  tooltip: string
  startTime: string
  endTime: string
  materialName: string
  remark: string
  scheduleNum: number
}
// const graph = new Graph({
//   container: document.getElementById('container') as HTMLDivElement,
//   grid: true,
// })

// const source = graph.addNode({
//   x: 180,
//   y: 60,
//   width: 100,
//   height: 40,
//   attrs: {
//     body: {
//       stroke: '#5F95FF',
//       fill: '#EFF4FF',
//       strokeWidth: 1,
//     },
//   },
// })

// const target = graph.addNode({
//   x: 320,
//   y: 250,
//   width: 100,
//   height: 40,
//   attrs: {
//     body: {
//       stroke: '#5F95FF',
//       fill: '#EFF4FF',
//       strokeWidth: 1,
//     },
//   },
// })

// graph.addEdge({
//   source,
//   target,
//   attrs: {
//     line: {
//       stroke: '#A2B1C3',
//       strokeWidth: 2,
//     },
//   },
//   tools: [
//     {
//       name: 'tooltip',
//       args: {
//         tooltip: 'Tooltip Content',
//       },
//     },
//   ],
// })
