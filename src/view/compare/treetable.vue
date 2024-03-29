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
      <p style="color: #ffa39e">
        Please do not upload a file with the same name
      </p>
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
          :catch="0"
          fixed
          @rows-rendered="getRenderData"
          :row-class="rowClass"
          expand-column-key="wbsId"
          :default-expanded-row-keys="wbsIdArray"
          @row-expand="onRowExpanded"
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
          :startTime="startTimeStamp"
          :endTime="endTimeStamp"
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
  add,
  endOfWeek,
  startOfWeek,
  endOfMonth,
  endOfYear,
  format,
  isAfter,
} from 'date-fns'
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
const store = useCounterStore()
const router = useRouter()
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
const shouldFilter = ref(false)

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

let openFilter = ref(false)
const visible = ref(false)

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

let filterDatas = computed(() => {
  if (fileData.value?.length > 0) {
    let _file = fileData.value[3].filter((e) => {
      return (
        ((isBehindschedule.value && e.taskStatus === 'Delayed') ||
          (isAheadschedule.value && e.taskStatus === 'Ahead') ||
          (isOnschedule.value && e.taskStatus === 'On Schedule')) &&
        ((isEarly.value && e.durationStatus === 'Early') ||
          (isOntime.value && e.durationStatus === 'Ontime') ||
          (isDelayed.value && e.durationStatus === 'Delayed')) &&
        ((isActive.value && e.compareStatus === 'TK_Active') ||
          (isCompleted.value && e.compareStatus === 'TK_Complete') ||
          (isNotStart.value && e.compareStatus === 'TK_NotStart')) &&
        ((isCritical.value && e.compareCritical === true) ||
          (isNocritical.value && e.compareCritical === null))
      )
    })
    if (filterData.value !== 'default') {
      _file = _file.filter((e) => {
        // 初始化一个变量来判断当前对象是否满足所有条件
        let satisfiesAllConditions = true

        // 遍历 filterType 对象的属性
        for (let key in filterType.value) {
          // console.log(filterType.value[key]);
          // 如果属性值不为 null，且当前对象的该属性的值不包含 filterData 的值，则设置 satisfiesAllConditions 为 false
          if (
            filterType.value[key] !== null &&
            !convertToUTC(e[key])?.includes(filterType.value[key])
          ) {
            satisfiesAllConditions = false
            // 如果有一个条件不满足，就不需要再继续检查其他属性了，可以直接跳出循环
            break
          }
        }

        // 返回 satisfiesAllConditions 的值，表示当前对象是否满足所有条件
        return satisfiesAllConditions
      })
    }

    _file = convertToTreeFormat(_file)
    return _file
  } else {
    return []
  }
})
function datasFilter() {
  controlFilter.value = false
  if (datas.value) {
    datas.value = filterDatas.value.slice(0, 34)

    ganttChart.setOption(getOption(ganttData()))
  }
}
// 甘特图
const eventClick = {
  onMousemove(e) {
    let index = e.rowIndex

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
            left: 0, // 矩形左上角相对于 grid 的 x 坐标
            top: 40 + index, // 矩形左上角相对于 grid 的 y 坐标
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
    })
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
watch(chosenDate, (newValue, oldValue) => {
  // 可以在这里触发相应的操作，例如重新渲染数据
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
function removeFile(file) {
  files.value = []
}

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
async function Uploads() {
  // let filed = filess.file
  // files.push(filed)

  if (files.value.length == 2) {
    fileData.value = []

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

    for (let attrName in a.data) {
      let attrValue = a.data[attrName]
      fileData.value.push(attrValue)
    }
    wbs.value.push(fileData.value[1].wbsName)
    wbs.value.push(fileData.value[1].wbsNameArr)
    wbsIdArray.value = Object.keys(fileData.value[1].wbsName)
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
    if (fileData.value[1].tasks.length != fileData.value[2].tasks) {
      // fileDatas.map((e) => {
      //   if (e.resources) {
      //     e.resources = null
      //   }
      //   return e
      // })
      fileData.value.push(fileDatas)
      initCharts()
    }
  }
  if (fileData.value[1].tasks.length != fileData.value[2].tasks.length) {
    ElMessage.error('Please upload a project with the same task')
    fileData.value = []
  }
  return false
}
const beforeUpload = async (event, file, fileList) => {}
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
function initCharts() {
  timeX = getMaxMin()
  markLineData = timeX[0]
  startTimeStamp.value = timeX[1]
  endTimeStamp.value = timeX[2]
  startDate = new Date(startTimeStamp.value)
  endDate = new Date(startDate)
  endDate.setMonth(startDate.getMonth() + 3)

  fileData.value[3] = fileData.value[3].map((e) => {
    e.type = e.type.replace('TT_', '')
    e.status = e.status.replace('TK_', '')
    return e
  })

  datas.value = filterDatas.value.slice(0, 34)
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
      startTimeStamp.value = op.dataZoom[0].startValue
      endTimeStamp.value = op.dataZoom[0].endValue
    })
  }
}
function getRenderData(data) {
  if (!ganttChart) {
    return
  }
  datas.value = filterDatas.value.slice(
    data.rowCacheStart === 0 ? 0 : data.rowCacheStart + 2, // 如果 data.rowCacheStart 是 0，则切片开始位置为 0，否则为 data.rowCacheStart
    data.rowCacheStart === 0 ? 34 : data.rowCacheEnd - 1, // 切片结束位置为 data.rowCacheStart + 25
  )

  ganttChart.setOption(getOption(ganttData()))
}
let wbsIdArray = ref()
const onRowExpanded = ({ expanded }) => {}
const expandedRowKeys = ref([])

