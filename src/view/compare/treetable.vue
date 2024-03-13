<template>
  <div class="Table">
    <div class="Tooltip">
      <p
        style="
          font-size: 16px;
          line-height: 22px;
          color: #545454;
          font-weight: 700;
        "
      >
        Tasks
      </p>
      <p style="color: #b5b5b5">overview of all tasks over time</p>
      <div class="choosebox">
        <div class="choose">
          <div style="background-color: #b5b5b5" class="item"></div>
          <div>Baseline</div>
        </div>
        <div class="choose">
          <div style="background-color: #00beae" class="item"></div>
          <div>WBS</div>
        </div>
        <div class="choose">
          <div style="background-color: #ffb522" class="item"></div>
          <div>To-do</div>
        </div>
        <div class="choose">
          <div style="background-color: #4a8fe7" class="item"></div>
          <div>In Progress</div>
        </div>
        <div class="choose">
          <div style="background-color: #10be00" class="item"></div>
          <div>Completed</div>
        </div>
        <div class="choose">
          <div style="background-color: #4a8fe7" class="item"></div>
          <div>Delayed</div>
        </div>
      </div>
      <el-divider />
      <div class="button">
        <div
          style="display: flex; justify-content: space-between; width: 500px"
        >
          <el-button @click="controlFilter = true" :icon="Filter">
            Filter
          </el-button>
          <el-upload
            action=""
            :multiple="true"
            :before-upload="beforeUpload"
            :limit="2"
            :http-request="Uploads"
            :on-remove="removeFile"
          >
            <el-button>
              <Compare />
              Compare Projects
            </el-button>
          </el-upload>
          <el-input
            v-model="searchData"
            style="width: 240px; height: 32px"
            placeholder="Type something"
          >
            <template #prefix>
              <el-icon class="el-input__icon"><search /></el-icon>
            </template>
          </el-input>
        </div>
        <div>
          <el-radio-group v-model="chosenDate" size="large">
            <el-radio-button label="Day" value="Day" />
            <el-radio-button label="Week" value="Week" />
            <el-radio-button label="Month" value="Month" />
            <el-radio-button label="Year" value="Year" />
          </el-radio-group>
        </div>
      </div>
    </div>
    <div class="all-content">
      <div class="elTable">
        <div style="height: 100px">
          <p
            style="
              font-size: 16px;
              line-height: 22px;
              color: #545454;
              font-weight: 700;
            "
          >
            Tasks
          </p>
          <p style="color: #b5b5b5">overview of all tasks over time</p>
        </div>
        <el-table-v2
          :columns="columns"
          :data="data"
          :width="700"
          :height="800"
          :row-height="30"
          :estimated-row-width="40"
          :row-event-handlers="eventClick"
          :scrollbar-always-on="true"
          :catch="0"
          fixed
          @rows-rendered="getRenderData"
          :row-class="rowClass"
        >
          <template #row="props">
            <Row v-bind="props" />
          </template>
        </el-table-v2>
      </div>
      <div class="gantta-content">
        <TimeX
          class="time"
          :startTime="startTimeStamp"
          :endTime="endTimeStamp"
          :chosenDate="chosenDate"
        />
        <div ref="GanttEcharts" id="GanttEcharts"></div>
      </div>
    </div>
  </div>
  <el-dialog v-model="controlFilter" title="Filter by" width="800">
    <el-tabs v-model="activeName" class="demo-tabs">
      <el-tab-pane label="Activity Status" name="Activity Status">
        <el-checkbox v-model="isDelayed" label="Delayed activities" />
        <el-checkbox v-model="isActivities" label="Optimized activities" />
        <el-checkbox v-model="isCritical" label="Critical path" />
      </el-tab-pane>
      <el-tab-pane label="Resources" name="Resources"></el-tab-pane>
    </el-tabs>

    <template #footer>
      <div class="dialog-footer">
        <el-button @click="controlFilter = false">Cancel</el-button>
        <el-button type="primary" @click="datasFilter">Apply</el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script setup>
