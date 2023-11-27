import { defineStore, storeToRefs } from 'pinia'
import { ref, computed, reactive } from 'vue'

import { useRouter } from 'vue-router'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

const router = useRouter()
// 组合式写法
export const useCounterStore = defineStore(
  'counter',
  () => {
    // 登录状态
    let loginStatus = ref(false)
    let isVip = ref(false)
    let loginAndauthRequired = ref()

    // 默认设置
    let setting = reactive({
      IgnoreProject: false,
      considerDefaultResourceType: 'false',
      resourceConstraint: false,
      Rate: 0.1,
      Ratio: [0.5, 2],
      Steps: 20,
    })
    // 原始计划时间
    let originalplan = reactive({
      originalDurationDays: '',
      maxResourceUnitAgg: '',
      newCriticalTasksLen: '',
    })
    let email = ref('')
    // 是否结束
    let end = reactive({ data: false })
    // 是否上传新的文件
    let newUpload = ref(false)
    // 导航栏控制
    let active = ref(0)

    let activeIndex = ref('Balanced1')
    // 后端处理项目信息
    let file = {
      name: null,
      size: null,
    }
    let ConstraintsFile = ref(null)
    // 任务数据
    let taskData = ref([])
    let dataArray = reactive({
      Baseline: { all: [], data: [], span: [], cost: [] },
      Balanced: { all: [], data: [], span: [], cost: [] },
      Fastest: { all: [], data: [], span: [], cost: [] },
      'Minimum Resources': { all: [], data: [], span: [], cost: [] },
      'Levelled Resources': { all: [], data: [], span: [], cost: [] },
      'Minimum Costs': { all: [], data: [], span: [], cost: [] },
    })
    let selectedData = ref(null)
    let selectChange = false
    // 真实文件名称
    let truefile = ref(null)
    let SummaryData = ref(null)

    let wss = ref(null)
    // size大小转换函数
    function formatBytes(size) {
      if (!size) return ''
      var num = 1024.0 //byte
      if (size < num) return size + 'B'
      if (size < Math.pow(num, 2)) return (size / num).toFixed(2) + 'KB' //kb
      if (size < Math.pow(num, 3))
        return (size / Math.pow(num, 2)).toFixed(2) + 'MB' //M
      if (size < Math.pow(num, 4))
        return (size / Math.pow(num, 3)).toFixed(2) + 'G' //G
      return (size / Math.pow(num, 4)).toFixed(2) + 'T' //T
    }
    // 建立websocket连接
    async function connectWebsocket() {
      const URL = import.meta.env.VITE_PUBLIC_WSS_URL
      const socket = new WebSocket(
        // 此处填写你要连接的ws地址
        URL,
      )
      // 设置请求头
      socket.onrequestheaders = (headers) => {
        headers['Content-Type'] = 'application/x-www-form-urlencoded'
      }
      socket.onopen = function () {
        // NProgress.configure({ minimum: 0.5 });
        // NProgress.start();
        NProgress.set(0.5)
        // taskData.value=[]
        /*

        
         * 连接成功
         * */
        let data = {
          fileName: file.name,
          size: formatBytes(file.size),
          setting: {
            considerActualDates: !setting.IgnoreProject,
            considerDataDate: true,
            optimizationSteps: setting.Steps,
            learningRate: setting.Rate,
            minDurationRatio: setting.Ratio[0],
            maxDurationRatio: setting.Ratio[1],
            resourceConstraint: Boolean(setting.resourceConstraint),
            considerDefaultResourceType: setting.considerDefaultResourceType,
          },
        }
        data = JSON.stringify(data)
        if (file.name) {
          socket.send(data)
        } else {
          return
        }

        // 发送心跳防止ws协议自动断联
      }
      socket.onclose = function (e) {
        end.data = true
        NProgress.done()
      }
      // 发送

      socket.onmessage = function (e) {
        let data
        try {
          data = JSON.parse(JSON.parse(e?.data))
        } catch (error) {
          console.log('Begin')
          return
        }

        if (data.name == 'Minimum_Resources') {
          data.name = 'Minimum Resources'
        } else if (data.name == 'Levelled_Resources') {
          data.name = 'Levelled Resources'
        } else if (data.name == 'Levelled_Resources') {
          data.name = 'Levelled Resources'
        } else if (data.name == 'Minimum_Costs') {
          data.name = 'Minimum Costs'
        }
        switch (data?.result?.group) {
          case 'baseline':
            if (dataArray.Baseline.all.length === 0) {
              dataArray.Baseline.all.push(data)
              dataArray.Baseline.span.push({
                value: [
                  data.result.projectDurationDaysWithCalendar,
                  data.result.spanResourceUnitAgg,
                  data,
                ],
                name: data.name + data.result.step,
              })
              dataArray.Baseline.data.push({
                value: [
                  data.result.projectDurationDaysWithCalendar,
                  data.result.maxResourceUnitAgg,
                  data,
                ],

                name: data.name + data.result.step,
              })
              dataArray.Baseline.cost.push({
                value: [
                  data.result.projectDurationDaysWithCalendar,
                  data.result?.totalCost,
                  data,
                ],

                name: data.name + data.result.step,
              })
            }
            break
          case 'Balanced':
            dataArray.Balanced.all.push(data)
            dataArray.Balanced.span.push({
              value: [
                data.result.projectDurationDaysWithCalendar,
                data.result.spanResourceUnitAgg,
                data,
              ],
              name: data.name + data.result.step,
            })
            dataArray.Balanced.data.push({
              value: [
                data.result.projectDurationDaysWithCalendar,
                data.result.maxResourceUnitAgg,
                data,
              ],
              name: data.name + data.result.step,
            })
            dataArray.Balanced.cost.push({
              value: [
                data.result.projectDurationDaysWithCalendar,
                data.result?.totalCost,
                data,
              ],

              name: data.name + data.result.step,
            })
            break
          case 'Fastest':
            dataArray.Fastest.all.push(data)
            dataArray.Fastest.span.push({
              value: [
                data.result.projectDurationDaysWithCalendar,
                data.result.spanResourceUnitAgg,
                data,
              ],
              name: data.name + data.result.step,
            })
            dataArray.Fastest.data.push({
              value: [
                data.result.projectDurationDaysWithCalendar,
                data.result.maxResourceUnitAgg,
                data,
              ],
              name: data.name + data.result.step,
            })
            dataArray.Fastest.cost.push({
              value: [
                data.result.projectDurationDaysWithCalendar,
                data.result?.totalCost,
                data,
              ],

              name: data.name + data.result.step,
            })
            break
          case 'Minimum_Resources':
            dataArray['Minimum Resources'].all.push(data)
            dataArray['Minimum Resources'].span.push({
              value: [
                data.result.projectDurationDaysWithCalendar,
                data.result.spanResourceUnitAgg,
                data,
              ],
              name: data.name + data.result.step,
            })
            dataArray['Minimum Resources'].data.push({
              value: [
                data.result.projectDurationDaysWithCalendar,
                data.result.maxResourceUnitAgg,
                data,
              ],
              name: data.name + data.result.step,
            })
            dataArray['Minimum Resources'].cost.push({
              value: [
                data.result.projectDurationDaysWithCalendar,
                data.result?.totalCost,
                data,
              ],

              name: data.name + data.result.step,
            })
            break
          case 'Levelled_Resources':
            dataArray['Levelled Resources'].all.push(data)
            dataArray['Levelled Resources'].span.push({
              value: [
                data.result.projectDurationDaysWithCalendar,
                data.result.spanResourceUnitAgg,
                data,
              ],
              name: data.name + data.result.step,
            })
            dataArray['Levelled Resources'].data.push({
              value: [
                data.result.projectDurationDaysWithCalendar,
                data.result.maxResourceUnitAgg,
                data,
              ],
              name: data.name + data.result.step,
            })
            dataArray['Levelled Resources'].cost.push({
              value: [
                data.result.projectDurationDaysWithCalendar,
                data.result?.totalCost,
                data,
              ],

              name: data.name + data.result.step,
            })
            break
          case 'Minimum_Costs':
            dataArray['Minimum Costs'].all.push(data)
            dataArray['Minimum Costs'].span.push({
              value: [
                data.result.projectDurationDaysWithCalendar,
                data.result.spanResourceUnitAgg,
                data,
              ],
              name: data.name + data.result.step,
            })
            dataArray['Minimum Costs'].data.push({
              value: [
                data.result.projectDurationDaysWithCalendar,
                data.result.maxResourceUnitAgg,
                data,
              ],
              name: data.name + data.result.step,
            })
            dataArray['Minimum Costs'].cost.push({
              value: [
                data.result.projectDurationDaysWithCalendar,
                data.result?.totalCost,
                data,
              ],

              name: data.name + data.result.step,
            })
            break
          default:
        }
        // taskData.value.push([
        //   data.result.projectDurationDays,
        //   data.result.maxResourceUnit,
        //   data.name,
        //   data.result.group,
        //   data.result,
        // ]);
        // console.log(dataArray);
        if (data.name && data.result?.group !== 'Baseline') {
        } else if (dataArray['Levelled Resources'].all.length != 0) {
          end.data = true
          NProgress.done()
          // taskData.value=[]
        }
      }
      return socket
    }
    return {
      setting,
      file,
      connectWebsocket,
      truefile,
      taskData,
      active,
      selectedData,
      end,
      SummaryData,
      dataArray,
      ConstraintsFile,
      activeIndex,
      selectChange,
      newUpload,
      email,
      originalplan,
      wss,
      loginStatus,
      isVip,
      loginAndauthRequired,
    }
  },
  {},
)
