<template>
  <div class="all">
    <h2>
      {{ $t('baselineSummary.title[0]') }}
      <div class="step">
        <span>
          {{ store.setting.Steps }} {{ $t('baselineSummary.title[1]') }}
        </span>
      </div>
      <div class="step">
        <span>
          {{
            `${store.setting.Ratio[0] * 100}% - ${
              store.setting.Ratio[1] * 100
            }% ${$t('baselineSummary.title[2]')}`
          }}
        </span>
      </div>
    </h2>
    <div class="main">
      <div class="left">
        <div class="lefttop">
          <div>{{ $t('baselineSummary.chartName[0]') }}</div>
        </div>
        <div class="chartContent">
          <Echarts
            style="width: 720px; height: 610px"
            id="costEcharts"
          ></Echarts>
          <Echarts style="width: 720px; height: 610px" id="myEcharts"></Echarts>
          <Echarts
            style="width: 720px; height: 610px"
            id="twoEcharts"
          ></Echarts>

          <div class="right">
            <div class="righttop">
              <div>
                <Card
                  :title="$t('baselineSummary.Tsidebar[0]')"
                  :height="150"
                  :precent="
                    toPercent(
                      SummaryData.changedDuration - SummaryData.baseDuration,
                      SummaryData.baseDuration,
                    )
                  "
                  :isPositive="true"
                  :body="[
                    SummaryData.changedDuration + ' ' + 'days',
                    SummaryData.baseDuration + ' ' + 'days',
                    SummaryData.planDurationDays + ' ' + 'days',
                  ]"
                />
                <Card
                  :title="$t('baselineSummary.Tsidebar[1]')"
                  :height="150"
                  :precent="
                    toPercent(
                      SummaryData.maxResourceUnit -
                        SummaryData.BasemaxResourceUnit,
                      SummaryData.BasemaxResourceUnit,
                    )
                  "
                  :body="[
                    SummaryData.maxResourceUnit,
                    SummaryData.BasemaxResourceUnit,
                    // store.SummaryData.changedDuration + 'days',
                  ]"
                />
              </div>
              <div>
                <Card
                  :title="$t('baselineSummary.Tsidebar[2]')"
                  :height="150"
                  :body="[
                    SummaryData.changgedTasks,
                    SummaryData.TotalTasks,
                    // store.SummaryData.changedDuration + 'days',
                  ]"
                />
                <Card
                  :title="$t('baselineSummary.Tsidebar[3]')"
                  :height="150"
                  :body="[
                    SummaryData.changedCriticalPath,
                    SummaryData.changedCriticalPath,
                    SummaryData.baseCriticalPath,
                    // store.SummaryData.changedDuration + 'days',
                  ]"
                />
              </div>
            </div>

            <div class="rightbutton">
              <h1>{{ $t('baselineSummary.Bsidebar[0]') }}</h1>
              <!-- <div>
            {{ $t('baselineSummary.Bsidebar[1]') }}
          </div> -->
              <el-radio-group v-model="radio" class="radiobox">
                <el-radio
                  @click="
                    () => {
                      sideClcik(1)
                    }
                  "
                  :label="0"
                >
                  {{ $t('types.typeShow[1]') }}
                  <span>{{ $t('types.msg[0]') }}</span>
                </el-radio>
                <el-radio @click="sideClcik(2)" :label="1">
                  {{ $t('types.typeShow[2]') }}
                  <span>{{ $t('types.msg[1]') }}</span>
                </el-radio>
                <el-radio :label="2" @click="sideClcik(3)">
                  {{ $t('types.typeShow[3]') }}
                  <span>{{ $t('types.msg[2]') }}</span>
                </el-radio>
                <el-radio :label="3" @click="sideClcik(4)">
                  {{ $t('types.typeShow[4]') }}
                  <span>{{ $t('types.msg[3]') }}</span>
                </el-radio>
                <el-radio :label="4" @click="sideClcik(5)">
                  Minimum Costs
                  <span>Least amount of required costs</span>
                </el-radio>

                <!-- <el-radio :label="3" @click="sideClcik(4)">
              Constraint Compliance
              <span>Satisfies all constraints</span>
            </el-radio> -->
              </el-radio-group>
            </div>
            <v-btn
              style="outline:none;!important"
              :disabled="!store.end.data"
              @click="nextOptimized"
              class="btn"
              color="rgb(64, 170, 151)"
            >
              {{ $t('next') }}
            </v-btn>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import {
  ref,
  onMounted,
  onUnmounted,
  onBeforeUnmount,
  watch,
  reactive,
  computed,
  onActivated,
  watchEffect,
} from 'vue'
import * as echarts from 'echarts'
import { useRouter } from 'vue-router'
import { useCounterStore } from '@/store'
const store = useCounterStore()
import ecStat from 'echarts-stat'
import api from '@/api/index.js'
import { onBeforeRouteLeave } from 'vue-router'
import { arrowMiddleware } from 'element-plus'
import { toRaw } from '@vue/reactivity'
import Card from '@/components/card/index.vue'
import { log } from 'logrocket'
/* -----------------------------------变量--------------------------------------- */
let activeIndex = ref('Balanced1')

