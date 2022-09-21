import type { TIME_MODE } from './generateConfig'
import { TABLE_WIDTH } from './generateConfig'
import { COLUMN_WIDTH, ROW_HEIGHT } from './generateConfig'
import { Graph } from '@antv/x6'
import { TooltipTool } from './Tooltip'
export const registerNodes = (mode: TIME_MODE) => {
  // 列节点配置
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
        body: {
          fill: '#FFF',
          // 边框颜色
          stroke: '#5F95FF',
          strokeWidth: 1,
        },
        'name-rect': {
          width: COLUMN_WIDTH(mode),
          height: ROW_HEIGHT,
          fill: '#5F95FF',
          stroke: '#fff',
          strokeWidth: 1,
          x: -1,
        },
        'name-text': {
          ref: 'name-rect',
          refY: 0.5,
          refX: 0.5,
          textAnchor: 'middle',
          fontWeight: 'bold',
          fill: '#fff',
          fontSize: 12,
        },
      },
    },
    true,
  )
  // 行节点配置
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
        // 横道
        body: {
          fill: '#FFF',
          stroke: '#999',
          strokeWidth: 0.5,
          opacity: '.5',
        },
        // 表头
        'name-rect': {
          width: TABLE_WIDTH,
          height: ROW_HEIGHT,
          // fill: '#5F95FF',
          fill: 'white',
          stroke: '#999',
          opacity: '.5',
          strokeWidth: 1,
          x: -1,
        },
        // 头部文字
        'name-text': {
          ref: 'name-rect',
          refY: 0.5,
          refX: 0.5,
          fill: 'black',
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
        // 横道
        body: {
          width: TABLE_WIDTH,
          height: ROW_HEIGHT,
          // fill: '#5F95FF',
          fill: 'white',
          stroke: '#999',
          opacity: '.5',
          strokeWidth: 1,
          x: -1,
        },
        // 表头
        'name-rect': {
          width: TABLE_WIDTH,
          height: ROW_HEIGHT,
          // fill: '#5F95FF',
          fill: 'white',
          stroke: '#999',
          opacity: '.5',
          strokeWidth: 1,
          x: -1,
        },
        // 头部文字
        'name-text': {
          ref: 'name-rect',
          refY: 0.5,
          refX: 0.5,
          textAnchor: 'middle',
          fontWeight: 'bold',
          fill: 'black',
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
          fill: 'white',
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
          fill: '#5F95FF',
          stroke: '#fff',
          strokeWidth: 1,
          x: -1,
        },
        text: {
          fontSize: 12,
          fill: '#262626',
        },
      },
    },
    true,
  )
}
