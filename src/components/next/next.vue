<template>
  <div @click="click" style="display: flex; justify-content: end">
    <v-btn
      :disabled="!props.disabled"
      color="rgb(64, 170, 151)"
      :style="props.style"
    >
      {{ props.title }}
    </v-btn>
  </div>
  <Login @close="closeDialogVisible" :dialogVisible="dialogVisible" />
  <Invite @close="closeinviteVisible" :dialogVisible="inviteVisible" />
</template>

<script setup>
import { ref, computed } from 'vue'
import Login from '@/components/loginbox/index.vue'
import Invite from '@/components/invite/index.vue'
import { useCounterStore } from '@/store'
const store = useCounterStore()
const props = defineProps(['title', 'disabled', 'style'])
const emits = defineEmits(['clicked'])
let dialogVisible = ref(false)
function closeDialogVisible() {
  dialogVisible.value = false
}
let inviteVisible = ref(false)
function closeinviteVisible() {
  inviteVisible.value = false
}
function click() {
  if (store.loginAndauthRequired === false) {
    // console.log('文件满足要求')
  } else {
    if (store.loginStatus === true) {
      //   console.log('用户已登录')
      if (store.isVip.auth === true) {
        // console.log('用户为付费用户')
      } else {
        // console.log('用户未付费')
        ElMessage({
          showClose: true,
          message:
            'File size exceeded, requires permission authorization. Please contact us.',
          type: 'error',
          duration: 10000,
        })
        inviteVisible.value = true
        return
      }
    } else {
      //   console.log('用户未登录')
      ElMessage({
        showClose: true,
        message: 'File size exceeded, please log in to obtain authorization.',
        type: 'error',
        duration: 10000,
      })
      dialogVisible.value = true
      return
    }
  }

  emits('clicked')
}
</script>

<style lang="scss" scoped></style>
