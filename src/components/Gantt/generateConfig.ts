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
export const TABLE_WIDTH = 200
export const ROW_HEIGHT = 60
export const ITEM_HEIGHT = 40
// 2022-9-19与2022-09-19是不同的
export let ORIGIN_TIME = `${new Date().getFullYear()}-${
  new Date().getMonth() + 1 >= 10 ? new Date().getMonth() + 1 : `0${new Date().getMonth() + 1}`
}-${new Date().getDate()}`
export type TIME_MODE = 'hour' | 'day' | 'day120' | 'day240' | 'default'
export const COLUMN_WIDTH = (mode: TIME_MODE) => {
  if (mode === 'hour' || mode === 'day120') return 120
  else if (mode === 'day240') return 240
  else return 60
}

/**
 * @desc 根据原始数据的yy字段生成行数组
 * @desc 包括equipName等字段
 * @params 原始数据
 * @return 去重后的行数组 { yy: number; equipName: string | null }[]
 */
type ROWS_TYPE = {
  yy: number
  equipName: string | null
  deviceName: string | null
  soipLevel2: string | null
}[]
export const ROWS = (data: any[]) => {
  const newArr: ROWS_TYPE = []
  data
    .map((item: any) => {
      return {
        yy: item.yy,
        equipName: item.equipName,
        soipLevel2: item.soipEn02,
        deviceName: item.deviceName,
      }
    })
    // 对象数组去重
    .reduce((prev, cur) => {
      if (!prev.includes(cur.yy as never)) {
        prev.push(cur.yy as never)
        newArr.push(cur)
      }
      return prev
    }, [])
  return newArr
}

/**
 * @desc 根据用户选择的时间段返回不同的列数
 * @params 用户选择的时间段
 * @returns 列数组
 */
export const COLS = (dateRange: string[] | undefined, mode: TIME_MODE) => {
  // 默认值是当月的
  if (!dateRange) {
    return generateCol(
      'default',
      `${new Date().getFullYear()}-${new Date().getMonth() + 1}-${new Date().getDate()} 00:00:00`,
    )
  }
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
      x: TABLE_WIDTH * 3 + index * COLUMN_WIDTH(mode),
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
  const tableHeaders = [
    {
      id: '1tfn',
      shape: 'table-head',
      width: TABLE_WIDTH,
      height: ROW_HEIGHT,
      position: {
        x: 0,
        y: 0,
      },
      label: 'soip02',
    },
    {
      id: '2tfn',
      shape: 'table-head',
      width: TABLE_WIDTH,
      height: ROW_HEIGHT,
      position: {
        x: TABLE_WIDTH,
        y: 0,
      },
      label: '生产单元',
    },
    {
      id: '3tfn',
      shape: 'table-head',
      width: TABLE_WIDTH,
      height: ROW_HEIGHT,
      position: {
        x: TABLE_WIDTH * 2,
        y: 0,
      },
      label: '生产装置',
    },
  ]
  const tableCells = ROWS(data).map((item, index) => {
    const r = []
    r.push({
      id: `${index + 1}rn`,
      shape: 'lane-row',
      width: TABLE_WIDTH + COLS(dateRange, mode).length * COLUMN_WIDTH(mode),
      height: ROW_HEIGHT,
      position: {
        x: TABLE_WIDTH * 2,
        y: ROW_HEIGHT + index * ROW_HEIGHT,
      },
      label: item.equipName,
    })
    r.push({
      id: `${index + 1}tcsn`,
      shape: 'table-cell',
      width: TABLE_WIDTH,
      height: ROW_HEIGHT,
      position: {
        x: 0,
        y: ROW_HEIGHT + index * ROW_HEIGHT,
      },
      label: item.soipLevel2,
    })
    r.push({
      id: `${index + 1}tcdn`,
      shape: 'table-cell',
      width: TABLE_WIDTH,
      height: ROW_HEIGHT,
      position: {
        x: TABLE_WIDTH,
        y: ROW_HEIGHT + index * ROW_HEIGHT,
      },
      label: item.deviceName,
    })
    return r
  })
  return [...tableHeaders, ...tableCells.flat()]
}

/**
 * @desc 根据原始数据生成图元配置
 * @params 原始数据
 * @returns 甘特图图元配置
 */
export const generateData = (data: any, mode: TIME_MODE) => {
  return data.map((item: any) => {
    item.id = item.id.toString()
    item.shape = 'lane-rect'
    item.attrs = {
      body: {
        fill: item.specifications,
      },
    }
    item.height = ITEM_HEIGHT
    item.width = minuteToPx(minuteGap(item.scheduleStartDate, item.scheduleEndDate), mode)
    item.position = {
      x: timeToPositionX(item.scheduleStartDate, mode),
      y: yToPositionY(item.yy),
    }
    item.label = item.materialCode
    item.parent = `${item.yy + 1}rn`
    item.tools = [
      {
        name: 'tooltip',
        args: {
          tooltip: item.id,
          startTime: item.scheduleStartDate,
          endTime: item.scheduleEndDate,
          materialName: item.materialName,
          remark: item.remark1,
          scheduleNum: item.scheduleNum,
        },
      },
    ]
    return item
  })
}
