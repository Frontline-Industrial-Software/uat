<script setup>
import { ref, onMounted,onUnmounted} from "vue";
import * as echarts from 'echarts';

import ecStat from 'echarts-stat';
onMounted(() => {
  initChart();
});
onUnmounted(() => {
  myEcharts.dispose;
});
var option
let myEcharts=echarts
function initChart() {
  let chart = myEcharts.init(
    document.getElementById("myEcharts"),
    "purple-passion"
  );
  echarts.registerTransform(ecStat.transform.clustering);
  const data = [
  [3.275154, 2.957587],
  [-3.344465, 2.603513],
  [0.355083, -3.376585],
  [1.852435, 3.547351],
  [-2.078973, 2.552013],
  [-0.993756, -0.884433],
  [2.682252, 4.007573],
  [-3.087776, 2.878713],
  [-1.565978, -1.256985],
  [2.441611, 0.444826],
  [-0.659487, 3.111284],
  [-0.459601, -2.618005],
  [2.17768, 2.387793],
  [-2.920969, 2.917485],
  [-0.028814, -4.168078],
  [3.625746, 2.119041],
  [-3.912363, 1.325108],
  [-0.551694, -2.814223],
  [2.855808, 3.483301],
  [-3.594448, 2.856651],
  [0.421993, -2.372646],
  [1.650821, 3.407572],
  [-2.082902, 3.384412],
  [-0.718809, -2.492514],
  [4.513623, 3.841029],
  [-4.822011, 4.607049],
  [-0.656297, -1.449872],
  [1.919901, 4.439368],
  [-3.287749, 3.918836],
  [-1.576936, -2.977622],
  [3.598143, 1.97597],
  [-3.977329, 4.900932],
  [-1.79108, -2.184517],
  [3.914654, 3.559303],
  [-1.910108, 4.166946],
  [-1.226597, -3.317889],
  [1.148946, 3.345138],
  [-2.113864, 3.548172],
  [0.845762, -3.589788],
  [2.629062, 3.535831],
  [-1.640717, 2.990517],
  [-1.881012, -2.485405],
  [4.606999, 3.510312],
  [-4.366462, 4.023316],
  [0.765015, -3.00127],
  [3.121904, 2.173988],
  [-4.025139, 4.65231],
  [-0.559558, -3.840539],
  [4.376754, 4.863579],
  [-1.874308, 4.032237],
  [-0.089337, -3.026809],
  [3.997787, 2.518662],
  [-3.082978, 2.884822],
  [0.845235, -3.454465],
  [1.327224, 3.358778],
  [-2.889949, 3.596178],
  [-0.966018, -2.839827],
  [2.960769, 3.079555],
  [-3.275518, 1.577068],
  [0.639276, -3.41284]
];
var CLUSTER_COUNT = 6;
var DIENSIION_CLUSTER_INDEX = 2;
var COLOR_ALL = [
  '#37A2DA',
  '#e06343',
  '#37a354',
  '#b55dba',
  '#b5bd48',
  '#8378EA',
  '#96BFFF'
];
var pieces = [];
for (var i = 0; i < CLUSTER_COUNT; i++) {
  pieces.push({
    value: i,
    // label: 'cluster ' + i,
    color: COLOR_ALL[i]
  });
}
option = {
  dataset: [
    {
      source: data
    },
    {
      transform: {
        type: 'ecStat:clustering',
        // print: true,
        config: {
          clusterCount: CLUSTER_COUNT,
          outputType: 'single',
          outputClusterIndexDimension: DIENSIION_CLUSTER_INDEX
        }
      }
    }
  ],
  // tooltip: {
  //   position: 'top'
  // },
  verticalAlign: {
    options: {
      top: 'top',
      middle: 'middle',
      bottom: 'bottom'
    }
  },
  visualMap: {
    // type: 'piecewise',
    top:20,
    min: 0,
    // max: CLUSTER_COUNT,
    // left: 10,
    // splitNumber: CLUSTER_COUNT,
    // dimension: DIENSIION_CLUSTER_INDEX,
    pieces: pieces
  },
  grid: {
    // left: 120
  },
  xAxis: {},
  yAxis: {},
  series: {
    type: 'scatter',
    // encode: { tooltip: [0, 1] },
    symbolSize: 15,
    itemStyle: {
      borderColor: '#555'
    },
    datasetIndex: 1
  }
};
option && chart.setOption(option);
}
const radio = ref(3);
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
          <el-button class="btn" >DOWNLOAD</el-button>
        </div>
        <div class="choosebox">
          <div class="choose">
            <div class="item"></div>
            <div>Baseline</div>
          </div>
          <div class="choose">
            <div class="item"></div>
            <div>Fastest</div>
          </div>
          <div class="choose">
            <div class="item"></div>
            <div>Minimum Resources</div>
          </div>
          <div class="choose">
            <div class="item"></div>
            <div>Levelled Resources</div>
          </div>
          <div class="choose">
            <div class="item"></div>
            <div>Balanced</div>
          </div>
        </div>
        <!-- <Echarts :width="'400px'" :height="'400px'"   id="myEcharts" ></Echarts> -->
        <Echarts style="width:400px; height:400px"   id="myEcharts" ></Echarts>
      </div>
      <div class="right">
        <div class="righttop">
          <div>Project Duration 27.33%</div>
          <h1>125 <span>172</span> days</h1>
          <div>Changed Tasks vs Total N of Tasks</div>
          <h1>41/80</h1>
          <div>Tasks on Critical Path 36.36%</div>
          <h1>15 <span>11</span></h1>
          <div>Total Resources</div>
          <h1>8</h1>
        </div>
        <div class="rightbutton">
          <h1>Optimization Presets</h1>
          <div>
            These available presets are pre-configured settings that are
            designed to deliver the best performance or quality for each
            individual specific use case.
          </div>
          <el-radio-group v-model="radio" class="radiobox">
            <el-radio :label="3">Balanced Best <span>combination of the others</span></el-radio>
            <el-radio :label="6">Fastest <span>Shortest project duration</span></el-radio>
            <el-radio :label="9">Minimum Resources <span>Least amount of required resources</span></el-radio>
            <el-radio :label="12">Minimum Resources <span>Least amount of required resources</span></el-radio>
          </el-radio-group>
        </div>
        <el-button class="btn" icon="el-icon-delete">NEXT</el-button>
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.contain {
  height: 100vh;
}
h2 {
  width: 1200px;
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
        span{
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