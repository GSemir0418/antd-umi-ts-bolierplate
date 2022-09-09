import { minuteGap, minuteToPx, timeToPositionX, yToPositionY } from './dataTransFormLib'
import fakeData from './fakeData.json'

/**
 * 默认配置
 */
export const COLUMN_WIDTH = 120
export const ROW_HEIGHT = 60
export const ITEM_HEIGHT = 40
export const ORIGIN_TIME = '2022-09-01 00:00:00'

/**
 * @desc 根据原始数据的yy字段生成行数组
 * @params 原始数据
 * @return 行数组
 */
export const ROWS = (data: any) => Array.from(new Set(data.map((i: any) => i.yy)))

/**
 * @desc 根据用户选择的时间段返回不同的列数
 * @params 用户选择的时间段
 * @returns 列数组
 */
export const HOURS = () => {
  const cols = []
  for (let i = 1; i <= 24; i++) cols.push(i)
  return cols
}

/**
 * @desc 根据数据生成列配置
 * @params 列数组
 * @params 行数组
 * @returns 甘特图列配置
 */
export const generateColumns = () => {
  return HOURS().map((item, index) => ({
    id: `${index + 1}cn`,
    shape: 'lane-col',
    width: COLUMN_WIDTH,
    height: (ROWS(fakeData).length + 1) * ROW_HEIGHT,
    position: {
      x: COLUMN_WIDTH + index * COLUMN_WIDTH,
      y: 0,
    },
    label: item.toString(),
  }))
}

/**
 * @desc 根据行数及列数生成行配置
 * @params 列数组
 * @params 行数组
 * @returns 甘特图行配置
 */
export const generateRows = () => {
  return ROWS(fakeData).map((item, index) => ({
    id: `${(item as any) + 1}rn`,
    shape: 'lane-row',
    width: (HOURS().length + 1) * COLUMN_WIDTH,
    height: ROW_HEIGHT,
    position: {
      x: 0,
      y: ROW_HEIGHT + index * ROW_HEIGHT,
    },
    label: index.toString(),
  }))
}

/**
 * @desc 根据原始数据生成图元配置
 * @params 原始数据
 * @returns 甘特图图元配置
 */
export const generateData = (data: any) => {
  return data.map((item: any) => {
    item.shape = 'lane-rect'
    item.height = ITEM_HEIGHT
    item.width = minuteToPx(minuteGap(item.scheduleStartDate, item.scheduleEndDate))
    item.position = {
      x: timeToPositionX(item.scheduleStartDate),
      y: yToPositionY(item.yy),
    }
    item.label = item.id
    item.parent = `${item.yy + 1}rn`
    return item
  })
}