const onExpandedRowsChange = (expandedKeys) => {
  expandedRowKeys.value = expandedKeys // 更新 expandedRowKeys
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
  // if (data.rowData.children.length > 0) {
  //   return 'bg-red-100'
  // } else {
  //   return 'bg-red-100'
  // }
  // bg-blue-200
  if (data.rowData.children.length > 0) {
    return 'bg-wbs'
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
  let columned = columnDatas.value
    .filter((item) => item.bol) // 过滤出值为 true 的键
    .map((item) => {
      let cellRenderer = null
      switch (item.name) {
        case 'name':
          cellRenderer = (cellData) => {
            return cellData.cellData
          }
          return {
            dataKey: item.name,
            key: item.name,
            title: columnMapping[item.name],
            width: 200,
            headerAlign: 'center',
            cellRenderer,
            // rowSpan: function (rowIndex) {
            //   if (rowIndex % 2 === 0) {
            //     return 2
            //   } else {
            //     return 1
            //   }
            // },
            headerCellRenderer: headerFunctions,
          }
          break
        case 'plannedStart':
          cellRenderer = (cellData) => {
            if (cellData.cellData) {
              return utcTime(cellData.cellData)
                .replace('T', ' ')
                .replace('Z', '')
                .slice(0, 16)
            }
          }
          return {
            dataKey: item.name,
            key: item.name,
            title: columnMapping[item.name],
            width: 150,
            cellRenderer,
            headerCellRenderer: headerFunctions,
          }
          break
        case 'plannedFinish':
          cellRenderer = (cellData) => {
            if (cellData.cellData) {
              return utcTime(cellData.cellData)
                .replace('T', ' ')
                .replace('Z', '')
                .slice(0, 16)
            }
          }
          return {
            dataKey: item.name,
            key: item.name,
            title: columnMapping[item.name],
            width: 150,
            cellRenderer,
            headerCellRenderer: headerFunctions,
          }
          break
        case 'newStart':
          cellRenderer = (cellData) => {
            if (cellData.cellData) {
              return utcTime(cellData.cellData)
                .replace('T', ' ')
                .replace('Z', '')
                .slice(0, 16)
            }
          }
          return {
            dataKey: item.name,
            key: item.name,
            title: columnMapping[item.name],
            width: 150,
            cellRenderer,
            headerCellRenderer: headerFunctions,
          }
          break
        case 'newFinish':
          cellRenderer = (cellData) => {
            if (cellData.cellData) {
              return utcTime(cellData.cellData)
                .replace('T', ' ')
                .replace('Z', '')
                .slice(0, 16)
            }
          }
          return {
            dataKey: item.name,
            key: item.name,
            title: columnMapping[item.name],
            width: 150,
            cellRenderer,
            headerCellRenderer: headerFunctions,
          }
        case 'actualStart':
          cellRenderer = (cellData) => {
            if (cellData.cellData) {
              return utcTime(cellData.cellData)
                .replace('T', ' ')
                .replace('Z', '')
                .slice(0, 16)
            }
          }
          return {
            dataKey: item.name,
            key: item.name,
            title: columnMapping[item.name],
            width: 150,
            cellRenderer,
            headerCellRenderer: headerFunctions,
          }
        case 'actualFinish':
          cellRenderer = (cellData) => {
            if (cellData.cellData) {
              return utcTime(cellData.cellData)
                .replace('T', ' ')
                .replace('Z', '')
                .slice(0, 16)
            }
          }
          return {
            dataKey: item.name,
            key: item.name,
            title: columnMapping[item.name],
            width: 150,
            cellRenderer,
            headerCellRenderer: headerFunctions,
          }
          break
        case 'critical':
          cellRenderer = (cellData) => {
            return h(ElButton, {
              type: cellData.cellData == true ? 'danger' : 'info',
              circle: true,
              size: 'small',
              class: 'sizeButton',
            }) //也可以写成字符串如'这是标签内容'，但控制台会有警告)
          }
          return {
            dataKey: item.name,
            key: item.name,
            title: columnMapping[item.name],
            width: 120,
            cellRenderer,
            headerCellRenderer: headerFunctions,
            // rowSpan: function (rowIndex) {
            //   if (rowIndex % 2 === 0) {
            //     return 2
            //   } else {
            //     return 1
            //   }
            // },
          }
          break
        case 'resources':
          return {
            dataKey: item.name,
            key: item.name,
            title: columnMapping[item.name],
            width: 150,
            cellRenderer,
            headerCellRenderer: headerFunctions,
          }
          break
        case 'plannedDuration':
          return {
            dataKey: item.name,
            key: item.name,
            title: columnMapping[item.name],
            width: 170,
            cellRenderer,
            headerCellRenderer: headerFunctions,
          }
          break
        case 'remainingDuration':
          return {
            dataKey: item.name,
            key: item.name,
            title: columnMapping[item.name],
            width: 200,
            cellRenderer,
            headerCellRenderer: headerFunctions,
          }
          break
        case 'actualDuration':
          return {
            dataKey: item.name,
            key: item.name,
            title: columnMapping[item.name],
            width: 170,
            cellRenderer,
            headerCellRenderer: headerFunctions,
          }
          break
        case 'status':
          return {
            dataKey: item.name,
            key: item.name,
            title: columnMapping[item.name],
            width: 150,
            cellRenderer,
            headerCellRenderer: headerFunctions,
          }
          break
        case 'newDuration':
          return {
            dataKey: item.name,
            key: item.name,
            title: columnMapping[item.name],
            width: 150,
            cellRenderer,
            headerCellRenderer: headerFunctions,
          }
        case 'wbsId':
          cellRenderer = (cellData) => {
            if (!cellData.rowData.children.length > 0) {
              return ''
            }
            if (cellData.cellData) {
              return wbs.value[0][cellData.cellData]
            }
          }
          return {
            dataKey: item.name,
            key: item.name,
            title: columnMapping[item.name],
            width: 300,
            cellRenderer,
            headerCellRenderer: headerFunctions,
          }
          break
        default:
          return {
            dataKey: item.name,
            key: item.name,
            title: columnMapping[item.name],
            width: 120,
            headerAlign: 'center',
            cellRenderer,
            headerCellRenderer: headerFunctions,
            // rowSpan: function (rowIndex) {
            //   if (rowIndex % 2 === 0) {
            //     return 2
            //   } else {
            //     return 1
            //   }
            // },
          }
          break
      }
    })

  return columned
})

