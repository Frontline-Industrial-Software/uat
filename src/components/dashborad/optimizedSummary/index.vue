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
    label: 'cluster ' + i,
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
  tooltip: {
    position: 'top'
  },
  visualMap: {
    type: 'piecewise',
    top: 'middle',
    min: 0,
    max: CLUSTER_COUNT,
    left: 10,
    splitNumber: CLUSTER_COUNT,
    dimension: DIENSIION_CLUSTER_INDEX,
    pieces: pieces
  },
  grid: {
    left: 120
  },
  xAxis: {},
  yAxis: {},
  series: {
    type: 'scatter',
    encode: { tooltip: [0, 1] },
    symbolSize: 15,
    itemStyle: {
      borderColor: '#555'
    },
    datasetIndex: 1
  }
};
option && chart.setOption(option);
}
const value = ref('Type to search...')
const options = [
  {
    value: 'Option1',
    label: 'Option1',
  },
  {
    value: 'Option2',
    label: 'Option2',
  },
  {
    value: 'Option3',
    label: 'Option3',
  },
  {
    value: 'Option4',
    label: 'Option4',
  },
  {
    value: 'Option5',
    label: 'Option5',
  },
]
</script>

<template>
  <div class="contain">
    <div class="box">
      <h2>
        Overview
        <span class="sp">Balanced</span>
        <div class="step"><span>20 steps</span></div>
        <div class="step"><span>50%-200% ratio</span></div>
      </h2>
      <div class="maintop">
        <div class="item">
          Project Duration (days)
          <h1>139 <span>172</span></h1>
          <div>20%</div>
        </div>
        <div class="item">
          Tasks
          <h1>58 <span>80</span></h1>
          <div>72%</div>
        </div>
        <div class="item">
          Tasks on Critical Path
          <h1>15 <span>172</span></h1>
          <div>11%</div>
        </div>
      </div>
      <div class="mainEchar1">
        <div class="Echar1top">
          <div>Comparison Chart</div>
          <el-button class="btn">DOWNLOAD</el-button>
        </div>
        <span>Overview of all tasks over time</span>
        <div class="choosebox">
          <div class="choose">
            <div class="item"></div>
            <div>Optimized</div>
          </div>
          <div class="choose">
            <div class="item"></div>
            <div>Baseline</div>
          </div>
        </div>
        <div id="main"></div>
        <div ref="main" style="width:1150px; height:610px"   id="myEcharts"></div>
      </div>

      <div class="mainEchar2">
        <div class="Echar2top">
          <div>Labor Resources</div>
          <el-button class="btn">DOWNLOAD</el-button>
        </div>
        <span>Total utilization of multiple resources over time</span>
        <div>
          <el-checkbox v-model="checked1" label="Show Optimized" size="large" />
          <el-checkbox v-model="checked2" label="Show Baseline" size="large" />
        </div>
        <div ref="main1" style="width:1150px; height:610px"></div>
        <h4>Labor Legend</h4>
        <div class="Echar2choose">
          <div class="item1">
            <el-checkbox class="check1" v-model="checked1" label="Show Optimized" size="large" />
          </div>
          <div class="item2"></div>
          <div class="item3">
            <el-select class="item3sel" placement="top" v-model="value" filterable placeholder="Select">
    <el-option class="ok"
      v-for="item in options"
      :key="item.value"
      :label="item.label"
      :value="item.value"
    />
  </el-select>
          </div>
        </div>
        <div class="Echar2foot">
          <div class="choose">
            <div class="item"></div>
            <div>Optimized</div>
          </div>
          <div class="choose">
            <div class="item"></div>
            <div>Optimized</div>
          </div>
          <div class="choose">
            <div class="item"></div>
            <div>Optimized</div>
          </div>
          <div class="choose">
            <div class="item"></div>
            <div>Optimized</div>
          </div>
        </div>
      </div>
      <div class="button">
        <el-button class="btnback">BACK</el-button>
        <el-button class="btngo">VIEW DETALED REPORT</el-button>
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.b11111 {
    width: 1150px;
    height: 610px;
    background-color: #40aa97;
  }
.contain {
  background-color: #d4d7d7;
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
    h1 {
      span {
        color: #545454;
        font-size: 22px;
      }
    }
    div {
      background: #e2f5e2;
      color: #499249;
      width: 60px;
      border-radius: 8px;
      text-align: center;
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
  height: 948px;
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
      .check1{
line-height: 36px;
      }
    }
    .item2 {
      width: 154px;
      margin-right: 7px;
      border-radius: 8px;
      border: 2px solid #dadada;
    }
    .item3{
      width: 300px;
      border-radius: 8px;
      border: 2px solid #dadada;
      .item3sel{
        width: 296px;
      }
    }
  }
  .Echar2foot{
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
</style>s