import { computed, ref, reactive, onMounted, watch, cloneVNode } from 'vue'
import {
  add,
  endOfWeek,
  startOfWeek,
  endOfMonth,
  endOfYear,
  format,
  isAfter,
} from 'date-fns'
import {
  ElButton,
  ElCheckbox,
  ElIcon,
  ElPopover,
  TableV2FixedDir,
} from 'element-plus'
import * as echarts from 'echarts'
import { useRouter } from 'vue-router'
import { useCounterStore } from '@/store'
import TimeX from '@/components/timeX/index.vue'
import api from '@/api/index.js'
import Compare from './compareIcon.vue'
import {
  Delete,
  Edit,
  Search,
  Share,
  Upload,
  Filter,
} from '@element-plus/icons-vue'
const store = useCounterStore()
const router = useRouter()
const GanttEcharts = ref(null)
const chosenDate = ref('Week')
const searchData = ref()
let datas = ref()
let ganttChart
const startTimeStamp = ref(null)
const endTimeStamp = ref(null)
const props = defineProps({
  newData: Object,
  baseData: Object,
})
let activeName = ref('Activity Status')
let controlFilter = ref(false)

let isDelayed = ref(true)
let isActivities = ref(true)
let isCritical = ref(true)
function datasFilter() {
  controlFilter.value = false
  if (datas.value) {
    console.log(isCritical.value)
    datas.value = datas.value.filter((e) => {
      return e.critical != true
    })
    datas.value = datas.value.filter((e) => {
      console.log(e)
      return e
    })
    ganttChart.setOption(getOption(ganttData()))
  }
}
// 甘特图
const eventClick = {
  onMousemove(e) {
    let index = datas.value.findIndex((item) => item.id === e.rowData.id)
    if (index == 0) {
      index = 0
    } else {
      index = 30 * index
    }
    ganttChart.setOption({
      graphic: {
        elements: [
          {
            type: 'rect',
            left: 0, // 矩形左上角相对于 grid 的 x 坐标
            top: index, // 矩形左上角相对于 grid 的 y 坐标
            shape: {
              width: '1500', // 矩形的宽度
              height: 60, // 矩形的高度
            },
            style: {
              fill: 'rgba(236,246,245,0.7)', // 矩形的填充颜色
            },
          },
        ],
      },
    })
    // ganttChart.dispatchAction({
    //   type: 'highlight',
    //   dataIndex: index,
    //   // name: e.rowData.name,
    // })
  },
  onMouseleave(e) {
    ganttChart.dispatchAction({
      type: 'downplay',

      // name: param.name,
    })
  },
}
onMounted(() => {
  // initCharts()
})
watch(chosenDate, (newValue, oldValue) => {
  // 可以在这里触发相应的操作，例如重新渲染数据
  ganttChart.setOption(getOption(ganttData()))
})
let timeX
let markLineData
let startDate
let endDate
let uploadData
let files = []
let fileData = ref([])
function removeFile(file) {
  files = []
}
async function Uploads(filess) {
  let filed = filess.file
  files.push(filed)
  if (files.length == 2) {
    fileData.value = []
    files.map((file) => {
      const originalFileName = file.name // 保存原始文件名
      const sanitizedFileName = sanitizeFileName(originalFileName) // 使用 sanitizeFileName 处理文件名
      const modifiedFile = new File([file], sanitizedFileName, {
        type: file.type,
      }) // 创建新的文件对象，修改文件名
      return modifiedFile
    })
    let a = await api.sendFile(files, 'task') // 使用修改后的文件对象进行上传
    for (let attrName in a.data) {
      let attrValue = a.data[attrName]
      fileData.value.push(attrValue)
    }
    let fileDatas = alternateInsert(
      fileData.value[1].tasks,
      fileData.value[2].tasks,
    )
    fileData.value.push(fileDatas)
    initCharts()
  }

  return false
}
const beforeUpload = async (event, file, fileList) => {}
function sanitizeFileName(fileName) {
  // 找到最后一个小数点的位置
  const lastDotIndex = fileName.lastIndexOf('.')
  // 如果找到小数点，则替换除了最后一个小数点之前的所有符号为下划线
  if (lastDotIndex !== -1) {
    return fileName.replace(/[^\w\d](?=.*\..*$)/g, (match, offset) => {
      // 将除了最后一个小数点之前的符号替换成下划线
      if (offset < lastDotIndex) {
        return '_'
      } else {
        return match
      }
    })
  }
  // 如果没有小数点，则直接替换所有符号为下划线
  return fileName.replace(/[^\w\d]/g, '_')
}
function initCharts() {
  timeX = getMaxMin()
  markLineData = timeX[0]
  startTimeStamp.value = timeX[1]
  endTimeStamp.value = timeX[2]
  startDate = new Date(startTimeStamp.value)
  endDate = new Date(startDate)
  endDate.setMonth(startDate.getMonth() + 3)
  datas.value = fileData.value[3].slice(0, 24)
  /* -------------------------------------------------------------------------- */
  if (ganttChart) {
    ganttChart.setOption(getOption(ganttData()))
  } else {
    ganttChart = echarts.init(GanttEcharts.value, 'purple-passion', {
      width: 1200,
      height: 720,
    })
    ganttChart.setOption(getOption(ganttData()))
    ganttChart.on('dataZoom', function (params, a, b) {
      let op = ganttChart.getOption()
      startTimeStamp.value = op.dataZoom[0].startValue
      endTimeStamp.value = op.dataZoom[0].endValue
    })
  }
}
function getRenderData(data) {
  if (!ganttChart) {
    return
  }
  datas.value = fileData.value[3].slice(
    data.rowCacheStart === 0 ? 0 : data.rowCacheStart, // 如果 data.rowCacheStart 是 0，则切片开始位置为 0，否则为 data.rowCacheStart
    data.rowCacheStart === 0 ? 24 : data.rowCacheStart + 25, // 切片结束位置为 data.rowCacheStart + 25
  )
  ganttChart.setOption(getOption(ganttData()))
}
const rowSpanIndex = 0