let selectData = reactive({
  preset: 'Balanced',
  fileName: store.file.name,
  step: 3,
})
// 更新选中值
// 右侧被选中数据
let SummaryData = reactive({
  baseDuration: '-',
  changedDuration: '-',
  changgedTasks: '-',
  TotalTasks: '-',
  baseCriticalPath: '-',
  changedCriticalPath: '-',
  TotalResources: '-',
  group: '',
  planDurationDays: '-',
})

// 右侧单选框
let radio = ref(0)
/* ----------------------------------生命周期---------------------------------------- */
onBeforeRouteLeave((to, from, next) => {
  // if (to.name == "InputData") {
  //   activeIndex = ref("");
  //   activeIndex.value = "Balanced1";
  //   radio.value = 0;
  // }
  next()
})
onActivated(() => {
  initChart()
  renderChart()
})
/* -------------------------------------工具函数------------------------------------- */

// 去百分比
function toPercent(num, total) {
  if (total == 0) {
    return 0 + '%'
  }
  return Math.round((num / total) * 10000) / 100.0 + '%' // 小数点后两位百分比
}
// 组件销毁时摧毁实例
const router = useRouter()

/* ---------------------------------------监听----------------------------------- */

watch(activeIndex, () => {
  chart.setOption(option.value)
  spanChart.setOption(spanOption.value)
  costChart.setOption(costOption.value)
})

