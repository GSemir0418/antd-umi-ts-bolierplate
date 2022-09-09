import { columnWidth, itemHeight, originTime, rowHeight } from './generateConfig'

export const pxToMillionSecond = (px: number) => {
  // 天模式下 1px = 0.25mins = 0.25 * 60 * 1000 = 15000
  return px * 15000
}
export const positionXTotime = (x: number) => {
  return new Date(originTime).getTime() + pxToMillionSecond(x - columnWidth)
}
export const timeFormat = (t: number) => {
  return new Date(t)
}
export const minuteToPx = (minutes: number) => {
  // 天模式下 1min = 4px
  return minutes * (columnWidth / 60)
}
export const minuteGap = (time1: string, time2: string) => {
  return (new Date(time2).getTime() - new Date(time1).getTime()) / 60000
}
export const timeToPositionX = (s: string) => {
  return columnWidth + minuteToPx(minuteGap(originTime, s))
}
export const yToPositionY = (y: number) => {
  return rowHeight + (rowHeight - itemHeight) / 2 + y * rowHeight
}
