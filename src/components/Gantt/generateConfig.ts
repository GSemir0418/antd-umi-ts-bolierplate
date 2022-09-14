import {
  generateCol,
  minuteGap,
  minuteToPx,
  timeToPositionX,
  yToPositionY,
} from './dataTransFormLib'

/**
 * 默认配置
 */
export type TIME_MODE = 'hour' | 'day' | 'day120' | 'default'
export const COLUMN_WIDTH = (mode: TIME_MODE) => {
  if (mode === 'hour' || mode === 'day120') return 120
  return 60
}
export const ROW_HEIGHT = 60
export const ITEM_HEIGHT = 40
export let ORIGIN_TIME = new Date().toISOString()

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
export const COLS = (dateRange: string[] | undefined, mode: TIME_MODE) => {
  // 默认值是当月的
  if (!dateRange) return generateCol('default', new Date().toISOString())
  const gapHours = minuteGap(dateRange[0], dateRange[1]) / 60
  const cols: any[] = []
  // 如果小于或等于24小时，默认显示24小时
  if (gapHours <= 24) {
    // eslint-disable-next-line prefer-destructuring
    ORIGIN_TIME = dateRange[0]
    for (let i = 0; i < 24; i++) cols.push(`${i}:00`)
    return cols
    // 如果大于24小时，但小于两个月，以天显示
  } else if (gapHours <= 60 * 24) {
    // eslint-disable-next-line prefer-destructuring
    ORIGIN_TIME = dateRange[0]
    return generateCol(
      mode,
      new Date(ORIGIN_TIME).toISOString(),
      new Date(dateRange[1]).toISOString(),
    )
  } else return cols
}

/**
 * @desc 根据数据生成列配置
 * @params 列数组
 * @params 行数组
 * @returns 甘特图列配置
 */
export const generateColumns = (data: any, dateRange: string[] | undefined, mode: TIME_MODE) => {
  return COLS(dateRange, mode).map((item, index) => ({
    id: `${index + 1}cn`,
    shape: 'lane-col',
    width: COLUMN_WIDTH(mode),
    height: (ROWS(data).length + 1) * ROW_HEIGHT,
    position: {
      x: COLUMN_WIDTH(mode) + index * COLUMN_WIDTH(mode),
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
export const generateRows = (data: any, dateRange: string[] | undefined, mode: TIME_MODE) => {
  return ROWS(data).map((item, index) => ({
    id: `${(item as any) + 1}rn`,
    shape: 'lane-row',
    width: (COLS(dateRange, mode).length + 1) * COLUMN_WIDTH(mode),
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
export const generateData = (data: any, mode: TIME_MODE) => {
  if (mode === 'hour') {
    return data.map((item: any) => {
      item.shape = 'lane-rect'
      item.attrs = {
        body: {
          fill: item.color,
        },
      }
      item.height = ITEM_HEIGHT
      item.width = minuteToPx(minuteGap(item.scheduleStartDate, item.scheduleEndDate), mode)
      item.position = {
        x: timeToPositionX(item.scheduleStartDate, mode),
        y: yToPositionY(item.yy),
      }
      item.label = item.id
      item.parent = `${item.yy + 1}rn`
      return item
    })
  } else {
    return data.map((item: any) => {
      item.tools = [
        {
          name: 'tooltip',
          args: {
            tooltip: item.id,
            startTime: item.scheduleStartDate,
            endTime: item.scheduleEndDate,
          },
        },
      ]
      item.shape = 'lane-rect'
      item.height = ITEM_HEIGHT
      item.attrs = {
        body: {
          fill: item.color,
        },
      }
      item.width = minuteToPx(minuteGap(item.scheduleStartDate, item.scheduleEndDate), mode)
      item.position = {
        x: timeToPositionX(item.scheduleStartDate, mode),
        y: yToPositionY(item.yy),
      }
      item.label = item.id
      item.parent = `${item.yy + 1}rn`
      return item
    })
  }
}
