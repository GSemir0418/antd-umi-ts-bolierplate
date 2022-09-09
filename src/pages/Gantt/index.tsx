import Gantt from '@/components/Gantt'
import { ProFormDateRangePicker, QueryFilter } from '@ant-design/pro-components'

const GanttPage = () => {
  return (
    <div>
      <QueryFilter
        onFinish={v => {
          console.log(v.dateRange)
          return Promise.resolve()
        }}
      >
        <ProFormDateRangePicker name="dateRange" label="日期区间" />
      </QueryFilter>
      <Gantt />
    </div>
  )
}
export default GanttPage
