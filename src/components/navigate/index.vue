<template>
  <div class="main">
    <div class="steps">
      <el-steps
        :align-center="true"
        :active="store.active"
        finish-status="success"
      >
        <el-step
          @click="navigate(text[0], 0)"
          :title="$t('navigator.input_data')"
        />
        <el-step
          @click="navigate(text[1], 1)"
          :title="$t('navigator.baseline_summary')"
        />
        <el-step
          @click="navigate(text[2], 2)"
          :title="$t('navigator.optimized_summary')"
        />
        <el-step
          @click="navigate(text[3], 3)"
          :title="$t('navigator.optimized_report')"
        />
      </el-steps>
    </div>
  </div>
</template>
<script setup>
import { useRouter } from "vue-router";
import { ref } from "vue";
import { useCounterStore } from "../../store";
const store = useCounterStore();
const text = [
  "dashboard/inputData",
  "dashboard/baselineSummary",
  "dashboard/optimizedSummary",
  "dashboard/optimizedReport",
];

const router = useRouter();
function navigate(pathname, number) {
  // console.log(pathname);
  switch (pathname) {
    case "dashboard/inputData":
      router.push(`/${pathname}`);
      store.active = number;
      break;
    case "dashboard/baselineSummary":
      if (store.dataArray['baseline'].all.length != 0) {
        router.push(`/${pathname}`);
        store.active = number;
      }

      break;
    case "dashboard/optimizedSummary":
      if (store.selectedData) {
        router.push(`/${pathname}`);
        store.active = number;
      }

      break;
    case "dashboard/optimizedReport":
      if (store.selectedData) {
        router.push(`/${pathname}`);
        store.active = number;
      }
      break;
    default:
      break;
  }
  // if (store.taskData.length != 0) {
  //   if (
  //     pathname != "dashboard/baselineSummary" ||
  //     pathname != "dashboard/inputData"
  //   ) {
  //     if (!store.selectedData) {
  //       return;
  //     }
  //   }
  //   router.push(`/${pathname}`);
  //   store.active = number;
  // }
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
.steps {
  width: 1200px;
  margin-top: 30px;
  margin-bottom: 20px;
}
</style>
