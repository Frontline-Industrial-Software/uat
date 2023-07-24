<script setup>
import {
  ref,
  onMounted,
  onUnmounted,
  watch,
  watchEffect,
  computed,
  onActivated,
} from "vue";
import * as echarts from "echarts";
import { useRouter } from "vue-router";
import ecStat from "echarts-stat";
import { useCounterStore } from "../../../store";
const store = useCounterStore();
const router = useRouter();
import api from "../../../api/index.js";
import { onBeforeRouteLeave, onBeforeRouteUpdate } from "vue-router";

onBeforeRouteLeave((to, from, next) => {
  if (to.name == "InputData") {
    clear();
  }
  next();
});
// 组件销毁时摧毁实例
function clear() {
  store.taskData = [];
  Object.keys(store.dataArray).forEach((key) => {
    store.dataArray[key].all = [];
    store.dataArray[key].data = [];
  });
  store.end.data = false;
}

onActivated(() => {
  if (store.selectChange) {
    typeActive.value = "";
    initChart();
    renderChart();
    store.selectChange = false;
  }
});
let myEcharts = echarts;

let type = ref(2);
let resourcesChart;
// 去百分比
function toPercent(num, total) {
  return Math.round((num / total) * 10000) / 100.0 + "%"; // 小数点后两位百分比
}
let criticalTask = computed(() => {
  let critical = store.selectedData.baselineTasks.filter((e) => {
    return e.critical;
  });
  return critical;
});

function initChart() {
  let changedlineTasks = [];
  // 基础任务
  let baselineTasks = store.selectedData.baselineTasks.map(
    (baselineTask, idx) => {
      // console.log(baselineTask.id);

      let newBaselineTask = store.selectedData.tasks.find(
        (task) => task.id === baselineTask.id
      );

      changedlineTasks.push(newBaselineTask);

      idx = store.selectedData.baselineTasks.length - idx;

      return {
        name: baselineTask.name,
        value: [idx, baselineTask.newStart, baselineTask.newFinish],
        itemStyle: {
          color: baselineTask.critical ? "pink" : undefined,
        },
      };
    }
  );
  // 优化任务
  changedlineTasks = changedlineTasks.map((changedlineTask, idx) => {
    // console.log(changedlineTask);
    idx = changedlineTasks.length - idx;

    return {
      id: changedlineTask.id,
      name: changedlineTask.name,
      value: [idx, changedlineTask.newStart, changedlineTask.newFinish],
      itemStyle: {
        color: changedlineTask.critical ? "red" : undefined,
      },
    };
  });

  //表格1
  let chart = myEcharts.init(
    document.getElementById("myEcharts"),
    "purple-passion"
  );
  var option;
  //表格1
  let renderItem = (params, api) => {
    let start = api.coord([api.value(1), api.value(0)]);
    let end = api.coord([api.value(2), api.value(0)]);
    let height = api.size([0, 1])[1] * 0.5;
    let shape = echarts.graphic.clipRectByRect(
      {
        x: start[0],
        y: start[1] - height / 2,
        width: Math.max(end[0] - start[0], 1),
        height: height,
      },
      params.coordSys
    );

    return (
      shape && {
        type: "rect",
        shape,
        style: api.style(),
      }
    );
  };
  option = {
    toolbox: {
      show: true,
      feature: {
        dataView: { show: true, readOnly: false },
        saveAsImage: { show: true },
      },
    },
    dataZoom: [
      {
        type: "slider",
        filterMode: "weakFilter",
        xAxisIndex: [0],
      },
      {
        type: "slider",
        filterMode: "weakFilter",
        yAxisIndex: [0],
      },
      {
        type: "inside",
        filterMode: "weakFilter",
        xAxisIndex: [0],
      },
      {
        type: "inside",
        filterMode: "weakFilter",
        yAxisIndex: [0],
      },
    ],
    legend: {
      data: ["baseline", "new"],
    },
    xAxis: {
      name: "date",
      type: "time",
      axisLabel: {
        formatter: function (value, index) {
          // 格式化成月/日，只在第一个刻度显示年份
          const customFormattedTime = convertUTCToCustomFormat(value);
          return customFormattedTime;
        },
      },
    },
    yAxis: {
      name: "tasks",
    },
    series: [
      {
        name: "baseline",
        type: "custom",
        data: baselineTasks,
        large: true,
        renderItem: renderItem,
        encode: {
          x: [1, 2],
          y: 0,
        },
      },
      {
        name: "new",
        type: "custom",
        data: changedlineTasks,
        large: true,
        renderItem: renderItem,
        encode: {
          x: [1, 2],
          y: 0,
        },
      },
    ],
    tooltip: {
      formatter: (p) => p.name,
    },
  };
  option && chart.setOption(option);
  resourcesChart = myEcharts.init(
    document.getElementById("myEcharts01"),
    "purple-passion"
  );
}
let searchData = ref("");

