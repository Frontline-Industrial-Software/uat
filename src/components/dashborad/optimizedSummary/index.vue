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
  //表格1
let chart = myEcharts.init(
    document.getElementById("myEcharts"),
    "purple-passion"
  );
  var option;
//表格1
let data01 = [
  {
      name: "per1",
      value: [7,6,5,4],
      itemStyle: {
        color: "blue",
      },
    },
    {
      name: "per2",
      value: [100,200,300,400],
      itemStyle: {
        color: "blue",
      },
    },
    {
      name: "per3",
      value: [77,88,99,111],
      itemStyle: {
        color: "blue",
      },
    },
  ];
  let data02 = [
    {
      name: "per1",
      value: [1, 2, 3, 4],
      itemStyle: {
        color: "red",
      },
    },
    {
      name: "per2",
      value: [2, 3, 20, 30],
      itemStyle: {
        color: "red",
      },
    },
    {
      name: "per3",
      value: [10, 22, 38, 400],
      itemStyle: {
        color: "red",
      },
    },
  ];
  let renderItem = (params, api) => {
    let start = api.coord([api.value(1), api.value(0)]);
    let end = api.coord([api.value(2), api.value(0)]);
    let height = api.size([0, 1])[1] * 0.5;
    let shape = echarts.graphic.clipRectByRect(
      {
        x: start[0],
        y: start[1] - height / 2,
        width: end[0] - start[0],
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
    //   type: "time",
    },
    yAxis: {
      name: "tasks",
    },
    series: [
      {
        name: "baseline",
        type: "custom",
        data: data01,
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
        data: data02,
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

//   //表格2
  let chart01 = myEcharts.init(
    document.getElementById("myEcharts01"),
    "purple-passion"
  );
 
var xAxisData = [];
var data1 = [];
var data2 = [];
for (var i = 0; i < 100; i++) {
  xAxisData.push('A' + i);
  data1.push((Math.sin(i / 5) * (i / 5 - 10) + i / 6) * 5);
  data2.push((Math.cos(i / 5) * (i / 5 - 10) + i / 6) * 5);
}
option = {
  // title: {
  //   text: 'Bar Animation Delay'
  // },
  legend: {
    data: ['bar', 'bar2']
  },
  //控制一下下载功能
  toolbox: {
    // y: 'bottom',
    feature: {
      magicType: {
        type: ['stack']
      },
      dataView: {},
      saveAsImage: {
        pixelRatio: 2
      }
    }
  },
  tooltip: {},
  xAxis: {
    data: xAxisData,
    splitLine: {
      show: false
    }
  },
  yAxis: {},
  series: [
    {
      name: 'bar',
      type: 'bar',
      data: data1,
      emphasis: {
        focus: 'series'
      },
      //动画秒数
      // animationDelay: function (idx) {
      //   return idx * 10;
      // }
    },
    {
      name: 'bar2',
      type: 'bar',
      data: data2,
      emphasis: {
        focus: 'series'
      },
      //动画秒数
      // animationDelay: function (idx) {
      //   return idx * 10 + 100;
      // }
    }
  ],
  animationEasing: 'elasticOut',
  animationDelayUpdate: function (idx) {
    return idx * 5;
  }
};
option && chart01.setOption(option);
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
        <div ref="main01" style="width:1150px; height:610px"   id="myEcharts01"></div>
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
</style>