watch(store.dataArray, () => {
  chart.setOption(option.value)
  spanChart.setOption(spanOption.value)
  costChart.setOption(costOption.value)
})
/* 监听所有数据是否获取完成 -------------------------------------------------------------------------- */
var costName = ''
watch(
  store.end,
  async () => {
    if (store.end.data) {
      // spanChart.setOption({
      //   series: [],
      // })
      // chart.setOption({
      //   series: [],
      // })
      DefaultData.value = getDefault()
      // console.log(DefaultData.value);
      radio.value = 0
      setTimeout(() => {
        chart.dispatchAction({
          type: 'select',
          name: DefaultData.value[1][0].name,
        })
        spanChart.dispatchAction({
          type: 'select',
          name: DefaultData.value[1][0].name,
        })
        costChart.dispatchAction({
          type: 'select',
          name: DefaultData.value[1][0].name,
        })

        costName =
          'Total Cost' +
          `(${store.dataArray.Balanced.all[0].result.currSymbol}${
            store.dataArray.Balanced.all[0].result.currName
              ? ' , ' + store.dataArray.Balanced.all[0].result.currName
              : ''
          })`

        costChart.setOption({
          yAxis: {
            name: costName,
          },
        })
        updateData(DefaultData.value[1][0].value[2].result)
        selectData.preset = 'Balanced'
        selectData.step = DefaultData.value[1][0].value[2].result.step
      }, 0)
    } else {
      activeIndex = ref('')
      activeIndex.value = 'Balanced1'
      radio.value = 0
      SummaryData.baseDuration = '-'
      SummaryData.changedDuration = '-'
      SummaryData.changgedTasks = '-'
      SummaryData.TotalTasks = '-'
      SummaryData.baseCriticalPath = '-'
      SummaryData.changedCriticalPath = '-'
      SummaryData.TotalResources = '-'
      SummaryData.group = ''
      SummaryData.maxResourceUnit = '-'
      SummaryData.BasemaxResourceUnit = '-'
      SummaryData.planDurationDays = '-'
    }
  },
  { deep: true },
)
/* ---------------------------------图表----------------------------------------- */
// 初始化图表实例
let chart = null
let spanChart = null
let costChart = null
// 数据配置项
function seriesSpanData(name, basecolor, activecolor) {
  let size, opacity
  if (name == 'Baseline') {
    size = 16
    opacity = 1
  } else {
    size = 8
    opacity = 0.5
  }
  return {
    type: 'scatter',

    selectedMode: 'single',
    selectedOffset: 10,
    symbol: (data) => {
      // constraintLoss>0
      let path = `path://M18.018,15.344c-0.285,0-0.555-0.162-0.684-0.441l-6.595-12.076l-6.594,12.076c-0.128,0.279-0.398,0.441-0.684,0.441c-0.491,0-0.706-0.638-0.249-0.929l6.997-12.808l-6.997-12.809c-0.457-0.291-0.242-0.929,0.249-0.929c0.286,0,0.556,0.162,0.684,0.441l6.595,12.076l6.594-12.076c0.127-0.279,0.398-0.441,0.684-0.441c0.49,0,0.705,0.638,0.249,0.929l-6.998,12.808l6.998,12.809c0.456,0.291,0.241,0.929-0.249,0.929H18.018z`

      if (data[2].result.constraintLoss > 0) {
        // console.log(data[2].result);
        return path
      }
      return 'circle'
    },
    select: {
      scale: 2,
      itemStyle: {
        color: '#40aa97',
        borderColor: '#40aa97',
        shadowColor: '#40aa97',
        borderWidth: 10,
        shadowBlur: 30,
        opacity: 1,
        // symbolSize: 10, // 调整被选中元素的大小
      },
    },
    emphasis: {
      scale: 2,
      focus: 'series',
      blurScope: 'coordinateSystem',
    },

    data: store.dataArray[name].span,
    name: name,
    symbolSize: size,

    itemStyle: {
      color: (data) => {
        return basecolor
      },
      borderWidth: 1,
      borderColor: '#0b0f07',
      opacity: opacity,
    },
  }
}
function seriesData(name, basecolor, activecolor) {
  let size, opacity
  if (name == 'Baseline') {
    size = 16
    opacity = 1
  } else {
    size = 8
    opacity = 0.5
  }
  return {
    type: 'scatter',

    selectedMode: 'single',
    selectedOffset: 10,
    symbol: (data) => {
      // constraintLoss>0
      let path = `path://M18.018,15.344c-0.285,0-0.555-0.162-0.684-0.441l-6.595-12.076l-6.594,12.076c-0.128,0.279-0.398,0.441-0.684,0.441c-0.491,0-0.706-0.638-0.249-0.929l6.997-12.808l-6.997-12.809c-0.457-0.291-0.242-0.929,0.249-0.929c0.286,0,0.556,0.162,0.684,0.441l6.595,12.076l6.594-12.076c0.127-0.279,0.398-0.441,0.684-0.441c0.49,0,0.705,0.638,0.249,0.929l-6.998,12.808l6.998,12.809c0.456,0.291,0.241,0.929-0.249,0.929H18.018z`
      if (data[2].result.constraintLoss > 0) {
        // console.log(data[2].result);
        return path
      }
      return 'circle'
    },
    select: {
      scale: 2,
      itemStyle: {
        color: '#40aa97',
        borderColor: '#40aa97',
        shadowColor: '#40aa97',
        borderWidth: 10,
        shadowBlur: 30,
        opacity: 1,
        // symbolSize: 10, // 调整被选中元素的大小
      },
    },
    emphasis: {
      scale: 2,
      focus: 'series',
      blurScope: 'coordinateSystem',
    },

    data: store.dataArray[name].data,
    name: name,
    symbolSize: size,

    itemStyle: {
      color: (data) => {
        return basecolor
      },
      borderWidth: 1,
      borderColor: '#0b0f07',
      opacity: opacity,
    },
  }
}
function seriesCostData(name, basecolor, activecolor) {
  let size, opacity
  if (name == 'Baseline') {
    size = 16
    opacity = 1
  } else {
    size = 8
    opacity = 0.5
  }
  return {
    type: 'scatter',

    selectedMode: 'single',
    selectedOffset: 10,
    symbol: (data) => {
      // constraintLoss>0
      let path = `path://M18.018,15.344c-0.285,0-0.555-0.162-0.684-0.441l-6.595-12.076l-6.594,12.076c-0.128,0.279-0.398,0.441-0.684,0.441c-0.491,0-0.706-0.638-0.249-0.929l6.997-12.808l-6.997-12.809c-0.457-0.291-0.242-0.929,0.249-0.929c0.286,0,0.556,0.162,0.684,0.441l6.595,12.076l6.594-12.076c0.127-0.279,0.398-0.441,0.684-0.441c0.49,0,0.705,0.638,0.249,0.929l-6.998,12.808l6.998,12.809c0.456,0.291,0.241,0.929-0.249,0.929H18.018z`
      if (data[2].result.constraintLoss > 0) {
        // console.log(data[2].result);
        return path
      }
      return 'circle'
    },
    select: {
      scale: 2,
      itemStyle: {
        color: '#40aa97',
        borderColor: '#40aa97',
        shadowColor: '#40aa97',
        borderWidth: 10,
        shadowBlur: 30,
        opacity: 1,
        // symbolSize: 10, // 调整被选中元素的大小
      },
    },
    emphasis: {
      scale: 2,
      focus: 'series',
      blurScope: 'coordinateSystem',
    },

    data: store.dataArray[name].cost,
    name: name,
    symbolSize: size,

    itemStyle: {
      color: (data) => {
        return basecolor
      },
      borderWidth: 1,
      borderColor: '#0b0f07',
      opacity: opacity,
    },
  }
}
// !图表配置项
var option = computed(() => {
  // 获取 x 轴的最小值和最大值
  const xValues = Object.values(store.dataArray).flatMap((series) =>
    series.data.map((item) => {
      return item.value[0]
    }),
  )
  const xMinValue = parseFloat((Math.min(...xValues) * 0.95).toFixed(2))
  const xMaxValue = parseFloat((Math.max(...xValues) * 1.05).toFixed(2))

  // 获取 y 轴的最小值和最大值
  const yValues = Object.values(store.dataArray).flatMap((series) =>
    series.data.map((item) => {
      return item.value[1]
    }),
  )
  const yMinValue = parseFloat((Math.min(...yValues) * 0.95).toFixed(2))
  const yMaxValue = parseFloat((Math.max(...yValues) * 1.05).toFixed(2))
  return {
    tooltip: { show: true },
    toolbox: {
      show: true,
      feature: {
        dataView: { show: true, readOnly: false },
        saveAsImage: { show: true },
      },
    },
    axisPointer: {
      show: true,
      snap: true,
    },
    dataZoom: [
      {
        type: 'inside', // 启用内部缩放（框选缩放）
        xAxisIndex: [0], // 将内部缩放应用于 x 轴
      },
      {
        type: 'inside', // 启用内部缩放（框选缩放）
        yAxisIndex: [0], // 将内部缩放应用于 x 轴
      },
    ],
    grid: {
      // left: 120
      top: 70,
      height: '75%',
    },
    xAxis: {
      name: 'Duration (days)',
      nameLocation: 'middle',
      padding: [10],
      height: 100,
      min: xMinValue,
      max: xMaxValue,
      nameTextStyle: {
        align: 'center',
        padding: [30, 0, 0, 0],
        fontWeight: 'lighter',
        fontSize: 20,
        color: 'black',
      },
    },
    yAxis: {
      name: 'Maximum Resource (units/day)',
      max: yMaxValue,
      min: yMinValue,
      padding: [10],
      nameLocation: 'end',
      nameTextStyle: {
        align: 'center',
        padding: [0, 0, 0, 100],
        fontWeight: 'lighter',
        fontSize: 16,
        color: 'black',
      },
    },
    legend: {
      // itemGap: 40,

      data: [
        {
          name: 'Baseline',
          itemStyle: {
            color: 'rgb(204, 204, 204)',
          },
        },
        {
          name: 'Balanced',
          itemStyle: {
            color: 'rgba(130, 181, 199, 0.9)',
          },
        },
        {
          name: 'Fastest',
          itemStyle: {
            color: 'rgba(247, 220, 91, 0.9)',
          },
        },
        {
          name: 'Minimum Resources',
          itemStyle: {
            color: 'rgba(219, 121, 48, 0.9)',
          },
        },
        {
          name: 'Levelled Resources',
          itemStyle: {
            color: 'rgba(170, 187, 93, 0.9)',
          },
        },
        {
          name: 'Minimum Costs',
          itemStyle: {
            color: 'rgba(245, 34, 45, 0.9)',
          },
        },
      ],
      x: 'left',
      itemWidth: 15,
      itemHeight: 15,
    },
    series: [
      seriesData('Baseline', 'rgb(204, 204, 204)', 'rgba(138, 24, 116)'),
      seriesData('Balanced', 'rgba(130, 181, 199, 0.9)', 'rgba(138, 24, 116)'),
      seriesData('Fastest', 'rgba(247, 220, 91, 0.9)', 'rgba(138, 24, 116)'),
      seriesData(
        'Minimum Resources',
        'rgba(219, 121, 48, 0.9)',
        'rgba(138, 24, 116)',
      ),
      seriesData(
        'Levelled Resources',
        'rgba(170, 187, 93, 0.9)',
        'rgba(138, 24, 116)',
      ),
      seriesData(
        'Minimum Costs',
        'rgba(245, 34, 45, 0.9)',
        'rgba(138, 24, 116)',
      ),
    ],
  }
})
var spanOption = computed(() => {
  // 获取 x 轴的最小值和最大值
  const xValues = Object.values(store.dataArray).flatMap((series) =>
    series.data.map((item) => {
      return item.value[0]
    }),
  )
  const xMinValue = parseFloat((Math.min(...xValues) * 0.95).toFixed(2))
  const xMaxValue = parseFloat((Math.max(...xValues) * 1.05).toFixed(2))

  // 获取 y 轴的最小值和最大值
  const yValues = Object.values(store.dataArray).flatMap((series) =>
    series.data.map((item) => {
      return item.value[2].result.spanResourceUnitAgg
    }),
  )

  const yMinValue = parseFloat((Math.min(...yValues) * 0.95).toFixed(2))
  const yMaxValue = parseFloat((Math.max(...yValues) * 1.05).toFixed(2))
  return {
    tooltip: { show: true },
    toolbox: {
      show: true,
      feature: {
        dataView: { show: true, readOnly: false },
        saveAsImage: { show: true },
      },
    },
    axisPointer: {
      show: true,
      snap: true,
    },
    dataZoom: [
      {
        type: 'inside', // 启用内部缩放（框选缩放）
        xAxisIndex: [0], // 将内部缩放应用于 x 轴
      },
      {
        type: 'inside', // 启用内部缩放（框选缩放）
        yAxisIndex: [0], // 将内部缩放应用于 x 轴
      },
    ],
    grid: {
      // left: 120
      top: 70,
      height: '75%',
    },
    xAxis: {
      name: 'Duration (days)',
      nameLocation: 'middle',
      padding: [10],
      height: 100,
      min: xMinValue,
      max: xMaxValue,
      nameTextStyle: {
        align: 'center',
        padding: [30, 0, 0, 0],
        fontWeight: 'lighter',
        fontSize: 20,
        color: 'black',
      },
    },
    yAxis: {
      name: 'Resources Spread (units/day)',
      max: yMaxValue,
      min: yMinValue,
      padding: [10],
      nameLocation: 'end',
      nameTextStyle: {
        align: 'center',
        padding: [0, 0, 0, 100],
        fontWeight: 'lighter',
        fontSize: 16,
        color: 'black',
      },
    },
    legend: {
      data: [
        {
          name: 'Baseline',
          itemStyle: {
            color: 'rgb(204, 204, 204)',
          },
        },
        {
          name: 'Balanced',
          itemStyle: {
            color: 'rgba(130, 181, 199, 0.9)',
          },
        },
        {
          name: 'Fastest',
          itemStyle: {
            color: 'rgba(247, 220, 91, 0.9)',
          },
        },
        {
          name: 'Minimum Resources',
          itemStyle: {
            color: 'rgba(219, 121, 48, 0.9)',
          },
        },
        {
          name: 'Levelled Resources',
          itemStyle: {
            color: 'rgba(170, 187, 93, 0.9)',
          },
        },
        {
          name: 'Minimum Costs',
          itemStyle: {
            color: 'rgba(245, 34, 45, 0.9)',
          },
        },
      ],
      x: 'left',
      itemWidth: 15,
      itemHeight: 15,
    },
    series: [
      seriesSpanData('Baseline', 'rgb(204, 204, 204)', 'rgba(138, 24, 116)'),
      seriesSpanData(
        'Balanced',
        'rgba(130, 181, 199, 0.9)',
        'rgba(138, 24, 116)',
      ),
      seriesSpanData(
        'Fastest',
        'rgba(247, 220, 91, 0.9)',
        'rgba(138, 24, 116)',
      ),
      seriesSpanData(
        'Minimum Resources',
        'rgba(219, 121, 48, 0.9)',
        'rgba(138, 24, 116)',
      ),
      seriesSpanData(
        'Levelled Resources',
        'rgba(170, 187, 93, 0.9)',
        'rgba(138, 24, 116)',
      ),
      seriesSpanData(
        'Minimum Costs',
        'rgba(245, 34, 45, 0.9)',
        'rgba(138, 24, 116)',
      ),
    ],
  }
})
var costOption = computed(() => {
  // 获取 x 轴的最小值和最大值
  const xValues = Object.values(store.dataArray).flatMap((series) =>
    series.data.map((item) => {
      return item.value[0]
    }),
  )
  const xMinValue = parseFloat((Math.min(...xValues) * 0.95).toFixed(2))
  const xMaxValue = parseFloat((Math.max(...xValues) * 1.05).toFixed(2))

  // 获取 y 轴的最小值和最大值
  const yValues = Object.values(store.dataArray).flatMap((series) =>
    series.cost.map((item) => {
      return item.value[1]
    }),
  )

  const yMinValue = parseFloat((Math.min(...yValues) * 0.95).toFixed(2))
  const yMaxValue = parseFloat((Math.max(...yValues) * 1.05).toFixed(2))
  return {
    tooltip: { show: true },
    toolbox: {
      show: true,
      feature: {
        dataView: { show: true, readOnly: false },
        saveAsImage: { show: true },
      },
    },
    axisPointer: {
      show: true,
      snap: true,
    },
    dataZoom: [
      {
        type: 'inside', // 启用内部缩放（框选缩放）
        xAxisIndex: [0], // 将内部缩放应用于 x 轴
      },
      {
        type: 'inside', // 启用内部缩放（框选缩放）
        yAxisIndex: [0], // 将内部缩放应用于 x 轴
      },
    ],
    grid: {
      // left: 120
      top: 70,
      height: '75%',
    },
    xAxis: {
      name: 'Duration (days)',
      nameLocation: 'middle',
      padding: [10],
      height: 100,
      min: xMinValue,
      max: xMaxValue,
      nameTextStyle: {
        align: 'center',
        padding: [30, 0, 0, 0],
        fontWeight: 'lighter',
        fontSize: 20,
        color: 'black',
      },
    },
    yAxis: {
      name: costName === '' ? 'Total Cost' : costName,
      max: yMaxValue,
      min: yMinValue,
      padding: [10],
      nameLocation: 'end',
      nameTextStyle: {
        align: 'left',
        padding: [0, 0, 0, -55],
        fontWeight: 'lighter',
        fontSize: 16,
        color: 'black',
      },
    },
    legend: {
      data: [
        {
          name: 'Baseline',
          itemStyle: {
            color: 'rgb(204, 204, 204)',
          },
        },
        {
          name: 'Balanced',
          itemStyle: {
            color: 'rgba(130, 181, 199, 0.9)',
          },
        },
        {
          name: 'Fastest',
          itemStyle: {
            color: 'rgba(247, 220, 91, 0.9)',
          },
        },
        {
          name: 'Minimum Resources',
          itemStyle: {
            color: 'rgba(219, 121, 48, 0.9)',
          },
        },
        {
          name: 'Levelled Resources',
          itemStyle: {
            color: 'rgba(170, 187, 93, 0.9)',
          },
        },
        {
          name: 'Minimum Costs',
          itemStyle: {
            color: 'rgba(245, 34, 45, 0.9)',
          },
        },
      ],
      x: 'left',
      itemWidth: 15,
      itemHeight: 15,
    },
    series: [
      seriesCostData('Baseline', 'rgb(204, 204, 204)', 'rgba(138, 24, 116)'),
      seriesCostData(
        'Balanced',
        'rgba(130, 181, 199, 0.9)',
        'rgba(138, 24, 116)',
      ),
      seriesCostData(
        'Fastest',
        'rgba(247, 220, 91, 0.9)',
        'rgba(138, 24, 116)',
      ),
      seriesCostData(
        'Minimum Resources',
        'rgba(219, 121, 48, 0.9)',
        'rgba(138, 24, 116)',
      ),
      seriesCostData(
        'Levelled Resources',
        'rgba(170, 187, 93, 0.9)',
        'rgba(138, 24, 116)',
      ),
      seriesCostData(
        'Minimum Costs',
        'rgba(245, 34, 45, 0.9)',
        'rgba(138, 24, 116)',
      ),
    ],
  }
})