function groupBy(objectArray, property) {
  return objectArray.reduce(function (acc, obj) {
    let key = obj[property];
    if (!acc[key]) {
      acc[key] = [];
    }
    acc[key].push(obj);
    return acc;
  }, {});
}

let types = computed(() => {
  let data = store.selectedData.baselineResources.map((e) => {
    return { id: e.id, name: e.name, type: e.type };
  });
  // console.log(111);
  let newData = groupBy(data, "type");
  // return newData

  if (searchData.value) {
    const regex = new RegExp(searchData.value, "i");
    let filteredData = {};
    for (let key in newData) {
      filteredData[key] = newData[key].filter((e) => regex.test(e.name));
    }
    return filteredData;
  } else {
    return newData;
  }
});

// utc时间转化
function convertUTCToCustomFormat(utcTimeString) {
  const date = new Date(utcTimeString);
  // console.log(date.toISOString());
  // 自定义您希望的日期格式
  const customFormattedString = `${date.getUTCFullYear()}/${date.getUTCMonth() + 1}/${date.getUTCDate()} `;
  // ${date.getUTCHours()}:${date.getUTCMinutes()}:${date.getUTCSeconds()}
  return customFormattedString;
}

const toArray = (distribution) => {
  return distribution.xy.map((obj) => {
    const [x, y] = Object.entries(obj)[0];
    return [parseInt(x), y];
  });
};
// let baselineResources =
//   store.selectedData.baselineResources[type.value].distribution;
let baselineResources = computed(() => {
  const baselineResources = store.selectedData.baselineResources;
  if (typeActive.value) {
    const filteredArray = baselineResources.filter(
      (item) => item.id && item.id === typeActive.value
    );
    return filteredArray[0].distribution;
  } else {
    return baselineResources[1].distribution;
  }
});
let newResources = computed(() => {
  const newResources = store.selectedData.newResources;
  if (typeActive.value) {
    let datas = newResources.filter(
      (item) => item.id && item.id === typeActive.value
    );
    // console.log(datas);
    return datas[0].distribution;
  } else {
    return newResources[1].distribution;
  }
});

let resourcesOption = computed(() => {
  return {
    toolbox: {
      feature: {
        dataView: { show: true, readOnly: false },
        saveAsImage: { show: true },
      },
    },
    dataZoom: [
      {
        type: "slider",
        filterMode: "none",
        xAxisIndex: [0],
      },
      {
        type: "slider",
        filterMode: "none",
        yAxisIndex: [0],
      },
      {
        type: "inside",
        filterMode: "none",
        xAxisIndex: [0],
      },
      {
        type: "inside",
        filterMode: "none",
        yAxisIndex: [0],
      },
    ],
    tooltip: {
      trigger: "axis",
      axisPointer: {
      type: "cross", // 设置坐标轴指示器的样式为十字准星
    },
    },
    animation: false,
    legend: {
      data: ["baseline", "new"],
    },
    xAxis: {
      name: "date",
      type: "time",
      axisLabel: {
        formatter: function (value, index) {
          // 格式化成月/日，只在第一个刻度显示年份
          const customFormattedTime = convertUTCToCustomFormat(value);
          return customFormattedTime;
        },
      },
    },
    yAxis: {
      name: "units / day",
    },
    series: [
      {
        name: "baseline",
        type: "bar",
        data: toArray(baselineResources.value),
        large: true,
      },
      {
        name: "new",
        type: "bar",
        data: toArray(newResources.value),
        large: true,
      },
    ],
  };
});
function renderChart() {
  resourcesChart.setOption(resourcesOption.value);
}
watch(type, () => {
  renderChart();
});

async function nextReport() {
  router.push({ name: "OptimizedReport" });
  store.active = 3;
}
let typeActive = ref("");
function back() {
  router.push({ name: "BaselineSummary" });
  store.active = 1;
}
function chooseType(name) {
  typeActive.value = name;
}
watch(typeActive, () => {
  renderChart();
});
</script>

