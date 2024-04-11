<template>
  <div class="table-content">
    <p style="height: 40px; font-weight: bolder; margin-left: 30px">
      P2 - Tasks
    </p>

    <div class="table">
      <el-table-v2
        :columns="columnsFilter"
        :data="datasFilter"
        :width="700"
        :height="690"
        fixed
      />
      <div style="margin-left: 100px">
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
    console.log(datasFilter.value, columnsFilter.value)
    initChart()
  },
  { deep: true },
)

let datasFilter = computed(() => {
  if (props.data) {
    return props.data
  } else {
    return []
  }
})
let columnDatas = ref([
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
  { name: 'pastTasks', bol: true },
  { name: 'project', bol: true },
])
const columnMapping = {
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
  pastTasks: 'Past_Tasks',
  project: 'Project',
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
    return a
  } else {
    return []
  }
})
let boxplotChart = ref()

let chartData = ref()
let option = () => {
  // chartData.value = getChartData(datasFilter.value)
  chartData.value = [
    [80, 80, 47.5, 15, 5, 32.5],
    [80, 80, 47.5, 15, 2, 32.5],
    [15, 80, 80, 80, 2, 0],
  ]
  option = {
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
      bottom: 30,
      top: 100,
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
      nameGap: 30,
      min: 1,
      max: 12,
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
const initChart = () => {
  boxplotChart = echarts.init(BoxplotChart.value, 'purple-passion', {
    width: 450,
    height: 700,
  })
  boxplotChart.setOption(option())
}

function getChartData(data) {
  let arrAll = []
  data.map((e) => {
    let arr = []
    arr.push(
      e.actualDuration,
      e.pastMax,
      e.pastMean,
      e.pastMin,
      e.pastNum,
      e.pastStd,
    )
    arrAll.push(arr)
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
  height: 100%;
  background-color: white;
  margin-top: 300px;
}
.table {
  padding: 30px;
  padding-right: 0px;
  display: flex;
}
</style>
