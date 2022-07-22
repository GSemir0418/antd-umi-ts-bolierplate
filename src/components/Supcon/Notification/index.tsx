import { notification } from 'antd'
type NotificationProps = {
  title: string
  description: string
  size: 'huge' | 'small'
}
type MyNotification = (args: NotificationProps) => void
const Notification: MyNotification = args => {
  const { title, description, size } = args
  const smallStyle = { borderTop: '2px solid red', width: '300px', fontSize: '14px' }
  const hugeStyle = { borderTop: '2px solid red', width: '400px', fontSize: '20px' }
  return notification.error({
    message: <span style={{ fontWeight: 'bold', fontSize: '16px', color: 'red' }}>{title}</span>,
    duration: 5,
    description,
    style: size === 'huge' || size ? hugeStyle : smallStyle,
  })
}
export default Notification
