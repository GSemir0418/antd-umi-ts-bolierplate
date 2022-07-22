import { ModalForm } from '@ant-design/pro-components'
import { Button } from 'antd'
import type { ReactElement } from 'react'
type ModalProps<T> = {
  type: 'confirm' | 'save' | 'preview'
  title: string
  visible: boolean
  onCancel: () => void
  onFinish: (formData: T) => Promise<boolean | void>
  width: string
  children: ReactElement[]
}

type tModal<T = Record<string, any>> = (props: ModalProps<T>) => ReactElement
const Modal: tModal<any> = ({ type, title, visible, onCancel, onFinish, width, children }) => {
  return (
    <ModalForm
      title={title}
      visible={visible}
      submitter={{
        render: modalProps => {
          return [
            type === 'preview' ? null : (
              <Button key="ok" type="primary" onClick={() => modalProps.submit()}>
                {(() => {
                  switch (type) {
                    case 'confirm':
                      return '确定'
                    case 'save':
                      return '保存'
                    default:
                      return '确定'
                  }
                })()}
              </Button>
            ),
            <Button key="cancel" onClick={onCancel}>
              取消
            </Button>,
          ]
        },
      }}
      onFinish={onFinish}
      modalProps={{
        width,
        centered: true,
        destroyOnClose: true,
        maskClosable: true,
        onCancel,
        style: {
          borderRadius: '8px',
          borderTop: '5px solid #448EF7',
        },
        bodyStyle: { backgroundColor: '#F9F9F9' },
      }}
    >
      {children}
    </ModalForm>
  )
}
export default Modal
