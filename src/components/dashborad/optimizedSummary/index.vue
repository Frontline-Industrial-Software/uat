<template>
  <div class="contain">
    <div class="box">
      <h2>
        {{ $t('optimizedSummary.title[0]') }}
        <span class="sp">{{ store.SummaryData.group }}</span>
        <div class="step">
          <span>
            {{ store.setting.Steps }} {{ $t('optimizedSummary.title[1]') }}
          </span>
        </div>
        <div class="step">
          <span>
            {{
              `${store.setting.Ratio[0] * 100}% - ${
                store.setting.Ratio[1] * 100
              }% ${$t('optimizedSummary.title[2]')}`
            }}
          </span>
        </div>
      </h2>
      <div class="maintop">
        <!-- <div class="right-items">
          <div class="right-item">
            <div class="title">{{ $t('baselineSummary.Tsidebar[0]') }}</div>
            <div class="content">
              <div class="t-content">
                <span class="f"> days</span>
                <span
                  style="color: #10be00; font-weight: 700"
                  v-if="
                   1
                  "
                >
                  <img
                    style="vertical-align: bottom"
                    src="/arrow-up-thin.svg"
                    alt=""
                    srcset=""
                  />
                  <span>
                 
                  </span>
                </span>
                <span style="color: #be0010; font-weight: 700" v-else>
                  <img
                    style="vertical-align: bottom"
                    src="/arrow-down-thin.svg"
                    alt=""
                    srcset=""
                  />
               
                </span>
              </div>
              <div class="b-content">
                <div style="border-right: 1px solid #f0f1f3" class="bottom">
                  <span> days</span>
                  <div>Actual</div>
                </div>
                <div class="bottom">
                  <span> days</span>
                  <div>Plan</div>
                </div>
              </div>
            </div>
          </div>

        </div> -->
        <Card
          :title="$t('optimizedSummary.header[0]')"
          :height="180"
          :precent="
            toPercent(
              store.SummaryData.changedDuration -
                store.SummaryData.baseDuration,
              store.SummaryData.baseDuration,
            )
          "
          :isPositive="true"
          :body="[
            store.SummaryData.changedDuration + ' ' + 'days',
            store.SummaryData.baseDuration + ' ' + 'days',
            // store.SummaryData.changedDuration + 'days',
          ]"
        />
        <Card
          :title="$t('baselineSummary.Tsidebar[1]')"
          :height="180"
          :precent="
            toPercent(
              store.SummaryData.maxResourceUnit -
                store.SummaryData.BasemaxResourceUnit,
              store.SummaryData.BasemaxResourceUnit,
            )
          "
          :isPositive="false"
          :body="[
            store.SummaryData.maxResourceUnit,
            store.SummaryData.BasemaxResourceUnit,
            // store.SummaryData.changedDuration + 'days',
          ]"
        />
        <Card
          :title="$t('optimizedSummary.header[2]')"
          :height="180"
          :body="[
            store.SummaryData.changgedTasks,
            store.SummaryData.TotalTasks,
            // store.SummaryData.changedDuration + 'days',
          ]"
        />
        <Card
          :title="$t('optimizedSummary.header[3]')"
          :height="180"
          :body="[
            criticalTask.length,
            store.selectedData.baselineTasks.length,
            // store.SummaryData.changedDuration + 'days',
          ]"
        />
        <!-- <div class="item">
          <div class="title">{{ $t('optimizedSummary.header[0]') }}</div>
          <div class="center">
            <span class="changed">
              {{ store.SummaryData.changedDuration }}/
            </span>
            <span class="base">{{ store.SummaryData.baseDuration }}</span>
          </div>
          <div class="bottom">
            {{
              toPercent(
                store.SummaryData.changedDuration,
                store.SummaryData.baseDuration,
              )
            }}
          </div>
        </div>
        <div class="item">
          <div class="title">{{ $t('optimizedSummary.header[1]') }}</div>
          <div class="center">
            <span class="changed">{{ store.SummaryData.changgedTasks }}/</span>
            <span class="base">{{ store.SummaryData.TotalTasks }}</span>
          </div>
          <div class="bottom">
            {{
              toPercent(
                store.SummaryData.changgedTasks,
                store.SummaryData.TotalTasks,
              )
            }}
          </div>
        </div>
        <div class="item">
          <div class="title">{{ $t('optimizedSummary.header[2]') }}</div>
          <div class="center">
            <span class="changed">{{ criticalTask.length }}/</span>
            <span class="base">
              {{ store.selectedData.baselineTasks.length }}
            </span>
          </div>
          <div class="bottom">
            {{
              toPercent(
                criticalTask.length,
                store.selectedData.baselineTasks.length,
              )
            }}
          </div>
        </div> -->
      </div>
      <div class="mainEchar1">
        <div class="Echar1top">
          <div>{{ $t('optimizedSummary.chartName[0]') }}</div>
        </div>
        <span>{{ $t('optimizedSummary.chartName[1]') }}</span>
        <div class="choosebox">
          <div class="choose">
            <div style="background-color: #b0e054" class="item"></div>
            <div>Optimized</div>
          </div>
          <div class="choose">
            <div style="background-color: #5474c4" class="item"></div>
            <div>Baseline</div>
          </div>
          <div class="choose">
            <div style="background-color: red" class="item"></div>
            <div>Critical Path</div>
          </div>
          <div class="choose">
            <div style="background-color: pink" class="item"></div>
            <div>Critical Path(baseline)</div>
          </div>
        </div>
        <div id="main"></div>
        <div
          ref="main"
          style="width: 1150px; height: 610px"
          id="myEcharts"
        ></div>
      </div>

      <div class="mainEchar2">
        <div class="Echar2top">
          <div>{{ $t('optimizedSummary.chartName[2]') }}</div>
        </div>
        <span>{{ $t('optimizedSummary.chartName[3]') }}</span>

        <el-input v-model="searchData" placeholder="Search Resources" />
        <div v-for="(item, key) in types">
          <div class="resources-title">{{ key }} Resources</div>
          <div class="types">
            <div v-for="(items, i) in item" :key="i" class="type">
              <v-btn
                variant="text"
                :value="i"
                :class="{ activeType: typeActive == items.id }"
                @click="
                  () => {
                    chooseType(items.id)
                  }
                "
              >
                {{ items.name }} {{ items.type }}
              </v-btn>
            </div>
          </div>
        </div>
        <div
          ref="main01"
          style="width: 1150px; height: 610px"
          id="myEcharts01"
        ></div>
      </div>
      <div class="button">
        <el-button @click="back" class="btnback">BACK</el-button>
        <el-button @click="nextReport" class="btngo">
          {{ $t('optimizedSummary.btn[1]') }}
        </el-button>
      </div>
    </div>
  </div>
  <Dialog
    @closeDialog="onCloseDialog"
    :data="tableData"
    :dialogVisible="dialogVisible"
  />
