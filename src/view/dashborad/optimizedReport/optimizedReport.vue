<template>
  <div class="optimize-content">
    <!-- 头部 -->
    <div class="content-row">
      <h2>
        {{ $t('optimizedReport.title[0]') }}&nbsp;
        <span
          style="text-transform: capitalize; color: rgba(130, 181, 199, 0.9)"
        >
          {{ store.SummaryData.group.replace('_', ' ') }}
        </span>
        <div class="chip primary">
          <small>
            {{ store.setting.Steps }} {{ $t('optimizedReport.title[1]') }}
          </small>
        </div>
        <div class="chip primary">
          <small>
            {{
              `${store.setting.Ratio[0] * 100}% - ${
                store.setting.Ratio[1] * 100
              }% ${$t('optimizedReport.title[2]')}`
            }}
          </small>
        </div>
      </h2>
      <v-btn @click="verifyVip" class="row-btn">
        {{ $t('optimizedReport.btn[1]') }}
      </v-btn>
    </div>
    <div class="content-box">
      <h3>Online Excel</h3>
      <div class="sheet">
        <Lucksheettable :url="excelUrl"></Lucksheettable>
      </div>
      <!-- <div class="md" ref="mDom"></div> -->
    </div>

    <!-- 内容区 -->
    <div class="content-box">
      <!-- Changed Tasks -->
      <div class="sub-content">
        <div class="content-row">
          <h3>{{ $t('optimizedReport.tableName[0]') }}</h3>
        </div>
        <div class="legend">
          <div
            style="
              display: flex;
              justify-content: flex-start;
              align-items: center;
              margin-right: 10px;
            "
          >
            <div class="circle critical"></div>
            Critical
          </div>
          <div
            style="
              display: flex;
              justify-content: flex-start;
              align-items: center;
            "
          >
            <div class="circle"></div>
            Non-Critical
          </div>
        </div>
        <!-- 表格 -->
        <div class="table">
          <Table :tableOptions="tableOptions"></Table>
        </div>
      </div>
      <!-- All Resources -->
      <div class="sub-content">
        <div class="content-row">
          <h3>{{ $t('optimizedReport.tableName[1]') }}</h3>
        </div>
        <!-- 表格 -->
        <div class="table">
          <Table :tableOptions="tableOptions2"></Table>
        </div>
      </div>
      <!-- Task-Resources -->
      <div class="sub-content">
        <div class="content-row">
          <h3>{{ $t('optimizedReport.tableName[2]') }}</h3>
        </div>
        <!-- 表格 -->
        <div class="table">
          <Table :tableOptions="tableOptions3"></Table>
        </div>
      </div>

      <!-- 11 
      <div class="sub-content">
        <div class="content-row">
          <h3>{{ $t('optimizedReport.tableName[2]') }}</h3>
        </div>
        
        <div class="table">
          <Table :tableOptions="tableOptions4"></Table>
        </div>
      </div> 
    --></div>

    <!-- 尾部 -->
    <div class="content-row">
      <v-btn @click="back" class="back">
        {{ $t('optimizedReport.btn[0]') }}
      </v-btn>
      <v-btn
        @click="
          () => {
            dialog = true
          }
        "
        class="report"
      >
        {{ $t('optimizedReport.btn[1]') }}
      </v-btn>
    </div>
    <!-- exportReport -->
    <!-- 弹出确认框 -->
    <v-dialog v-model="dialog" width="auto">
      <v-card style="border-radius: 50px; width: 400px">
        <v-card-text style="text-align: center">
          Export Optimized File
        </v-card-text>
        <v-card-actions style="justify-content: center">
          <v-btn
            color="rgb(64, 170, 151)"
            @click="
              () => {
                exportProjectReport()
              }
            "
          >
            Original Format
          </v-btn>
          <v-btn
            color="rgb(64, 170, 151)"
            @click="
              () => {
                exportExcel()
              }
            "
          >
            EXCEL
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
  <Login @close="closeDialogVisible" :dialogVisible="dialogVisible" />
</template>

<script setup>
import Table from '@/view/dashborad/optimizedReport/Table.vue'
import Echarts from './Echarts.vue'
import Login from '@/components/loginbox/index.vue'
import {
  ref,
  reactive,
  computed,
  onUnmounted,
  onActivated,
  onMounted,
} from 'vue'
import { toRaw } from '@vue/reactivity'
import { data } from '@/utils/constants' //数据要删
import { useCounterStore } from '@/store'
import { onBeforeRouteLeave, onBeforeRouteUpdate } from 'vue-router'
import { useRouter } from 'vue-router'
import api from '@/api/index.js'
import Lucksheettable from './Lucksheettable.vue'

