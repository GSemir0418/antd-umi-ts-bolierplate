import type { Effect, Reducer } from 'umi'

export interface BomStateType {
  list: {
    name: string
    id: number
  }[]
}

export interface BomModelType {
  namespace: 'bomModel'
  state: BomStateType
  effects: {
    getList: Effect
  }
  reducers: {
    setList: Reducer<BomStateType>
  }
}
