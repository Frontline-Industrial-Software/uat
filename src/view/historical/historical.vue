<template>
  <div
    style="
      height: 60vh;
      display: flex;
      justify-content: center;
      align-items: center;
    "
  >
    <div class="content">
      <div>
        <span>Upload historical projects</span>
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
      <div>
        <el-checkbox-group
          text-color="#fffff"
          v-model="chosenHistory"
          size="small"
        >
          <el-checkbox
            class="history-choose"
            v-for="(item, index) in historyFiles"
            :key="index"
            :label="item.name"
            :value="item.name"
            border
          />
        </el-checkbox-group>
      </div>
      <div class="footer">
        <el-button @click="Uploads" style="width: 200px">Next</el-button>
      </div>
    </div>
  </div>
</template>

<script setup>
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
let chosenHistory = ref([])
let historyFiles = ref([])
let uploadHistory = (file) => {
  if (file.type !== 'application/xer' && file.type !== 'text/xml') {
    ElMessage.error('Please upload xer or xml file!')
    return false
  }
  historyFiles.value.push(file)
  chosenHistory.value.push(file.name)
  return false
}
async function Uploads() {
  // let filed = filess.file
  // files.push(filed)
  let a = await api.sendFile(historyFiles.value, 'history') // 使用修改后的文件对象进行上传
  console.log(a)
}
</script>

<style lang="scss" scoped>
.content {
  width: 1200px;
  height: 600px;
  background-color: #fff;
  border-radius: 16px;
}
.history-choose {
  height: 100px;
  width: 100px;
  background-color: #d9d9d9;
  white-space: pre-wrap; /* 在空白字符处换行 */
}
</style>