// 初始化图表
function initChart() {
  if (chart == null) {
    costChart = echarts.init(
      document.getElementById('costEcharts'),
      'purple-passion',
    )
    chart = echarts.init(document.getElementById('myEcharts'), 'purple-passion')
    spanChart = echarts.init(
      document.getElementById('twoEcharts'),
      'purple-passion',
    )
  }
  // echarts.registerTransform(ecStat.transform.clustering)

  // 图表点击事件获取值
  chart.on('click', function (param) {
    spanChart.dispatchAction({
      type: 'select',
      name: param.name,
    })
    chart.dispatchAction({
      type: 'select',
      name: param.name,
    })
    costChart.dispatchAction({
      type: 'select',
      name: param.name,
    })
    let datas = param.data.value[2].result
    // activeIndex.value = param.name;
    selectData.preset = param.seriesName
    selectData.step = datas.step
    if (param.seriesName == 'Baseline') {
      selectData.preset = 'Balanced'
    } else {
      selectData.preset = param.seriesName
    }
    switch (selectData.preset) {
      case 'Balanced':
        radio.value = 0
        break
      case 'Fastest':
        radio.value = 1
        break
      case 'Minimum_Resources':
        radio.value = 2
        break
      case 'Levelled_Resources':
        radio.value = 3
        break

      default:
        break
    }
    updateData(datas)
  })
  spanChart.on('click', function (param) {
    spanChart.dispatchAction({
      type: 'select',
      name: param.name,
    })

    chart.dispatchAction({
      type: 'select',
      name: param.name,
    })
    costChart.dispatchAction({
      type: 'select',
      name: param.name,
    })
    let datas = param.data.value[2].result
    // activeIndex.value = param.name;
    selectData.preset = param.seriesName
    selectData.step = datas.step
    if (param.seriesName == 'Baseline') {
      selectData.preset = 'Balanced'
    } else {
      selectData.preset = param.seriesName
    }
    switch (selectData.preset) {
      case 'Balanced':
        radio.value = 0
        break
      case 'Fastest':
        radio.value = 1
        break
      case 'Minimum_Resources':
        radio.value = 2
        break
      case 'Levelled_Resources':
        radio.value = 3
        break

      default:
        break
    }
    updateData(datas)
  })
  costChart.on('click', function (param) {
    spanChart.dispatchAction({
      type: 'select',
      name: param.name,
    })

    chart.dispatchAction({
      type: 'select',
      name: param.name,
    })
    let datas = param.data.value[2].result
    // activeIndex.value = param.name;
    selectData.preset = param.seriesName
    selectData.step = datas.step
    if (param.seriesName == 'Baseline') {
      selectData.preset = 'Balanced'
    } else {
      selectData.preset = param.seriesName
    }
    switch (selectData.preset) {
      case 'Balanced':
        radio.value = 0
        break
      case 'Fastest':
        radio.value = 1
        break
      case 'Minimum_Resources':
        radio.value = 2
        break
      case 'Levelled_Resources':
        radio.value = 3
        break

      default:
        break
    }
    updateData(datas)
  })
}

