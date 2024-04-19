<template>
  <div class="table-content">
    <p class="bold-text">Tasks</p>

    <div class="table">
      <el-table-v2
        :columns="columnsFilter"
        :data="datasFilter"
        :width="700"
        :height="650"
        :cache="0"
        @rows-rendered="getRenderData"
        fixed
        :row-event-handlers="eventClick"
      />
      <div style="margin-left: 100px; margin-top: 50px">
        <div ref="BoxplotChart"></div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, computed, onMounted } from 'vue'
import * as echarts from 'echarts'
import { ElMessage, ElMessageBox } from 'element-plus'

let boxplotChart = ref()
const BoxplotChart = ref()
const props = defineProps({ data: Object })
watch(
  props,
  (newval, oldval) => {
    initChart()
  },
  { deep: true },
)
const eventClick = {
  onMousemove(e) {
    let index = chartData.value.findIndex((e2) => e2.id == e.rowData.uid)
    index = 50 * index
    boxplotChart.setOption({
      graphic: {
        elements: [
          {
            type: 'rect',
            left: 0,
            top: index,
            shape: {
              width: '1500',
              height: 50,
            },
            style: {
              fill: 'rgba(236,246,245,0.7)',
            },
          },
        ],
      },
    })
  },
  onClick(e) {
    move(e)

    // ganttChart.dispatchAction({
    //   type: 'highlight',
    //   dataIndex: index,
    //   // name: e.rowData.name,
    // })
  },
}
function crossMergeWithDelimiter(arr1, arr2, delimiter) {
  const result = []
  const minLength = Math.min(arr1.length, arr2.length)

  for (let i = 0; i < minLength; i++) {
    result.push(arr1[i] + delimiter + arr2[i])
  }

  // 将剩余的元素添加到结果数组中
  if (arr1.length > minLength) {
    for (let i = minLength; i < arr1.length; i++) {
      result.push(arr1[i])
    }
  } else if (arr2.length > minLength) {
    for (let i = minLength; i < arr2.length; i++) {
      result.push(arr2[i])
    }
  }

  return result.join(',')
}

let move = (e) => {
  let _data = crossMergeWithDelimiter(
    e.rowData.pastTask,
    e.rowData.pastTasks,
    ':',
  )
  ElMessageBox.alert(_data, 'Similar duration', {
    // if you want to disable its autofocus
    // autofocus: false,
    confirmButtonText: 'OK',
    // callback: (action) => {
    //   ElMessage({
    //     type: 'info',
    //     message: `action: ${action}`,
    //   })
    // },
  })
}
function debounce(func, wait) {
  let timeout
  return function () {
    const context = this
    const args = arguments
    clearTimeout(timeout)
    timeout = setTimeout(() => {
      func.apply(context, args)
    }, wait)
  }
}
function getRenderData(data) {
  if (!BoxplotChart) {
    return
  }
  if (chartData.value) {
    chartData.value = ChartDatas.value.slice(
      data.rowCacheStart + 1, // 如果 data.rowCacheStart 是 0，则切片开始位置为 0，否则为 data.rowCacheStart
      data.rowCacheEnd, // 切片结束位置为 data.rowCacheStart + 25
    )
    debounce(boxplotChart.setOption(options()), 100)
  }
}
let datasFilter = computed(() => {
  if (props.data) {
    return props.data
  } else {
    return []
  }
})
let columnDatas = ref([
  { name: 'uid', bol: true },
  { name: 'project', bol: true },
  { name: 'ID', bol: true },
  { name: 'actualDuration', bol: true },
  // { name: 'id', bol: true },
  { name: 'minSimilarity', bol: true },
  { name: 'name', bol: true },
  { name: 'pastMax', bol: true },
  { name: 'pastMean', bol: true },
  { name: 'pastMin', bol: true },
  { name: 'pastNum', bol: true },
  { name: 'pastStd', bol: true },

  { name: 'pastTask', bol: true },
])
const columnMapping = {
  project: 'Project',
  ID: 'ActiveID',
  actualDuration: 'Actual_Duration',
  id: 'id',
  minSimilarity: 'Min_Similarity',
  name: 'ActiveName',
  type: 'Type',
  pastMax: 'Past_Max',
  pastMin: 'Past_Min',
  pastMean: 'Past_Mean',
  pastNum: 'Past_Num',
  pastStd: 'Past_Std',
  uid: 'Uid',
  pastTask: 'Past_Task',
}
let columnsFilter = computed(() => {
  if (props.data) {
    let a = columnDatas.value
      .filter((item) => item.bol)
      .map((item) => {
        return {
          dataKey: item.name,
          key: item.name,
          title: columnMapping[item.name],
          width: 150,
        }
      })
    // console.log(a);
    return a
  } else {
    return []
  }
})

