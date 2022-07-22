import { message } from 'antd'
import { CheckCircleTwoTone, ExclamationCircleTwoTone, InfoCircleTwoTone } from '@ant-design/icons'
import { getLocale } from '@/.umi/plugin-locale/localeExports'
// 国际化Map
const messageMap = new Map([
  ['新增成功', 'Success'],
  ['删除成功', 'Deleted Successfully'],
])
export default function Message(
  content: string,
  type: 'info' | 'success' | 'error',
  duration: number,
  size: 'small' | 'normal' | 'huge',
) {
  let contentLocale = content
  if (getLocale() === 'en-US') contentLocale = messageMap.get(contentLocale) ?? 'no i18n'
  let className
  switch (size) {
    case 'small':
      className = 'custom-message-small'
      break
    case 'normal':
      className = 'custom-message-normal'
      break
    case 'huge':
      className = 'custom-message-huge'
      break
    default:
      className = 'custom-message-small'
      break
  }
  let icon
  switch (type) {
    case 'info':
      icon = <InfoCircleTwoTone twoToneColor="#6079b2" />
      break
    case 'success':
      icon = <CheckCircleTwoTone twoToneColor="#52c41a" />
      break
    case 'error':
      icon = <ExclamationCircleTwoTone twoToneColor="red" />
      break
    default:
      icon = <InfoCircleTwoTone twoToneColor="#6079b2" />
      break
  }
  return message.open({
    icon,
    content: contentLocale,
    duration,
    className,
  })
}
