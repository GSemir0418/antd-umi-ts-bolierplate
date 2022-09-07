import fakeData from './fakeData.json'
export const hours = () => {
  const t = []
  for (let i = 1; i <= 24; i++) t.push(i)
  return t
}
export const rows = Array.from(new Set(fakeData.map(i => i.y)))
export const columnWidth = 240
export const rowHeight = 60
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
    label: item,
  }))
}
const timeToPositionX = (s?: string) => {
  console.log(s)
  return 0
}
const timeToPositionY = (s?: string) => {
  console.log(s)
  return 0
}
export const generateData = () => {
  return fakeData.map((item: any) => {
    item.shape = 'lane-rect'
    item.height = 40
    item.width = (
      new Date(item.scheduleEndDate).getTime() - new Date(item.scheduleStartDate).getTime()
    ).toString()
    item.position = {
      x: timeToPositionX(item.scheduleStartDate),
      y: timeToPositionY(item.scheduleEndDate),
    }
    item.label = item.id
  })
}
