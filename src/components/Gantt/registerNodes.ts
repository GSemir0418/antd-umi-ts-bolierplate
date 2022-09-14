import type { TIME_MODE } from './generateConfig'
import { COLUMN_WIDTH, ROW_HEIGHT } from './generateConfig'
import { Graph } from '@antv/x6'
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
        body: {
          fill: '#FFF',
          stroke: '#999',
          strokeWidth: 0.5,
          opacity: '.5',
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
  // 图元节点配置
  Graph.registerNode(
    'lane-rect',
    {
      inherit: 'rect',
      attrs: {
        body: {
          strokeWidth: 1,
          stroke: '#5F95FF',
          fill: '#EFF4FF',
        },
        text: {
          fontSize: 12,
          fill: '#262626',
        },
      },
    },
    true,
  )
  Graph.registerNode(
    'lane-polygon',
    {
      inherit: 'polygon',
      width: 80,
      height: 80,
      attrs: {
        body: {
          strokeWidth: 1,
          stroke: '#5F95FF',
          fill: '#EFF4FF',
          refPoints: '0,10 10,0 20,10 10,20',
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
