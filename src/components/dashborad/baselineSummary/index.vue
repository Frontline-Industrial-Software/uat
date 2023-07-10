<script setup>
import {
  ref,
  onMounted,
  onUnmounted,
  onBeforeUnmount,
  watch,
  reactive,
  computed,
} from "vue";
import * as echarts from "echarts";
import { useRouter } from "vue-router";
import { useCounterStore } from "../../../store";
const store = useCounterStore();
import ecStat from "echarts-stat";
import api from "../../../api/index.js";
import { onBeforeRouteLeave } from "vue-router";
onBeforeRouteLeave((to, from, next) => {
  if (to.name == "InputData") {
    clear();
  }
  next()
});

// 去百分比
function toPercent(num, total) {
  return Math.round((num / total) * 10000) / 100.0 + "%"; // 小数点后两位百分比
}
// 组件销毁时摧毁实例
function clear() {
  store.taskData = [];
  data = null;
  console.log(store.end.data);
  store.end.data = false;
  chart.dispose();
  chart.clear();
  chart = null;
}
const router = useRouter();
// 获取数据
let data = store.taskData;
// 配置项

var option = computed(() => {
  const proxyArray = store.taskData.map((e) => {
    return e[0];
  });

  const proxyArray2 = store.taskData.map((e) => {
    return e[1];
  });
  const max = parseFloat(Math.max(...proxyArray).toFixed(2));
const min = parseFloat(Math.min(...proxyArray).toFixed(2));
const max2 = parseFloat(Math.max(...proxyArray2).toFixed(2));
const min2 = parseFloat(Math.min(...proxyArray2).toFixed(2));
  return {

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
    dataset: [
      {
        transform: {
          type: "ecStat:clustering",
          // print: true,
          config: {
            //是直接显示在图表里面的
            clusterCount: CLUSTER_COUNT,
            outputType: "single",
            outputClusterIndexDimension: DIENSIION_CLUSTER_INDEX,
          },
        },
      },
    ],

    grid: {
      // left: 120
    },
    xAxis: {
      name: "Duration (days)",
      nameLocation: "middle",
      padding: [10],
      height: 100,
      min: min,
      max: max,
      nameTextStyle: {
        align: "center",
        padding: [30, 0, 0, 0],
        fontWeight: "lighter",
        fontSize: 16,
      },
    },
    yAxis: {
      name: "Maximum Resource (units/day)",
      max: max2,
      min: min2,
      nameLocation: "end",
      nameTextStyle: {
        align: "center",
        padding: [0, 0, 0, 100],
        fontWeight: "lighter",
        fontSize: 16,
      },
    },
    series: {
      type: "scatter",
      data: data,
      // encode: { tooltip: [0, 1] },
      //原点大小设置
      symbolSize: 15,
      itemStyle: {
        color: (data) => getColorByValue(data),
      },
      datasetIndex: 1, //数据集。通常默认1.有多个数据的时候才会有用
    },
  };
});

let selectData = {
  preset: "Balanced",
  fileName: store.file.name,
  step: 3,
};

// 初始化图表实例
let chart;
function initChart() {
  chart = echarts.init(document.getElementById("myEcharts"), "purple-passion");
  echarts.registerTransform(ecStat.transform.clustering);
  // 点击事件获取值
  chart.on("click", function (param) {
    let datas = param.data[4];
    selectData.preset = param.data[2].replace(/ /g, "_");
    selectData.step = param.data[4].step;
    switch (selectData.preset) {
      case "Balanced":
        radio.value = 0;
        break;
      case "Fastest":
        radio.value = 1;
        break;
      case "Minimum_Resources":
        radio.value = 2;
        break;
      case "Levelled_Resources":
        radio.value = 3;
        break;

      default:
        break;
    }
    updateData(datas);
  });
}

// 更新图表
function renderChart() {
  chart.setOption(option.value);
}
// 更新选中值
// 数据绑定
let SummaryData = reactive({
  baseDuration: 12,
  changedDuration: 12,
  changgedTasks: 22,
  TotalTasks: 22,
  baseCriticalPath: 22,
  changedCriticalPath: 20,
  TotalResources: 1,
  group: "",
});
//页面加载创建
onMounted(() => {
  initChart();
});
let radio = ref(0);