/* -------------------------------------------------------------------------- */
import Vditor from 'vditor'
let dialogVisible = ref(false)
function closeDialogVisible() {
  dialogVisible.value = false
}
let inviteVisible = ref(false)
function closeinviteVisible() {
  inviteVisible.value = false
}
const store = useCounterStore()
function openSheet() {
  // console.log('open', dialogTableVisible.value)
  // dialogTableVisible.value=false;
  dialogTableVisible.value = true
}
function closeSheet() {
  dialogTableVisible.value = false
}
// let mDom = ref();
function generateMarkdown(tasks) {
  let str = ''
  for (const key in tasks) {
    const task = tasks[key]
    str += `- Task named "${task['Task Name']}" with task code "${task['Task Code']}" is associated with the resource named "<span style="color: red;">${task['Resource Name']}</span>", with a total planned allocation of "${task['Total Planned Units']}" units. Before optimization, the task had a duration of "${task['Duration(Old)']}" hours with an allocation rate of "${task['Units(Old)']}" unit per hour. After optimization, the task's duration was reduced to "${task['Duration(New)']}" hours, and the allocation rate increased to "${task['Units(New)']}" units per hour.This task is marked as critical. \n\n`
  }
  return str
}

function initMd(dom) {
  Vditor.preview(dom, generateMarkdown(TaskResource.value))
  // let instance;

  // instance = new Vditor(dom, {
  //   cache: {
  //     enable: false,
  //   },
  //   toolbarConfig: {
  //     hide: true,
  //   },
  //   after: () => {
  //     // 获取实例的值
  //     // console.log(TaskResource.value);
  //     instance.setValue();
  //   },
  // });
}

/* -------------------------------------------------------------------------- */
onUnmounted(() => {
  // console.log('销毁');
})
onMounted(() => {
  getexcelUrl()
  // initMd(mDom.value);
  // console.log('缓存');
})
let dialog = ref(false)
function verifyVip() {
  if (store.loginStatus === true) {
    dialog.value = true
  } else {
    dialogVisible.value = false
    // console.log(dialogVisible.value);
    ElMessage({
      showClose: true,
      message: 'Restricted to logged-in users only.',
      type: 'error',
    })
    dialogVisible.value = true
  }
}
const router = useRouter()

function exportProjectReport() {
  // console.log(store.SummaryData.group);
  if (store.SummaryData.group == 'baseline') {
    console.log('触发')
    store.SummaryData.group = 'Balanced'
  }
  let Url = `${store.SummaryData.group}-${
    store.file.name.split('.')[0]
  }_FrontlineExport.${store.file.name.split('.')[1]}`
  api.getProjectReport(Url, store.truefile)
}
let excelUrl = ref({})
async function getexcelUrl() {
  if (store.SummaryData.group == 'baseline') {
    store.SummaryData.group = 'Balanced'
  }
  let Url = `${store.SummaryData.group}-${
    store.file.name.split('.')[0]
  }_FrontlineExport.${store.file.name.split('.')[1]}`
  excelUrl.value = await api.getUrl(Url, store.truefile)
  console.log(excelUrl.value)
}

// console.log(excelUrl.value);
function exportExcel() {
  if (store.SummaryData.group == 'baseline') {
    store.SummaryData.group = 'Balanced'
  }
  let Url = `${store.SummaryData.group}-${
    store.file.name.split('.')[0]
  }_FrontlineExport.${store.file.name.split('.')[1]}`
  api.getExcelReport(Url, store.truefile)
}
function back() {
  router.push({ name: 'optimizedSummary' })
  store.active = 2
}
onBeforeRouteLeave((to, from) => {
  if (to.name == 'InputData') {
    // clear();
  }
})

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
// 保留一位小数
function returnFloatOneDecimal(value) {
  if (!value) {
    return '0.0'
  }
  var value = Math.round(parseFloat(value) * 10) / 10
  var xsd = value.toString().split('.')
  if (xsd.length == 1) {
    value = value.toString() + '.0'
    return value
  }
  return value
}

// 组件销毁时摧毁实例
function clear() {
  Object.keys(store.dataArray).forEach((key) => {
    store.dataArray[key].all = []
    store.dataArray[key].data = []
  })
  store.end.data = false
}

let changedTask = store.selectedData.tasks
  .filter((e) => e.durationRatio !== 1)
  .map((e) => {
    if (!e.critical) {
      e.critical = false
    } else {
      e.critical = true
    }
    return {
      Critical: e.critical,
      Code: e.ID,
      Name: e.name,
      'Duration(Baseline)': returnFloatOneDecimal(e.remainingDuration),
      'Duration(New)': returnFloatOneDecimal(e.newDuration),
      Ratio: returnFloat(e.durationRatio),
    }
  })
