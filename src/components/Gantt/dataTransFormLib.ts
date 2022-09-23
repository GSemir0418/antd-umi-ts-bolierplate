import type { TIME_MODE } from './generateConfig'
import { TABLE_WIDTH } from './generateConfig'
import { COLUMN_WIDTH, ITEM_HEIGHT, ORIGIN_TIME, ROW_HEIGHT } from './generateConfig'

/**
 * @desc px 转换为 ms
 * @params 图元宽度（差）px
 * @return ms
 */
export const pxToMillionSecond = (px: number, mode: TIME_MODE) => {
  if (mode === 'hour') return px * ((60 * 60 * 1000) / COLUMN_WIDTH(mode))
  else return px * ((24 * 60 * 60 * 1000) / COLUMN_WIDTH(mode))
}

/**
 * @desc x坐标转换为时间戳
 * @params 图元x坐标
 * @return 时间戳
 */
export const positionXTotime = (x: number, mode: TIME_MODE) => {
  return new Date(ORIGIN_TIME).getTime() + pxToMillionSecond(x - TABLE_WIDTH * 3, mode)
}

/**
 * @desc 分钟转换为像素(宽度)
 * @params 分钟
 * @return px
 */
export const minuteToPx = (minutes: number, mode: TIME_MODE) => {
  if (mode === 'hour') {
    // hour模式 1min = 2px
    return minutes * (COLUMN_WIDTH(mode) / 60)
  } else {
    // day/default模式 1min = 1 / 24px
    // day120模式 1min = 1 / 12px
    // day240模式 1min = 1 / 6px
    return minutes * (COLUMN_WIDTH(mode) / 60 / 24)
  }
}

/**
 * @desc 计算排产开始与结束时间差（分钟）
 * @params 排产开始时间 time1
 * @params 排产结束时间 time2
 * @return 时间差（分钟）
 */
export const minuteGap = (time1: string, time2: string): number => {
  return (new Date(time2).getTime() - new Date(time1).getTime()) / 60000
}

/**
 * @desc 图元初始位置x坐标的计算(时差转换)
 * @params 排产开始时间
 * @return x坐标（px）
 */
export const timeToPositionX = (s: string, mode: TIME_MODE) => {
  // 加八小时时差
  return TABLE_WIDTH * 3 + minuteToPx(8 * 60, mode) + minuteToPx(minuteGap(ORIGIN_TIME, s), mode)
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
 * @desc 时间格式转换：ISO => string
 * @params ISOString or TimeStamp
 * @return '2022-09-09 00:00:00'
 */
export const timeFormat = (t: number | string | Date) => {
  const d = new Date(new Date(t).getTime() - 8 * 1000 * 60 * 60)
  const year = d.getFullYear()
  const month = d.getMonth() + 1 >= 10 ? d.getMonth() + 1 : `0${d.getMonth() + 1}`
  const date = d.getDate() >= 10 ? d.getDate() : `0${d.getDate()}`
  const hour = d.getHours() >= 10 ? d.getHours() : `0${d.getHours()}`
  const minute = d.getMinutes() >= 10 ? d.getMinutes() : `0${d.getMinutes()}`
  const second = d.getSeconds() >= 10 ? d.getSeconds() : `0${d.getSeconds()}`
  return `${year}-${month}-${date} ${hour}:${minute}:${second}`
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
