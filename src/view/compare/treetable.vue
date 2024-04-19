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
      <!-- <p style="color: #ffa39e">
        Please do not upload a file with the same name
      </p> -->
      <el-divider />
      <div class="button">
        <div
          style="display: flex; justify-content: space-between; width: 650px"
        >
          <el-upload
            class="upload-demo"
            action=""
            :limit="1"
            :before-upload="uploadBase"
          >
            <template #trigger>
              <el-button style="width: 200px">Choose Base File</el-button>
            </template>
            <template #tip>
              <div class="upload-text">
                {{ baseProject }}
              </div>
            </template>
          </el-upload>
          <el-upload
            class="upload-demo"
            action=""
            :limit="1"
            :before-upload="uploadCompare"
          >
            <template #trigger>
              <el-button style="width: 200px">Choose Compare File</el-button>
            </template>
            <template #tip>
              <div class="upload-text">
                {{ compareProject }}
              </div>
            </template>
          </el-upload>

          <el-button
            :disabled="files.length == 2 ? false : true"
            style="width: 200px"
            @click="Uploads"
            :text="true"
            type="success"
          >
            <!-- <Compare /> -->
            Compare Projects
          </el-button>
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

          <el-button
            style="margin-right: 50px"
            @click="controlFilter = true"
            :icon="Filter"
          >
            Filter
          </el-button>

          <el-dropdown style="margin-right: 20px" split-button>
            <span class="el-dropdown-link">
              {{ searchType }}
            </span>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item @click="searchType = 'name'">
                  Name
                </el-dropdown-item>
                <el-dropdown-item @click="searchType = 'id'">
                  ID
                </el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
          <el-input
            v-model="searchData"
            style="width: 400px; height: 32px"
            placeholder="Please enter complete information"
          >
            <template #prefix>
              <el-icon class="el-input__icon"><search /></el-icon>
            </template>
          </el-input>
          <el-dropdown>
            <span
              class="el-dropdown-link"
              style="margin-top: 5px; margin-left: 20px"
            >
              <el-icon size="20"><Setting /></el-icon>
            </span>
            <template #dropdown>
              <el-dropdown-menu>
                <!-- ShowAllColumns
                <el-switch v-model="ShowAllColumns" size="small"></el-switch> -->
                <div
                  style="
                    display: flex;
                    width: 300px;
                    justify-content: space-between;
                    padding-left: 10px;
                    padding-right: 10px;
                    align-items: center;
                  "
                  v-for="(value, key) in columnDatas"
                >
                  <span style="width: 200px">
                    {{ columnMapping[value.name] }}
                  </span>
                  <el-switch
                    :key="key"
                    v-model="value.bol"
                    size="small"
                  ></el-switch>
                </div>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </div>
        <el-table-v2
          ref="tableRef"
          v-model:expanded-row-keys="expandedRowKeys"
          :columns="filteredColumns"
          :data="filterDatas"
          :width="700"
          :height="900"
          :row-height="25"
          :estimated-row-width="40"
          :row-event-handlers="eventClick"
          :scrollbar-always-on="true"
          :cache="0"
          fixed
          @rows-rendered="debounceGetRenderData"
          :row-class="rowClass"
          expand-column-key="wbsId"
          :default-expanded-row-keys="wbsIdArray"
          @expanded-rows-change="onExpandedRowsChange"
        >
          <template #cell-critical="{ cellData }">
            <div v-html="cellData"></div>
          </template>
          <template #row="props">
            <Row v-bind="props" />
          </template>
        </el-table-v2>
      </div>
      <div class="gantta-content">
        <TimeX
          class="time"
          :startTime="timexstart"
          :endTime="timexend"
          :chosenDate="chosenDate"
        />
        <div ref="GanttEcharts" id="GanttEcharts"></div>
      </div>
    </div>
  </div>
  <el-dialog v-model="controlFilter" title="Filter by" width="800">
    <el-tabs v-model="activeName" class="demo-tabs">
      <el-tab-pane label="Activity Status" name="Activity Status">
        <div>Start Time</div>
        <el-checkbox v-model="isAheadschedule" label="Ahead of Schedule" />
        <el-checkbox v-model="isOnschedule" label="On Schedule" />
        <el-checkbox v-model="isBehindschedule" label="Behind Schedule" />
        <div>Duration</div>
        <el-checkbox v-model="isEarly" label="Early" />
        <el-checkbox v-model="isOntime" label="On Time" />
        <el-checkbox v-model="isDelayed" label="Delayed " />
        <div>Status</div>
        <el-checkbox v-model="isActive" label="Active Tasks" />
        <el-checkbox v-model="isCompleted" label="Completed Tasks" />
        <el-checkbox v-model="isNotStart" label="NotStart Tasks" />
        <div>Compare Task</div>
        <el-checkbox v-model="isAddTask" label="Additional Tasks" />
        <el-checkbox v-model="isRemoveTask" label="Deleted Tasks" />
        <el-checkbox v-model="isSameTask" label="Same Tasks" />
        <div>Other</div>
        <el-checkbox v-model="isCritical" label="Critical Tasks" />
        <el-checkbox v-model="isNocritical" label="Non-Critical Tasks" />
      </el-tab-pane>
      <!-- <el-tab-pane label="Resources" name="Resources"></el-tab-pane> -->
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
import {
  computed,
  ref,
  reactive,
  onMounted,
  watch,
  cloneVNode,
  toRefs,
  h,
} from 'vue'
import {
  ElButton,
  ElCheckbox,
  ElIcon,
  ElPopover,
  TableV2FixedDir,
  ElMessage,
  ElInput,
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
import AInput from './Ainput.vue'
const GanttEcharts = ref(null)
const chosenDate = ref('Week')
const searchData = ref()
const searchType = ref('name')
let datas = ref()
const tableRef = ref()
let ganttChart
const startTimeStamp = ref(null)
const endTimeStamp = ref(null)
const props = defineProps({
  newData: Object,
  baseData: Object,
})
let activeName = ref('Activity Status')
let controlFilter = ref(false)
/* -------------------------------------------------------------------------- */
let ShowAllColumns = ref(true)
// 监听 showAllColumns 的变化
watch(ShowAllColumns, (newValue, oldValue) => {
  if (newValue) {
    columnDatas.value.map((e) => {
      e.bol = true
      return e
    })
  } else {
    columnDatas.value.map((e) => {
      e.bol = false
      return e
    })
  }
})
let columnDatas = ref([
  { name: 'wbsId', bol: true },
  { name: 'ID', bol: true },
  { name: 'name', bol: true },
  { name: 'status', bol: true },
  { name: 'critical', bol: true },
  { name: 'plannedDuration', bol: true },
  { name: 'remainingDuration', bol: true },
  { name: 'newDuration', bol: true },
  { name: 'actualDuration', bol: true },
  { name: 'actualStart', bol: true },
  { name: 'actualFinish', bol: true },
  { name: 'plannedStart', bol: true },
  { name: 'plannedFinish', bol: true },
  { name: 'newStart', bol: true },
  { name: 'newFinish', bol: true },
  { name: 'resources', bol: true },
  { name: 'type', bol: false },
  { name: 'ignore', bol: false },
  { name: 'durationRatio', bol: false },
  { name: 'taskOwner', bol: false },
  { name: 'taskStatus', bol: false },
  { name: 'calendarId', bol: false },
  { name: 'order', bol: false },

  { name: 'extra', bol: false },
])
const columnMapping = {
  ID: 'ActiveID',
  name: 'ActiveName',
  type: 'Type',
  calendarId: 'Calendar ID',
  order: 'Order',
  wbsId: 'WBS ID',
  extra: 'Extra',
  resources: 'Resources',
  plannedDuration: 'Planned Duration',
  remainingDuration: 'Remaining Duration',
  actualStart: 'Actual Start',
  actualFinish: 'Actual Finish',
  plannedStart: 'Planned Start',
  plannedFinish: 'Planned Finish',
  newStart: 'New Start',
  newFinish: 'New Finish',
  newDuration: 'New Duration',
  actualDuration: 'Actual Duration',
  status: 'Status',
  ignore: 'Ignore',
  critical: 'Critical',
  durationRatio: 'Duration Ratio',
  taskOwner: 'Task Owner',
  taskStatus: 'Task Status',
}

/* -------------------------------------------------------------------------- */
/* -------------------------------------------------------------------------- */

let isEarly = ref(true)
let isOntime = ref(true)
let isDelayed = ref(true)

let isAheadschedule = ref(true)
let isOnschedule = ref(true)
let isBehindschedule = ref(true)

let isActive = ref(true)
let isCompleted = ref(true)
let isNotStart = ref(true)

let isCritical = ref(true)
let isNocritical = ref(true)

let isAddTask = ref(true)
let isRemoveTask = ref(true)
let isSameTask = ref(true)

let filterType = ref({
  ID: '',
  name: '',
  status: '',
  critical: '',
  plannedDuration: '',
  remainingDuration: '',
  newDuration: '',
  actualDuration: '',
  actualStart: '',
  actualFinish: '',
  plannedStart: '',
  plannedFinish: '',
  newStart: '',
  newFinish: '',
  resources: '',
  type: '',
  ignore: '',
  durationRatio: '',
  taskOwner: '',
  taskStatus: '',
  calendarId: '',
  order: '',
  wbsId: '',
  extra: '',
})

let filterData = ref('default')
// 在你的代码中定义 getFilterData 函数
function getFilterData(newValue, title) {
  filterData.value = newValue
  filterType.value[title] = filterData.value
  datasFilter()
}

/* -------------------------------------------------------------------------- */
watch(
  searchData,
  (newVal, oldVal) => {
    if (filterDatas.value) {
      let searchIndex = filterDatas.value.findIndex((item) => {
        return item[searchType.value] === newVal
      })
      searchIndex = searchIndex === -1 ? 0 : searchIndex
      tableRef.value?.scrollToRow(searchIndex, 'start')
    }
  },
  { deep: true },
)
/* -------------------------------------------------------------------------- */

let lastDependencies = {} // 存储上一次的依赖值

let filterDatas = computed(() => {
  let _file
  if (!fileData.value || fileData.value.length === 0) {
    return []
  }

  let currentDependencies = {
    statusConditions: {
      Delayed: isBehindschedule.value,
      Ahead: isAheadschedule.value,
      'On Schedule': isOnschedule.value,
      default: 'true',
    },
    durationConditions: {
      Early: isEarly.value,
      Ontime: isOntime.value,
      Delayed: isDelayed.value,
      defaultAdd: 'true',
      defaultRemove: 'true',
    },
    compareStatusConditions: {
      TK_Active: isActive.value,
      TK_Complete: isCompleted.value,
      TK_NotStart: isNotStart.value,
    },
    compareCriticalConditions: {
      true: isCritical.value,
      null: isNocritical.value,
    },
    addorRemove: {
      add: isAddTask.value,
      remove: isRemoveTask.value,
      same: isSameTask.value,
    },
  }

  // 检查当前依赖值是否与上一次相同，如果相同则返回上一次的结果
  // if (
  //   JSON.stringify(lastDependencies) === JSON.stringify(currentDependencies)
  // ) {
  //   return _file
  // }
  lastDependencies = currentDependencies // 更新上一次的依赖值
  _file = fileData.value[3].filter((e) => {
    return (
      currentDependencies.statusConditions[e.taskStatus] &&
      currentDependencies.durationConditions[e.durationStatus] &&
      currentDependencies.compareStatusConditions[e.compareStatus] &&
      currentDependencies.compareCriticalConditions[e.compareCritical] &&
      currentDependencies.addorRemove[e.addorRemove]
    )
  })

  if (filterData.value !== 'default') {
    _file = _file.filter((e) => {
      for (let key in filterType.value) {
        const filterValue = filterType.value[key]
        if (filterValue !== null && e[key] !== filterValue) {
          return false // 提前返回，如果有属性不匹配条件，则立即返回 false
        }
      }
      return true // 如果所有属性都匹配条件，则返回 true
    })
  }
  _file = convertToTreeFormat(_file)
  return _file
})

function datasFilter() {
  controlFilter.value = false
  if (datas.value) {
    datas.value = flatToArr(filterDatas.value).slice(0, 34)
    datas.value.map((e, idx) => {
      e.calculatedIdx = datas.value.length - idx
      return e
    })
    ganttChart.setOption(getOption(ganttData()))
  }
}
// 定义 move 函数
let move = (e) => {
  let index = datas.value.findIndex((e2) => e2.ID == e.rowData.ID)
  if (index == 0) {
    index = 0
  } else {
    index = 25 * index
  }
  ganttChart.setOption({
    graphic: {
      elements: [
        {
          type: 'rect',
          left: 0,
          top: 40 + index,
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
}
// 甘特图
const eventClick = {
  onMousemove(e) {
    debounce(() => move(e), 100)()

    // ganttChart.dispatchAction({
    //   type: 'highlight',
    //   dataIndex: index,
    //   // name: e.rowData.name,
    // })
  },
}

onMounted(() => {
  // initCharts()
})
const timeSpans = {
  Day: 7 * 24 * 3600 * 1000,
  Week: 30 * 24 * 3600 * 1000,
  Month: 90 * 24 * 3600 * 1000,
  Year: 365 * 24 * 3600 * 1000,
}
let timeSpan = timeSpans['Week']
watch(chosenDate, (newValue, oldValue) => {
  timeSpan = timeSpans[newValue] || 0

  ganttChart.setOption(getOption(ganttData()))
})

let timeX
let markLineData
let startDate
let endDate
let uploadData
let files = ref([])
let baseProject = ref()
let compareProject = ref()

let fileData = ref([])
let uploadBase = (file) => {
  if (file.type !== 'application/xer' && file.type !== 'text/xml') {
    ElMessage.error('Please upload xer or xml file!')
    return false
  }
  files.value[0] = file
  baseProject.value = file.name
  return false
}
let uploadCompare = (file) => {
  if (file.type !== 'application/xer' && file.type !== 'text/xml') {
    ElMessage.error('Please upload xer or xml file!')
    return false
  }
  files.value[1] = file
  compareProject.value = file.name
  return false
}
let wbs = ref([])
let dataDate = ref([])
async function Uploads() {
  if (files.value.length == 2) {
    fileData.value = []
    wbs.value = []
    let stateName
    if (files.value[0].name == files.value[1].name) {
      stateName = 'new' + files.value[1].name
    } else {
      stateName = files.value[1].name
    }
    files.value = files.value.map((file, index) => {
      const originalFileName = index === 1 ? stateName : file.name // 保存原始文件名

      const sanitizedFileName = sanitizeFileName(originalFileName) // 使用 sanitizeFileName 处理文件名
      const modifiedFile = new File([file], sanitizedFileName, {
        type: file.type,
      }) // 创建新的文件对象，修改文件名
      return modifiedFile
    })
    let a = await api.sendFile(files.value, 'task') // 使用修改后的文件对象进行上传

    // dataDate

    for (let attrName in a.data) {
      let attrValue = a.data[attrName]
      if (attrValue.dataDate) {
        dataDate.value.push(attrValue.dataDate)
      }
      fileData.value.push(attrValue)
    }
    wbs.value.push(
      mergeObjects(fileData.value[1].wbsName, fileData.value[2].wbsName),
    )
    wbs.value.push(
      mergeObjects(fileData.value[1].wbsNameArr, fileData.value[2].wbsNameArr),
    )
    wbsIdArray.value = Object.keys(wbs.value[0])
    expandedRowKeys.value = wbsIdArray.value
    let fileDatas = alternateInsert(
      fileData.value[1].tasks,
      fileData.value[2].tasks,
    )

    fileDatas = fileDatas.map((e) => {
      let resource = []
      for (const key in e.resources) {
        e.resources[key].parentId = e.resources[key].taskId
        resource.push(e.resources[key])
      }

      e.resources = concatenateResources(resource)
      return e
    })

    fileData.value.push(fileDatas)
    initCharts()
  }
  return false
}
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

let timexstart = ref()
let timexend = ref()
function initCharts() {
  // if (
  //   !compareFirstProperty(fileData.value[1].wbsName, fileData.value[2].wbsName)
  // ) {
  //   return
  // }
  fileData.value[3] = fileData.value[3].map((e) => {
    if (e && e.type) {
      e.type = e.type.replace('TT_', '')
    }
    if (e && e.status) {
      e.status = e.status.replace('TK_', '')
    }
    return e
  })

  datas.value = flatToArr(filterDatas.value).slice(
    dataStart.value,
    dataEnd.value,
  )
  /* -------------------------------------------------------------------------- */
  datas.value.map((e, idx) => {
    e.calculatedIdx = datas.value.length - idx
    return e
  })
  timexstart.value = startTimeStamp.value
  timexend.value = startTimeStamp.value + timeSpan
  // startDate = new Date(startTimeStamp.value)
  // endDate = new Date(startDate)
  // endDate.setMonth(startDate.getMonth() + 3)
  /* -------------------------------------------------------------------------- */
  /* -------------------------------------------------------------------------- */
  if (ganttChart) {
    ganttChart.setOption(getOption(ganttData()))
  } else {
    ganttChart = echarts.init(GanttEcharts.value, 'purple-passion', {
      width: 1200,
      height: 890,
    })

    ganttChart.setOption(getOption(ganttData()))
    ganttChart.on('dataZoom', function (params, a, b) {
      let op = ganttChart.getOption()
      timexstart.value = op.dataZoom[0].startValue
      timexend.value = op.dataZoom[0].endValue
    })
  }
}
let dataStart = ref(0)
let dataEnd = ref(34)
function getRenderData(data) {
  if (!ganttChart) {
    return
  }
  dataStart.value = data.rowCacheStart + 1
  dataEnd.value = data.rowCacheEnd
  datas.value = flatToArr(filterDatas.value).slice(
    dataStart.value, // 如果 data.rowCacheStart 是 0，则切片开始位置为 0，否则为 data.rowCacheStart
    dataEnd.value, // 切片结束位置为 data.rowCacheStart + 25
  )
  datas.value.map((e, idx) => {
    e.calculatedIdx = datas.value.length - idx
    return e
  })
  ganttChart.setOption(getOption(ganttData()))
}
const debounceGetRenderData = debounce(getRenderData, 0) // 使用防抖函数，300 毫秒

let wbsIdArray = ref()
// const onRowExpanded = (e) => {
//   console.log(e.rowdata.wbsId)
// }
const expandedRowKeys = ref([])

const onExpandedRowsChange = (expandedKeys) => {
  expandedRowKeys.value = expandedKeys // 更新 expandedRowKeys

  // datas.value
  // let _a = flattenFilterTreeData(filterDatas.value, expandedKeys)
  // console.log(_a)
  // datas.value = _a

  // datas.value = flatToArr(filterDatas.value).slice(
  //   dataStart.value,
  //   dataEnd.value,
  // )
  ganttChart.setOption(getOption(ganttData()))
}

const Row = ({ rowData, rowIndex, cells, columns }) => {
  let rowSpanIndex
  columns.map((e, index) => {
    if (e.rowSpan) {
      const rowSpan = e.rowSpan(rowIndex)
      if (rowSpan > 1) {
        const cell = cells[index]
        const style = {
          ...cell.props.style,
          backgroundColor: '#ffffff',
          height: `${rowSpan * 35 - 1}px`,
          display: 'flex',
          justifyContent: 'flex-start', // 水平居中
          alignItems: 'center', // 垂直居中
          marginTop: '24px',
          zIndex: 1,
        }
        cells[index] = cloneVNode(cell, { style })
      }
    }
  })

  return cells
}

let headerFunctions = (props) => {
  return h('div', {}, [
    props.column.title,
    h(AInput, {
      value: filterData.value,
      'onUpdate:value': (data) => {
        getFilterData(data, props.column.key) // 将标题作为参数传递给 getFilterData
      },
    }),
  ])
}

const rowClass = (data) => {
  if (data.rowData.children.length > 0) {
    return 'bg-wbs'
  } else if (data.rowData.addorRemove == 'add') {
    return 'bg-add'
  } else if (data.rowData.addorRemove == 'remove') {
    return 'bg-remove'
  } else if (data.rowData.taskOwner == 'first') {
    return 'bg-base'
  } else if (data.rowData.taskOwner == 'second') {
    return 'bg-compare'
  } else {
    return ''
  }
  // if (rowIndex % 2 === 0) {
  //   return 'bg-blue-200'
  // } else if (rowIndex % 1 === 0) {
  //   return 'bg-red-100'
  // }
  return ''
}
let filteredColumns = computed(() => {
  const columnConfigs = {
    name: { width: 200 },
    plannedStart: { width: 150, renderer: dateRenderer },
    plannedFinish: { width: 150, renderer: dateRenderer },
    newStart: { width: 150, renderer: dateRenderer },
    newFinish: { width: 150, renderer: dateRenderer },
    actualStart: { width: 150, renderer: dateRenderer },
    actualFinish: { width: 150, renderer: dateRenderer },
    critical: { width: 120, renderer: criticalRenderer },
    wbsId: { width: 300, renderer: wbsRenderer },
    // Add more column configurations as needed
  }

  return columnDatas.value
    .filter((item) => item.bol)
    .map((item) => {
      const config = columnConfigs[item.name] || {
        width: 150,
        renderer: defaultRenderer,
      }
      return {
        dataKey: item.name,
        key: item.name,
        title: columnMapping[item.name],
        width: config.width,
        cellRenderer: config.renderer,
        headerCellRenderer: headerFunctions,
      }
    })
})

// Renderer functions
function dateRenderer(cellData) {
  if (cellData.cellData) {
    return utcTime(cellData.cellData)
      .replace('T', ' ')
      .replace('Z', '')
      .slice(0, 16)
  }
}

function criticalRenderer(cellData) {
  return h(ElButton, {
    type: cellData.cellData === true ? 'danger' : 'info',
    circle: true,
    size: 'small',
    class: 'sizeButton',
  })
}

function wbsRenderer(cellData) {
  if (cellData.rowData.type != 'wbs') {
    return ''
  }
  if (cellData.cellData) {
    return h(
      'span',
      {
        class: 'wbsClass',
      },
      wbs.value[0][cellData.cellData],
    )
  }
}

function defaultRenderer(cellData) {
  return cellData.cellData
}

const pathSymbols = {
  Ahead: 'path://M0,0 L90,20 L10,20  L100,0  L100,50 L80,30 L20,30 L0,50 Z',
  delayed: 'path://M0,0 L100,0 L100,50 L80,30 L20,30 L0,50 Z',
}
/* -------------------------------------------------------------------------- */
let colors = {
  Complete: '#10be00',
  NotStart: '#ffb522',
  Active: '#4a8fe7',
}
let borderColor = (data) => {
  const colorMap = {
    Early: '#cf1322',
    Ontime: '#000000',
    Delayed: '#00FFFF',
    defaultAdd: '#95de64',
    defaultRemove: '#ffe58f',
  }

  return colorMap[data] || 'white' // 如果找不到匹配的颜色，则返回空字符串
}

let borderType = (data) => {
  if (data) {
    return 'dashed'
  } else {
    return 'solid'
  }
}
const renderItem = (type) => (params, api) => {
  let start = api.coord([api.value(1), api.value(0)])
  let end = api.coord([api.value(2), api.value(0)])
  let height = api.size([0, 1])[1]
  let y
  let span, basespan
  let x, width, points
  y = (datas.value.length - api.value(0)) * 25
  if (type == 'base') {
    y = y + 45
    height = 8
  } else {
    y = y + 8 + 40
    height = 15
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
    case 'WBS':
      result = {
        type: 'rect',
        shape,
        style: {
          ...api.style(),
          radius: 10,
          fill: '#08979c',
        },
        focus: 'self',
        blurScope: 'coordinateSystem',
        emphasis: {},
      }
      // 其他类型的渲染逻辑
      break
    case 'Ahead':
      x = start[0] // 矩形左上角 x 坐标
      // let y = start[1] // 矩形左上角 y 坐标
      width = Math.max(end[0] - start[0], 1) // 矩形宽度
      // let height = 13
      // 定义板凳形状的多边形顶点
      points = [
        [x, y],
        [x + width - width * 0.8, y + 0.2 * height],
        [x + width - width * 0.2, y + 0.2 * height],
        [x + width, y],
        [x + width, y + height],
        [x + width - width * 0.2, y + 0.7 * height],
        [x + width - width * 0.8, y + 0.7 * height],
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
    case 'Delayed':
      x = start[0] // 矩形左上角 x 坐标
      // let y = start[1] // 矩形左上角 y 坐标
      width = Math.max(end[0] - start[0], 1) // 矩形宽度
      // let height = 13
      // 定义板凳形状的多边形顶点
      points = [
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

/* ！甘特图数据处理 -------------------------------------------------------------------------- */
let ganttData = () => {
  let chartData = datas.value.filter((item) => {
    let isExpanded = expandedRowKeys.value.includes(item.wbsId)

    item.expanded = isExpanded

    return item.expanded
  })
  // .map((item2, idx) => (item2.calculatedIdx = datas.value.length - idx))
  let ganttDatas = chartData.map((ganttItem, idx) => {
    return {
      name: ganttItem.name,
      value: [
        ganttItem.calculatedIdx,
        ganttItem.newStart,
        ganttItem.newFinish,
        ganttItem,
      ],
      itemStyle: {
        color: colors[ganttItem.status],
        borderColor: borderColor(ganttItem.durationStatus),
        borderWidth: 3,
        borderType: borderType(ganttItem.critical),
      },
      taskOwner: ganttItem.taskOwner,
      status: ganttItem.status,
      taskStatus: ganttItem.taskStatus,
      durationStatus: ganttItem.durationStatus,
    }
  })

  let firstProject = ganttDatas.filter((e) => {
    return e.taskOwner == 'first'
  })
  let secondProject = ganttDatas.filter((e) => {
    return e.taskOwner == 'second'
  })
  let wbsProject = ganttDatas.filter((e) => {
    return e.taskOwner == 'WBS'
  })
  return { firstProject, secondProject, wbsProject }
}

function getOption({ firstProject, secondProject, wbsProject }) {
  const delayedTasks = secondProject.filter(
    (task) => task.taskStatus === 'Delayed',
  )
  const aheadTasks = secondProject.filter((task) => task.taskStatus === 'Ahead')
  const onTrackTasks = secondProject.filter(
    (task) => task.taskStatus === 'On Schedule',
  )
  const onDefaultTasks = secondProject.filter(
    (task) => task.taskStatus === 'default',
  )
  let Label = {
    label: {
      normal: {
        show: true, // 启用标签显示
        color: 'black', // 标签的文本颜色
        position: 'right', // 标签的文本位置
        formatter: function (params) {
          // 自定义标签内容
          return params.data.name
        },
        fontSize: 12,
      },
    },
  }
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
      max: endTimeStamp.value + timeSpan + 30 * 24 * 3600 * 1000,
      min: startTimeStamp.value - 30 * 24 * 3600 * 1000,
    },
    dataZoom: [
      {
        type: 'slider',
        show: true,
        xAxisIndex: [0],
        startValue: timexstart.value,
        endValue: timexstart.value + timeSpan,
        // maxValueSpan: Math.max(
        //   3600 * 24 * 1000 * 90,
        //   endTimeStamp.value + timeSpan + 30 * 24 * 3600 * 1000,
        // ),
        showDetail: false,
        minValueSpan: 7 * 24 * 3600 * 1000,
        filterMode: 'none',

        brushSelect: false,
        fillerColor: 'rgba(64, 158, 255)',
        borderRadius: '50%',
        moveHandleSize: 0,
        moveHandleStyle: {},
        height: 12,
        handleSize: '80%',
        handleIcon:
          'path://M512,512m-448,0a448,448,0,1,0,896,0a448,448,0,1,0,-896,0Z',
        handleStyle: {
          borderWidth: 0,
          color: 'rgba(64, 158, 255)',
        },
        bottom: 0,
      },
      {
        show: true,
        type: 'inside',
        xAxisIndex: [0],
        // startValue: startTimeStamp.value,
        // endValue: endTimeStamp.value,
        zoomLock: true,
      },
    ],
    yAxis: {
      name: 'tasks',
      interval: 25, // 设置每个间隔的高度
      splitNumber: 34, // 将整个 y 轴分成 20 个间隔
      show: false,
      max: 34,
      min: 34,

      // min: 1,
      // max: 60, // 设置 y 轴的最大值为总高度
    },
    useUTC: true,
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
        ...Label,
      },
      {
        name: 'WBS',
        type: 'custom',
        data: wbsProject,
        large: true,
        renderItem: renderItem('WBS'),
        encode: {
          x: [1, 2],
          y: 0,
        },
        ...Label,
      },
      {
        name: 'onDefaultTasks',
        type: 'custom',
        data: onDefaultTasks,
        large: true,
        renderItem: renderItem('base'),
        encode: {
          x: [1, 2],
          y: 0,
        },
        ...Label,
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
        ...Label,
      },
      {
        name: 'aheadTasks',
        type: 'custom',
        data: aheadTasks,
        large: true,
        renderItem: renderItem('Ahead'),
        encode: {
          x: [1, 2],
          y: 0,
        },
        ...Label,
      },
      {
        name: 'onTrackTasks',
        type: 'custom',
        data: onTrackTasks,
        large: true,
        renderItem: renderItem('On Track'),
        encode: {
          x: [1, 2],
          y: 0,
        },
        ...Label,
      },
      // {
      //   type: 'line',
      //   smooth: 0.6,
      //   symbol: 'none',
      //   lineStyle: {
      //     color: '#5470C6',
      //     width: 5,
      //   },
      //   markLine: {
      //     symbol: ['none', 'none'],
      //     label: { show: false },
      //     data: getMaxMin()[0],
      //   },
      // },
      {
        name: 'AddTasks',
        type: 'line',
        smooth: 0.6,
        symbol: 'none',
        lineStyle: {
          color: '#5470C6',
          width: 5,
        },
      },
      {
        name: 'RemoveTasks',
        type: 'line',
        smooth: 0.6,
        symbol: 'none',
        lineStyle: {
          color: '#5470C6',
          width: 5,
        },
      },
      {
        name: 'NotStart',
        type: 'line',
        smooth: 0.6,
        symbol: 'none',
        lineStyle: {
          color: '#5470C6',
          width: 5,
        },
      },
      {
        name: 'NotStart',
        type: 'line',
        smooth: 0.6,
        symbol: 'none',
        lineStyle: {
          color: '#5470C6',
          width: 5,
        },
      },
      {
        name: 'Completed',
        type: 'line',
        smooth: 0.6,
        symbol: 'none',
        lineStyle: {
          color: '#5470C6',
          width: 5,
        },
        ...Label,
      },
      {
        name: 'Delayed',
        type: 'line',
        smooth: 0.6,
        symbol: 'none',
        lineStyle: {
          color: '#5470C6',
          width: 5,
        },
        ...Label,
      },
      {
        name: 'Active',
        type: 'line',
        smooth: 0.6,
        symbol: 'none',
        lineStyle: {
          color: '#5470C6',
          width: 5,
        },
        ...Label,
      },
      {
        name: 'Completed',
        type: 'line',
        smooth: 0.6,
        symbol: 'none',
        lineStyle: {
          color: '#5470C6',
          width: 5,
        },
        ...Label,
      },
      {
        name: 'Ahead of Schedule',
        type: 'line',
        smooth: 0.6,
        symbol: 'none',
        lineStyle: {
          color: '#5470C6',
          width: 5,
        },
        ...Label,
      },
      {
        name: 'On Schedule',
        type: 'line',
        smooth: 0.6,
        symbol: 'none',
        lineStyle: {
          color: '#5470C6',
          width: 5,
        },
        ...Label,
      },
      {
        name: 'Behind Schedule',
        type: 'line',
        smooth: 0.6,
        symbol: 'none',
        lineStyle: {
          color: '#5470C6',
          width: 5,
        },
        ...Label,
      },
      {
        name: 'Early',
        type: 'line',
        smooth: 0.6,
        symbol: 'none',
        lineStyle: {
          color: '#5470C6',
          width: 5,
        },
        ...Label,
      },
      {
        name: 'On Time',
        type: 'line',
        smooth: 0.6,
        symbol: 'none',
        lineStyle: {
          color: '#5470C6',
          width: 5,
        },
        ...Label,
      },
      {
        name: 'Delayed',
        type: 'line',
        smooth: 0.6,
        symbol: 'none',
        lineStyle: {
          color: '#5470C6',
          width: 5,
        },
        ...Label,
      },
      {
        name: 'Critical Task',
        type: 'line',
        smooth: 0.6,
        symbol: 'none',
        lineStyle: {
          color: '#5470C6',
          width: 5,
        },
        ...Label,
      },
      {
        name: 'dataDateBase',
        type: 'bar',
        data: [[dataDate.value[0], 50]],
        barWidth: 3, // 设置柱状图的宽度为20像素
        itemStyle: {
          color: '#f5222d', // 设置柱状图的颜色为红色，透明度为0.7
        },
        // ...Label,
      },
      {
        name: 'dataDateNew',
        type: 'bar',
        data: [[dataDate.value[1], 50]],
        barWidth: 3, // 设置柱状图的宽度为20像素
        itemStyle: {
          color: '#ffccc7', // 设置柱状图的颜色为红色，透明度为0.7
        },
        // ...Label,
      },
    ],
    legend: {
      data: [
        {
          name: 'Base',
          icon: 'circle',
          itemStyle: {
            color: '#b5b5b5',
          },
        },
        {
          name: 'Completed',
          icon: 'circle',
          itemStyle: {
            color: '#10be00',
          },
        },
        {
          name: 'NotStart',
          icon: 'circle',
          itemStyle: {
            color: '#ffb522',
          },
        },
        {
          name: 'Active',
          icon: 'circle',
          itemStyle: {
            color: '#4a8fe7',
          },
        },
        {
          name: 'Ahead of Schedule',
          icon: pathSymbols.Ahead,
          itemStyle: {
            color: '#b5b5b5',
          },
        },
        {
          name: 'On Schedule',
          icon: 'roundRect',
          itemStyle: {
            color: '#b5b5b5',
          },
        },
        {
          name: 'Behind Schedule',
          icon: pathSymbols.delayed,
          itemStyle: {
            color: '#b5b5b5',
          },
        },
        {
          name: 'Early',
          icon: 'roundRect',
          itemStyle: {
            color: '#b5b5b5',
            borderColor: '#cf1322',
            borderWidth: 2,
            borderType: 'solid',
          },
        },
        {
          name: 'On Time',
          icon: 'roundRect',
          itemStyle: {
            color: '#b5b5b5',
            borderColor: '#000000',
            borderWidth: 2,
            borderType: 'solid',
          },
        },
        {
          name: 'Delayed',
          icon: 'roundRect',
          itemStyle: {
            color: '#b5b5b5',
            borderColor: '#00FFFF',
            borderWidth: 2,
            borderType: 'solid',
          },
        },
        {
          name: 'AddTasks',
          icon: 'roundRect',
          itemStyle: {
            color: '#b5b5b5',
            borderColor: '#95de64',
            borderWidth: 2,
            borderType: 'solid',
          },
        },
        {
          name: 'RemoveTasks',
          icon: 'roundRect',
          itemStyle: {
            color: '#b5b5b5',
            borderColor: '#ffe58f',
            borderWidth: 2,
            borderType: 'solid',
          },
        },
        {
          name: 'Critical Task',
          icon: 'roundRect',
          itemStyle: {
            color: '#b5b5b5',
            borderColor: 'black',
            borderWidth: 2,
            borderType: 'dashed',
          },
        },
      ],
      type: 'scroll',
      width: 1100,
    },
    grid: {
      top: 40,
      left: 0,
      right: 0,
      bottom: 40,
    },
    toolbox: {
      show: true,
      feature: {
        dataView: { show: true, readOnly: false },
        saveAsImage: { show: true },
      },
    },

    graphic: {
      elements: [
        {
          type: 'rect',
          left: 0, // 矩形左上角相对于 grid 的 x 坐标
          top: 40, // 矩形左上角相对于 grid 的 y 坐标
          shape: {
            width: '1500', // 矩形的宽度
            height: 50, // 矩形的高度
          },
          style: {
            fill: 'rgba(236,246,245,0.7)', // 矩形的填充颜色
          },
        },
        // {
        //   type: 'rect',
        //   x: 300,
        //   y: 0,
        //   shape: {
        //     width: 3, // 矩形的宽度
        //     height: 850, // 矩形的高度
        //   },
        //   style: {
        //     fill: 'rgba(255,0,0)', // 矩形的填充颜色
        //   },
        // },
        // {
        //   type: 'rect',
        //   x: dataDate.value[2],
        //   y: 1,
        //   shape: {
        //     width: 3, // 矩形的宽度
        //     height: 850, // 矩形的高度
        //   },
        //   style: {
        //     fill: 'rgba(255,0,0)', // 矩形的填充颜色
        //   },
        // },
      ],
    },
    tooltip: {
      axisPointer: {
        //坐标轴指示器，坐标轴触发有效，
        // type: 'cross', //默认为line，line直线，cross十字准星，shadow阴影
      },
      trigger: 'item',
      formatter: (p) => {
        if (p.componentType == 'markLine' || p.componentSubType == 'bar') {
          return
        }
        return `${p.name}
        <br/>
        <div >
          Start:${utcTime(p.data.value[1])
            .replace('T', ' ')
            .replace('Z', '')
            .slice(0, 16)}
           <br/>
         End:${utcTime(p.data.value[2])
           .replace('T', ' ')
           .replace('Z', '')
           .slice(0, 16)}
          </div>`
      },
    },
  }

  return option
}
/* -------------------------------------------------------------------------- */

function utcTime(time) {
  if (!time) {
    return "It doesn't exist"
  }
  const utcDate = new Date(time)
  const utcString = utcDate.toISOString()

  return utcString
}

function alternateInsert(array1, array2) {
  let minPropertyValue = Infinity
  let maxPropertyValue = -Infinity
  const results = []
  const idMap = {} // 创建 ID 映射对象
  const idMap2 = {}

  // 遍历第一个数组，标记为 'first'
  array1.forEach((item) => {
    if (item.newStart < minPropertyValue) {
      minPropertyValue = item.newStart // 如果当前属性值比最小值小，则更新最小值
    }
    if (item.newFinish > maxPropertyValue) {
      maxPropertyValue = item.newStart // 如果当前属性值比最大值大，则更新最大值
    }
    item.taskOwner = 'first'
    item.expanded = true
    item.addorRemove = 'same'

    idMap[item.ID] = item // 将第一个数组的元素添加到 ID 映射对象中
  })
  // console.log(idMap)
  // 遍历第二个数组，标记为 'second'，并与第一个数组进行比较
  array2.forEach((item) => {
    if (item.newStart < minPropertyValue) {
      minPropertyValue = item.newStart // 如果当前属性值比最小值小，则更新最小值
    }
    if (item.newFinish > maxPropertyValue) {
      maxPropertyValue = item.newStart // 如果当前属性值比最大值大，则更新最大值
    }
    item.taskOwner = 'second'
    item.expanded = true
    let correspondingItem = idMap[item.ID] // 查找对应的第一个数组的元素
    if (!correspondingItem) {
      item.addorRemove = 'add'
      item.taskStatus = 'default'
      item.durationStatus = 'defaultAdd'
      item.compareCritical = item.critical
      item.compareStatus = item.status
      results.push(item)
    } else {
      // 标记第二个数组的元素在第一个数组中有对应元素，表示不是新增元素
      // 判断任务状态
      if (item.newStart < correspondingItem.newStart) {
        item.taskStatus = correspondingItem.taskStatus = 'Ahead'
      } else if (item.newStart > correspondingItem.newStart) {
        item.taskStatus = correspondingItem.taskStatus = 'Delayed'
      } else {
        item.taskStatus = correspondingItem.taskStatus = 'On Schedule'
      }

      // 判断持续时间状态
      const durationSum1 =
        correspondingItem.actualDuration + correspondingItem.remainingDuration
      const durationSum2 = item.actualDuration + item.remainingDuration
      if (durationSum2 < durationSum1) {
        item.durationStatus = correspondingItem.durationStatus = 'Early'
      } else if (durationSum2 > durationSum1) {
        item.durationStatus = correspondingItem.durationStatus = 'Delayed'
      } else {
        item.durationStatus = correspondingItem.durationStatus = 'Ontime'
      }

      // 复制关键信息
      item.compareCritical = correspondingItem.compareCritical = item.critical
      item.compareStatus = correspondingItem.compareStatus = item.status
      idMap2[item.ID] = true
      results.push(item)
      results.push(correspondingItem)
    }
  })

  array1.forEach((item) => {
    if (!array2.find((el) => el.ID === item.ID)) {
      item.addorRemove = 'remove'
      item.taskStatus = 'default'
      item.durationStatus = 'defaultRemove'
      item.compareCritical = item.critical
      item.compareStatus = item.status
      results.push(item)
    }
  })
  startTimeStamp.value = minPropertyValue
  endTimeStamp.value = maxPropertyValue
  return results
}

function concatenateResources(resources) {
  let result = ''
  for (const resource of resources) {
    result += `Resource ID: ${resource.id}, `
    result += `Resource ID: ${resource.resourceId}, `
    result += `Task ID: ${resource.taskId}, `
    result += `Planned Units: ${resource.plannedUnits}, `
    result += `Planned Units Per Hour: ${resource.plannedUnitsPerHour}, `
    result += `Actual Units: ${resource.actualUnits}, `
    result += `Remaining Units: ${resource.remainingUnits}, `
    result += `New Units Per Hour: ${resource.newUnitsPerHour}, `
    result += `New Units Per Day: ${resource.newUnitsPerDay}, `
    result += `Parent ID: ${resource.parentId}\n`
  }
  return result
}
function getLastDataBeforeLastDot(str) {
  const lastIndex = str.lastIndexOf('.') // 找到最后一个 '.' 的索引位置
  if (lastIndex !== -1) {
    // 如果找到了 '.'，则执行下面的操作
    return str.substring(0, lastIndex) // 使用 substring 方法获取从字符串开头到最后一个 '.' 之前的子字符串
  } else {
    // 如果没有找到 '.'，则返回整个字符串
    return undefined
  }
}
function flatten(treeData) {
  const flatArray = []
  Object.keys(treeData).forEach((e) => {
    flatArray.push({
      wbsId: e,
      id: e,
      parentId: getLastDataBeforeLastDot(e),
      children: [],
      type: 'wbs',
    })
  })
  return flatArray
}
function convertToTreeFormat(initialData) {
  let idMap
  let nodeData
  idMap = flatten(wbs.value[0])
  nodeData = initialData.map((e) => {
    e.parentId = e.wbsId
    return {
      children: [],
      ...e,
    }
  })
  // console.log(nodeData);
  let x = flatToTree(idMap.concat(nodeData))
  return x
}

function flatToTree(flatData, parentId = undefined) {
  const tree = []

  // 遍历flatData，找到parentId对应的子节点
  for (const node of flatData) {
    if (node.parentId === parentId) {
      // 递归查找子节点
      const children = flatToTree(flatData, node.id)

      // 如果有子节点，则加入children属性中
      if (children.length > 0) {
        node.children = children
        const childMinMax = calculateMinMax(children)
        node.newStart = childMinMax.min
        node.newFinish = childMinMax.max
        node.taskOwner = 'WBS'
        node.name = wbs.value[0][node.id]
      }

      // 加入tree中
      tree.push(node)
    }
  }

  return tree
}
// 计算子节点的最大最小值
function calculateMinMax(nodes) {
  let min = Number.MAX_SAFE_INTEGER
  let max = Number.MIN_SAFE_INTEGER

  for (const node of nodes) {
    if (node.newStart < min) {
      min = node.newStart
    }
    if (node.newFinish > max) {
      max = node.newFinish
    }
  }

  return { min, max }
}

let startTime = performance.now() // 记录开始时间
function flatToArr(tree, arr = [], expandedIds = []) {
  tree.forEach((item) => {
    // 结构item
    const { children, ...props } = item
    // 判断当前节点是否展开
    const isExpanded = expandedRowKeys.value.includes(item.wbsId)
    // 更新节点的状态
    const updatedProps = { ...props, expanded: isExpanded }
    // 添加除了children的属性
    arr.push(updatedProps)
    if (children.length !== 0) {
      // 存在children递归将所有节点加入到结果集中
      flatToArr(children, arr, expandedIds)
    }
  })
  // let endTime = performance.now() // 记录结束时间

  // let executionTime = endTime - startTime // 计算执行时间

  // console.log('tree.forEach 执行时间:', executionTime/1000, '毫秒')
  return arr
}
function compareFirstProperty(obj1, obj2) {
  // 获取第一个对象的第一个属性值
  const firstValue1 = obj1[Object.keys(obj1)[0]]
  // 获取第二个对象的第一个属性值
  const firstValue2 = obj2[Object.keys(obj2)[0]]

  // 比较两个属性值是否相同
  return firstValue1 === firstValue2
}
function dateToTimestamp(dateString) {
  // 将日期字符串转换为日期对象
  var dateObject = new Date(dateString)
  // 获取时间戳（单位：毫秒）
  var timestamp = dateObject.getTime()
  // 将毫秒转换为秒
  var timestampInSeconds = Math.floor(timestamp / 1000)
  return timestampInSeconds
}
function mergeObjects(obj1, obj2) {
  return Object.assign({}, obj1, obj2)
}
// 防抖函数
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

// 节流函数
function throttle(func, wait) {
  let timeout
  return function () {
    const context = this
    const args = arguments
    if (!timeout) {
      timeout = setTimeout(() => {
        func.apply(context, args)
        timeout = null
      }, wait)
    }
  }
}

// 递归遍历树状结构，筛选符合条件的节点及其子节点
// 递归遍历树状结构，将符合条件的节点及其子节点放置在同一级别上
function flattenFilterTreeData(treeData, filterIds) {
  const result = []
  for (const node of treeData) {
    if (filterIds.includes(node.wbsId)) {
      // 如果当前节点的 id 在筛选条件中，则将当前节点及其子节点加入结果中
      result.push(node)
      if (node.children) {
        // 如果当前节点有子节点，则递归处理子节点
        result.push(...flattenFilterTreeData(node.children, filterIds))
      }
    } else if (node.children) {
      // 如果当前节点不在筛选条件中，但有子节点，则递归筛选子节点
      result.push(...flattenFilterTreeData(node.children, filterIds))
    }
  }
  return result
}
// 递归遍历树状结构，筛选符合条件的节点及其子节点
function filterTreeData(treeData, filterIds) {
  const result = []
  for (const node of treeData) {
    if (filterIds.includes(node.id)) {
      // 如果当前节点的 id 在筛选条件中，则将当前节点及其子节点加入结果中
      result.push({
        ...node,
        children: filterTreeData(node.children || [], filterIds),
      })
    } else if (node.children) {
      // 如果当前节点不在筛选条件中，但有子节点，则递归筛选子节点
      const filteredChildren = filterTreeData(node.children, filterIds)
      if (filteredChildren.length > 0) {
        result.push({
          ...node,
          children: filteredChildren,
        })
      }
    }
  }
  return result
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
.example-showcase .el-dropdown-link {
  cursor: pointer;
  color: var(--el-color-primary);
  display: flex;
  align-items: center;
}
.upload-item {
  > div {
    width: 200px;
  }
}
.upload-text {
  font-size: 17px;
  text-align: center;
}
.btn-filter {
  border: 0px;
}
</style>