let allResources = store.selectedData.newResources
  // .filter((e) => {
  //   console.log(e);
  //   // 在这里添加过滤条件
  //   if (e.ID == '-65535') {
  //     console.log(e);
  //   }
  //   return e.ID != '-65535'
  // })
  .map((e) => {
    return {
      ID: e.id,
      Code: e.ID,
      Type: e.type,
      Name: e.name,
      'Distribution(Min)': returnFloatOneDecimal(e.distribution.min),
      'Distribution(Max)': returnFloat(e.distribution.max),
      Span: returnFloat(e.distribution.span),
    }
  })
let TaskResource = computed(() => {
  let TaskResources = store.selectedData.tasks.filter((e) => {
    let length = Object.keys(e.resources).length
    return length !== 0 // 返回 resources 不为空的任务对象
  })

  let TaskResourcesData = TaskResources.flatMap((e) => {
    let resources = Object.values(e.resources)
    let taskobj = store.selectedData.tasks.find((obj) => obj.id == e.id)
    // console.log(resources, taskobj)
    return resources.map((resource) => ({
      Critical: taskobj.critical,
      'Task Code': taskobj.ID,
      'Resource Name': store.selectedData.newResources.find(
        (obj) => obj.id == resource.resourceId,
      )?.name,
      'Task Name': taskobj.name,
      'Duration(Old)': returnFloatOneDecimal(taskobj.plannedDuration),
      'Duration(New)': returnFloatOneDecimal(taskobj.newDuration),
      'UnitsPerHour(Old)': returnFloat(resource.plannedUnitsPerHour),
      'UnitsPerHour(New)': returnFloat(Number(resource.newUnitsPerHour)),
      'Total Planned Units': returnFloat(
        taskobj.plannedDuration * resource.plannedUnitsPerHour,
      ),
    }))
  })

  return TaskResourcesData
})
//表格
const tableOptions = reactive({
  data: changedTask,
  colWidths: [100, 245, 250, 250, 250, 250],
  colHeaders: [
    'Critical',
    'Code',
    'Name',
    'Duration(Baseline)',
    'Duration(New)',
    'Ratio',
  ],
  tableName: 'one',
})
const tableOptions2 = reactive({
  data: allResources,
  colWidths: [100, 245, 250, 250, 250, 250, 250, 100],
  colHeaders: [
    'ID',
    'Code',
    'Type',
    'Name',
    'Distribution(Min)',
    'Distribution(Max)',
    'Span',
  ],
  tableName: 'two',
})
const tableOptions3 = reactive({
  data: TaskResource.value,
  colWidths: [100, 245, 250, 150, 150, 150, 150, 150, 150],
  colHeaders: [
    'Critical',
    'Task Code',
    'Resource Name',
    'Task Name',
    'Duration(Old)',
    'Duration(New)',
    'UnitsPerHour(Old)',
    'UnitsPerHour(New)',
    'Total Planned Units',
  ],
  tableName: 'three',
})
const tableOptions4 = reactive({
  data: TaskResource.value,
  colWidths: [100, 245, 250, 150, 150, 150, 150, 150, 150],
  colHeaders: [
    'Resource Name',
    'Estimated Quantity/Area (Unit)',
    'Estimated Unit Price (Unit)',
    'Estimated Total Cost (Unit)',
    'Actual Quantity/Area (Unit)',
    'Actual Unit Price (Unit)',
    'Actual Total Cost (Unit)',
  ],
  tableName: 'three',
})
</script>

