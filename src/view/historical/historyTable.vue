<template>
  <div class="table-content">
    <p class="bold-text">P2 - Tasks</p>

    <div class="table">
      <el-table-v2
        :columns="columnsFilter"
        :data="datasFilter"
        :width="700"
        :height="650"
        @rows-rendered="getRenderData"
        fixed
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
const BoxplotChart = ref()
const props = defineProps({ data: Object })
watch(
  props,
  (newval, oldval) => {
    initChart()
  },
  { deep: true },
)
function getRenderData(data) {
  if (!BoxplotChart) {
    return
  }
  chartData.value = ChartDatas.value.slice(
    data.rowCacheStart + 1, // 如果 data.rowCacheStart 是 0，则切片开始位置为 0，否则为 data.rowCacheStart
    data.rowCacheEnd, // 切片结束位置为 data.rowCacheStart + 25
  )
  boxplotChart.setOption(options())
}
let datasFilter = computed(() => {
  if (props.data) {
    return props.data
  } else {
    return []
  }
})
let columnDatas = ref([
  { name: 'project', bol: true },
  { name: 'ID', bol: true },
  { name: 'actualDuration', bol: true },
  { name: 'id', bol: true },
  { name: 'minSimilarity', bol: true },
  { name: 'name', bol: true },
  { name: 'pastMax', bol: true },
  { name: 'pastMean', bol: true },
  { name: 'pastMin', bol: true },
  { name: 'pastNum', bol: true },
  { name: 'pastStd', bol: true },
  { name: 'uid', bol: true },
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
let boxplotChart = ref()

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
    dataset: [
      {
        // prettier-ignore
        source:chartData.value,
      },
      {
        transform: {
          type: 'boxplot',
        },
      },
      {
        fromDatasetIndex: 1,
        fromTransformResult: 1,
      },
    ],
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
        datasetIndex: 1,
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
  chartData.value = ChartDatas.value.slice(0, 12)
  boxplotChart.setOption(options())
}

function getChartData(data) {
  let arrAll = []
  data.map((e) => {
    let arr = []
    // echarts.dataTool.prepareBoxplotData(e.pastTasks)
    arr.push(e.pastTasks)
    arrAll.push(...arr)
  })
  return arrAll
}
// onMounted(() => {
//   initChart()
// })
// function dateRenderer(cellData) {
//   if (cellData.cellData) {
//     return utcTime(cellData.cellData)
//       .replace('T', ' ')
//       .replace('Z', '')
//       .slice(0, 16)
//   }
// }
// function defaultRenderer(cellData) {
//   return cellData.cellData
// }
</script>

<style lang="scss" scoped>
.table-content {
  width: 1200px;
  height: 110%;
  background-color: white;
  margin-top: 150px;
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
