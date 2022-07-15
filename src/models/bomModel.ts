import type { BomModelType } from '@/typings/models/bomModel'

const bomModel: BomModelType = {
  namespace: 'bomModel',
  state: {
    list: [],
  },
  reducers: {
    setList(state, action) {
      return { ...state, list: action.list }
    },
  },
  effects: {
    *getList(_, { put }) {
      const list = [{ id: 1, name: 'gsq' }]
      yield put({ type: 'setList', list })
    },
  },
}

export default bomModel
