<template>
  <el-dialog
    @close="close"
    v-model="props.feedback"
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
const props = defineProps(['feedback'])
const emits = defineEmits(['close'])

const textarea = ref('')
let dialogVisible = ref(false)
function close() {
  emits('close')
}
async function sendFeedback() {
  let res = await api.feedBack(
    store.email,
    getCurrentFormattedDateTime(),
    textarea.value,
  )
  emits('close')
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
  margin-top: 10px;
}
.text {
  font-size: 13px;
}
.hover-effect {
  transition: background-color 0.3s; /* 添加过渡效果 */
  border-radius: 5px;
  padding: 10px;
}

.hover-effect:hover {
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
}
</style>
