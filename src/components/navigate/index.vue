<template>
  <div class="main">
   <div class="steps">
    <el-steps  :align-center="true" :active="store.active" finish-status="success">
      <el-step  @click="navigate(text[0],0)" title="Input Data" />
      <el-step @click="navigate(text[1],1)" title="Baseline Summary" />
      <el-step @click="navigate(text[2],2)" title="Optimized Summary" />
      <el-step @click="navigate(text[3],3)" title="Optimized Report" />
    </el-steps>
   </div>

  </div>
</template>
<script setup>
import { useRouter } from "vue-router";
import { ref } from 'vue'
import { useCounterStore } from '../../store'
const store = useCounterStore()
const text=['dashboard/inputData','dashboard/baselineSummary','dashboard/optimizedSummary','dashboard/optimizedReport']

const router = useRouter();
function navigate(pathname,number) {
  if (store.taskData.length!=0) {

    router.push(`/${pathname}`);
  store.active = number
  }

}

</script>

<script setup></script>

<style lang="scss" scoped>

:deep(.el-step__head.is-success) {
  color: rgb(64, 167, 149);
  border-color: rgb(64, 167, 149);
}
.main {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 30px;
}
.steps{
 width: 1200px;
 margin-top: 30px;
 margin-bottom: 20px;
}
</style>
    
<!-- <div class="contentBox">
  <div class="box" @click="() => {navigate('inputdata')}">
    <div class="circle actived">
      <span >1</span>
      
    </div>
    <span class="text">Input Data</span>
    
  </div>
<div class="box" :class="{}" @click="() => {navigate('baselineSummary')}">
  <div class="circle waiting">
    <span >2</span>
  </div>
  <span class="text">Baseline Summary</span>
  <v-divider length="30px" class="invide" inset></v-divider>
</div>

<div class="box" @click="() => {navigate('optimizedSummary')}">
  <div class="circle waiting">
    <span>3</span>
  </div>
  <span class="text">Optimized Summary</span>
 
</div>

<div class="box" @click="() => {navigate('optimizedReport')}">
  <div class="circle waiting">
    <span>4</span>
  </div>
  <span class="text">Optimized Report</span>
</div>
</div> -->