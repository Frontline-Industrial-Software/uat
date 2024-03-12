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
        <div>
          <el-button :icon="Filter">Filter</el-button>
          <el-button>
            <Compare />
            Compare Projects
          </el-button>
          <el-input
            v-model="searchData"
            style="width: 240px"
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
        />
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
</template>

<script setup>
import { computed, ref, reactive, onMounted, watch } from 'vue'
import {
  add,
  endOfWeek,
  startOfWeek,
  endOfMonth,
  endOfYear,
  format,
  isAfter,
} from 'date-fns'

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
// 甘特图
const eventClick = {
  onMousemove(e) {
    let index = datas.value.findIndex((item) => item.id === e.rowData.id)
    ganttChart.dispatchAction({
      type: 'highlight',
      dataIndex: index,
      // name: e.rowData.name,
    })
  },
  onMouseleave(e) {
    ganttChart.dispatchAction({
      type: 'downplay',

      // name: param.name,
    })
  },
}
onMounted(() => {
  initCharts()
})
watch(chosenDate, (newValue, oldValue) => {
  // 可以在这里触发相应的操作，例如重新渲染数据
  ganttChart.setOption(getOption(ganttData()))
})
function initCharts() {
  ganttChart = echarts.init(GanttEcharts.value, 'purple-passion', {
    width: 1200,
    height: 750,
  })
  datas.value = props.baseData.slice(0, 20)
  ganttChart.setOption(getOption(ganttData()))
  ganttChart.on('dataZoom', function (params, a, b) {
    let op = ganttChart.getOption()
    startTimeStamp.value = op.dataZoom[0].startValue
    endTimeStamp.value = op.dataZoom[0].endValue
  })
}
function getRenderData(data) {
  if (!ganttChart) {
    return
  }
  datas.value = props.baseData.slice(data.rowCacheStart, data.rowCacheEnd)

  ganttChart.setOption(getOption(ganttData()))
}
function getColumns() {
  const valuesArray = Object.keys(props.baseData[0])
  let a = valuesArray.map((item) => {
    let name = item
    let width = 200
    switch (item) {
      case 'id':
        name = 'Activity ID'
        width = 100
        break
      case 'ID':
        name = 'IDname'
        width = 50
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
  return a
}
let columns = getColumns()
let data = computed(() => {
  return props.baseData
})
const pathSymbols = {
  delayed: 'path://M0,0 L100,0 L80,50 L20,50 Z',
}
/* -------------------------------------------------------------------------- */

// 甘特图形状
// 甘特图形状
// 甘特图形状
// let renderItem = (params, api) => {
//   let start = api.coord([api.value(1), api.value(0)])
//   let end = api.coord([api.value(2), api.value(0)])
//   let height = api.size([0, 1])[1]

//   let shape = {
//     x: start[0],
//     y: start[1] / 1 + 5,
//     width: Math.max(end[0] - start[0], 1),
//     height: height / 1.8,
//     r: 5,
//   }
//     let repeatCount = Math.max(end[0] - start[0], 1)/100 // 设置重复的次数
//     // 使用 custom 绘图
//   return {
//     type: 'rect',
//     shape: shape,
//     renderItem: function (params, api) {
//     },
//   }
// }
let renderItem = (params, api) => {
  let start = api.coord([api.value(1), api.value(0)])
  let end = api.coord([api.value(2), api.value(0)])
  let height = api.size([0, 1])[1]

  let shape = {
    x: start[0],
    y: start[1] / 1 + 5,
    width: Math.max(end[0] - start[0], 1),
    height: height / 1.8,
    r: 5,
  }
  const repeatInterval = Math.ceil(Math.max(end[0] - start[0], 1) / 5) /// 重复间隔
  // 计算颜色点的数组
  const colorStops = []
  const intervalColor = '#FFFFFF'
  const mainColor = '#ffb522'
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

  return {
    type: 'rect',
    shape,
    style: {
      ...api.style(),
      radius: 10, // 根据需要调整圆角半径
      fill: linearGradient,

      lineDash: [5, 5], // 设置虚线样式，可以调整数组中的值
    },
    focus: 'self',
    blurScope: 'coordinateSystem',
    emphasis: {},
  }
}
// let renderItem = (params, api) => {
//   let start = api.coord([api.value(1), api.value(0)]);
//   let end = api.coord([api.value(2), api.value(0)]);
//   let height = api.size([0, 1])[1];

//   let type='cover'
//   if (Math.max(end[0] - start[0], 1)<10) {
//     type='center'
//   }
//   let shape = {
//     pathData: pathSymbols.delayed,
//     layout: 'type',
//     x: start[0],
//     y: start[1] / 1 + 5,
//     width: Math.max(end[0] - start[0], 1),
//     height: height / 1.8, // 固定高度
//   };

//   return {
//     type: 'path',
//     shape,
//     style: {
//       fill: 'rgba(255, 0, 0, 0.7)',
//     },
//   };
// };
// let renderItem = (params, api) => {
//   let start = api.coord([api.value(1), api.value(0)])
//   let end = api.coord([api.value(2), api.value(0)])
//   let height = api.size([0, 1])[1]

//   let width = Math.max(end[0] - start[0], 1)
//   let rectHeight = height / 1.8

//   let repeatCount = 5 // 设置重复的次数
//   let children=[]
//   let shape = {
//     pathData: pathSymbols.delayed,
//     layout: 'center',
//     x: start[0],
//     y: start[1] / 1 + 5,
//     width: Math.max(end[0] - start[0], 1),
//     height: height / 1.8, // 固定高度
//   }
//   for (let index = 0; index < repeatCount; index++) {
//     children.push({
//       {
//     type: 'path',
//     shape,
//     style: {
//       fill: 'rgba(255, 0, 0, 0.7)',
//     },
//   };
//     })

//   return {
//     type: 'group',
//     children
//   }
// }}

// let renderItem = (params, api) => {
//   let start = api.coord([api.value(1), api.value(0)])
//   let end = api.coord([api.value(2), api.value(0)])
//   let height = api.size([0, 1])[1]

//   // 计算矩形的位置和大小
//   let x = start[0]
//   let y = start[1] / 1 + 5
//   let width = Math.max(end[0] - start[0], 1)
//   let rectHeight = height / 1.8

//   // 使用 line 类型的图形来模拟虚线
//   let line = new echarts.graphic.Line({
//     shape: {
//       x1: x,
//       y1: y + rectHeight / 2,
//       x2: x + width,
//       y2: y + rectHeight / 2,
//     },
//     style: {
//       stroke: '#ffb522',
//       lineWidth: 10,
//       // 设置虚线，数组中的值表示实线和空白的长度'
//       lineDash: [5, 5], // 设置虚线，数组中的值表示实线和空白的长度
//       lineDashOffset: 0, // 虚线偏移量，可以通过调整此值改变虚线的起始位置
//       // lineCap: 'round',
//     },
//   })

//   return line
// }
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
        color: ganttItem.critical ? 'pink' : undefined,
      },
    }
  })
  return ganttDatas
}
let a = getMaxMin()
let markLineData = a[0]
// 计算当前日期

