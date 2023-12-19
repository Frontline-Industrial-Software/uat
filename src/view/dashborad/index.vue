<template>
  <div class="content">
    <Header />
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