// 更新图表
function renderChart() {
  // console.log('reset');
  chart.setOption(option.value)
  spanChart.setOption(spanOption.value)
  costChart.setOption(costOption.value)
}
/* -------------------------------------------------------------------------- */

// 右侧数据更新
function updateData(data) {
  SummaryData.group = data.group
  // 持续时间
  SummaryData.baseDuration = Math.ceil(data.baselineDurationDaysWithCalendar)
  SummaryData.changedDuration = Math.ceil(data.projectDurationDaysWithCalendar)
  SummaryData.planDurationDays = Math.ceil(
    store.originalplan.originalDurationDays,
  )
  SummaryData.changgedTasks = Math.ceil(data.changedTasksLen)
  SummaryData.TotalTasks = Math.ceil(data.baselineTasksLen)
  SummaryData.baseCriticalPath = Math.ceil(data.baselineCriticalTasksLen)
  SummaryData.changedCriticalPath = Math.ceil(data.newCriticalTasksLen)
  SummaryData.TotalResources = Math.ceil(data.totalResourceCount)
  SummaryData.maxResourceUnit = Math.ceil(data.maxResourceUnitAgg)
  SummaryData.BasemaxResourceUnit = Math.ceil(
    store.dataArray.Baseline.all[0].result.maxResourceUnitAgg,
  )
}

