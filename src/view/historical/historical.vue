<template>
  <div style="display: flex; justify-content: center; align-items: center">
    <div
      style="
        display: flex;
        justify-content: center;
        align-items: center;
        position: relative;
        margin-top: 10vh;
        margin-bottom: 10vh;
        width: 1200px;
      "
    >
      <el-button class="btn" :icon="iconValue" @click="tab"></el-button>
      <div v-show="isNext" class="content">
        <div>
          <span class="bold-text">Upload historical projects</span>
          <div
            style="
              display: flex;
              justify-content: space-between;
              align-items: center;
            "
          >
            <el-upload
              class="upload-demo"
              action=""
              :limit="1"
              :before-upload="uploadHistory"
            >
              <template #trigger>
                <el-button style="width: 200px">Upload history files</el-button>
              </template>
            </el-upload>
            <el-slider
              size="small"
              style="width: 300px"
              :max="1"
              :min="0.1"
              :step="0.1"
              v-model="Similar"
              show-input
            />
          </div>
        </div>
        <div class="main">
          <el-checkbox-group
            text-color="#fffff"
            v-model="chosenHistory"
            size="small"
          >
            <template v-for="(item, index) in historyFiles" :key="index">
              <el-checkbox
                border
                class="history-choose"
                :value="item.uid"
                :label="item.name"
              />
            </template>
          </el-checkbox-group>
          <el-table
            ref="multipleTableRef"
            :data="historyFiles"
            style="width: 100%"
            @selection-change="handleSelectionChange"
            max-height="380"
          >
            <el-table-column property="name" label="Name" width="120" />
            <el-table-column
              property="size"
              label="Size"
              show-overflow-tooltip
            />
            <el-table-column
              property="lastModifiedDate"
              label="Modification Date"
              show-overflow-tooltip
            />
          </el-table>
        </div>
        <div class="footer">
          <el-button @click="Uploads" style="width: 200px">Next</el-button>
        </div>
      </div>
      <HistoryTable :data="tableData" v-show="!isNext" />
    </div>
  </div>
</template>

<script setup>
import {
  ElButton,
  ElCheckbox,
  ElIcon,
  ElPopover,
  TableV2FixedDir,
  ElMessage,
  ElInput,
} from 'element-plus'
import {
  Delete,
  Edit,
  Search,
  Share,
  Upload,
  ArrowLeftBold,
  ArrowRightBold,
} from '@element-plus/icons-vue'
import api from '@/api/index.js'
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
import HistoryTable from './historyTable.vue'
let Similar = ref(0.9)
let isNext = ref(true)
let multipleTableRef = ref()
let multipleSelection = ref()
let tableData = ref([])
const handleSelectionChange = (val) => {
  multipleSelection.value = val
}
let iconValue = ref(ArrowRightBold)
function tab() {
  isNext.value = !isNext.value
}
watch(isNext, () => {
  iconValue.value = isNext.value === true ? ArrowRightBold : ArrowLeftBold
})
let chosenHistory = ref([])
let historyFiles = ref([])
let uploadHistory = (file) => {
  if (file.type !== 'application/xer' && file.type !== 'text/xml') {
    ElMessage.error('Please upload xer or xml file!')
    return false
  }
  historyFiles.value.push(file)
  chosenHistory.value.push(file.uid)
  return false
}
async function Uploads() {
  // let filed = filess.file
  // files.push(filed)
  let data = historyFiles.value.filter((e) => {
    return chosenHistory.value.includes(e.uid)
  })
  // console.log(chosenHistory.value)

  let a = await api.sendFile(data, 'history', Similar.value) // 使用修改后的文件对象进行上传
  if (a.data.type == 'error') {
    console.log(a.data.error)
    ElMessage.error({
      message: `${a.data.error} Please upload or select a qualified project!`,
      duration: 0, // 设置为 5000 毫秒（即 5 秒）,
      showClose: true,
    })
    return
  }
  let arr = []
  for (const key in a.data) {
    a.data[key].pastTask = a.data[key].pastTasks.map((e) => {
      e = a.data[e].name
      return e
    })
    a.data[key].pastTasks = a.data[key].pastTasks.map((e) => {
      e = a.data[e].actualDuration
      return e
    })

    // a.data[key].pastTasks.push(0)
    // a.data[key]

    arr.push(a.data[key])
  }
  tableData.value = arr
  isNext.value = false
  // console.log(a)
}
function filterData(data) {}
</script>

<style lang="scss" scoped>
.content {
  min-width: 1200px;
  // height: 600px;
  background-color: #fff;
  border-radius: 16px;
  padding: 20px;
  min-height: 600px;
}
.history-choose {
  height: 100px;
  width: 100px;
  background-color: #f0f0f0;
  white-space: pre-wrap; /* 在空白字符处换行 */
}
.bold-text {
  font-size: 30px;
  font-weight: bold;
}
.main {
  height: 75%;
  width: 100%;
}
.footer {
  display: flex;
  justify-content: flex-end;
  align-content: center;
  margin-top: 100px;
}
.btn {
  position: absolute;
  right: 50px;
  top: 10px;
}

.slider-demo-block .el-slider {
  margin-top: 0;
  margin-left: 12px;
}
</style>