function getColumns(datas) {
  let valuesArray = []
  if (datas.length > 0) {
    valuesArray = Object.keys(datas[0])
  } else {
    return [
      {
        key: 'column-0',
        dataKey: 'column-0',
        title: 'Column 0',
        width: 150,
      },
    ]
  }

  let columned = valuesArray
    .map((item) => {
      let name = item
      let width = 200
      let hidden = true
      switch (item) {
        case 'id':
          name = 'Activity ID'
          width = 100
          hidden = false
          break
        case 'ID':
          name = 'ID name'
          width = 50
          hidden = false
          break
        case 'name':
          name = 'Activity Name'
          break
        default:
          break
      }

      return {
        dataKey: item,
        key: item,
        title: name,
        width: width,
      }
    })
    .filter((item) => {
      let bol = true
      // console.log(item);
      switch (item.dataKey) {
        case 'id':
          bol = false
          break
        case 'ID':
          bol = false
          break
        case 'calendarId':
          bol = false
          break
        case 'order':
          bol = false
          break
        case 'wbsId':
          bol = false
          break
        case 'extra':
          bol = false
          break
        default:
          break
      }
      return bol
    })

  columned[rowSpanIndex].rowSpan = function ({ rowIndex }) {
    if (rowIndex % 2 === 0 && rowIndex <= datas.length - 2) {
      return 2
    } else {
      return 1
    }
  }
  return columned
}
const Row = ({ rowData, rowIndex, cells, columns }) => {
  const rowSpan = columns[rowSpanIndex].rowSpan({ rowData, rowIndex })
  if (rowSpan > 1) {
    const cell = cells[rowSpanIndex]
    const style = {
      ...cell.props.style,
      backgroundColor: '#ffffff',
      height: `${rowSpan * 35 - 1}px`,
      display: 'flex',
      justifyContent: 'center', // 水平居中
      alignItems: 'center', // 垂直居中
      marginTop: '20px',
      zIndex: 1,
    }
    cells[rowSpanIndex] = cloneVNode(cell, { style })
  }
  return cells
}
const rowClass = ({ rowIndex }) => {
  if (rowIndex % 2 === 0) {
    return 'bg-blue-200'
  } else if (rowIndex % 1 === 0) {
    return 'bg-red-100'
  }
  return ''
}

let columns = computed(() => {
  if (fileData.value.length > 0) {
    return getColumns(fileData.value[3])
  } else {
    return getColumns([])
  }
})

