<template>
  <div class="fd">
    <el-icon
      :size="20"
      class="feedBtn"
      @click="
        () => {
          dialogVisible = true
        }
      "
    >
      <Edit />
    </el-icon>
    <div class="text">FeedBack</div>
  </div>
  <el-dialog
    @close="close"
    v-model="dialogVisible"
    class="upgrade-dialog"
    title="Share Your Thoughts"
  >
    <el-input
      v-model="textarea"
      :rows="22"
      type="textarea"
      placeholder="We value your opinion! Share your feedback with us to help enhance your experience."
    />
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogVisible = false">Cancel</el-button>
        <el-button type="primary" @click="sendFeedback">Confirm</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup>
import { ref } from 'vue'
import api from '@/api/index.js'
import { useCounterStore } from '@/store'
const store = useCounterStore()
const textarea = ref('')
let dialogVisible = ref(false)
function close() {
  dialogVisible.value = false
}
async function sendFeedback() {
  console.log(store.email, getCurrentFormattedDateTime(), textarea.value)

  let res = await api.feedBack(
    store.email,
    getCurrentFormattedDateTime(),
    textarea.value,
  )
  dialogVisible.value = false
  textarea.value = ''
}

function getCurrentFormattedDateTime() {
  const currentDate = new Date()

  const year = currentDate.getFullYear()
  const month = String(currentDate.getMonth() + 1).padStart(2, '0')
  const day = String(currentDate.getDate()).padStart(2, '0')
  const hours = String(currentDate.getHours()).padStart(2, '0')
  const minutes = String(currentDate.getMinutes()).padStart(2, '0')
  const seconds = String(currentDate.getSeconds()).padStart(2, '0')

  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`
}
</script>

<style lang="scss" scoped>
.fd {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  margin-left: 4px;
  margin-top: 10px;
}
.text {
  font-size: 13px;
}
</style>
