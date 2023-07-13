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
  next();
});

// 去百分比
function toPercent(num, total) {
  return Math.round((num / total) * 10000) / 100.0 + "%"; // 小数点后两位百分比
}
// 组件销毁时摧毁实例
function clear() {
  store.taskData = [];
  Object.keys(store.dataArray).forEach((key) => {
    store.dataArray[key].all = [];
    store.dataArray[key].data = [];
  });
  data = null;
  store.end.data = false;
}
const router = useRouter();
// 获取数据
let data = store.taskData;

// 配置项

function seriesData(name, basecolor, activecolor) {
  return {
    type: "scatter",
    data: store.dataArray[name].data,
    name: name,
    symbolSize: 15,
    itemStyle: {
      color: (data) => {
        if (activeIndex.value == data.seriesName + data.data[2].result.step) {
          return activecolor;
        }
        return basecolor;
      },
      borderWidth: 1,
      borderColor: "#0b0f07",
    },
  };
}

var option = computed(() => {
  const proxyArray = store.taskData.map((e) => {
    return e[0];
  });

  const proxyArray2 = store.taskData.map((e) => {
    return e[1];
  });
  const max = parseFloat((Math.max(...proxyArray) * 1.05).toFixed(2));
  const min = parseFloat((Math.min(...proxyArray) * 0.95).toFixed(2));
  const max2 = parseFloat((Math.max(...proxyArray2) * 1.05).toFixed(2));
  const min2 = parseFloat((Math.min(...proxyArray2) * 0.95).toFixed(2));
  return {
    toolbox: {
      show: true,
      feature: {
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
      top: 100,
      height: "65%",
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
        fontSize: 20,
        color: "black",
      },
    },
    yAxis: {
      name: "Maximum Resource (units/day)",
      max: max2,
      min: min2,
      padding: [10],
      nameLocation: "end",
      nameTextStyle: {
        align: "center",
        padding: [0, 0, 0, 100],
        fontWeight: "lighter",
        fontSize: 16,
        color: "black",
      },
    },
    legend: {
      itemGap: 40,

      data: [
        {
          name: "baseline",
          itemStyle: {
            color: "rgb(204, 204, 204)",
          },
        },
        {
          name: "Balanced",
          itemStyle: {
            color: "rgba(130, 181, 199, 0.9)",
          },
        },
        {
          name: "Fastest",
          itemStyle: {
            color: "rgba(247, 220, 91, 0.9)",
          },
        },
        {
          name: "Minimum_Resources",
          itemStyle: {
            color: "rgba(219, 121, 48, 0.9)",
          },
        },
        {
          name: "Levelled_Resources",
          itemStyle: {
            color: "rgba(170, 187, 93, 0.9)",
          },
        },
      ],
      x: "left",
      itemWidth: 15,
      itemHeight: 15,
    },
    series: [
      seriesData("baseline", "rgb(204, 204, 204)", "rgba(138, 24, 116)"),
      seriesData("Balanced", "rgba(130, 181, 199, 0.9)", "rgba(138, 24, 116)"),
      seriesData("Fastest", "rgba(247, 220, 91, 0.9)", "rgba(138, 24, 116)"),
      seriesData(
        "Minimum_Resources",
        "rgba(219, 121, 48, 0.9)",
        "rgba(138, 24, 116)"
      ),
      seriesData(
        "Levelled_Resources",
        "rgba(170, 187, 93, 0.9)",
        "rgba(138, 24, 116)"
      ),
    ],
  };
});

let selectData = {
  preset: "Balanced",
  fileName: store.file.name,
  step: 3,
};

// 初始化图表实例
let chart;
let activeIndex = ref("Balanced1");
watch(activeIndex,()=>{
  chart.setOption(option.value);
})
function initChart() {
  chart = echarts.init(document.getElementById("myEcharts"), "purple-passion");
  echarts.registerTransform(ecStat.transform.clustering);
  // 点击事件获取值
  chart.on("click", function (param) {
    let datas = param.data[2].result;
    activeIndex.value = param.seriesName + datas.step;
    selectData.preset = param.seriesName;
    selectData.step = datas.step;
    if (param.seriesName == "baseline") {
      selectData.preset = "Balanced";
    } else {
      selectData.preset = param.seriesName;
    }

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
  console.log(data.changedTasksLen);
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
async function nextOptimized() {
  store.selectedData = null;
  console.log(selectData);
  let data = await api.getOptimized({ ...selectData }, store.file.size);
  console.log(data);
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

onMounted(() => {
  if (chart) {
    chart.clear();
  }
  initChart();
  renderChart();
  console.log();
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
        <Echarts style="width: 720px; height: 500px" id="myEcharts"></Echarts>
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
            <el-radio
              @click="
                () => {
                  activeIndex='Balanced1'
                  updateData(defoultData[0][4]);
                }
              "
              :label="0"
              >Balanced <span>Best combination of the others</span></el-radio
            >
            <el-radio
              @click="
                () => {
                  activeIndex='Fastest1'
                  updateData(defoultData[1][4]);
                }
              "
              :label="1"
              >Fastest <span>Shortest project duration</span></el-radio
            >
            <el-radio
              :label="2"
              @click="
                () => {
                  activeIndex='Minimum_Resources1'
                  updateData(defoultData[2][4]);
                }
              "
              >Minimum Resources
              <span>Least amount of required resources</span></el-radio
            >
            <el-radio
              :label="3"
              @click="
                () => {
                  activeIndex='Levelled_Resources1'
                  updateData(defoultData[3][4]);

                }
              "
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
