import { minuteGap, minuteToPx, timeToPositionX, yToPositionY } from './dataTransFormLib'

/**
 * 默认配置
 */
export let TIME_MODE: 'hour' | 'day' | 'week' | 'month' | 'year' = 'hour'
export const COLUMN_WIDTH = (mode: typeof TIME_MODE) => {
  console.log(mode)
  if (mode === 'day') return 60
  return 120
}
export const ROW_HEIGHT = 60
export const ITEM_HEIGHT = 40
export let ORIGIN_TIME = '2022-09-01 00:00:00'

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
export const COLS = (dateRange: string[]) => {
  // TODO: 默认值再议
  if (!dateRange) return []
  console.log(dateRange)
  const gapHours = minuteGap(dateRange[0], dateRange[1]) / 60
  const cols: any[] = []
  if (gapHours <= 24) {
    TIME_MODE = 'hour'
    // eslint-disable-next-line prefer-destructuring
    for (let i = 1; i <= 24; i++) cols.push(`${i}:00`)
    return cols
  } else if (gapHours <= 28 * 24) {
    // eslint-disable-next-line prefer-destructuring
    ORIGIN_TIME = dateRange[0]
    for (let i = 1; i <= 28; i++) cols.push(`${i}:00`)
    TIME_MODE = 'day'
    return cols
  }
  return cols
}

/**
 * @desc 根据数据生成列配置
 * @params 列数组
 * @params 行数组
 * @returns 甘特图列配置
 */
export const generateColumns = (data: any, dateRange: string[]) => {
  return COLS(dateRange).map((item, index) => ({
    id: `${index + 1}cn`,
    shape: 'lane-col',
    width: COLUMN_WIDTH(TIME_MODE),
    height: (ROWS(data).length + 1) * ROW_HEIGHT,
    position: {
      x: COLUMN_WIDTH(TIME_MODE) + index * COLUMN_WIDTH(TIME_MODE),
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
export const generateRows = (data: any, dateRange: string[]) => {
  return ROWS(data).map((item, index) => ({
    id: `${(item as any) + 1}rn`,
    shape: 'lane-row',
    width: (COLS(dateRange).length + 1) * COLUMN_WIDTH(TIME_MODE),
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