</template>

<script setup>
import {
  ref,
  onMounted,
  onUnmounted,
  watch,
  watchEffect,
  computed,
  onActivated,
} from 'vue'
import Card from '@/components/card.vue'
import * as echarts from 'echarts'
import { useRouter } from 'vue-router'
import ecStat from 'echarts-stat'
import { useCounterStore } from '../../../store'
const store = useCounterStore()
const router = useRouter()
import api from '../../../api/index.js'
import { onBeforeRouteLeave, onBeforeRouteUpdate } from 'vue-router'
import Dialog from '../../dialog/dialog.vue'

// 弹出框
let dialogVisible = ref(false)

let tableData = ref('')
const onCloseDialog = () => {
  dialogVisible.value = false
}
/* --------------------------------------生命周期------------------------------------ */
onBeforeRouteLeave((to, from, next) => {
  if (to.name == 'InputData') {
    // clear();
  }
  next()
})
onActivated(() => {
  if (store.selectChange) {
    typeActive.value = ''
    initChart()
    renderChart()
    store.selectChange = false
  }
})
/* ------------------------------------工具函数-------------------------------------- */
// 去百分比
function toPercent(num, total) {
  return Math.round((num / total) * 10000) / 100.0 + '%' // 小数点后两位百分比
}

// utc时间转化

