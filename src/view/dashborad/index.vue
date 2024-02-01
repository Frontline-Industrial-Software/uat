<template>
  <div class="content">
    <Navigate />
    <div class="subject">
      <router-view v-slot="{ Component }">
        <keep-alive exclude="optimizedReport">
          <component :is="Component" />
        </keep-alive>
      </router-view>
    </div>
  </div>
</template>

<script setup>
import { useRouter, useRoute, onBeforeRouteLeave } from 'vue-router'
import Header from '@/components/header/index.vue'
import Navigate from '@/components/navigate/index.vue'
import { useCounterStore } from '@/store'
import { ElMessage } from 'element-plus'
import {
  ref,
  onMounted,
  onUnmounted,
  onBeforeUnmount,
  watch,
  reactive,
  computed,
  onActivated,
  watchEffect,
} from 'vue'
const router = useRouter()
const store = useCounterStore()
watch(store.codeControl, () => {
  if (!store.codeControl.isBol) {
    router.push(`/dashboard/inputdata`)
    ElMessage.error({
      message: store.codeControl.data.error,
      duration: 0,
      showClose: true,
    })
  }
})
</script>

<style lang="scss" scoped>
.subject {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 50px;
}
.subject > * {
  flex-shrink: 0;
}
.content {
  background: rgb(240, 241, 243);
  margin: 0px;
  min-height: 100vh;
  // min-width: 1600px;
  // display: flex;
  // flex-direction: column;
}
.header {
  height: 90px;
  width: 100%;
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px;
}
</style>