let defoultData = computed(() => {
  return [
    store.taskData.find((e) => e[4].group === "Balanced"),
    store.taskData.find((e) => e[4].group === "Fastest"),
    store.taskData.find((e) => e[4].group === "Minimum_Resources"),
    store.taskData.find((e) => e[4].group === "Levelled_Resources"),
    store.taskData.find((e) => e[4].group === "baseline"),
  ];
});

function updateData(data) {
  console.log(data);
  SummaryData.group = data.group;
  SummaryData.baseDuration = Math.floor(data.baselineDurationDays);
  SummaryData.changedDuration = Math.floor(data.projectDurationDays);
  SummaryData.changgedTasks = Math.floor(data.changedTasksLen);
  SummaryData.TotalTasks = Math.floor(data.baselineTasksLen);
  SummaryData.baseCriticalPath = Math.floor(data.baselineCriticalTasksLen);
  SummaryData.changedCriticalPath = Math.floor(data.newCriticalTasksLen);
  SummaryData.TotalResources = Math.floor(data.totalResourceCount);
}

//   //数据块的种类（比如图中有6种颜色的数据块）显示在头部里面的
var CLUSTER_COUNT = 6;
var DIENSIION_CLUSTER_INDEX = 2; //维度？
//区分不同数据的颜色
var COLOR_ALL = [
  "#37A2DA",
  "#e06343",
  "#37a354",
  "#b55dba",
  "#b5bd48",
  "#8378EA",
  "#96BFFF",
];
var pieces = [];
for (var i = 0; i < CLUSTER_COUNT; i++) {
  pieces.push({
    value: i,
    // label: 'cluster ' + i,
    color: COLOR_ALL[i],
  });
}
function getColorByValue(value) {
  // 在这里根据具体的逻辑判断来返回相应的颜色
  // 例如使用条件语句、switch语句、映射关系等
  // 下面是一个示例，根据值的范围来设置颜色
  let data = value.data[3];
  switch (data) {
    case "Balanced":
      return "rgba(130, 181, 199, 0.9)";
      break;
    case "baseline":
      return "#rgb(204, 204, 204)";
      break;
    case "Fastest":
      return "rgba(247, 220, 91, 0.9)";
      break;
    case "Minimum_Resources":
      return "rgba(219, 121, 48, 0.9)";
      break;
    case "Levelled_Resources":
      return "rgba(170, 187, 93, 0.9)";
      break;
    default:
      break;
  }
}

async function nextOptimized() {
  store.selectedData = null;
  let data = await api.getOptimized({ ...selectData }, store.file.size);
  // console.log(data);
  store.SummaryData = { ...SummaryData };
  store.selectedData = data.data;
  store.active = 2;
  router.push({ name: "optimizedSummary" });
}
watch(store.taskData, () => {
  renderChart();
});

watch(
  store.end,
  () => {
    if (store.end.data) {
      updateData(defoultData.value[0][4]);
    }
  },
  { deep: true }
);

