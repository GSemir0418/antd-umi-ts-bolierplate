import type { TIME_MODE } from './generateConfig'
import { COLUMN_WIDTH, ITEM_HEIGHT, ORIGIN_TIME, ROW_HEIGHT } from './generateConfig'

/**
 * @desc px 转换为 ms
 * @params 图元宽度（差）px
 * @return ms
 */
export const pxToMillionSecond = (px: number) => {
  // 天模式下 1px = 0.25mins = 0.25 * 60 * 1000 = 15000
  return px * 15000
}

/**
 * @desc x坐标转换为时间戳
 * @params 图元x坐标
 * @return 时间戳
 */
export const positionXTotime = (x: number, mode: TIME_MODE) => {
  return new Date(ORIGIN_TIME).getTime() + pxToMillionSecond(x - COLUMN_WIDTH(mode))
}

/**
 * @desc 分钟转换为像素
 * @params 分钟
 * @return 像素尺寸
 */
export const minuteToPx = (minutes: number, mode: TIME_MODE) => {
  if (mode === 'hour' || mode === 'day120') {
    // hour|'day120'模式下 1min = 2px
    return minutes * (COLUMN_WIDTH(mode) / 60)
  } else {
    // day模式下 1min = 1/24px
    return minutes * (COLUMN_WIDTH(mode) / 60 / 24)
  }
}

/**
 * @desc 计算排产开始与结束时间差（分钟）
 * @params 排产开始时间 time1
 * @params 排产结束时间 time2
 * @return 时间差（分钟）
 */
export const minuteGap = (time1: string, time2: string) => {
  return (new Date(time2).getTime() - new Date(time1).getTime()) / 60000
}

/**
 * @desc 图元初始位置x坐标的计算
 * @params 排产开始时间
 * @return x坐标（px）
 */
export const timeToPositionX = (s: string, mode: TIME_MODE) => {
  return COLUMN_WIDTH(mode) + minuteToPx(minuteGap(ORIGIN_TIME, s), mode)
}

/**
 * @desc 图元初始位置y坐标的计算
 * @params 原始数据的yy属性值
 * @return y坐标（px）
 */
export const yToPositionY = (y: number) => {
  return ROW_HEIGHT + (ROW_HEIGHT - ITEM_HEIGHT) / 2 + y * ROW_HEIGHT
}

/**
 * @desc 暂时没用
 */
export const timeFormat = (t: number) => {
  return new Date(t)
}

/**
 * @desc 根据所选时间范围生成列
 * @params 时间模式
 * @params 初始时间
 * @return 列数组
 */
export const generateCol = (mode: string, initDate: string, endDate?: string) => {
  const result = [`${new Date(initDate).getMonth() + 1} / ${new Date(initDate).getDate()}`]
  let nextDay: string | number = initDate
  if (mode === 'default') {
    for (let i = 1; i <= 31; i++) {
      nextDay = new Date(nextDay).getTime() + 1000 * 60 * 60 * 24
      result.push(`${new Date(nextDay).getMonth() + 1} / ${new Date(nextDay).getDate()}`)
    }
    return result
  } else if (mode.includes('day')) {
    const dayGap =
      (new Date(endDate!).getTime() - new Date(initDate).getTime()) / 1000 / 60 / 60 / 24
    for (let i = 1; i <= dayGap; i++) {
      nextDay = new Date(nextDay).getTime() + 1000 * 60 * 60 * 24
      result.push(`${new Date(nextDay).getMonth() + 1} / ${new Date(nextDay).getDate()}`)
    }
    return result
  }
  return result
}