// 按钮点击跳转
async function nextOptimized() {
  store.wss.close()
  selectData.fileName = store.file.name
  selectData.considerDefaultResourceType =
    store.setting.considerDefaultResourceType
  selectData.resourceConstraint = store.setting.resourceConstraint
  selectData.preset = selectData.preset.replace(/ /g, '_')
  let data = await api.getOptimized({ ...selectData }, store.file.size)
  store.SummaryData = { ...SummaryData }
  store.selectedData = null

  store.selectedData = data.data
  // console.log(store.selectedData);
  store.active = 2
  store.selectChange = true
  router.push({ name: 'optimizedSummary' })
}

// 获取4个默认选项的id
let DefaultData = ref(null)
function getDefault() {
  let DefaultDatas = []
  // console.log(store.dataArray);
  for (const key in store.dataArray) {
    let data = toRaw(store.dataArray[key].data)
    data.sort((a, b) => a.value[2].result.loss - b.value[2].result.loss)
    DefaultDatas.push(data)
  }
  return DefaultDatas
}

// 侧边烂点击事件
function sideClcik(num) {
  // console.log(DefaultData.value);
  chart.dispatchAction({
    type: 'select',
    name: DefaultData.value[num][0].name,
  })
  spanChart.dispatchAction({
    type: 'select',
    name: DefaultData.value[num][0].name,
  })
  costChart.dispatchAction({
    type: 'select',
    name: DefaultData.value[num][0].name,
  })
  activeIndex = DefaultData.value[num][0].name
  selectData.preset = DefaultData.value[num][0].value[2].name
  selectData.step = DefaultData.value[num][0].value[2].result.step
  updateData(DefaultData.value[num][0].value[2].result)
}
</script>