let data = computed(() => {
  if (fileData.value.length > 0) {
    fileData.value[3].map((e) => {
      e.newFinish = timestampToUTC(e.newFinish)
      e.newStart = timestampToUTC(e.newStart)
      e.plannedFinish = timestampToUTC(e.plannedFinish)
      e.plannedStart = timestampToUTC(e.plannedStart)
      return e
    })
    return fileData.value[3]
  } else {
    return []
  }
})
const pathSymbols = {
  delayed: 'path://M0,0 L100,0 L80,50 L20,50 Z',
}
/* -------------------------------------------------------------------------- */
let colors = {
  TK_Complete: '#10be00',
  TK_NotStart: '#ffb522',
  TK_Active: '#4a8fe7',
}
const renderItem = (type) => (params, api) => {
  let start = api.coord([api.value(1), api.value(0)])
  let end = api.coord([api.value(2), api.value(0)])
  let height = api.size([0, 1])[1]
  let y

  if (type == 'base') {
    height = 8
    y = ((start[1] - 30) / 60) * 60 + 15
  } else {
    height = 13
    y = (start[1] / 60) * 60
  }
  let shape = {
    x: start[0],
    y: y,
    width: Math.max(end[0] - start[0], 1),
    height: height,
    r: 5,
  }
  let color
  let result
  // // 根据不同的 type 返回不同的渲染结果
  switch (type) {
    case 'base':
      color = '#808080' // 灰色，表示未知状态
      result = {
        type: 'rect',
        shape,
        style: {
          ...api.style(),
          radius: 10,
          fill: color,
        },
        focus: 'self',
        blurScope: 'coordinateSystem',
        emphasis: {},
      }
      // 其他类型的渲染逻辑
      break
    case 'Delayed':
      const repeatInterval = Math.ceil(Math.max(end[0] - start[0], 1) / 5) /// 重复间隔
      // 计算颜色点的数组
      const colorStops = []
      const intervalColor = '#FFFFFF'
      const mainColor = '#1bb9cc'
      const intervalCount = 2 // 间隔颜色的数量
      for (let i = 0; i <= repeatInterval; i++) {
        const offset = i / repeatInterval // 将 [0, repeatInterval] 映射到 [0, 0.5]

        if (i % (intervalCount + 1) === 0) {
          // 间隔颜色
          colorStops.push({ offset, color: intervalColor })
        } else {
          // 主要颜色
          colorStops.push({ offset, color: mainColor })
        }
      }
      // 创建 Linear Gradient
      const linearGradient = new echarts.graphic.LinearGradient(
        0,
        0,
        1,
        1.1,
        colorStops,
      )

      result = {
        type: 'rect',
        shape,
        style: {
          ...api.style(),
          radius: 10,
          fill: linearGradient,
          lineDash: [5, 5],
        },
        focus: 'self',
        blurScope: 'coordinateSystem',
        emphasis: {},
      }
      break
    case 'On Track':
      color = '#0000FF' // 蓝色，表示正常
      result = {
        type: 'rect',
        shape,
        style: {
          ...api.style(),
          radius: 10,
        },
        focus: 'self',
        blurScope: 'coordinateSystem',
        emphasis: {},
      }
      // 其他类型的渲染逻辑
      break
    case 'Ahead of Schedule':
      let x = start[0] // 矩形左上角 x 坐标
      // let y = start[1] // 矩形左上角 y 坐标
      let width = Math.max(end[0] - start[0], 1) // 矩形宽度
      // let height = 13
      // 定义板凳形状的多边形顶点
      let points = [
        [x, y],
        [x + width, y],
        [x + width, y + height],
        [x + width - width * 0.2, y + height - height / 1.7],
        [x + width - width * 0.8, y + height - height / 1.7],
        // [(x + width)*0.8 - 1 ,( y + height)*0.8],

        [x, y + height],
      ]
      result = {
        type: 'polygon',
        shape: {
          points: points,
        },
        style: {
          ...api.style(),
          radius: 10,
        },
        emphasis: {},
      }

      // 其他类型的渲染逻辑
      break
      // case 'To-Do':
      //   color = '#00FF00' // 绿色，表示提前
      //   result = {
      //     type: 'rect',
      //     shape,
      //     style: {
      //       ...api.style(),
      //       radius: 10,
      //       fill: color,
      //     },
      //     focus: 'self',
      //     blurScope: 'coordinateSystem',
      //     emphasis: {},
      //   }
      //   // 其他类型的渲染逻辑
      //   break
      // case 'In Progress':
      //   color = '#00FF00' // 绿色，表示提前
      //   result = {
      //     type: 'rect',
      //     shape,
      //     style: {
      //       ...api.style(),
      //       radius: 10,
      //       fill: color,
      //     },
      //     focus: 'self',
      //     blurScope: 'coordinateSystem',
      //     emphasis: {},
      //   }
      //   // 其他类型的渲染逻辑
      //   break
      // case 'Completed':
      color = '#00FF00' // 绿色，表示提前
      result = {
        type: 'rect',
        shape,
        style: {
          ...api.style(),
          radius: 10,
        },
        focus: 'self',
        blurScope: 'coordinateSystem',
        emphasis: {},
      }
      // 其他类型的渲染逻辑
      break

    default:
      // 默认类型的渲染逻辑
      break
  }

  return result
}