let data = computed(() => {
  if (fileData.value.length > 0) {
    return fileData.value[3]
  } else {
    return []
  }
})
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
  switch (data) {
    case 'Early':
      return '#cf1322'
      break
    case 'Ontime':
      return '#000000'
      break
    case 'Delayed':
      return '#00FFFF '
      break
    default:
      break
  }
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

/* -------------------------------------------------------------------------- */
let ganttData = () => {
  // console.log(datas.value)
  // datas.value = filterDatas.value
  let ganttDatas = flatToArr(datas.value)
    .filter((item) => {
      return item.expanded
    })
    .map((ganttItem, idx) => {
      // const calculatedIdx = calculateIdx(datas.value.length - idx)
      const calculatedIdx = datas.value.length - idx

      return {
        name: ganttItem.name,
        value: [
          calculatedIdx,
          // ganttItem.taskOwner == 'second'
          //   ? ganttItem.newStart
          //   : ganttItem.plannedStart,
          // ganttItem.taskOwner == 'second'
          //   ? ganttItem.newFinish
          //   : ganttItem.plannedFinish,
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
  // secondProject = secondProject.map((secondTask) => {
  //   const correspondingFirstTask = firstProject.find((firstTask) => {
  //     return (
  //       firstTask.value[3].id === secondTask.value[3].id &&
  //       firstTask.value[3].name === secondTask.value[3].name
  //     )
  //   })

  //   if (correspondingFirstTask) {
  //     return compareTasks(correspondingFirstTask, secondTask)
  //   } else {
  //     return secondTask
  //   }
  // })
  return { firstProject, secondProject }
}

function getOption({ firstProject, secondProject }) {
  const delayedTasks = secondProject.filter(
    (task) => task.taskStatus === 'Delayed',
  )
  const aheadTasks = secondProject.filter((task) => task.taskStatus === 'Ahead')
  const onTrackTasks = secondProject.filter(
    (task) => task.taskStatus === 'On Schedule',
  )
  let option = {
    toolbox: {
      show: true,
      feature: {
        dataView: { show: true, readOnly: false },
        saveAsImage: { show: true },
      },
    },
    xAxis: {
      show: true,
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
      minInterval: 24 * 3600 * 1000 * timeSpan, // 设置最小刻度间隔为1小时 (3600秒 * 1000毫秒)
      maxInterval: 24 * 3600 * 1000 * timeSpan, // 设置最大刻度间隔为1天 (24小时 * 3600秒 * 1000毫秒)
      max: function (value) {
        return value.max + (value.max - value.min) * 0.1 * timeSpan
      },
      min: function (value) {
        return value.min - (value.max - value.min) * 0.1
      },
    },
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
        label: {
          normal: {
            show: true, // 启用标签显示
            color: 'black', // 标签的文本颜色
            position: 'bottom', // 标签的文本位置
            formatter: function (params) {
              // 自定义标签内容

              return params.data.name
            },
            fontSize: 12,
          },
        },
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
    dataZoom: [
      {
        type: 'slider',
        show: true,
        xAxisIndex: [0],
        startValue: startTimeStamp.value,
        endValue:
          endTimeStamp.value +
          ((endTimeStamp.value - startTimeStamp.value) * 0.1 * timeSpan) / 2,
        // zoomLock: true,
        showDetail: false,
        // maxValueSpan: 3600 * 24 * 1000 * 90,
        // minValueSpan: 3600 * 24 * 1000 * 90,
        // maxSpan:,
      },
      {
        show: true,
        type: 'inside',
        xAxisIndex: [0],
        startValue: startTimeStamp.value,
        endValue: endTimeStamp.value,
        zoomLock: true,
      },
    ],
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
      ],
    },
    tooltip: {
      axisPointer: {
        //坐标轴指示器，坐标轴触发有效，
        // type: 'cross', //默认为line，line直线，cross十字准星，shadow阴影
      },
      trigger: 'item',
      formatter: (p) => {
        if (p.componentType == 'markLine') {
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

function convertToUTC(value) {
  // 判断是否是时间戳

  if (typeof value === 'number' && value.toString().length == 13) {
    // 将时间戳转换为UTC时间
    let date = new Date(value)
    let utcDate = new Date(
      date.getUTCFullYear(),
      date.getUTCMonth(),
      date.getUTCDate(),
      date.getUTCHours(),
      date.getUTCMinutes(),
      date.getUTCSeconds(),
    )

    // 返回转换后的UTC时间
    return utcDate.toISOString()
  } else {
    // 如果不是时间戳，则直接返回原始值
    return value + ''
  }
}
function utcTime(time) {
  if (!time) {
    return "It doesn't exist"
  }
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
let timeSpan
function getMaxMin() {
  // 获取最大和最小时间戳
  let endDate = Math.max(
    ...fileData.value[1].tasks.map((obj) => {
      // 判断 plannedFinish 是否为字符串
      if (typeof obj.plannedFinish === 'string') {
        // 将字符串转换为时间戳
        return new Date(obj.plannedFinish).getTime()
      } else {
        // 不是字符串则直接返回
        return obj.plannedFinish
      }
    }),
  )

  let startDate = Math.min(
    ...fileData.value[2].tasks.map((obj) => {
      // 判断 plannedStart 是否为字符串
      if (typeof obj.plannedStart === 'string') {
        // 将字符串转换为时间戳
        return new Date(obj.plannedStart).getTime()
      } else {
        // 不是字符串则直接返回
        return obj.plannedStart
      }
    }),
  )

  // 转换为日期对象
  const startDateObj = new Date(startDate)
  const endDateObj = new Date(endDate)
  // calculateNodes(startDateObj, endDateObj)

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
function alternateInsert(array1, array2) {
  array1.map((e) => {
    e.taskOwner = 'first'
    e.expanded = 'true'
    return e
  })
  array2.map((e) => {
    e.taskOwner = 'second'
    e.expanded = 'true'
    return e
  })
  let result = []
  let maxLength = Math.max(array1.length, array2.length)
  let results = []
  array2.map((item2) => {
    let item1 = array1.find((e2) => {
      return e2.id == item2.id
    })
    if (!item1) {
      results = []
      ElMessage.error(
        `Task id does not match. Please upload projects with the same task id.
        TaskName:${item2.name}
        `,
      )
      return
    }
    if (item2.newStart < item1.newStart) {
      item2.taskStatus = 'Ahead'
      item1.taskStatus = 'Ahead'
    } else if (item2.newStart > item1.newStart) {
      item1.taskStatus = 'Delayed'
      item2.taskStatus = 'Delayed'
    } else {
      item2.taskStatus = 'On Schedule'
      item1.taskStatus = 'On Schedule'
    }
    if (
      item2.actualDuration + item2.remainingDuration <
      item1.actualDuration + item1.remainingDuration
    ) {
      item2.durationStatus = 'Early'
      item1.durationStatus = 'Early'
    } else if (
      item2.actualDuration + item2.remainingDuration >
      item1.actualDuration + item1.remainingDuration
    ) {
      item2.durationStatus = 'Delayed'
      item1.durationStatus = 'Delayed'
    } else {
      item2.durationStatus = 'Ontime'
      item1.durationStatus = 'Ontime'
    }
    item2.compareCritical = item2.critical
    item1.compareCritical = item2.critical
    item2.compareStatus = item2.status
    item1.compareStatus = item2.status

    results.push(item2)
    results.push(item1)
  })
  return results
}

function padZero(num) {
  return num < 10 ? `0${num}` : num
}
function compareTasks(firstTask, secondTask) {
  const taskStartDate = new Date(firstTask.value[1]) // 将 UTC 字符串转换为 Date 对象
  const taskEndDate = new Date(firstTask.value[2]) // 将 UTC 字符串转换为 Date 对象
  const correspondingTaskStartDate = new Date(secondTask.value[1]) // 将 UTC 字符串转换为 Date 对象
  const correspondingTaskEndDate = new Date(secondTask.value[2]) // 将 UTC 字符串转换为 Date 对象
  // 比较开始时间和结束时间，并考虑任务所有者

  if (taskStartDate > correspondingTaskStartDate) {
    status = 'Ahead of Schedule'
  } else if (taskStartDate < correspondingTaskStartDate) {
    status = 'Delayed'
  } else {
    status = 'On Track'
  }

  return { ...secondTask, taskStatus: status }
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
function mergeAndSwapKeyValue(obj) {
  const result = {}

  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      const value = obj[key].join('.') // 合并数组中的值为一个字符串
      result[value] = key // 互换属性和属性值
    }
  }

  return result
}
function flatten(treeData) {
  let back = mergeAndSwapKeyValue(wbs.value[1])
  const flatArray = []
  Object.keys(treeData).forEach((e) => {
    flatArray.push({
      wbsId: e,
      id: e,
      parentId: back[wbs.value[1][e][wbs.value[1][e].length - 2]],
      children: [],
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
      }

      // 加入tree中
      tree.push(node)
    }
  }

  return tree
}

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
  return arr
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
