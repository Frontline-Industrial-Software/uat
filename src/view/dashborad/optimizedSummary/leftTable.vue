<template>
  <el-table-v2
    :columns="columns"
    :data="data"
    :width="700"
    :height="620"
    :row-height="30"
    :estimated-row-width="40"
    :row-event-handlers="eventClick"
    :scrollbar-always-on="true"
    :catch="0"
    fixed
    @rows-rendered="getRenderData"
  />
  <div ref="GanttEcharts" style="margin-top: 0px" id="GanttEcharts"></div>
</template>

<script setup>
import { computed, ref, reactive, onMounted } from 'vue'
import * as echarts from 'echarts'
import { useRouter } from 'vue-router'
import { useCounterStore } from '@/store'
import api from '@/api/index.js'
const store = useCounterStore()
const router = useRouter()
const GanttEcharts = ref(null)
let datas = ref()
let ganttChart
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

function initCharts() {
  ganttChart = echarts.init(GanttEcharts.value, 'purple-passion', {
    width: 1400,
    height: 690,
  })
  datas.value = props.baseData.slice(0, 20)
  ganttChart.setOption(getOption(ganttData()))
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

/* -------------------------------------------------------------------------- */

// 甘特图形状
let renderItem = (params, api) => {
  let start = api.coord([api.value(1), api.value(0)])
  let end = api.coord([api.value(2), api.value(0)])
  let height = api.size([0, 1])[1]

  let shape = echarts.graphic.clipRectByRect(
    {
      x: start[0],
      y: start[1] / 1 + 5,
      width: Math.max(end[0] - start[0], 1),
      height: height / 1.8,
    },
    params.coordSys,
  )
  return {
    type: 'rect',
    shape,
    style: api.style(),
    focus: 'self',
    blurScope: 'coordinateSystem',
    emphasis: {},
  }
}
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
const startTimeStamp = a[1]

// 转换为 Date 对象
const startDate = new Date(startTimeStamp)

// 计算三个月后的日期
const endDate = new Date(startDate)
endDate.setMonth(startDate.getMonth() + 3)

// 获取三个月后的时间戳
const endTimeStamp = endDate.getTime()``
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
          data: markLineData,
        },
      },
    ],
    grid: {
      top: 50,
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
        startValue: startTimeStamp,
        endValue: endTimeStamp,
        zoomLock: true,
        showDetail: false,
        maxValueSpan: 3600 * 24 * 1000 * 90,
        minValueSpan: 3600 * 24 * 1000 * 90,
        // maxSpan:,
      },
      {
        type: 'inside',
        xAxisIndex: [0],
        startValue: startTimeStamp,
        endValue: endTimeStamp,
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
function getMaxMin() {
  // 获取最大和最小时间戳
  let endDate = Math.max(...props.baseData.map((obj) => obj.plannedFinish))
  let startDate = Math.min(...props.baseData.map((obj) => obj.plannedStart))

  // 转换为日期对象
  const startDateObj = new Date(startDate)
  const endDateObj = new Date(endDate)

  const markLineData = []

  // 使用时间戳生成 markLineData
  for (
    let timestamp = startDate;
    timestamp <= endDate;
    timestamp += 7 * 24 * 60 * 60 * 1000
  ) {
    markLineData.push({ xAxis: new Date(timestamp).toISOString().slice(0, 10) })
  }

  return [markLineData, startDate, endDate]
}
</script>
<style lang="scss" scoped></style>
