<template>
  <div class="main">
    <div>
      <div class="box" @click="() => {navigate('inputData')}">
        <div class="circle">
          <span>1</span>
        </div>
        <span>Input Data</span>
      </div>
      <v-divider length="30px" class="invide" inset></v-divider>
    </div>
    <div class="box" @click="() => {navigate('baselineSummary')}">
      <div class="circle">
        <span>2</span>
      </div>
      <span>Baseline Summary</span>
      <v-divider length="30px" class="invide" inset></v-divider>
    </div>

    <div class="box" @click="() => {navigate('optimizedSummary')}">
      <div class="circle">
        <span>3</span>
      </div>
      <span>Optimized Summary</span>
      <v-divider length="30px" class="invide" inset></v-divider>
    </div>

    <div class="box" @click="() => {navigate('optimizedReport')}">
      <div class="circle">
        <span>4</span>
      </div>
      <span>Optimized Report</span>
    </div>
  </div>
</template>
<script setup>
import { useRouter } from "vue-router";
const router = useRouter();
function navigate(pathname) {
  router.push(`/${pathname}`);
}
</script>

<script setup></script>

<style lang="scss" scoped>
.main {
  display: flex;
  justify-content: space-around;
  align-items: center;
  margin-top: 70px;
  margin-bottom: 30px;
}
.circle {
  width: 30px;
  height: 30px;
  background-color: rgb(0, 190, 174);
  border-radius: 30px;
}
.box {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.circle {
  justify-content: center;
  display: flex;
  align-items: center;

  color: white;
}
</style>