let chartData = ref()
let options = () => {
  // chartData.value = [
  //   [80, 80, 47.5, 15, 5, 32.5],
  //   [80, 80, 47.5, 15, 2, 32.5],
  //   [15, 80, 80, 80, 2, 0],
  // ]
  let option = {
    tooltip: {
      trigger: 'item', // 触发类型，可以设置为 'item' 或 'axis'
      formatter: function (params) {
        const values = params.value
        // 构建 tooltip 内容
        const tooltipContent = `
      <div>Max: ${values[5]}</div>
      <div>Q3: ${values[4]}</div>
      <div>Median: ${values[3]}</div>
      <div>Q1: ${values[2]}</div>
      <div>Min: ${values[1]}</div>
    `
        return tooltipContent
      },
    },
    // dataset: [
    //   {
    //     // prettier-ignore
    //     source:chartData.value,
    //   },
    //   {
    //     transform: {
    //       type: 'boxplot',
    //     },
    //   },
    //   {
    //     fromDatasetIndex: 1,
    //     fromTransformResult: 1,
    //   },
    // ],
    grid: {
      left: 5,
      right: 0,
      bottom: 0,
      top: 0,
    },
    dataZoom: [
      // {
      //   type: 'slider',
      //   show: true,
      //   xAxisIndex: [0],
      // },
      // {
      //   type: 'slider',
      //   show: true,
      //   yAxisIndex: [0],
      // },
      // {
      //   type: 'inside',
      //   xAxisIndex: [0],
      // },
      // {
      //   type: 'inside',
      //   yAxisIndex: [0],
      // },
    ],
    graphic: {
      elements: [
        {
          type: 'rect',
          left: 0, // 矩形左上角相对于 grid 的 x 坐标
          top: 0, // 矩形左上角相对于 grid 的 y 坐标
          shape: {
            width: '1500', // 矩形的宽度
            height: 50, // 矩形的高度
          },
          style: {
            fill: 'rgba(236,246,245,0.7)', // 矩形的填充颜色
          },
        },
      ],
    },
    yAxis: {
      type: 'category',
      boundaryGap: true,
      min: 1,
      max: 12,
      axisLabel: {
        interval: 50, // 设置标签显示间隔为 50，即每个标签显示一次
      },
      axisTick: {
        length: 50, // 设置刻度线的长度为 50，从而使每个格子的高度为 50px
      },
      inverse: true,
      show: false,
    },
    xAxis: {
      type: 'value',
      max: function (value) {
        return value.max * 1.1
      },
      min: function (value) {
        return value.min * 0.9
      },
      // splitArea: {
      //   show: true,
      // },
    },
    series: [
      {
        name: 'boxplot',
        type: 'boxplot',
        // datasetIndex: 1,
        data: chartData.value,
      },
    ],
  }
  return option
}
let ChartDatas = ref()
const initChart = () => {
  boxplotChart = echarts.init(BoxplotChart.value, 'purple-passion', {
    width: 450,
    height: 600,
  })
  ChartDatas.value = getChartData(datasFilter.value)
  chartData.value = ChartDatas.value.slice(0, 11)
  boxplotChart.setOption(options())
}

function getChartData(data) {
  let arrAll = []
  data.map((e) => {
    let arr = []

    arr.push({ value: e.pastTasks, id: e.uid })
    arrAll.push(...arr)
  })
  let _a = prepareBoxplotData(arrAll)
  return _a.boxData
}
function asc(arr) {
  arr.sort(function (a, b) {
    return a - b
  })
  return arr
}
function quantile(ascArr, p) {
  var H = (ascArr.length - 1) * p + 1
  var h = Math.floor(H)
  var v = +ascArr[h - 1]
  var e = H - h
  return e ? v + e * (ascArr[h] - v) : v
}
function prepareBoxplotData(rawData, opt) {
  opt = opt || {}
  var boxData = []
  var outliers = []
  var axisData = []
  var boundIQR = opt.boundIQR
  var useExtreme = boundIQR === 'none' || boundIQR === 0

  for (var i = 0; i < rawData.length; i++) {
    axisData.push(i + '')
    var ascList = asc(rawData[i].value.slice())
    var Q1 = quantile(ascList, 0.25)
    var Q2 = quantile(ascList, 0.5)
    var Q3 = quantile(ascList, 0.75)
    var min = ascList[0]
    var max = ascList[ascList.length - 1]
    var bound = (boundIQR == null ? 1.5 : boundIQR) * (Q3 - Q1)
    var low = useExtreme ? min : Math.max(min, Q1 - bound)
    var high = useExtreme ? max : Math.min(max, Q3 + bound)
    boxData.push({ value: [low, Q1, Q2, Q3, high], id: rawData[i].id })

    for (var j = 0; j < ascList.length; j++) {
      var dataItem = ascList[j]

      if (dataItem < low || dataItem > high) {
        var outlier = [i, dataItem]
        opt.layout === 'vertical' && outlier.reverse()
        outliers.push(outlier)
      }
    }
  }

  return {
    boxData: boxData,
    outliers: outliers,
    axisData: axisData,
  }
}
</script>

<style lang="scss" scoped>
.table-content {
  width: 1200px;
  height: 110%;
  min-height: 750px;
  background-color: white;
  border-radius: 16px;
}
.table {
  padding: 30px;
  padding-right: 0px;
  display: flex;
}
.bold-text {
  font-size: 30px;
  font-weight: bold;
  padding-left: 10px;
  margin-top: 20px;
}
</style>
