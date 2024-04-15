<template>
  <div
    style="
      height: 60vh;
      display: flex;
      justify-content: center;
      align-items: center;
      position: relative;
    "
  >
    <div v-show="isNext" class="content">
      <div>
        <span class="bold-text">Upload historical projects</span>
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
        >
          <el-table-column property="name" label="Name" width="120" />
          <el-table-column property="size" label="Size" show-overflow-tooltip />
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
    <el-button
      style="position: absolute; right: 17%; top: 15%"
      :icon="ArrowLeftBold"
      @click="isNext = !isNext"
    ></el-button>
  </div>
</template>

<script setup>
import {
  Delete,
  Edit,
  Search,
  Share,
  Upload,
  ArrowLeftBold,
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
let isNext = ref(true)
let multipleTableRef = ref()
let multipleSelection = ref()
let tableData = ref([])
const handleSelectionChange = (val) => {
  multipleSelection.value = val
}
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
  // console.log(data)

  let a = await api.sendFile(data, 'history') // 使用修改后的文件对象进行上传
  if (a.data.type == 'error') {
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
  width: 1200px;
  height: 600px;
  background-color: #fff;
  border-radius: 16px;
  padding: 20px;
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
}
</style>
