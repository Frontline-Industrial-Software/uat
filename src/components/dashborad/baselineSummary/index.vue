<script setup>
import { ref, onMounted, onUnmounted, watch,reactive } from "vue";
import * as echarts from "echarts";
import { useRouter } from "vue-router";
import { useCounterStore } from "../../../store";
const store = useCounterStore();
import ecStat from "echarts-stat";
import api from "../../../api/index.js";
const router = useRouter();
//页面加载创建
onMounted(() => {
  initChart();
});


// 
let radio
//页面关闭销毁
let data = store.taskData;
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
    case "Minimum Resources":
      return "rgba(219, 121, 48, 0.9)";
      break;
    case "Levelled Resources":
      return "rgba(170, 187, 93, 0.9)";
      break;
    default:
      break;
  }
}
//用来装图表数据以及一些配置项
var option = {
  // title:
  //   {
  //     text: 'Different Easing Functions',
  //     top: 'bottom',
  //     left: 'center'
  //   },
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
  // tooltip: {
  //   position: 'top'
  // },

  grid: {
    // left: 120
  },
  xAxis: {
    name: "Duration (days)",
    nameLocation: "middle",
    padding: [10],
    height: 100,
    nameTextStyle: {
      align: "center",
      padding:[30,0,0,0],
      fontWeight: 'lighter',
      fontSize:16
    },
  },
  yAxis: {
    name: "Maximum Resource (units/hour)",
    nameLocation: "end",
    nameTextStyle: {
      align: "center",
      padding:[0,0,0,100],
      fontWeight: 'lighter',
      fontSize:16
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
let myEcharts = echarts;
let chart;
function initChart() {
  chart = myEcharts.init(
    document.getElementById("myEcharts"),
    "purple-passion"
  );
  echarts.registerTransform(ecStat.transform.clustering);
  // 点击事件获取值
  chart.on("click", function (param) {
    console.log(param.data[4]);
   let datas=param.data[4]
    SummaryData.baseDuration=Math.floor(datas.baselineDurationDays)
    SummaryData.changedDuration=Math.floor(datas.projectDurationDays)
    SummaryData.changgedTasks=Math.floor(datas.changedTasksLen)
    SummaryData.TotalTasks=Math.floor(datas.baselineTasksLen)
    SummaryData.baseCriticalPath=Math.floor(datas.baselineCriticalTasksLen)
    SummaryData.changedCriticalPath=Math.floor(datas.newCriticalTasksLen)
    SummaryData.TotalResources=Math.floor(datas.totalResourceCount)
    console.log(SummaryData);
  });
}
function renderChart() {
  chart.setOption(option);
}
let selectData = {
  preset: "Balanced",
  fileName: store.file.name,
  step: 3,
};
async function nextOptimized() {
  console.log(selectData);
  let data = await api.getOptimized({ ...selectData });
  // console.log(data);
  store.selectedData=data.data;
  router.push({ name: "optimizedSummary" });
}
watch(store.taskData, () => {
  renderChart();
});
onMounted(() => {
  initChart();
  renderChart();
});
// 数据绑定
let SummaryData=reactive({
  baseDuration:12,
  changedDuration:12,
  changgedTasks:22,
  TotalTasks:22,
  baseCriticalPath:22,
  changedCriticalPath:20,
  TotalResources:1
})


</script>
<template>
  <div class="contain">
    <h2>
      Baseline Summary
      <div class="step"><span>20 steps</span></div>
      <div class="step"><span>50%-200% ratio</span></div>
    </h2>
    <div class="main">
      <div class="left">
        <div class="lefttop">
          <div>Comparison Chart</div>
          <el-button class="btn">DOWNLOAD</el-button>
        </div>
        <div class="choosebox">
          <div class="choose">
            <div style="background-color:rgb(204, 204, 204);" class="item"></div>
            <div>Baseline</div>
          </div>
          <div class="choose">
            <div style="background-color:rgba(247, 220, 91, 0.9);" class="item"></div>
            <div >Fastest</div>
          </div>
          <div class="choose">
            <div  style="background-color:rgba(219, 121, 48, 0.9);" class="item"></div>
            <div>Minimum Resources</div>
          </div>
          <div class="choose">
            <div style="background-color:rgba(170, 187, 93, 0.9);" class="item"></div>
            <div>Levelled Resources</div>
          </div>
          <div class="choose">
            <div style="background-color:rgba(130, 181, 199, 0.9);"  class="item"></div>
            <div>Balanced</div>
          </div>
        </div>
        <Echarts style="width: 700px; height: 400px" id="myEcharts"></Echarts>
      </div>
      <div class="right">
        <div class="righttop">
          <div>Project Duration 27.33%</div>
          <h1>{{SummaryData.changedDuration}} <span>{{SummaryData.baseDuration}}</span> days</h1>
          <div>Changed Tasks vs Total N of Tasks</div>
          <h1>{{SummaryData.changgedTasks}}/{{SummaryData.TotalTasks}}</h1>
          <div>Tasks on Critical Path 36.36%</div>
          <h1>{{ SummaryData.baseCriticalPath }} <span>{{SummaryData.changedCriticalPath}}</span></h1>
          <div>Total Resources</div>
          <h1>{{SummaryData.TotalResources}}</h1>
        </div>
        <div class="rightbutton">
          <h1>Optimization Presets</h1>
          <div>
            These available presets are pre-configured settings that are
            designed to deliver the best performance or quality for each
            individual specific use case.
          </div>
          <el-radio-group v-model="radio" class="radiobox">
            <el-radio :label="3"
              >Balanced Best <span>combination of the others</span></el-radio
            >
            <el-radio :label="6"
              >Fastest <span>Shortest project duration</span></el-radio
            >
            <el-radio :label="9"
              >Minimum Resources
              <span>Least amount of required resources</span></el-radio
            >
            <el-radio :label="12"
              >Minimum Resources
              <span>Least amount of required resources</span></el-radio
            >
          </el-radio-group>
        </div>
        <el-button @click="nextOptimized" class="btn" icon="el-icon-delete"
          >NEXT</el-button
        >
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.contain {
  background-color: rgb(240, 241, 243);
  height: 100vh;
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
