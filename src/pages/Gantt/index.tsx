import Gantt from '@/components/Gantt'
import { ProFormDateRangePicker, QueryFilter } from '@ant-design/pro-components'
import { useState } from 'react'
import fakeData from '@/components/Gantt/fakeData.json'

const GanttPage = () => {
  const [dateRange, setDateRange] = useState<string[]>()
  return (
    <div>
      <QueryFilter
        onFinish={v => {
          setDateRange(v.dateRange)
          return Promise.resolve()
        }}
      >
        <ProFormDateRangePicker name="dateRange" label="日期区间" />
      </QueryFilter>
      <Gantt dateRange={dateRange} data={fakeData} />
    </div>
  )
}
export default GanttPage
