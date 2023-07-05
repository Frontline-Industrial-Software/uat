<template>
  <div ref="echart" class="svg"></div>
</template>
    
<script setup lang='ts'>
import * as echarts from "echarts";
import "echarts/dist/echarts";
import { onMounted, onUnmounted, ref } from "vue";
let myEcharts = echarts;
const props = defineProps(["options"]);
const echart = ref(null);
//组件挂载
onMounted(() => {
  initChart();
});
//组件卸载
// onUnmounted(() => {
//   myEcharts.dispose();
// });
//渲染
const initChart=()=> {
  let chartDom = echart.value;
  const chartData = props.options;
  const optionsData = {
    ...chartData,
    xAxis: {
      name: chartData.xAxis.name,
      nameLocation: "middle",
      nameGap: 30,
      nameTextStyle: {
        fontSize: 24,
      },
    },
    tooltip: {
      trigger: "axis",
    },
    toolbox: {
      show: true,
      feature: {
        dataZoom: {
          yAxisIndex: "none",
        },
        dataView: { show: true, readOnly: false },
        saveAsImage: { show: true },
      },
    },
    dataZoom: [
      {
        type: "inside", // 内置型数据区域缩放组件
        throttle: 50, // 缩放触发的时间间隔，单位ms，默认为100_
      },
    ],
  };
  let chartInstance = myEcharts.init(chartDom);
  optionsData && chartInstance.setOption(optionsData);
}
</script>
    
<style scoped>
.svg {
  width: 100%;
  height: 400px;
}
</style>