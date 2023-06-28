<template>
    <div class="echarts-box">
      <div
        id="myEcharts"
        :style="{ width: props.firstwidth, height: props.height }"
      ></div>
    </div>
  </template>
  <script setup>
  import * as echarts from "echarts";
  import { onMounted, onUnmounted } from "vue";
  const props = defineProps({
    width: { type: String },
    height: { type: String },
    options: { type: Object },
  });
  console.log(props.options);
  let myEcharts = echarts;
  onMounted(() => {
    initChart();
  });
  onUnmounted(() => {
    myEcharts.dispose;
  });
  function initChart() {
    let chart = myEcharts.init(
      document.getElementById("myEcharts"),
      "purple-passion"
    );
    chart.setOption({...props.options, 
      dataZoom: [
        {
          type: "inside", // 内置型数据区域缩放组件
          throttle: 50, // 缩放触发的时间间隔，单位ms，默认为100_
        },
      ],
      tooltip: {
        trigger: "axis",
      },
     
    });
    window.onresize = function () {
      chart.resize();
    };
  }
  </script>
  
  