<style lang="scss" scoped>
.arrow {
  > svg {
    width: 20px;
    height: 20px;
  }
}
h2 {
  width: 100%;
  height: 30px;
  margin: 0 0 20px 0;
  font-size: 24px;
  font-weight: 700;
  line-height: 30px;
  letter-spacing: -0.5px;
  display: flex;
  color: #545454;
  .step {
    color: #ffffff;
    background: #40a795;
    border-radius: 16px;
    padding: 0 12px;
    font-size: 12px;
    font-weight: normal;
    margin: 0 5px;
  }
}
.main {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  .chartContent {
    width: 100%;
    // min-width: 1600px;
    display: flex;
    justify-content: space-around;
    // flex-direction: column-reverse; /* 垂直方向反向排列 */
    flex-wrap: wrap;
  }
  .left {
    padding: 20px;
    background-color: #fff;
    border-radius: 15px;
    display: flex;
    flex-wrap: wrap;
    min-width: 600px;
    // justify-content: space-between;

    .lefttop {
      display: flex;
      justify-content: space-between;
      width: 100%;
    }
    .choosebox {
      display: flex;
    }
    .choose {
      display: flex;
      margin-top: 20px;
      margin-left: 10px;
      font-size: 10px;
      .item {
        width: 16px;
        height: 16px;
        background: #cccccc;
        border-radius: 50%;
        margin-right: 5px;
      }
    }
  }
  .right {
    width: 720px;
    padding-left: 16px;
    .righttop {
      display: flex;
      flex-wrap: wrap;

      > div {
        display: flex;
        width: 100%;
      }
    }
    .rightbutton {
      height: 220px;
      padding: 20px;
      margin: 16px 0px;
      background-color: #fff;
      border-radius: 15px;
      div {
        font-size: 15px;
        color: #545454;
      }
      h1 {
        font-size: 28px;
      }
      .radiobox {
        align-items: flex-start;
        display: flex;
        flex-direction: column;
        justify-content: start;
        margin-top: 10px;
        span {
          color: #828787;
          font-size: 10px;
          margin-left: 5px;
        }
      }
    }
    .btn {
      width: 100%;
      height: 44px;
      line-height: 1.75;
      background: #40aa97;
      border: none;
      color: #fff;
      padding: 10px 20px;
      background: #40aa97;
      box-shadow: 1px 2px 2px #cfeae5;
      border-radius: 8px;
      font-weight: bold;
      font-size: 1rem;
    }
  }
}
.all {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 70%;
  max-width: 1600px;
  // h2{
  //   min-width: 200px;
  // }
  // >div{
  //   min-width: 200px;
  // }
}
</style>
