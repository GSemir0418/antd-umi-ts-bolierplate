import type { FC } from 'react'
import { Button, Table } from 'antd'
import type { ConnectProps, Dispatch, Loading } from 'umi'
import type { BomStateType } from '@/typings/models/bomModel'
import { connect } from 'umi'

interface TestDvaProps extends ConnectProps {
  bomModel: BomStateType
  loading: boolean
  dispatch: Dispatch<any, (payload: any) => void>
}
const TestDva: FC<TestDvaProps> = ({ bomModel, dispatch }) => {
  const { list } = bomModel
  const handleRequest = () => {
    dispatch({ type: 'bomModel/getList' })
  }
  return (
    <>
      <Button onClick={handleRequest}>请求数据</Button>
      <Table
        dataSource={list}
        rowKey={'id'}
        columns={[
          { title: 'id', dataIndex: 'id' },
          { title: 'name', dataIndex: 'name' },
        ]}
      />
    </>
  )
}

export default connect(({ bomModel, loading }: { bomModel: BomStateType; loading: Loading }) => ({
  bomModel,
  loading: loading.models.index,
}))(TestDva)
