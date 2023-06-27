<template>
   <div class="content" >
    <Header/>
    <router-view></router-view>
   </div>
</template>

<script setup>
import { useRouter, useRoute,onBeforeRouteLeave } from 'vue-router'
import Header from '../header/index.vue'
</script>

<style lang="scss" scoped>
.content{
    background: rgb(240, 241, 243);
    margin: 0px;
    min-height: 100vh;
    min-width: 1200px;
}
</style> 