<template>
  <div class="contain">
    <div class="box">
      <h2>
        Overview
        <span class="sp">{{ store.SummaryData.group }}</span>
        <div class="step">
          <span>{{ store.setting.Steps }} steps</span>
        </div>
        <div class="step">
          <span>
            {{
              `${store.setting.Ratio[0] * 100}% - ${
                store.setting.Ratio[1] * 100
              }% ratio`
            }}
          </span>
        </div>
      </h2>
      <div class="maintop">
        <div class="item">
          <div class="title">Project Duration (days)</div>
          <div class="center">
            <span class="changed"
              >{{ store.SummaryData.changedDuration }}/</span
            >
            <span class="base">{{ store.SummaryData.baseDuration }}</span>
          </div>
          <div class="bottom">
            {{
              toPercent(
                store.SummaryData.changedDuration,
                store.SummaryData.baseDuration
              )
            }}
          </div>
        </div>
        <div class="item">
          <div class="title">Tasks</div>
          <div class="center">
            <span class="changed">{{ store.SummaryData.changgedTasks }}/</span>
            <span class="base">{{ store.SummaryData.TotalTasks }}</span>
          </div>
          <div class="bottom">
            {{
              toPercent(
                store.SummaryData.changgedTasks,
                store.SummaryData.TotalTasks
              )
            }}
          </div>
        </div>
        <div class="item">
          <div class="title">Tasks on Critical Path</div>
          <div class="center">
            <span class="changed">{{ criticalTask.length }}/</span>
            <span class="base">{{
              store.selectedData.baselineTasks.length
            }}</span>
          </div>
          <div class="bottom">
            {{
              toPercent(
                criticalTask.length,
                store.selectedData.baselineTasks.length
              )
            }}
          </div>
        </div>
      </div>
      <div class="mainEchar1">
        <div class="Echar1top">
          <div>Comparison Chart</div>
        </div>
        <span>Overview of all tasks over time</span>
        <div class="choosebox">
          <div class="choose">
            <div style="background-color: #b0e054" class="item"></div>
            <div>Optimized</div>
          </div>
          <div class="choose">
            <div style="background-color: #5474c4" class="item"></div>
            <div>Baseline</div>
          </div>
          <div class="choose">
            <div style="background-color: red" class="item"></div>
            <div>Critical Path</div>
          </div>
          <div class="choose">
            <div style="background-color: pink" class="item"></div>
            <div>Critical Path(baseline)</div>
          </div>
        </div>
        <div id="main"></div>
        <div
          ref="main"
          style="width: 1150px; height: 610px"
          id="myEcharts"
        ></div>
      </div>

      <div class="mainEchar2">
        <div class="Echar2top">
          <div>Labor Resources</div>
        </div>
        <span>Total utilization of multiple resources over time</span>

        <el-input v-model="searchData" placeholder="Search Resources" />
        <div v-for="(item, key) in types">
          <div>
            {{ key }}
          </div>
          <div class="types">
            <div v-for="(items, i) in item" :key="i" class="type">
              <v-btn
                variant="text"
                :value="i"
                :class="{ activeType: typeActive == items.id }"
                @click="
                  () => {
                    chooseType(items.id);
                  }
                "
              >
                {{ items.name }} {{ items.type }}</v-btn
              >
            </div>
          </div>
        </div>
        <div
          ref="main01"
          style="width: 1150px; height: 610px"
          id="myEcharts01"
        ></div>
      </div>
      <div class="button">
        <el-button @click="back" class="btnback">BACK</el-button>
        <el-button @click="nextReport" class="btngo"
          >VIEW DETALED REPORT</el-button
        >
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.types {
  display: flex;
  width: 1100px;
  flex-wrap: wrap;
  overflow-y: auto;
  min-width: 100px;
  max-height: 300px;
  .type {
    margin-bottom: 20px;
  }
}
.activeType {
  color: #fff;
  background-color: #40a795;
}
.b11111 {
  width: 1150px;
  height: 610px;
  background-color: #40aa97;
}
.contain {
  background-color: rgb(240, 241, 243);
  height: 100%;
}
.box {
  margin: 0 auto;
  width: 1200px;
}
h2 {
  width: 1200px;
  height: 30px;
  margin: 20px 0 20px 0;
  font-size: 24px;
  font-weight: 700;
  line-height: 30px;
  letter-spacing: -0.5px;
  display: flex;
  color: #545454;
  .sp {
    color: rgba(130, 181, 199, 0.9);
    margin-left: 10px;
  }
  .step {
    color: #ffffff;
    background: #40a795;
    border-radius: 16px;
    padding: 0 12px;
    font-size: 12px;
    font-weight: normal;
    margin: 0 5px;
  }
}
.maintop {
  border-radius: 16px;
  width: 1200px;
  height: 148px;
  margin-bottom: 30px;
  border-radius: 15px;
  display: flex;
  justify-content: space-between;
  background-color: #fff;
  .item {
    width: 290px;
    height: 148px;
    padding: 20px;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    .title {
      font-size: 14px;
    }
    .center {
      font-size: 40px;

      .changed {
        color: rgb(0, 0, 0);
      }
      .base {
        color: rgb(136, 136, 136);
      }
    }
    .bottom {
      background: rgb(226, 245, 226);
      color: rgb(73, 146, 73);
      border-radius: 8px;
      font-size: 12px;
    }
  }
}
.mainEchar1 {
  width: 1200px;
  border-radius: 16px;
  height: 750px;
  margin-bottom: 20px;
  background-color: #545454;
  padding: 20px;
  border-radius: 15px;
  background-color: #fff;
  .Echar1top {
    display: flex;
    justify-content: space-between;
    width: 100%;
    font-size: 22px;
    font-weight: 700;
    .btn {
      color: #40aa97;
      border: 0;
      background: #eaf5f3;
      height: 44px;
      width: 136px;
      box-shadow: 1px 2px 2px rgba(207, 234, 229, 0.25);
    }
  }
  span {
    color: #b5b5b5;
    font-size: 16px;
  }
  .choosebox {
    display: flex;
  }
  .choose {
    display: flex;
    margin-top: 20px;
    margin-left: 10px;
    font-size: 10px;
    .item {
      width: 16px;
      height: 16px;
      background: #cccccc;
      border-radius: 50%;
      margin-right: 5px;
    }
  }
}
.mainEchar2 {
  width: 1200px;
  border-radius: 16px;
  min-height: 800px;
  margin-bottom: 20px;
  border-radius: 15px;
  background-color: #fff;
  padding: 20px;
  .Echar2top {
    display: flex;
    justify-content: space-between;
    width: 100%;
    font-size: 22px;
    font-weight: 700;
    .btn {
      color: #40aa97;
      border: 0;
      background: #eaf5f3;
      height: 44px;
      width: 136px;
      box-shadow: 1px 2px 2px rgba(207, 234, 229, 0.25);
    }
  }
  span {
    color: #b5b5b5;
    font-size: 16px;
  }

  .Echar2choose {
    width: 1160px;
    height: 40px;
    display: flex;
    margin-top: 15px;
    height: 36px;

    .item1 {
      width: 154px;
      margin-right: 7px;
      border-radius: 8px;
      border: 2px solid;
      padding: 0 10px 0 10px;
      .check1 {
        line-height: 36px;
      }
    }
    .item2 {
      width: 154px;
      margin-right: 7px;
      border-radius: 8px;
      border: 2px solid #dadada;
    }
    .item3 {
      width: 300px;
      border-radius: 8px;
      border: 2px solid #dadada;
      .item3sel {
        width: 296px;
      }
    }
  }
  .Echar2foot {
    display: flex;
    flex-wrap: wrap;
    .choose {
      width: 162px;
      height: 20px;
      display: flex;
      margin-top: 20px;
      margin-left: 10px;
      font-size: 10px;
      .item {
        width: 16px;
        height: 16px;
        background: #cccccc;
        border-radius: 50%;
        margin-right: 5px;
      }
    }
  }
}
.button {
  width: 1200px;
  height: 44px;
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
  margin-bottom: 50px;
  .btnback {
    text-align: center;
    width: 98px;
    height: 44px;
    padding: 10px 20px;
    background: #fff;
    box-shadow: 1px 2px 2px #cfeae5;
    border-radius: 8px;
    color: #40aa97;
    font-weight: bold;
    font-size: 1rem;
    text-align: center;
  }
  .btngo {
    height: 44px;
    padding: 10px 20px;
    background: #40aa97;
    box-shadow: 1px 2px 2px #cfeae5;
    border-radius: 8px;
    color: #fff;
    line-height: 44px;
    font-size: 1rem;
  }
}
</style>
