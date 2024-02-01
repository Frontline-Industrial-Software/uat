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
      <el-icon
        style="margin-top: 3px"
        @click="changeStyle"
        :class="{ active: activeColor, normal: !activeColor }"
      >
        <Menu />
      </el-icon>
      <el-icon
        style="margin-top: 3px"
        @click="changeStyle"
        :class="{ active: !activeColor, normal: activeColor }"
      >
        <Expand />
      </el-icon>
    </h2>
    <div class="main">
      <div class="left">
        <div class="lefttop">
          <div>{{ $t('baselineSummary.chartName[0]') }}</div>
        </div>
        <div class="chartContent">
          <Echarts
            :class="{ chartCanvasList: !activeColor, chartCanvas: activeColor }"
            id="costEcharts"
          ></Echarts>
          <Echarts
            :class="{ chartCanvasList: !activeColor, chartCanvas: activeColor }"
            id="myEcharts"
          ></Echarts>
          <Echarts
            :class="{ chartCanvasList: !activeColor, chartCanvas: activeColor }"
            id="twoEcharts"
          ></Echarts>
        </div>
        <div class="right echarts-box">
          <div class="righttop">
            <div>
              <Card
                :title="$t('baselineSummary.Tsidebar[0]')"
                :height="138"
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
                :height="138"
                :precent="
                  toPercent(
                    SummaryData.maxResourceUnit -
                      SummaryData.BasemaxResourceUnit,
                    SummaryData.BasemaxResourceUnit,
                  )
                "
                :isPositive="true"
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
                :height="138"
                :body="[
                  SummaryData.changgedTasks,
                  SummaryData.TotalTasks,
                  // store.SummaryData.changedDuration + 'days',
                ]"
              />
              <Card
                :title="$t('baselineSummary.Tsidebar[3]')"
                :height="138"
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
            <h1 style="font-size: 18px; width: 202px; font-weight: 700">
              {{ $t('baselineSummary.Bsidebar[0]') }}
            </h1>
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
                <span>{{ $t('types.typeShow[1]') }}</span>
                <!-- <span>{{ $t('types.msg[0]') }}</span> -->
              </el-radio>
              <el-radio @click="sideClcik(2)" :label="1">
                <span>{{ $t('types.typeShow[2]') }}</span>

                <!-- <span>{{ $t('types.msg[1]') }}</span> -->
              </el-radio>
              <el-radio :label="2" @click="sideClcik(3)">
                <span>{{ $t('types.typeShow[3]') }}</span>
                <!-- <span>{{ $t('types.msg[2]') }}</span> -->
              </el-radio>
              <el-radio :label="3" @click="sideClcik(4)">
                <span>{{ $t('types.typeShow[4]') }}</span>
                <!-- <span>{{ $t('types.msg[3]') }}</span> -->
              </el-radio>
              <el-radio :label="4" @click="sideClcik(5)">
                <span>Minimum Costs</span>
              </el-radio>

              <!-- <el-radio :label="3" @click="sideClcik(4)">
              Constraint Compliance
              <span>Satisfies all constraints</span>
            </el-radio> -->
            </el-radio-group>
          </div>
          <!-- <v-btn
              style="outline:none;!important"
              :disabled="!store.end.data"
              @click="nextOptimized"
              class="btn"
              color="rgb(64, 170, 151)"
            >
              {{ $t('next') }}
            </v-btn> -->
          <NextButton
            :style="'color:white;width:300px;'"
            :disabled="store.end.data"
            @clicked="nextOptimized"
            :title="'Generate'"
          />
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
import NProgress from 'nprogress'
import ecStat from 'echarts-stat'
import api from '@/api/index.js'
import { onBeforeRouteLeave } from 'vue-router'
import { arrowMiddleware } from 'element-plus'
import { toRaw } from '@vue/reactivity'
import Card from '@/components/card/index.vue'
import { log } from 'logrocket'
import NextButton from '@/components/next/next.vue'
const store = useCounterStore()
/* -----------------------------------变量--------------------------------------- */
let activeIndex = ref('Balanced1')
// 颜色样式控制
let activeColor = ref(true)
function changeStyle() {
  activeColor.value == false
    ? (activeColor.value = true)
    : (activeColor.value = false)
  setTimeout(() => {
    changeSize()
  }, 0)
}

