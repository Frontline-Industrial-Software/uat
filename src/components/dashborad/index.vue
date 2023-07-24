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
import { useRouter, useRoute, onBeforeRouteLeave } from "vue-router";
import Header from "../header/index.vue";
import Navigate from "../navigate/index.vue";
</script>

<style lang="scss" scoped>
.subject {
  display: flex;
  justify-content: center;
  align-items: center;
}
.content {
  background: rgb(240, 241, 243);
  margin: 0px;
  min-height: 100vh;
  min-width: 1200px;
  display: flex;
  flex-direction: column;
}
</style>