// iso86Time
function utcTime(time) {
  // console.log(utcString);
  const utcDate = new Date(time)
  const utcString = utcDate.toISOString()
  // console.log(utcString);
  // console.log(utcString);
  return utcString
}
function convertUTCToCustomFormat(utcTimeString) {
  const date = new Date(utcTimeString)
  // console.log(date.toISOString());
  // 自定义您希望的日期格式
  const customFormattedString = `${date.getUTCFullYear()}/${
    date.getUTCMonth() + 1
  }/${date.getUTCDate()} ${('0' + date.getUTCHours()).slice(-2)}:${(
    '0' + date.getUTCMinutes()
  ).slice(-2)}:${('0' + date.getUTCSeconds()).slice(-2)}`

  return customFormattedString
}
const toArray = (distribution) => {
  if (distribution[0] === undefined || distribution[0].length === 0) {
    return []
  }
  return distribution[0].xy.map((obj) => {
    const [x, y] = Object.entries(obj)[0]
    return {
      value: [utcTime(parseInt(x)), y],
      name: utcTime(parseInt(x)) + y + distribution[1],
    }
  })
}
/* -------------------------------------------------------------------------- */

/* --------------------------------------入口函数------------------------------------ */
let myEcharts = echarts

let type = ref(2)
let resourcesChart

let criticalTask = computed(() => {
  if (!store.selectedData) {
    return
  }
  let critical = store.selectedData.baselineTasks.filter((e) => {
    return e.critical
  })
  return critical
})

function baseItem(data) {
  // style="color:#8c8c8c"
  return `<span >${data}</span>`
}