<style lang="scss" scoped>
.sheet {
  height: 96vh;
}
.optimize-content {
  margin-top: 20px;
  width: 1400px;
  max-width: 100%;
  border-radius: 6px;
  .content-row {
    width: 100%;
    display: flex;
    -webkit-box-pack: justify;
    justify-content: space-between;
    -webkit-box-align: center;
    align-items: center;
    h2 {
      font-size: 24px;
      font-weight: 700;
      font-family: 'Inter', sans-serif;
      line-height: 30px;
      letter-spacing: -0.5px;
      display: flex;
      color: #545454;
      .chip {
        display: inline-flex;
        border-radius: 16px;
        padding: 0 12px;
        white-space: nowrap;
        font-weight: normal;
        background: #dadada;
        margin: 0 5px;
        small {
          font-size: 12px;
        }
      }
      .chip.primary {
        color: #ffffff;
        background: #40a795;
      }
    }
    .row-btn {
      color: #40aa97 !important;
      border: 0 !important;
      background: #eaf5f3 !important;
      box-shadow: 1px 2px 2px rgba(207, 234, 229, 0.25) !important;
      border-radius: 8px !important;
      min-width: 100px !important;
      width: auto !important;
      font-weight: bold !important;
      text-transform: uppercase !important;
      font-size: 1rem !important;
      font-family: 'Inter', sans-serif !important;

      letter-spacing: 0.02857em;
      padding: 10px 20px !important;
      &:hover {
        background: #eaf5f3 !important;
        box-shadow:
          1px 2px 2px rgba(207, 234, 229, 0.25),
          inset 1px 1px 5px #c2dad6 !important;
      }
    }
    .back {
      height: 40px;
      color: #40aa97 !important;
      border: 0 !important;
      background: #fff !important;
      border-radius: 8px !important;
      min-width: 100px !important;
      width: auto !important;
      box-shadow: 1px 2px 2px #cfeae5;
      font-weight: bold !important;
      text-transform: uppercase !important;
      font-size: 1rem !important;
      font-family: 'Inter', sans-serif !important;
      letter-spacing: 0.02857em;
      padding: 10px 20px !important;
      &:hover {
        background: #ffffff !important;
        box-shadow: inset 1px 1px 5px #e8e8e8 !important;
      }
    }
    .report {
      height: 40px;
      color: #fff !important;
      border: 0 !important;
      background: #40aa97 !important;
      box-shadow: 1px 2px 2px rgba(207, 234, 229, 0.25) !important;
      border-radius: 8px !important;
      min-width: 100px !important;
      width: auto !important;
      font-weight: bold !important;
      text-transform: uppercase !important;
      font-size: 1rem !important;
      font-family: 'Inter', sans-serif !important;
      letter-spacing: 0.02857em;
      padding: 10px 20px !important;
      &:hover {
        background: #258372 !important;
        box-shadow:
          1px 2px 2px #cfeae5,
          inset 2px 3px 5px rgba(0, 0, 0, 0.25) !important;
      }
    }
  }
  .content-box {
    width: 100%;
    .sub-content {
      background: #ffffff;
      margin-top: 20px;
      margin-bottom: 20px;
      padding: 20px;
      border-radius: 16px;
      .table {
        border: 1px solid rgba(224, 224, 224, 1);
        border-radius: 4px;
        color: rgba(0, 0, 0, 0.87);
        .pagin {
          height: 52px;
          display: flex;
          align-items: center;
          justify-content: flex-end;
        }
      }
    }
    .box-one {
      margin-top: 60px;
      width: 100%;
      display: flex;
      flex-wrap: wrap;
      align-items: flex-start;
      justify-content: space-between;
      margin-bottom: 20px;
      -webkit-box-pack: justify;
    }
    .box-two {
      width: 100%;
      display: flex;
      flex-wrap: wrap;
      align-items: flex-start;
      justify-content: space-between;
      margin-bottom: 20px;
      -webkit-box-pack: justify;
    }
    .content-row {
      width: 100%;
      display: flex;
      -webkit-box-pack: justify;
      justify-content: space-between;
      -webkit-box-align: center;
      align-items: center;
      margin-bottom: 20px;
      h2 {
        font-size: 24px;
        font-weight: 700;
        font-family: 'Inter', sans-serif;
        line-height: 30px;
        letter-spacing: -0.5px;
        display: flex;
        color: #545454;
      }
    }
    .row-btn {
      color: #40aa97 !important;
      border: 0 !important;
      background: #eaf5f3 !important;
      box-shadow: 1px 2px 2px rgba(207, 234, 229, 0.25) !important;
      border-radius: 8px !important;
      min-width: 100px !important;
      width: auto !important;
      font-weight: bold !important;
      text-transform: uppercase !important;
      font-size: 1rem !important;
      font-family: 'Inter', sans-serif !important;
      line-height: 1.75;
      letter-spacing: 0.02857em;
      padding: 10px 20px !important;
      &:hover {
        background: #eaf5f3 !important;
        box-shadow:
          1px 2px 2px rgba(207, 234, 229, 0.25),
          inset 1px 1px 5px #c2dad6 !important;
      }
    }
    .chart {
      margin-bottom: 20px;
      background: #ffffff;
      border-radius: 16px;
      padding: 20px;
      width: 46%;
      .chart-title {
        position: relative;
        text-align: center;
        display: flex;
        align-items: center;
        justify-content: space-between;
        .chart-text {
          width: 100%;
          text-align: left;
          font-size: 18px;
          font-family: 'Lato', sans-serif;
          line-height: 20px;
        }
      }

      .svg {
        width: 100%;
        height: 400px;
        overflow: hidden;
      }
    }
  }
}
.md {
  max-height: 500px !important;
  overflow-y: scroll;
  margin-bottom: 40px;
}
</style>