/* -------------------------------------------------------------------------- */
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
      DefaultData.value = getDefault()
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
        selectData.totalCost = DefaultData.value[1][0].value[2].result.totalCost
        selectData.resourcesSpread =
          DefaultData.value[1][0].value[2].result.spanResourceUnitAgg
        selectData.criticalTasks =
          DefaultData.value[1][0].value[2].result.newCriticalTasksLen
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
      right: 10,
      top: 90,
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
        padding: [0, 0, 0, 130],
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
      textStyle: {
        fontSize: 10,
      },
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
      right: 10,
      top: 90,
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
        padding: [0, 0, 0, 130],
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
      textStyle: {
        fontSize: 10,
      },
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
  const xlabelWidth = costChart.getWidth()
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
      right: 10,
      top: 90,
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
      axisLabel: {
        //**该项配置重点关注**
        show: true,
        interval: 0,
        width: 40,
        overflow: 'breakAll',
      },
      nameTextStyle: {
        align: 'left',
        padding: [0, 0, 0, -27],
        fontWeight: 'lighter',
        fontSize: 14,
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
      textStyle: {
        fontSize: 10,
      },
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
    selectData.totalCost = datas.totalCost
    selectData.resourcesSpread = datas.spanResourceUnitAgg
    selectData.criticalTasks = datas.newCriticalTasksLen
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
    selectData.preset = param.seriesName
    selectData.step = datas.step
    selectData.totalCost = datas.totalCost
    selectData.resourcesSpread = datas.spanResourceUnitAgg
    selectData.criticalTasks = datas.newCriticalTasksLen
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
    costChart.dispatchAction({
      type: 'select',
      name: param.name,
    })
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
    selectData.preset = param.seriesName
    selectData.step = datas.step
    selectData.totalCost = datas.totalCost
    selectData.resourcesSpread = datas.spanResourceUnitAgg
    selectData.criticalTasks = datas.newCriticalTasksLen
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
// date
function getCurrentFormattedTime() {
  // 创建一个Date对象，表示当前时间
  var currentDate = new Date()

  // 获取年、月、日、小时、分钟和秒
  var year = currentDate.getFullYear()
  var month = (currentDate.getMonth() + 1).toString().padStart(2, '0') // 月份从0开始，需要加1
  var day = currentDate.getDate().toString().padStart(2, '0')
  var hours = currentDate.getHours().toString().padStart(2, '0')
  var minutes = currentDate.getMinutes().toString().padStart(2, '0')
  var seconds = currentDate.getSeconds().toString().padStart(2, '0')

  // 格式化输出
  var formattedDate =
    year + '-' + month + '-' + day + ' ' + hours + ':' + minutes + ':' + seconds

  return formattedDate
}
function getlog() {
  let log = {
    datetime: getCurrentFormattedTime(),
    user: store.email,
    projectInfo: `filename:${store.truefile},tasks: ${SummaryData.TotalTasks}, resources: ${SummaryData.maxResourceUnit}`,
    settings: `Ignore Actual Start / Actual Finish: ${
      store.setting.IgnoreProject
    },Learning Rate:${
      store.setting.Rate
    }, How To Handle Tasks Without Resources: ${
      store.setting.considerDefaultResourceType
    }, Method To Satisfy Resource Constraints: ${
      store.setting.resourceConstraint
    },Optimization Ratio:${setRatio(store.setting.Ratio)},Optimization Steps:${
      store.setting.Steps
    }`,
    baselineInfo: `duration:${
      store.dataArray.Baseline.all[0].result.baselineDurationDaysWithCalendar
    }, maxResources: ${
      store.dataArray.Baseline.all[0].result.maxResourceUnitAgg
    }, resourcesSpread: ${
      store.dataArray.Baseline.all[0].result.spanResourceUnitAgg
    },totalCost: ${currSymbol(
      store.dataArray.Baseline.all[0].result.totalCost,
    )}, criticalTasks: ${
      store.dataArray.Baseline.all[0].result.baselineCriticalTasksLen
    }`,
    userAction: `preset: ${selectData.preset}, step:${
      store.setting.Steps
    }, duration: ${SummaryData.changedDuration} days, maxResources: ${
      SummaryData.maxResourceUnit
    }, resourcesSpread: ${selectData.resourcesSpread}, totalCost: ${currSymbol(
      selectData.totalCost,
    )}, criticalTasks: ${selectData.criticalTasks}`,
  }
  return log
}
function currSymbol(numbers) {
  return store.dataArray.Balanced.all[0].result.currSymbol + numbers
}
function setRatio(numbers) {
  // 遍历数组，将每个元素乘以 100 并添加百分号，然后使用短横线连接
  const percentageString = numbers
    .map((number) => (number * 100).toFixed(0) + '%')
    .join(' - ')
  return percentageString
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
  console.log(data.data)
  store.selectedData = data.data
  // console.log(store.selectedData);
  store.active = 2
  store.selectChange = true

  let logsData = await api.UploadUserlog(getlog())
  // console.log(getlog())
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

// 切换显示方式，更改size
function changeSize() {
  const xlabelWidth = costChart.getWidth()
  console.log(xlabelWidth)
  if (xlabelWidth < 1000) {
    costChart.setOption({
      yAxis: {
        axisLabel: {
          //**该项配置重点关注**
          show: true,
          interval: 0,
          width: 100,
          overflow: 'breakAll',
        },
      },
    })
  } else {
    costChart.setOption({
      yAxis: {
        axisLabel: {
          //**该项配置重点关注**
          show: true,
          interval: 0,
          width: 40,
          overflow: 'breakAll',
        },
      },
    })
  }

  chart.resize()
  spanChart.resize()
  costChart.resize()
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
  // 是否弹性
  // width: 100%;
  .chartContent {
    width: 1200px;
    // min-width: 1600px;

    // display: flex;
    justify-content: space-around;
    // flex-direction: column-reverse; /* 垂直方向反向排列 */
    flex-wrap: wrap;
  }
  .echarts-box {
    float: left;
    margin: 25px;
  }

  .left {
    padding: 20px;
    background-color: rgb(240, 241, 243);
    border-radius: 15px;
    display: flex;
    flex-wrap: wrap;
    min-width: 600px;
    // justify-content: space-between;

    .lefttop {
      display: flex;
      justify-content: space-between;
      width: 1600px;
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
    width: 300px;
    padding-left: 16px;

    .righttop {
      display: flex;
      flex-wrap: wrap;

      > div {
        width: 300px;
      }
    }
    .rightbutton {
      display: flex;
      flex-wrap: wrap;
      padding: 16px;
      margin: 16px 0;
      margin-left: 5px;
      background-color: #fff;
      border-radius: 15px;
      width: 275px;
      border-radius: 16px;
      span {
        font-size: 16px !important;
        font-weight: 700 !important;
      }
      .radiobox {
        align-items: flex-start;
        display: flex;
        flex-direction: column;
        justify-content: start;
        margin-top: 10px;
        div {
          font-size: 16px;
          font-weight: 700;
        }
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
  width: 100%;
  max-width: 1600px;
  // h2{
  //   min-width: 200px;
  // }
  // >div{
  //   min-width: 200px;
  // }
}
.active {
  color: #40a795;
}
normal {
  color: #545454;
}
.chartCanvas {
  width: 521px;
  height: 450px;
  background-color: #fff;
  border-radius: 16px;
  box-shadow: 1px 1px 20px 5px rgba(205.06, 205.06, 205.06, 0.25);
  padding: 10px;
}
.chartCanvasList {
  width: 1041px;
  height: 750px;
  background-color: #fff;
  border-radius: 16px;
  box-shadow: 1px 1px 20px 5px rgba(205.06, 205.06, 205.06, 0.25);
  padding: 10px;
}
:deep(.el-radio__input.is-checked .el-radio__inner) {
  background-color: #40aa97 !important;
  border-color: #40aa97 !important; // #4e8fd0
  color: #40aa97;
}

/* 使用深度选择器修改选中状态的颜色 */
:deep(.el-radio__input.is-checked + .el-radio__label) {
  color: #40aa97;
}
</style>