startTimeStamp.value = a[1]

// 转换为 Date 对象
const startDate = new Date(startTimeStamp.value)
// 计算三个月后的日期
let endDate = new Date(startDate)
endDate.setMonth(startDate.getMonth() + 3)

// 获取三个月后的时间戳
endTimeStamp.value = endDate.getTime()
// // 计算三个月前的日期
// const threeMonthsAgo = new Date(currentDate);
// threeMonthsAgo.setMonth(currentDate.getMonth() - 3);
// console.log(currentDate,threeMonthsAgo);
function getOption(datas) {
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
      interval: 100,
      splitNumber: 20,
      show: false,
    },
    selectedMode: 'single',
    series: [
      {
        name: 'Baseline',
        type: 'custom',
        data: datas,
        large: true,
        renderItem: renderItem,
        encode: {
          x: [1, 2],
          y: 0,
        },
        // label: {
        //   normal: {
        //     show: true, // 启用标签显示
        //     color: 'black', // 标签的文本颜色
        //     position: 'inside', // 标签的文本位置
        //     formatter: function (params) {
        //       // 自定义标签内容
        //       return params.data.name
        //     },
        //     fontSize: 12,
        //   },
        // },
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
        show: false,
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
        type: 'inside',
        xAxisIndex: [0],
        startValue: startTimeStamp.value,
        endValue: endTimeStamp.value,
        zoomLock: true,
      },
    ],
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
  let endDate = Math.max(...props.baseData.map((obj) => obj.plannedFinish))
  let startDate = Math.min(...props.baseData.map((obj) => obj.plannedStart))

  // 转换为日期对象
  const startDateObj = new Date(startDate)
  const endDateObj = new Date(endDate)
  calculateNodes(startDateObj, endDateObj)
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
