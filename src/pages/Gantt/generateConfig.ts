import fakeData from './fakeData.json'
export const hours = () => {
  const t = []
  for (let i = 1; i <= 24; i++) t.push(i)
  return t
}
export const rows = Array.from(new Set(fakeData.map(i => i.y)))
export const columnWidth = 240
export const rowHeight = 60
export const generateColumns = () => {
  return hours().map((item, index) => ({
    id: `${index + 1}cn`,
    shape: 'lane-col',
    width: columnWidth,
    height: (rows.length + 1) * rowHeight,
    position: {
      x: 240 + index * columnWidth,
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
      y: 60 + index * rowHeight,
    },
    label: item,
  }))
}
