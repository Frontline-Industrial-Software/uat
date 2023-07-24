<script setup>
import {
  ref,
  onMounted,
  onUnmounted,
  onBeforeUnmount,
  watch,
  reactive,
  computed,
  onActivated,
} from "vue";
import * as echarts from "echarts";
import { useRouter } from "vue-router";
import { useCounterStore } from "../../../store";
const store = useCounterStore();
import ecStat from "echarts-stat";
import api from "../../../api/index.js";
import { onBeforeRouteLeave } from "vue-router";
import { arrowMiddleware } from "element-plus";
import { toRaw } from '@vue/reactivity';
onBeforeRouteLeave((to, from, next) => {
  if (to.name == "InputData") {
    activeIndex.value = "Balanced1";
    radio.value = 0;
    clear();
  }
  next();
});
let selectData = reactive({
  preset: "Balanced",
  fileName: store.file.name,
  step: 3,
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
  store.end.data = false;
}
const router = useRouter();

// 数据配置项

function seriesData(name, basecolor, activecolor) {
  return {
    type: "scatter",

    selectedMode: "single",
    selectedOffset: 10,
    select: {
      scale: 2,
      itemStyle: {
        color: "#40aa97",
        borderColor: "#40aa97",
        shadowColor: "#40aa97",
        borderWidth: 10,
        shadowBlur: 30,
        opacity: 1,
        // symbolSize: 10, // 调整被选中元素的大小
      },
    },
    emphasis: {
      scale: 2,
      focus: "series",
      blurScope: "coordinateSystem",
    },

    data: store.dataArray[name].data,
    name: name,
    symbolSize: 8,

    itemStyle: {
      color: (data) => {
        return basecolor;
      },
      borderWidth: 1,
      borderColor: "#0b0f07",
      opacity: 0.5,
    },
  };
}
// !图表配置项
var option = computed(() => {
  // 获取 x 轴的最小值和最大值
  const xValues = Object.values(store.dataArray).flatMap((series) =>
    series.data.map((item) => {
      return item.value[0];
    })
  );
  const xMinValue = parseFloat((Math.min(...xValues) * 0.95).toFixed(2));
  const xMaxValue = parseFloat((Math.max(...xValues) * 1.05).toFixed(2));

  // 获取 y 轴的最小值和最大值
  const yValues = Object.values(store.dataArray).flatMap((series) =>
    series.data.map((item) => {
      return item.value[1];
    })
  );
  const yMinValue = parseFloat((Math.min(...yValues) * 0.95).toFixed(2));
  const yMaxValue = parseFloat((Math.max(...yValues) * 1.05).toFixed(2));
  return {
    toolbox: {
      show: true,
      feature: {
        dataView: { show: true, readOnly: false },
        saveAsImage: { show: true },
      },
    },

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
      min: xMinValue,
      max: xMaxValue,
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
      max: yMaxValue,
      min: yMinValue,
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

// 初始化图表实例
let chart = null;
let activeIndex = ref("Balanced1");
watch(activeIndex, () => {
  chart.setOption(option.value);
});

watch(store.dataArray, () => {
  chart.setOption(option.value);
});
// 初始化图表
function initChart() {
  if (chart == null) {
    chart = echarts.init(
      document.getElementById("myEcharts"),
      "purple-passion"
    );
  }
  echarts.registerTransform(ecStat.transform.clustering);

  // 图表点击事件获取值
  chart.on("click", function (param) {
    chart.dispatchAction({
      type: "select",
      name: param.name,
    });
    let datas = param.data.value[2].result;
    // activeIndex.value = param.name;
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
// 右侧被选中数据
let SummaryData = reactive({
  baseDuration: '-',
  changedDuration: '-',
  changgedTasks: '-',
  TotalTasks: '-',
  baseCriticalPath: '-',
  changedCriticalPath: '-',
  TotalResources: '-',
  group: "",
});

// 右侧单选框
let radio = ref(0);
// 右侧数据更新
function updateData(data) {
  SummaryData.group = data.group;
  SummaryData.baseDuration = Math.ceil(data.baselineDurationDays);
  SummaryData.changedDuration = Math.ceil(data.projectDurationDays);
  SummaryData.changgedTasks = Math.ceil(data.changedTasksLen);
  SummaryData.TotalTasks = Math.ceil(data.baselineTasksLen);
  SummaryData.baseCriticalPath = Math.ceil(data.baselineCriticalTasksLen);
  SummaryData.changedCriticalPath = Math.ceil(data.newCriticalTasksLen);
  SummaryData.TotalResources = Math.ceil(data.totalResourceCount);
}

// 按钮点击跳转
async function nextOptimized() {
  selectData.fileName = store.file.name;
  let data = await api.getOptimized({ ...selectData }, store.file.size);
  store.SummaryData = { ...SummaryData };
  store.selectedData = null;
  store.selectedData = data.data;
  store.active = 2;
  store.selectChange = true;
  router.push({ name: "optimizedSummary" });
}

// 获取4个默认选项的id
let DefaultData=ref(null)
function getDefault() {
  let DefaultDatas=[];
  for (const key in store.dataArray) {
    let data=toRaw(store.dataArray[key].data)
    data.sort((a,b)=>a.value[2].result.loss - b.value[2].result.loss)
    DefaultDatas.push(data)
  }
  return DefaultDatas
}

/* 监听所有数据是否获取完成 -------------------------------------------------------------------------- */
watch(
  store.end,
  () => {
    if (store.end.data) {
      DefaultData.value=getDefault()
      radio.value = 0;
      setTimeout(() => {
        chart.dispatchAction({
          type: "select",
          name: DefaultData.value[1][0].name,
        });
        updateData(DefaultData.value[1][2].value[2].result);
        selectData.preset = "Balanced";
        selectData.step = DefaultData.value[1][2].value[2].result.step;
      }, 0);
    }
  },
  { deep: true }
);
onActivated(() => {
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
            {{ SummaryData.changedDuration }}/
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
                  chart.dispatchAction({ type: 'select', name: DefaultData[1][0].name });
                  activeIndex =DefaultData[1][0].name;
                  selectData.preset = DefaultData[1][2].value[2].name;
                  selectData.step = DefaultData[1][2].value[2].result.step;
                  updateData(DefaultData[1][2].value[2].result);
                }
              "
              :label="0"
              >Balanced <span>Best combination of the others</span></el-radio
            >
            <el-radio
            @click="
            () => {
              chart.dispatchAction({ type: 'select', name: DefaultData[2][0].name });
              activeIndex =DefaultData[2][0].name;
              selectData.preset = DefaultData[2][2].value[2].name;
              selectData.step = DefaultData[2][2].value[2].result.step;
              updateData(DefaultData[2][2].value[2].result);
            }
          "
              :label="1"
              >Fastest <span>Shortest project duration</span></el-radio
            >
            <el-radio
              :label="2"
              @click="
                () => {
                  chart.dispatchAction({ type: 'select', name: DefaultData[3][0].name });
                  activeIndex =DefaultData[3][0].name;
                  selectData.preset = DefaultData[3][2].value[2].name;
                  selectData.step = DefaultData[3][2].value[2].result.step;
                  updateData(DefaultData[3][2].value[2].result);
                }
              "
              >Minimum Resources
              <span>Least amount of required resources</span></el-radio
            >
            <el-radio
              :label="3"
              @click="
              () => {
                chart.dispatchAction({ type: 'select', name: DefaultData[4][0].name });
                activeIndex =DefaultData[4][0].name;
                selectData.preset = DefaultData[4][2].value[2].name;
                selectData.step = DefaultData[4][2].value[2].result.step;
                updateData(DefaultData[4][2].value[2].result);
              }
            "
              >Levelled Resources
              <span>Best resource distribution</span></el-radio
            >
          </el-radio-group>
        </div>
        <v-btn
          :disabled="!store.end.data"
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
