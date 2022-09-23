import type { TIME_MODE } from './generateConfig'
import { TABLE_WIDTH } from './generateConfig'
import { COLUMN_WIDTH, ROW_HEIGHT } from './generateConfig'
import { Graph } from '@antv/x6'
import { TooltipTool } from './Tooltip'
import { colorMap } from './color'
export const registerNodes = (mode: TIME_MODE) => {
  // 列节点配置(x轴)
  Graph.registerNode(
    'lane-col',
    {
      inherit: 'rect',
      markup: [
        {
          tagName: 'rect',
          selector: 'body',
        },
        {
          tagName: 'rect',
          selector: 'name-rect',
        },
        {
          tagName: 'text',
          selector: 'name-text',
        },
      ],
      attrs: {
        // 横道
        body: {
          fill: '#FFF',
          // 边框颜色
          stroke: '#999',
          strokeWidth: 1,
          opacity: '.5',
        },
        // x轴babel
        'name-rect': {
          width: COLUMN_WIDTH(mode),
          height: ROW_HEIGHT,
          fill: colorMap.xBg1,
          stroke: 'white',
          strokeWidth: 2,
        },
        // x轴label文字
        'name-text': {
          ref: 'name-rect',
          refY: 0.5,
          refX: 0.5,
          textAnchor: 'middle',
          fontWeight: 'bold',
          fill: colorMap.xTx,
          fontSize: 12,
        },
      },
    },
    true,
  )
  // 行节点配置(三格+横道整体)
  Graph.registerNode(
    'lane-row',
    {
      inherit: 'rect',
      markup: [
        {
          tagName: 'rect',
          selector: 'body',
        },
        {
          tagName: 'rect',
          selector: 'name-rect',
        },
        {
          tagName: 'text',
          selector: 'name-text',
        },
      ],
      attrs: {
        // 三格+横道整体
        body: {
          // fill: '#999',
          // stroke: '#999',
          strokeWidth: 0.5,
          opacity: '.5',
        },
        // 三格
        'name-rect': {
          width: TABLE_WIDTH,
          height: ROW_HEIGHT,
          fill: '#d9eae1',
          stroke: 'white',
          // opacity: '.5',
          strokeWidth: 2,
        },
        // 头部文字
        'name-text': {
          ref: 'name-rect',
          refY: 0.5,
          refX: 0.5,
          fill: '#155aa3',
          textAnchor: 'middle',
          fontWeight: 'bold',
          fontSize: 12,
        },
      },
    },
    true,
  )
  // 表格前一半配置
  Graph.registerNode(
    'table-cell',
    {
      inherit: 'rect',
      markup: [
        {
          tagName: 'rect',
          selector: 'body',
        },
        {
          tagName: 'rect',
          selector: 'name-rect',
        },
        {
          tagName: 'text',
          selector: 'name-text',
        },
      ],
      attrs: {
        // 第一格
        body: {
          width: TABLE_WIDTH,
          height: ROW_HEIGHT,
          fill: '#d9eae1',
          opacity: '.5',
          stroke: 'white',
          // opacity: '.5',
          strokeWidth: 2,
        },
        // 第二格
        'name-rect': {
          width: TABLE_WIDTH,
          height: ROW_HEIGHT,
          fill: '#d9eae1',
          opacity: '.5',
          stroke: 'white',
          // opacity: '.5',
          strokeWidth: 2,
        },
        // 头部文字
        'name-text': {
          ref: 'name-rect',
          refY: 0.5,
          refX: 0.5,
          textAnchor: 'middle',
          fontWeight: 'bold',
          fill: colorMap.yTx,
          fontSize: 12,
        },
      },
    },
    true,
  )
  // 注册tooltip节点工具
  Graph.registerNodeTool('tooltip', TooltipTool, true)
  // 图元节点配置
  Graph.registerNode(
    'lane-rect',
    {
      inherit: 'rect',
      attrs: {
        body: {
          rx: 10,
          ry: 10,
          strokeWidth: 1,
          stroke: 'white',
          // fill: '#EFF4FF',
        },
        text: {
          fontSize: 12,
          fill: '#333',
        },
      },
    },
    true,
  )
  // 表头节点配置
  Graph.registerNode(
    'table-head',
    {
      inherit: 'rect',
      attrs: {
        body: {
          height: ROW_HEIGHT,
          fill: colorMap.tableHeaderBg,
          stroke: 'white',
          strokeWidth: 2,
        },
        text: {
          fontSize: 16,
          fontWeight: 'bold',
          fill: colorMap.tableHeaderTx,
        },
      },
    },
    true,
  )
}