watch(radio, () => {
  updateData(defoultData.value[radio.value][4]);
});
onMounted(() => {
  initChart();
  renderChart();
  if (store.SummaryData) {
    SummaryData.group = store.SummaryData.group;
    SummaryData.baseDuration = store.SummaryData.baseDuration;
    SummaryData.changedDuration = store.SummaryData.changedDuration;
    SummaryData.changgedTasks = store.SummaryData.changgedTasks;
    SummaryData.TotalTasks = store.SummaryData.TotalTasks;
    SummaryData.baseCriticalPath = store.SummaryData.baseCriticalPath;
    SummaryData.changedCriticalPath = store.SummaryData.changedCriticalPath;
    SummaryData.TotalResources = store.SummaryData.TotalResources;
  }
});
</script>
<template>
  <div class="contain">
    <h2>
      Baseline Summary
      <div class="step">
        <span>{{ store.setting.Steps }} steps</span>
      </div>
      <div class="step">
        <span>{{
          `${store.setting.Ratio[0] * 100}% - ${
            store.setting.Ratio[1] * 100
          }% ratio`
        }}</span>
      </div>
    </h2>
    <div class="main">
      <div class="left">
        <div class="lefttop">
          <div>Comparison Chart</div>
        </div>
        <div class="choosebox">
          <div class="choose">
            <div
              style="background-color: rgb(204, 204, 204)"
              class="item"
            ></div>
            <div>Baseline</div>
          </div>
          <div class="choose">
            <div
              style="background-color: rgba(130, 181, 199, 0.9)"
              class="item"
            ></div>
            <div>Balanced</div>
          </div>
          <div class="choose">
            <div
              style="background-color: rgba(247, 220, 91, 0.9)"
              class="item"
            ></div>
            <div>Fastest</div>
          </div>
          <div class="choose">
            <div
              style="background-color: rgba(219, 121, 48, 0.9)"
              class="item"
            ></div>
            <div>Minimum Resources</div>
          </div>
          <div class="choose">
            <div
              style="background-color: rgba(170, 187, 93, 0.9)"
              class="item"
            ></div>
            <div>Levelled Resources</div>
          </div>
        </div>
        <Echarts style="width: 700px; height: 400px" id="myEcharts"></Echarts>
      </div>
      <div class="right">
        <div class="righttop">
          <div>
            Project Duration
            {{
              toPercent(SummaryData.changedDuration, SummaryData.baseDuration)
            }}
          </div>
          <h1>
            {{ SummaryData.changedDuration }}
            <span>{{ SummaryData.baseDuration }}</span> days
          </h1>
          <div>Changed Tasks vs Total N of Tasks</div>
          <h1>
            {{ SummaryData.changgedTasks }}/
            <span>{{ SummaryData.TotalTasks }}</span>
          </h1>
          <div>
            Tasks on Critical Path

            {{
              toPercent(SummaryData.baseCriticalPath, SummaryData.TotalTasks)
            }}
          </div>
          <h1>
            {{ SummaryData.baseCriticalPath }}/
            <span>{{ SummaryData.TotalTasks }}</span>
          </h1>
          <div>Total Resources</div>
          <h1>{{ SummaryData.TotalResources }}</h1>
        </div>
        <div class="rightbutton">
          <h1>Optimization Presets</h1>
          <div>
            These available presets are pre-configured settings that are
            designed to deliver the best performance or quality for each
            individual specific use case.
          </div>
          <el-radio-group v-model="radio" class="radiobox">
            <el-radio :label="0"
              >Balanced <span>best combination of the others</span></el-radio
            >
            <el-radio :label="1"
              >Fastest <span>Shortest project duration</span></el-radio
            >
            <el-radio :label="2"
              >Minimum Resources
              <span>Least amount of required resources</span></el-radio
            >
            <el-radio :label="3"
              >Levelled Resources
              <span>Best resource distribution</span></el-radio
            >
          </el-radio-group>
        </div>
        <v-btn
          :disabled="!store.end"
          @click="nextOptimized"
          class="btn"
          icon="el-icon-delete"
          >NEXT</v-btn
        >
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.contain {
  background-color: rgb(240, 241, 243);
  height: 80vh;
}
h2 {
  width: 100%;
  height: 30px;
  margin: 0 0 20px 0;
  font-size: 24px;
  font-weight: 700;
  line-height: 30px;
  letter-spacing: -0.5px;
  display: flex;
  color: #545454;
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
.main {
  display: flex;
  justify-content: space-between;
  width: 1200px;
  .left {
    width: 768px;
    height: 630px;
    padding: 20px;
    background-color: #fff;
    border-radius: 15px;
    .lefttop {
      display: flex;
      justify-content: space-between;
      width: 100%;
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
  .right {
    width: 420px;

    .righttop {
      height: 280px;
      margin-bottom: 11px;
      padding: 20px;
      background-color: #fff;
      border-radius: 15px;
      div {
        font-size: 15px;
        font-weight: 600;
      }
      h1 {
        font-size: 28px;
        span {
          font-size: 20px;
          color: #828787;
        }
      }
    }
    .rightbutton {
      height: 270px;
      padding: 20px;
      margin-bottom: 20px;
      background-color: #fff;
      border-radius: 15px;
      div {
        font-size: 15px;
        color: #545454;
      }
      h1 {
        font-size: 28px;
      }
      .radiobox {
        align-items: flex-start;
        display: flex;
        flex-direction: column;
        justify-content: start;
        margin-top: 10px;
        span {
          color: #828787;
          font-size: 10px;
          margin-left: 5px;
        }
      }
    }
    .btn {
      width: 100%;
      height: 44px;
      line-height: 1.75;
      background: #40aa97;
      border: none;
      color: #fff;
      padding: 10px 20px;
      background: #40aa97;
      box-shadow: 1px 2px 2px #cfeae5;
      border-radius: 8px;
      font-weight: bold;
      font-size: 1rem;
    }
  }
}
</style>
