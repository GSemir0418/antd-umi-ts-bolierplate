import type { MutableRefObject } from 'react'
import { useEffect } from 'react'
import * as echarts from 'echarts'
import type { EChartsOption } from 'echarts'

type tUseEcharts<T> = (ref: MutableRefObject<T>, option: EChartsOption) => void
const useEcharts: tUseEcharts<HTMLDivElement> = (ref, option) => {
  useEffect(() => {
    echarts.init(ref.current).setOption(option)
  }, [option, ref])
}
export default useEcharts