/* -------------------------------------------------------------------------- */

/* -------------------------------------------------------------------------- */
let ganttData = () => {
  let ganttDatas = datas.value.map((ganttItem, idx) => {
    // const calculatedIdx = calculateIdx(datas.value.length - idx)
    const calculatedIdx = datas.value.length - idx

    return {
      name: ganttItem.name,
      value: [
        calculatedIdx,
        utcTime(ganttItem.newStart),
        utcTime(ganttItem.newFinish),
        ganttItem,
      ],
      itemStyle: {
        color: colors[ganttItem.status],
      },
      taskOwner: ganttItem.taskOwner,
      status: ganttItem.status,
    }
  })

  let firstProject = ganttDatas.filter((e) => {
    return e.taskOwner == 'first'
  })
  let secondProject = ganttDatas.filter((e) => {
    return e.taskOwner == 'second'
  })
  secondProject = secondProject.map((secondTask) => {
    const correspondingFirstTask = firstProject.find((firstTask) => {
      return (
        firstTask.id === secondTask.id && firstTask.name === secondTask.name
      )
    })

    if (correspondingFirstTask) {
      return compareTasks(correspondingFirstTask, secondTask)
    } else {
      return secondTask
    }
  })
  return { firstProject, secondProject }
}

function getOption({ firstProject, secondProject }) {
  const delayedTasks = secondProject.filter(
    (task) => task.taskStatus === 'Delayed',
  )
  const aheadTasks = secondProject.filter(
    (task) => task.taskStatus === 'Ahead of Schedule',
  )
  const onTrackTasks = secondProject.filter(
    (task) => task.taskStatus === 'On Track',
  )
  let option = {
    toolbox: {
      show: true,
      feature: {
        dataView: { show: true, readOnly: false },
        saveAsImage: { show: true },
      },
    },
    xAxis: {
      show: false,
      name: 'date',
      type: 'time',
      splitNumber: 5,
      boundaryGap: [0, 0], // 设置boundaryGap为['data', 'data']
      // splitNumber:10,
      // minInterval: 10,
      // maxInterval: 3600 * 1000,
      axisTick: {
        show: true, // 显示刻度
        alignWithLabel: true, // 与标签对齐
      },
      minInterval: 24 * 3600, // 设置最小刻度间隔为1小时 (3600秒 * 1000毫秒)
      // maxInterval: 24 * 3600 * 1000 * 360 , // 设置最大刻度间隔为1天 (24小时 * 3600秒 * 1000毫秒)
      max: function (value) {
        return value.max + (value.max - value.min) * 0.01
      },
      min: function (value) {
        return value.min - (value.max - value.min) * 0.01
      },
    },
    yAxis: {
      name: 'tasks',
      interval: 60, // 设置每个间隔的高度
      splitNumber: 11, // 将整个 y 轴分成 20 个间隔
      show: true,
      // min: 1,
      // max: 60, // 设置 y 轴的最大值为总高度
    },
    selectedMode: 'single',
    series: [
      {
        name: 'Base',
        type: 'custom',
        data: firstProject,
        large: true,
        renderItem: renderItem('base'),
        encode: {
          x: [1, 2],
          y: 0,
        },
        label: {
          normal: {
            show: true, // 启用标签显示
            color: 'black', // 标签的文本颜色
            position: 'inside', // 标签的文本位置
            formatter: function (params) {
              // 自定义标签内容

              return params.data.name
            },
            fontSize: 12,
          },
        },
      },
      {
        name: 'delayedTasks',
        type: 'custom',
        data: delayedTasks,
        large: true,
        renderItem: renderItem('Delayed'),
        encode: {
          x: [1, 2],
          y: 0,
        },
      },
      {
        name: 'onTrackTasks',
        type: 'custom',
        data: aheadTasks,
        large: true,
        renderItem: renderItem('Ahead of Schedule'),
        encode: {
          x: [1, 2],
          y: 0,
        },
      },
      {
        name: 'delayedTasks',
        type: 'custom',
        data: onTrackTasks,
        large: true,
        renderItem: renderItem('On Track'),
        encode: {
          x: [1, 2],
          y: 0,
        },
      },
      {
        type: 'line',
        smooth: 0.6,
        symbol: 'none',
        lineStyle: {
          color: '#5470C6',
          width: 5,
        },
        markLine: {
          symbol: ['none', 'none'],
          label: { show: false },
          data: getMaxMin()[0],
        },
      },
    ],
    grid: {
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
    },
    toolbox: {
      show: true,
      feature: {
        dataView: { show: true, readOnly: false },
        saveAsImage: { show: true },
      },
    },
    dataZoom: [
      {
        type: 'slider',
        show: true,
        xAxisIndex: [0],
        startValue: startTimeStamp.value,
        endValue: endTimeStamp.value,
        zoomLock: true,
        showDetail: false,
        maxValueSpan: 3600 * 24 * 1000 * 90,
        minValueSpan: 3600 * 24 * 1000 * 90,
        // maxSpan:,
      },
      {
        show: true,
        type: 'inside',
        xAxisIndex: [0],
        startValue: startTimeStamp.value,
        endValue: endTimeStamp.value,
        zoomLock: true,
      },
    ],
    graphic: {
      elements: [
        {
          type: 'rect',
          left: 0, // 矩形左上角相对于 grid 的 x 坐标
          top: 0, // 矩形左上角相对于 grid 的 y 坐标
          shape: {
            width: '1500', // 矩形的宽度
            height: 60, // 矩形的高度
          },
          style: {
            fill: 'rgba(236,246,245,0.7)', // 矩形的填充颜色
          },
        },
      ],
    },
    // tooltip: {
    //   axisPointer: {
    //     //坐标轴指示器，坐标轴触发有效，
    //     // type: 'cross', //默认为line，line直线，cross十字准星，shadow阴影
    //   },

    //   formatter: (p) => {
    //     console.log(p);
    //     let resData = 'Resources: <br/>'
    //     if (p.value[3].resources) {
    //       for (const key in p.value[3].resources) {
    //         let res = p.value[3].resources
    //         let name = store.selectedData.newResources.find((resource) => {
    //           return resource.id == key
    //         })
    //         if (!name) {
    //           name = ''
    //         }

    //         resData += ` &nbsp&nbspResource &nbsp  ${
    //           name?.name
    //         } &nbsp id: ${key}  <br/>&nbsp&nbsp&nbsp&nbspunits/hour:${returnFloat(
    //           res[key].plannedUnitsPerHour,
    //         )}=> ${returnFloat(res[key].newUnitsPerHour)}<br/>`
    //       }
    //     }

    //     function marker(str) {
    //       let color
    //       switch (str) {
    //         case 'New':
    //           if (!p.value[3].critical) {
    //             color = '#b0e054'
    //           } else {
    //             color = 'red'
    //           }
    //           break
    //         case 'Old':
    //           if (!p.value[3].critical) {
    //             color = '#5474c4'
    //           } else {
    //             color = 'pink'
    //           }

    //         default:
    //           break
    //       }

    //       return `<span style="display:inline-block;margin-right:4px;border-radius:10px;width:10px;height:10px;background-color:${color};"></span>`
    //     }
    //     return `${p.name}<br/>
    //   <div style='margin-top:20px'>
    //    ${marker('New')} New: ${baseItem(
    //      utcTime(p.value[4].changeNew.start)
    //        .replace('T', ' ')
    //        .replace('Z', '')
    //        .slice(0, 16),
    //    )} -> ${baseItem(
    //      utcTime(p.value[4].changeNew.finish)
    //        .replace('T', ' ')
    //        .replace('Z', '')
    //        .slice(0, 16),
    //    )}
    //    (${p.value[4].changeNew.duration})
    //   <br/>
    //    ${marker('Old')} Old: ${baseItem(
    //      utcTime(p.value[4].baseNew.start)
    //        .replace('T', ' ')
    //        .replace('Z', '')
    //        .slice(0, 16),
    //    )} -> ${baseItem(
    //      utcTime(p.value[4].baseNew.finish)
    //        .replace('T', ' ')
    //        .replace('Z', '')
    //        .slice(0, 16),
    //    )}
    //  (${p.value[4].baseNew.duration})
    //    <br/>
    //    ${resData}
    //   </div>`
    //   },
    // },
  }
  return option
}
/* -------------------------------------------------------------------------- */
function utcTime(time) {
  const utcDate = new Date(time)
  const utcString = utcDate.toISOString()

  return utcString
}
function calculateIdx(inputNumber) {
  if (inputNumber === 2) {
    return 2
  } else {
    return inputNumber + (inputNumber - 2) * 0.5
  }
}
function calculateNodes(startDate, endDate) {
  const nodes = []

  let currentDate = startOfWeek(new Date(startDate), { weekStartsOn: 1 }) // 设置起点为每周的周一

  const endDateObj = new Date(endDate)

  while (isAfter(new Date(startDate), endDateObj) === false) {
    // 计算周的最后一天（周日）
    const weekEndDate = endOfWeek(currentDate, { weekStartsOn: 1 })

    if (isAfter(weekEndDate, endDateObj)) {
      nodes.push(format(endDateObj, 'yyyy-MM-dd'))
      break
    }
    nodes.push(format(weekEndDate, 'yyyy-MM-dd'))
    currentDate = add(currentDate, { weeks: 1 })
  }
  return [nodes, startDate, endDate]
}
function getMaxMin() {
  // 获取最大和最小时间戳
  let endDate = Math.max(
    ...fileData.value[1].tasks.map((obj) => {
      // 判断 plannedFinish 是否为字符串
      if (typeof obj.plannedFinish === 'string') {
        // 将字符串转换为时间戳
        return new Date(obj.plannedFinish).getTime()
      } else {
        // 不是字符串则直接返回
        return obj.plannedFinish
      }
    }),
  )

  let startDate = Math.min(
    ...fileData.value[2].tasks.map((obj) => {
      // 判断 plannedStart 是否为字符串
      if (typeof obj.plannedStart === 'string') {
        // 将字符串转换为时间戳
        return new Date(obj.plannedStart).getTime()
      } else {
        // 不是字符串则直接返回
        return obj.plannedStart
      }
    }),
  )

  // 转换为日期对象
  const startDateObj = new Date(startDate)
  const endDateObj = new Date(endDate)
  // calculateNodes(startDateObj, endDateObj)
  let timeSpan
  switch (chosenDate.value) {
    case 'Day':
      timeSpan = 1
      break
    case 'Week':
      timeSpan = 7
      break
    case 'Month':
      timeSpan = 30
      break
    case 'Year':
      timeSpan = 365
      break
    default:
      break
  }

  const markLineData = []

  for (
    let timestamp = startDate;
    timestamp <= endDate;
    timestamp += timeSpan * 24 * 60 * 60 * 1000
  ) {
    const currentEndDate = getEndTimes(
      new Date(timestamp).toISOString().slice(0, 10),
      chosenDate.value,
    )

    markLineData.push({
      xAxis: new Date(timestamp).toISOString().slice(0, 10),
      endNode: currentEndDate,
    })
  }
  return [markLineData, startDate, endDate]
}
// 函数用于计算结束时间
function getEndTimes(startDate, chosenDate) {
  const startDateObj = new Date(startDate)

  switch (chosenDate) {
    case 'Day':
      return startDate
    case 'Week':
      const weekEndDate = new Date(startDateObj)
      weekEndDate.setDate(startDateObj.getDate() + 6)
      return weekEndDate.toISOString().slice(0, 10)
    case 'Month':
      const monthEndDate = new Date(
        startDateObj.getFullYear(),
        startDateObj.getMonth() + 1,
        0,
      )
      return monthEndDate.toISOString().slice(0, 10)
    case 'Year':
      const yearEndDate = new Date(startDateObj.getFullYear(), 11, 31)
      return yearEndDate.toISOString().slice(0, 10)
    default:
      return startDate
  }
}
function alternateInsert(array1, array2) {
  array1.map((e) => {
    e.taskOwner = 'first'
    return e
  })
  array2.map((e) => {
    e.taskOwner = 'second'
    return e
  })
  let result = []
  let maxLength = Math.max(array1.length, array2.length)

  for (let i = 0; i < maxLength; i++) {
    if (i < array2.length) {
      result.push(array2[i]) // 先添加 array2 中的元素
    }
    if (i < array1.length) {
      result.push(array1[i]) // 再添加 array1 中的元素
    }
  }

  return result
}