function initChart() {
  // console.log(store.selectedData);
  let changedlineTasks = []
  // 基础任务
  let baselineTasks = store.selectedData.baselineTasks.map(
    (baselineTask, idx) => {
      let newBaselineTask = store.selectedData.tasks.find(
        (task) => task.id === baselineTask.id,
      )

      newBaselineTask.old = baselineTask
      changedlineTasks.push(newBaselineTask)
      // console.log(baselineTask,newBaselineTask);
      // baselineTask.new=newBaselineTask
      // baselineTask.old={...baselineTask}
      idx = store.selectedData.baselineTasks.length - idx
      return {
        name: baselineTask.name,
        value: [
          idx,
          utcTime(baselineTask.newStart),
          utcTime(baselineTask.newFinish),
          baselineTask,
          {
            baseNew: {
              start: baselineTask.newStart,
              finish: baselineTask.newFinish,
              duration: baselineTask.newDuration,
            },
            changeNew: {
              start: newBaselineTask.newStart,
              finish: newBaselineTask.newFinish,
              duration: newBaselineTask.newDuration,
            },
          },
        ],
        itemStyle: {
          color: baselineTask.critical ? 'pink' : undefined,
        },
      }
    },
  )
  // console.log(baselineTasks);
  // 优化任务
  changedlineTasks = changedlineTasks.map((changedlineTask, idx) => {
    // console.log(changedlineTask);
    idx = changedlineTasks.length - idx + 0.2

    return {
      id: changedlineTask.id,
      name: changedlineTask.name,
      value: [
        idx,
        utcTime(changedlineTask.newStart),
        utcTime(changedlineTask.newFinish),
        changedlineTask,
        {
          baseNew: {
            start: changedlineTask.old.newStart,
            finish: changedlineTask.old.newFinish,
            duration: changedlineTask.old.newDuration,
          },
          changeNew: {
            start: changedlineTask.newStart,
            finish: changedlineTask.newFinish,
            duration: changedlineTask.newDuration,
          },
        },
      ],
      itemStyle: {
        color: changedlineTask.critical ? 'red' : undefined,
      },
    }
  })
  //表格1
  let chart = myEcharts.init(
    document.getElementById('myEcharts'),
    'purple-passion',
  )
  chart.on('click', function (param) {
    tableData.value = param.data.value[3]

    dialogVisible.value = true
  })
  var option
  //表格1
  let renderItem = (params, api) => {
    let start = api.coord([api.value(1), api.value(0)])
    let end = api.coord([api.value(2), api.value(0)])
    let height = api.size([0, 1])[1] * 0.5
    let shape = echarts.graphic.clipRectByRect(
      {
        x: start[0],
        y: start[1] - height / 2,
        width: Math.max(end[0] - start[0], 1),
        height: height,
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
  option = {
    // useUTC:true,
    toolbox: {
      show: true,
      feature: {
        dataView: { show: true, readOnly: false },
        saveAsImage: { show: true },
      },
    },

    // 选中状态
    // select: {scale: 2},

    dataZoom: [
      {
        type: 'slider',
        filterMode: 'weakFilter',
        xAxisIndex: [0],
        labelFormatter: function (value) {
          return convertUTCToCustomFormat(value)
        },
        moveHandleSize: 15,
        height: 15,
        moveHandleStyle: {},
        // minSpan:5,
      },
      {
        type: 'slider',
        filterMode: 'weakFilter',
        yAxisIndex: [0],
        // minSpan:5,
      },
      {
        type: 'inside',
        filterMode: 'weakFilter',
        xAxisIndex: [0],
      },
      {
        type: 'inside',
        filterMode: 'weakFilter',
        yAxisIndex: [0],
      },
    ],
    legend: {
      data: ['baseline', 'new'],
    },
    xAxis: {
      name: 'date',
      type: 'time',
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

      axisLabel: {
        // width: '80',
        // overflow: 'breakAll',
        showMaxLabel: 'true',
        showMinLabel: 'true',
        formatter: function (value, index) {
          // 格式化成您需要的日期格式
          const customFormattedTime = convertUTCToCustomFormat(value)
          return customFormattedTime
        },
      },
    },

    yAxis: {
      name: 'tasks',
    },
    selectedMode: 'single',

    series: [
      {
        name: 'baseline',
        type: 'custom',
        data: baselineTasks,
        large: true,
        renderItem: renderItem,
        encode: {
          x: [1, 2],
          y: 0,
        },
      },
      {
        name: 'new',
        type: 'custom',
        data: changedlineTasks,
        large: true,
        renderItem: renderItem,
        encode: {
          x: [1, 2],
          y: 0,
        },
      },
    ],
    tooltip: {
      axisPointer: {
        //坐标轴指示器，坐标轴触发有效，
        // type: 'cross', //默认为line，line直线，cross十字准星，shadow阴影
      },

      formatter: (p) => {
        // console.log(p.value)
        let resData = 'Resources: <br/>'
        if (p.value[3].resources) {
          for (const key in p.value[3].resources) {
            let res = p.value[3].resources
            let name = store.selectedData.newResources.find((resource) => {
              return resource.id == key
            })
            if (!name) {
              name = ''
            }
            // console.log(name)
            resData += ` &nbsp&nbspResource &nbsp  ${
              name?.name
            } &nbsp id: ${key}  <br/>&nbsp&nbsp&nbsp&nbspunits/hour:${returnFloat(
              res[key].plannedUnitsPerHour,
            )}=> ${returnFloat(res[key].newUnitsPerHour)}<br/>`
            // console.log(res[key]);
          }
        }
        // console.log( p.value[3].plannedStart,utcTime(p.value[3].plannedStart));
        function marker(str) {
          let color
          switch (str) {
            case 'New':
              if (!p.value[3].critical) {
                color = '#b0e054'
              } else {
                color = 'red'
              }
              break
            case 'Old':
              if (!p.value[3].critical) {
                color = '#5474c4'
              } else {
                color = 'pink'
              }

            default:
              break
          }

          return `<span style="display:inline-block;margin-right:4px;border-radius:10px;width:10px;height:10px;background-color:${color};"></span>`
        }
        return `${p.name}<br/>
        <div style='margin-top:20px'>
         ${marker('New')} New: ${baseItem(
           utcTime(p.value[4].changeNew.start)
             .replace('T', ' ')
             .replace('Z', '')
             .slice(0, 16),
         )} -> ${baseItem(
           utcTime(p.value[4].changeNew.finish)
             .replace('T', ' ')
             .replace('Z', '')
             .slice(0, 16),
         )}
         (${p.value[4].changeNew.duration})
        <br/>
         ${marker('Old')} Old: ${baseItem(
           utcTime(p.value[4].baseNew.start)
             .replace('T', ' ')
             .replace('Z', '')
             .slice(0, 16),
         )} -> ${baseItem(
           utcTime(p.value[4].baseNew.finish)
             .replace('T', ' ')
             .replace('Z', '')
             .slice(0, 16),
         )}
       (${p.value[4].baseNew.duration})
         <br/>
         ${resData}
        </div>`
      },
    },
  }
  option && chart.setOption(option)

  chart.on('mousemove', function (param) {
    chart.dispatchAction({
      type: 'highlight',
      dataIndex: param.dataIndex,
    })
  })
  resourcesChart = myEcharts.init(
    document.getElementById('myEcharts01'),
    'purple-passion',
  )
  resourcesChart.on('mousemove', function (param) {
    // console.log(param.name);
    resourcesChart.dispatchAction({
      type: 'highlight',
      name: param.name,
    })
  })
  resourcesChart.on('click', function (params) {
    // console.log(params.name)
    // 取消所有系列中的选中状态
    // 选中当前点击的元素
    resourcesChart.dispatchAction({
      type: 'select',
      name: params.name,
    })
  })
}
let searchData = ref('')
// 强制保留2位小数
function returnFloat(value) {
  if (!value) {
    return '0.00'
  }
  var value = Math.round(parseFloat(value) * 100) / 100
  var xsd = value.toString().split('.')
  if (xsd.length == 1) {
    value = value.toString() + '.00'
    return value
  }
  if (xsd.length > 1) {
    if (xsd[1].length < 2) {
      value = value.toString() + '0'
    }
    return value
  }
}
function groupBy(objectArray, property) {
  return objectArray.reduce(function (acc, obj) {
    let key = obj[property]
    if (!acc[key]) {
      acc[key] = []
    }
    acc[key].push(obj)
    return acc
  }, {})
}

let types = computed(() => {
  let data = store.selectedData.baselineResources.map((e) => {
    return { id: e.id, name: e.name, type: e.type }
  })
  let newData = groupBy(data, 'type')
  if (searchData.value) {
    const regex = new RegExp(searchData.value, 'i')
    let filteredData = {}
    for (let key in newData) {
      filteredData[key] = newData[key].filter((e) => regex.test(e.name))
    }
    return filteredData
  } else {
    return newData
  }
})

// let baselineResources =
//   store.selectedData.baselineResources[type.value].distribution;
let baselineResources = computed(() => {
  const baselineResources = store.selectedData.baselineResources
  // 废弃，改为数据作为名字
  let idname = 'base'
  if (typeActive.value) {
    const filteredArray = baselineResources.filter(
      (item) => item.id && item.id === typeActive.value,
    )

    return [filteredArray[0].distribution, idname]
  } else {
    if (baselineResources.length == 0) {
      return []
    }
    typeActive.value = baselineResources[0].id
    return [baselineResources[0]?.distribution, idname]
  }
})
let newResources = computed(() => {
  const newResources = store.selectedData.newResources
  let idname = 'new'

  if (typeActive.value) {
    let datas = newResources.filter(
      (item) => item.id && item.id === typeActive.value,
    )
    // console.log(datas);
    return [datas[0].distribution, idname]
  } else {
    if (newResources.length == 0) {
      return []
    }

    return [newResources[0]?.distribution, idname]
  }
})

let resourcesOption = computed(() => {
  return {
    toolbox: {
      feature: {
        dataView: { show: true, readOnly: false },
        saveAsImage: { show: true },
      },
    },
    dataZoom: [
      {
        type: 'slider',
        filterMode: 'none',
        // minSpan: 10,
        // xAxisIndex: [0],
      },
      {
        type: 'slider',
        filterMode: 'none',
        // yAxisIndex: [0],
      },
      {
        type: 'inside',
        filterMode: 'none',
        // minSpan: 10,
        // xAxisIndex: [0],
      },
      {
        type: 'inside',
        filterMode: 'none',
        // yAxisIndex: [0],
      },
    ],
    tooltip: {
      trigger: 'axis',
      // formatter: '{a0}{c0}<br/>{a0}{c1}',
      // valueFormatter:(value)=>{console.log('form',value);},
      axisPointer: {
        type: 'cross', // 设置坐标轴指示器的样式为十字准星
      },
    },
    animation: false,
    legend: {
      data: ['baseline', 'new'],
    },
    xAxis: {
      name: 'date',
      type: 'time',

      axisLabel: {
        formatter: '{yyyy}-{MM}-{dd}', // 得到的 label 形如：'2020-12-02'
        // formatter: function (value, index) {
        //   console.log(value);
        //   // 格式化成月/日，只在第一个刻度显示年份
        //   const customFormattedTime = convertUTCToCustom(value);
        //   return customFormattedTime;
        // },
      },
    },
    yAxis: {
      name: 'units / day',
    },

    series: [
      {
        name: 'baseline',
        type: 'bar',
        data: toArray(baselineResources.value),
        large: true,
        selectedMode: 'single',
        select: {
          itemStyle: {
            color: 'red',
            borderWidth: '5px',
          },
        },
        emphasis: {
          focus: 'self',
          blurScope: 'coordinateSystem',
        },
      },
      {
        name: 'new',
        type: 'bar',
        data: toArray(newResources.value),
        large: true,
        selectedMode: 'single',
        select: {
          itemStyle: {
            color: 'red',
            borderWidth: '5px',
          },
        },
        emphasis: {
          focus: 'series',
          blurScope: 'coordinateSystem',
        },
      },
    ],
  }
})
function renderChart() {
  resourcesChart.setOption(resourcesOption.value)
}
watch(type, () => {
  renderChart()
})

async function nextReport() {
  router.push({ name: 'OptimizedReport' })
  store.active = 3
}
let typeActive = ref('')
function back() {
  router.push({ name: 'BaselineSummary' })
  store.active = 1
}
function chooseType(name) {
  typeActive.value = name
}
watch(typeActive, () => {
  renderChart()
})
</script>

<style lang="scss" scoped>
.right-items {
  display: flex;
  justify-content: space-evenly;
  align-content: space-around;
  flex-wrap: wrap;
  height: 50%;
  width: 100%;
  .t-content {
    display: flex;
    justify-content: center;
    align-items: center;
    .f {
      color: #545454;
      font-weight: 700;
      font-size: 32px;
    }
  }
  .b-content {
    border-top: 1px solid #f0f1f3;
    padding: 0px 16px;
  }
  .bottom {
    color: #b5b5b5;
    // text-align: center;
    > span {
      font-weight: 700;
      font-size: 20px;
    }
  }
  .title {
    width: 100%;
    height: 15%;
    color: #b5b5b5;
    padding: 8px 16px;
  }
  .content {
    display: flex;

    flex-wrap: wrap;
    width: 100%;
    height: 80%;
    > div {
      width: 100%;
      height: 50%;
      display: flex;
      flex-wrap: wrap;
      > div {
        // background-color: #40a795;
        width: 50%;
        height: 100%;
        text-align: center;
      }
    }
  }
  .right-item {
    box-shadow: 1px 1px 20px rgba(205.06, 205.06, 205.06, 0.25);
    margin: 4px;
    box-sizing: border-box;
    background-color: #fff;
    border-radius: 16px;
    width: 48%;
    height: 49%;
    display: flex;
    flex-wrap: wrap;
  }
}
.types {
  display: flex;
  width: 1100px;
  flex-wrap: wrap;
  overflow-y: auto;
  min-width: 100px;
  max-height: 300px;
  .type {
    margin-bottom: 20px;
  }
}
.activeType {
  color: #fff;
  background-color: #40a795;
}
.b11111 {
  width: 1150px;
  height: 610px;
  background-color: #40aa97;
}
.contain {
  background-color: rgb(240, 241, 243);
  height: 100%;
}
.box {
  margin: 0 auto;
  width: 1200px;
}
h2 {
  width: 1200px;
  height: 30px;
  margin: 20px 0 20px 0;
  font-size: 24px;
  font-weight: 700;
  line-height: 30px;
  letter-spacing: -0.5px;
  display: flex;
  color: #545454;
  .sp {
    color: rgba(130, 181, 199, 0.9);
    margin-left: 10px;
  }
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
.maintop {
  // border-radius: 16px;
  // width: 1200px;
  // height: 180px;
  margin-bottom: 24px;
  // padding-bottom: 30px;
  // border-radius: 15px;
  display: flex;
  justify-content: space-between;
  // background-color: #fff;
  .item {
    width: 290px;
    height: 148px;
    padding: 20px;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    .title {
      font-size: 14px;
    }
    .center {
      font-size: 40px;

      .changed {
        color: rgb(0, 0, 0);
      }
      .base {
        color: rgb(136, 136, 136);
      }
    }
    .bottom {
      background: rgb(226, 245, 226);
      color: rgb(73, 146, 73);
      border-radius: 8px;
      font-size: 12px;
    }
  }
}
.mainEchar1 {
  width: 1200px;
  border-radius: 16px;
  height: 750px;
  margin-bottom: 20px;
  background-color: #545454;
  padding: 20px;
  border-radius: 15px;
  background-color: #fff;
  .Echar1top {
    display: flex;
    justify-content: space-between;
    width: 100%;
    font-size: 22px;
    font-weight: 700;
    .btn {
      color: #40aa97;
      border: 0;
      background: #eaf5f3;
      height: 44px;
      width: 136px;
      box-shadow: 1px 2px 2px rgba(207, 234, 229, 0.25);
    }
  }
  span {
    color: #b5b5b5;
    font-size: 16px;
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
.mainEchar2 {
  width: 1200px;
  border-radius: 16px;
  min-height: 800px;
  margin-bottom: 20px;
  border-radius: 15px;
  background-color: #fff;
  padding: 20px;
  .Echar2top {
    display: flex;
    justify-content: space-between;
    width: 100%;
    font-size: 22px;
    font-weight: 700;
    .btn {
      color: #40aa97;
      border: 0;
      background: #eaf5f3;
      height: 44px;
      width: 136px;
      box-shadow: 1px 2px 2px rgba(207, 234, 229, 0.25);
    }
  }
  span {
    color: #b5b5b5;
    font-size: 16px;
  }

  .Echar2choose {
    width: 1160px;
    height: 40px;
    display: flex;
    margin-top: 15px;
    height: 36px;

    .item1 {
      width: 154px;
      margin-right: 7px;
      border-radius: 8px;
      border: 2px solid;
      padding: 0 10px 0 10px;
      .check1 {
        line-height: 36px;
      }
    }
    .item2 {
      width: 154px;
      margin-right: 7px;
      border-radius: 8px;
      border: 2px solid #dadada;
    }
    .item3 {
      width: 300px;
      border-radius: 8px;
      border: 2px solid #dadada;
      .item3sel {
        width: 296px;
      }
    }
  }
  .Echar2foot {
    display: flex;
    flex-wrap: wrap;
    .choose {
      width: 162px;
      height: 20px;
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
}
.button {
  width: 1200px;
  height: 44px;
  display: flex;
  justify-content: space-between;

  .btnback {
    text-align: center;
    width: 98px;
    height: 44px;
    padding: 10px 20px;
    background: #fff;
    box-shadow: 1px 2px 2px #cfeae5;
    border-radius: 8px;
    color: #40aa97;
    font-weight: bold;
    font-size: 1rem;
    text-align: center;
  }
  .btngo {
    height: 44px;
    padding: 10px 20px;
    background: #40aa97;
    box-shadow: 1px 2px 2px #cfeae5;
    border-radius: 8px;
    color: #fff;
    line-height: 44px;
    font-size: 1rem;
  }
}
.resources-title {
  padding: 10px;
  font-weight: 600;
}
.type {
  padding-left: 5px;
}
</style>
