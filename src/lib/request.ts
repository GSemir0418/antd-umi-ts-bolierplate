/** Request 网络请求工具 更详细的 api 文档: https://github.com/umijs/umi-request */
import { extend } from 'umi-request'
import type { ResponseError } from 'umi-request'
import Notification from '@/components/Supcon/Notification'

const { NODE_ENV } = process.env
const codeMessage = {
  200: '服务器成功返回请求的数据。',
  201: '新建或修改数据成功。',
  202: '一个请求已经进入后台排队（异步任务）。',
  204: '删除数据成功。',
  400: '发出的请求有错误，服务器没有进行新建或修改数据的操作。',
  401: '用户没有权限（令牌、用户名、密码错误）。',
  403: '用户得到授权，但是访问是被禁止的。',
  404: '发出的请求针对的是不存在的记录，服务器没有进行操作。',
  406: '请求的格式不可得。',
  410: '请求的资源被永久删除，且不会再得到的。',
  422: '当创建一个对象时，发生一个验证错误。',
  500: '服务器发生错误，请检查服务器。',
  502: '网关错误。',
  503: '服务不可用，服务器暂时过载或维护。',
  504: '网关超时。',
}

/** 异常处理程序 */
const errorHandler = (error: ResponseError) => {
  const { response } = error

  if (response && response.status) {
    const errorText = codeMessage[response.status] || response.statusText
    const { status, url } = response
    Notification({ title: `请求错误 ${status}: ${url}`, description: errorText, size: 'small' })
  } else if (!response) {
    Notification({
      title: '网络错误',
      description: '您的网络发生异常，无法连接服务器',
      size: 'small',
    })
  }

  return response
}

/** 配置request请求时的默认参数 */
const request = extend({
  prefix: NODE_ENV === 'development' ? '/api' : 'http://10.30.20.203:9725',
  // 测试环境
  // prefix: 'http://10.30.20.203:8080',
  errorHandler,
  // 默认错误处理
  // credentials: 'include', // 默认请求是否带上cookie
  // credentials: 'omit',
  // headers: {
  //   'Access-Control-Allow-Credentials': true,
  //   'Access-Control-Allow-Origin': '*',
  //   'Access-Control-Allow-Headers': 'x-requested-with',
  // },
})

/** request拦截器 **/
request.interceptors.request.use((url, options) => {
  const c_token = localStorage.getItem('ticket')
  if (c_token) {
    const headers = {
      Authorization: `Bearer ${c_token}`,
    }
    return { url, options: { ...options, headers } }
  } else return { url, options: { ...options } }
})

/** response拦截器 **/
request.interceptors.response.use(async (response: Response) => {
  // 通过content-type判断是否为下载的数据
  if (response.headers.get('content-type') !== 'application/json;charset=UTF-8') {
    await response
      .blob()
      .then(blob => {
        const a = window.document.createElement('a')
        // 获取 blob 本地文件连接 (blob 为纯二进制对象，不能够直接保存到磁盘上)
        const downUrl = window.URL.createObjectURL(blob)
        let filename = 'download.xls'
        if (response.headers.get('content-disposition')) {
          // eslint-disable-next-line prefer-destructuring
          filename =
            response?.headers?.get('content-disposition')?.split('filename=')[1].split('.')[0] ||
            'download.xls'
          // eslint-disable-next-line prefer-destructuring
          const suffix = response?.headers
            ?.get('content-disposition')
            ?.split('filename=')[1]
            ?.split('.')[1]
          a.href = downUrl
          // a.download = 'MTO订单.xls'
          a.download = `${decodeURIComponent(filename)}.${suffix}`
          a.click()
          // 释放 blob 本地文件连接
          window.URL.revokeObjectURL(downUrl)
          // 删除a标签
          a.remove()
        }
      })
      .catch(error => {
        // eslint-disable-next-line no-console
        console.error(error)
      })
    return response
  }
  return response
})

export default request
