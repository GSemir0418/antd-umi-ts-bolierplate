import fakeData from './fakeData.json'
export const hours = () => {
  const t = []
  for (let i = 1; i <= 24; i++) t.push(i)
  return t
}
export const rows = Array.from(new Set(fakeData.map(i => i.yy)))
export const columnWidth = 120
export const rowHeight = 60
export const itemHeight = 40
export const originTime = '2022-09-01 00:00:00'

// const initData = {
//   shape: 'lane-rect',
//   width: 100,
//   height: 60,
//   position: {
//     x: 320,
//     y: 120,
//   },
//   label: 'Process',
//   parent: '2',
// }
export const generateColumns = () => {
  return hours().map((item, index) => ({
    id: `${index + 1}cn`,
    shape: 'lane-col',
    width: columnWidth,
    height: (rows.length + 1) * rowHeight,
    position: {
      x: columnWidth + index * columnWidth,
      y: 0,
    },
    label: item.toString(),
  }))
}
export const generateRows = () => {
  return rows.map((item, index) => ({
    id: `${index + 1}rn`,
    shape: 'lane-row',
    width: (hours.length + 1) * columnWidth,
    height: rowHeight,
    position: {
      x: 0,
      y: rowHeight + index * rowHeight,
    },
    label: index.toString(),
  }))
}
const minuteGap = (time1: string, time2: string) => {
  return (new Date(time2).getTime() - new Date(time1).getTime()) / 60000
}
const minuteToPx = (minutes: number) => {
  // 天模式下 1min = 4px
  return minutes * (columnWidth / 60)
}
const timeToPositionX = (s: string) => {
  return columnWidth + minuteToPx(minuteGap(originTime, s))
}
const yToPositionY = (y: number) => {
  return rowHeight + (rowHeight - itemHeight) / 2 + y * rowHeight
}
export const generateData = (data: any) => {
  return data.map((item: any) => {
    item.shape = 'lane-rect'
    item.height = itemHeight
    item.width = minuteToPx(minuteGap(item.scheduleStartDate, item.scheduleEndDate))
    item.position = {
      x: timeToPositionX(item.scheduleStartDate),
      y: yToPositionY(item.yy),
    }
    item.label = item.id
    return item
  })
}