function timestampToUTC(timestamp) {
  // 创建一个 Date 对象，参数为时间戳（单位为毫秒）
  const date = new Date(timestamp)

  // 使用 Date 对象的 UTC 相关方法获取对应的 UTC 时间
  const utcYear = date.getUTCFullYear()
  const utcMonth = date.getUTCMonth() + 1 // 月份从 0 开始，因此需要加 1
  const utcDay = date.getUTCDate()
  const utcHour = date.getUTCHours()
  const utcMinute = date.getUTCMinutes()
  const utcSecond = date.getUTCSeconds()

  // 将获取到的 UTC 时间组合成一个字符串并返回
  const utcTimeString = `${utcYear}-${padZero(utcMonth)}-${padZero(
    utcDay,
  )} ${padZero(utcHour)}:${padZero(utcMinute)}:${padZero(utcSecond)}`

  return utcTimeString
}
function padZero(num) {
  return num < 10 ? `0${num}` : num
}
function compareTasks(firstTask, secondTask) {
  const taskStartDate = new Date(firstTask.value[1]) // 将 UTC 字符串转换为 Date 对象
  const taskEndDate = new Date(firstTask.value[2]) // 将 UTC 字符串转换为 Date 对象
  const correspondingTaskStartDate = new Date(secondTask.value[1]) // 将 UTC 字符串转换为 Date 对象
  const correspondingTaskEndDate = new Date(secondTask.value[2]) // 将 UTC 字符串转换为 Date 对象
  // 比较开始时间和结束时间，并考虑任务所有者
  if (taskStartDate > correspondingTaskStartDate) {
    status = 'Delayed'
  } else if (taskStartDate < correspondingTaskStartDate) {
    status = 'Ahead of Schedule'
  } else {
    status = 'On Track'
  }

  return { ...secondTask, taskStatus: status }
}
</script>
<style lang="scss" scoped>
.time {
  height: 150px;
  width: 1200px;
}
.all-content {
  width: 100%;
  display: flex;
  justify-content: space-between;
}
.Table {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
}
.Tooltip {
  width: 100%;
  margin-bottom: 50px;
  background-color: #fff;
  padding: 15px 20px;
  border-radius: 16px;
}
.choosebox {
  display: flex;
}

.choose {
  display: flex;
  margin-top: 20px;
  margin-left: 10px;
  font-size: 12px;
  align-items: center;
  .item {
    width: 12px;
    height: 12px;
    background: #cccccc;
    border-radius: 50%;
    margin-right: 5px;
  }
}
.button {
  display: flex;
  justify-content: space-between;
}
.elTable {
  background-color: #fff;
  border-radius: 16px;
  padding: 20px 20px 40px 20px;
}
.gantta-content {
  background-color: #fff;
  border-radius: 16px;
  padding: 20px 20px 40px 20px;
}
</style>
