import axios from 'axios'
import pako from 'pako'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import { ElMessage } from 'element-plus'
const instance = axios.create({
  baseURL: import.meta.env.VITE_PUBLIC_URL,
})
// 请求拦截器
instance.interceptors.request.use(
  (config) => {
    // 在请求开始时显示进度条
    NProgress.start()
    return config
  },
  (error) => {
    const errorMessage = error.response?.data?.message || '请求出错，请重试！' // 根据实际后端返回的错误信息字段进行修改
    ElMessage.error(errorMessage)
    return Promise.reject(error)
  },
)

// 响应拦截器
instance.interceptors.response.use(
  (response) => {
    // 在请求结束后隐藏进度条
    NProgress.done()

    return response
  },
  (error) => {
    // 在请求结束后隐藏进度条
    NProgress.done()

    return Promise.reject(error)
  },
)
export default {
  // !inputDATA
  // 验证是否为付费用户
  async checkUser(userName) {
    const response = await instance.get(`auth/`, {
      params: {
        user: `${userName}`,
      },
    })
    return response.data
  },

  /**
   * @function 上传初始工程文件
   * @param {*} file 文件内容
   */
  async sendFile(file) {
    const formData = new FormData()
    formData.append('file', file)
    // ElMessage({
    //   showClose: true,
    //   message: '正在上传文件，请等待',
    // })
    try {
      const response = await instance.post('upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })

      if (response.data.code != 0) {
        ElMessage({
          showClose: true,
          message: response.data.message,
          type: 'error',
        })
        return null
      } else {
        let str
        if (
          response.data.milestoneTasksInfo &&
          response.data.milestoneTasksInfo.length != 0
        ) {
          str = `
          <p style="color:black">The definition of ${
            response.data.milestoneTasksInfo.length
          } milestone
         ${
           response.data.milestoneTasksInfo.length == 1 ? 'task' : 'tasks'
         }  could potentially block project duration optimization:</p>
         `
          response.data.milestoneTasksInfo.map((e, index) => {
            str += `<p style="line-height:30px;color:black">${
              index + 1
            }.&nbsp  ID:${e.id} &nbsp Name:${e.name} &nbsp constraintDate:${
              e.constraintDate
            }</p>`
          })
          ElMessage({
            showClose: true,
            message: str,
            type: 'warning',
            duration: 0,
            dangerouslyUseHTMLString: true,
            customClass: 'warn',
            center: true,
          })
        }

        ElMessage({
          showClose: true,
          message: 'Upload Success',
          type: 'success',
        })
      }
      return response
    } catch (error) {
      console.log(error)
      throw error
    }
  },
  /**
   * @function 获取约束模板
   * @param {*} constraintsFilename 约束条件
   * @return void
   */
  async constraintsFileUrl(constraintsFilename) {
    const response = await instance.get(
      `fileDownload/constraints/${constraintsFilename}`,
      { responseType: 'arraybuffer' },
    )
    const compressedData = new Uint8Array(response.data)
    const pakoArr = pako.ungzip(compressedData)
    const blob = new Blob([pakoArr], {
      type: 'application/vnd.ms-excel',
    })

    // 创建下载链接对象
    const downloadLink = document.createElement('a')
    downloadLink.href = URL.createObjectURL(blob)
    downloadLink.style.display = 'none'
    downloadLink.download = `constraints_FrontlineExport.xlsx`

    // 返回下载链接对象
    return downloadLink

    // link.href = URL.createObjectURL(
    //   new Blob([pakoArr], {
    //     type: 'application/vnd.ms-excel',
    //   }),
    // )

    // link.style.display = 'none'
    // link.download = 'constraints.xlsx'
    // document.body.appendChild(link)
    // link.click()
    // document.body.removeChild(link)
    // return response;
  },

  async constraintsFileDownload(constraintsFilename) {
    const response = await instance.get(
      `fileDownload/constraints/${constraintsFilename}`,
      { responseType: 'arraybuffer' },
    )
    const compressedData = new Uint8Array(response.data)
    const pakoArr = pako.ungzip(compressedData)
    const link = document.createElement('a')

    link.href = URL.createObjectURL(
      new Blob([pakoArr], {
        type: 'application/vnd.ms-excel',
      }),
    )

    link.style.display = 'none'
    link.download = 'constraints.xlsx'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    // return response;
  },
  /**
   * @function 发送约束模板
   * @param {*} file
   */
  async sendConstraintsFile(constraintsFile, name) {
    console.log(constraintsFile)
    const formData = new FormData()
    formData.append('file', constraintsFile)
    formData.append('newName', name)
    try {
      const response = await instance.post('upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      return constraintsFile.name
    } catch (error) {
      console.log(error)
      throw error
    }
  },
  /**
   * @function 请求计算端口
   * @param null
   * @return object
   */
  async getPort() {
    const res = await instance.get(`optimizePort`)
    return res
  },
  /**
   * @function 获取总结
   * @param {string} preset 优化选项 4选1
   * @param {string} filename 请求端口后返回的文件名
   * @param {string} steps 优化步数
   */
  arrayBufferToJson(arrayBuffer) {
    var dataView = new DataView(arrayBuffer)
    var decoder = new TextDecoder('utf-8')
    var jsonString = decoder.decode(dataView)
    var jsonObject = JSON.parse(jsonString)
    return jsonObject
  },
  async getOptimized(data, size) {
    const fileSizeThreshold = 1 * 1024 * 1024

    const res = await instance.get('results', {
      params: {
        ...data,
      },
      responseType: 'arraybuffer',
      // responseType: size > fileSizeThreshold ? "arraybuffer" : "json", // 设置响应数据类型为二进制数组
    })
    if (res.headers['content-type'] == 'application/gzip') {
      const byteArray = new Uint8Array(res.data) // 切换数据编码为Uint8Array
      const pakoArr = pako.inflate(byteArray, { to: 'string' }) // 调用 pako 的方法解压数据
      res.data = JSON.parse(pakoArr)
    } else {
      res.data = this.arrayBufferToJson(res.data)
    }

    return res
  },
  /**
   * @function 获得报告结果
   * @param  filename 请求端口后返回的文件名
   */
  async getExcelReport(data, name) {
    const response = await instance.get(
      `fileDownload/reports/${data.split('.')[0]}.xlsx`,
      {
        responseType: 'arraybuffer',
      },
    )
    const compressedData = new Uint8Array(response.data)
    const pakoArr = pako.ungzip(compressedData)
    const link = document.createElement('a')
    link.href = URL.createObjectURL(
      new Blob([pakoArr], {
        type: 'application/vnd.ms-excel',
      }),
    )
    // console.log(link.href);
    link.style.display = 'none'
    link.download = `${name.split('.')[0]}_FrontlineExport.xlsx`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  },
  async getUrl(data, name) {
    const response = await instance.get(
      `fileDownload/reports/${data.split('.')[0]}.xlsx`,
      {
        responseType: 'arraybuffer',
      },
    )
    const compressedData = new Uint8Array(response.data)
    const pakoArr = pako.ungzip(compressedData)
    const blob = new Blob([pakoArr], {
      type: 'application/vnd.ms-excel',
    })

    // 创建下载链接对象
    const downloadLink = document.createElement('a')
    downloadLink.href = URL.createObjectURL(blob)
    downloadLink.style.display = 'none'
    downloadLink.download = `${name.split('.')[0]}_FrontlineExport.xlsx`

    // 返回下载链接对象
    return downloadLink
  },
  async getProjectReport(data, name) {
    const response = await instance.get(`fileDownload/reports/${data}`, {
      responseType: 'arraybuffer',
    })
    const compressedData = new Uint8Array(response.data)
    const pakoArr = pako.ungzip(compressedData)
    const link = document.createElement('a')
    link.href = URL.createObjectURL(
      new Blob([pakoArr], {
        type: 'text/xml',
      }),
    )

    link.style.display = 'none'
    link.download = `${name.split('.')[0]}_FrontlineExport.${
      name.split('.')[1]
    }`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  },
}
