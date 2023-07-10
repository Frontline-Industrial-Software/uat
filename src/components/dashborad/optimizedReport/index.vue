<template>
  <div class="optimize-content">
    <!-- 头部 -->
    <div class="content-row">
      <h2>
        Detailed Report&nbsp;
        <span
          style="text-transform: capitalize; color: rgba(130, 181, 199, 0.9)"
          >Balanced</span
        >
        <div class="chip primary"><small>20 steps</small></div>
        <div class="chip primary"><small>50% - 200% ratio</small></div>
      </h2>
      <el-button @click="exportReport" class="row-btn">Export Report</el-button>
    </div>
    <!-- 内容区 -->
    <div class="content-box">
      <!-- Changed Tasks -->
      <div class="sub-content">
        <div class="content-row">
          <h3>Changed Tasks (Overview)</h3>
        </div>
        <div class="legend">
          <div
            style="
              display: flex;
              justify-content: flex-start;
              align-items: center;
              margin-right: 10px;
            "
          >
            <div class="circle critical"></div>
            Critical
          </div>
          <div
            style="
              display: flex;
              justify-content: flex-start;
              align-items: center;
            "
          >
            <div class="circle"></div>
            Non-Critical
          </div>
        </div>
        <!-- 表格 -->
        <div class="table">
          <Table :tableOptions="tableOptions"></Table>
        </div>
      </div>
      <!-- All Resources -->
      <div class="sub-content">
        <div class="content-row">
          <h3>All Resources</h3>
        </div>
        <!-- 表格 -->
        <div class="table">
          <Table :tableOptions="tableOptions2"></Table>
        </div>
      </div>
      <!-- Task-Resources -->
      <div class="sub-content">
        <div class="content-row">
          <h3>Task-Resources</h3>
        </div>
        <!-- 表格 -->
        <div class="table">
          <Table :tableOptions="tableOptions3"></Table>
          <!-- <div class="pagin">
            <span style="margin-right: 10px">Rows per page:</span>
            <el-pagination
              v-model:current-page="paginData.pageNum"
              v-model:page-size="paginData.pageSize"
              :page-sizes="[25, 50, 100]"
              :small="small"
              :disabled="disabled"
              :background="background"
              layout="sizes, prev, pager, next"
              :total="1000"
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
            />
          </div> -->
        </div>
      </div>
      <!-- Optimization Iteration Charts -->
      <!-- <div class="box-one">
        <div class="content-row">
          <h2>Optimization Iteration Charts</h2>
        </div>
        <div
          v-for="(item, index) in optionsData.one"
          :key="index"
          class="chart"
        >
          <div class="chart-title">
            <h4 class="chart-text">Project Duration</h4>
          </div>
          <div class="legend">
            <div class="item">
              <div
                style="
                  width: 14px;
                  height: 14px;
                  background: rgb(230, 23, 23);
                  margin-right: 5px;
                  border-radius: 50%;
                "
              ></div>
              <div>Step Selected</div>
            </div>
            <div class="item">
              <div
                style="
                  width: 14px;
                  height: 14px;
                  background: rgb(0, 190, 174);
                  margin-right: 5px;
                  border-radius: 50%;
                "
              ></div>
              <div>Constraints Satisfied</div>
            </div>
            <div class="item">
              <div
                style="
                  width: 14px;
                  height: 14px;
                  background: rgb(204, 204, 204);
                  margin-right: 5px;
                  border-radius: 50%;
                "
              ></div>
              <div>Constraints Violated</div>
            </div>
          </div>
          <Echarts :options="item" ref="childComponent"></Echarts>
        </div>
      </div>

      <div class="box-two">
        <div class="content-row">
          <h2>Resources Plots</h2>
        </div>
        <div
          v-for="(item, index) in optionsData.two"
          :key="index"
          class="chart"
        >
          <div class="chart-title">
            <h4 class="chart-text">Resources Plots</h4>
          </div>
          <Echarts :options="item" ref="childComponent"></Echarts>
        </div>
      </div> -->
    </div>
    <!-- 尾部 -->
    <div class="content-row">
      <el-button class="back">BACK</el-button>
      <el-button @click="exportReport" class="report">Export Report</el-button>
    </div>
  </div>
</template>

<script setup>
import Table from "./Table.vue";
import Echarts from "./Echarts.vue";
import { ref, reactive, computed } from "vue";
import { toRaw } from "@vue/reactivity";
import { data } from "@/utils/constants"; //数据要删
import { useCounterStore } from "../../../store";
import { onBeforeRouteLeave, onBeforeRouteUpdate } from "vue-router";
function downloadFile(url) {
  const link = document.createElement("a");
  link.href = url;
  link.download = `${store.truefile.split(".")[0]}.${store.file.name.split(".")[1]}`;
  // console.log(`${store.truefile.split(".")[0]}.${store.file.name.split(".")[1]}`);
  link.style.display = "none";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
function exportReport(){
  let Url = `https://api.frontline-optimizer.com/fileDownload/reports/${store.SummaryData.group}-${store.file.name.split(".")[0]}_FrontlineExport.${store.file.name.split(".")[1]}`;
  downloadFile(Url);

}
onBeforeRouteLeave((to, from) => {
  if (to.name=='InputData') {
    clear()
  }
    })
    // 组件销毁时摧毁实例
function clear() {
  store.taskData=[]
}
const store = useCounterStore();
let changedTask = store.selectedData.tasks.map((e) => {
  if (!e.critical) {
    e.critical = false;
  } else {
    e.critical = true;
  }
  return {
    Critical: e.critical,
    Code: e.ID,
    Name: e.name,
    "Duration(Baseline)": e.remainingDuration,
    "Duration(New)": e.newDuration,
    Ratio: e.durationRatio,
  };
});
let allResources = store.selectedData.newResources.map((e) => {
  return {
    ID: e.id,
    Code: e.ID,
    Type: e.type,
    Name: e.name,
    Distribution: e.distribution.min,
    Max: e.distribution.max,
    Span: e.distribution.span,
  };
});
let TaskResource = computed(() => {
  let TaskResources = store.selectedData.tasks.filter((e) => {
    let length = Object.keys(e.resources).length;
    return length !== 0; // 返回 resources 不为空的任务对象
  });

  let TaskResourcesData = TaskResources.flatMap((e) => {
    
    let resources = Object.values(e.resources);
    let taskobj = store.selectedData.tasks.find((obj) => obj.id == e.id);

    return resources.map((resource) => ({
      Critical: taskobj.critical,
      "Task Code": taskobj.ID,
      "Resource Name": store.selectedData.newResources.find((obj) => obj.id == resource.resourceId)?.name,
      "Task Name": taskobj.name,
      "Duration(Old)": taskobj.plannedDuration,
      "Duration(New)": taskobj.newDuration,
      "Utils(Old)": resource.plannedUnitsPerHour,
      "Utils(New)": resource.newUnitsPerHour,
      "ToTal Planned Units": resource.remainingUnits,
    }));
  });

  return TaskResourcesData;
});

// TaskResources = store.selectedData.tasks.filter((e) => {
//   let length = Object.keys(e.resources).length;
//   return length !== 0; // 返回 resources 不为空的任务对象
// });
// let TaskResourcesData=[]
// TaskResources=TaskResources.map((e)=>{
// for (const key in e.resources) {
//  let taskobj= store.selectedData.tasks.find((obj)=>{
//     return obj.id==e.resources[key].taskId
//   })
//   let resourceobj=store.selectedData.newResources.find((obj)=>{
//     return obj.id==e.resources[key].resourceId
//   })
//   e.resources[key].resourceId=resourceobj
//   e.resources[key].taskId=taskobj
//   // e.resources[key].resourceId
//   TaskResourcesData.push( e.resources[key])

// }
// })
// TaskResources=TaskResourcesData.map((e)=>{console.log(e);
//   if (!e.taskId.critical) {
//     e.taskId.critical=false;
//   }else{
//     e.taskId.critical=true;
//   }
// return {
//     Critical:e.taskId.critical,
//     "Task Code":e.taskId.ID,
//     "Resource Name":e.resourceId.name,
//     "Task Name":e.taskId.name,
//     "Duration(Old)":e.taskId.plannedDuration,
//     "Duration(New)":e.taskId.newDuration,
//     'Utils(Old)':e.plannedUntisPerHour,
//     'Utils(Nes)':e.newUnitsPerHour,
//     'ToTal Planned Units':e.remainingUnits
// }
// })
// console.log(TaskResources);

const childComponent = ref(null);
//数据块的种类（比如图中有6种颜色的数据块）显示在头部里面的
var CLUSTER_COUNT = 6;
var DIENSIION_CLUSTER_INDEX = 2; //维度？
//区分不同数据的颜色
var COLOR_ALL = ["#e61717", "#00beae", "#cccccc"];
var pieces = [];
for (var i = 0; i < CLUSTER_COUNT; i++) {
  pieces.push({
    value: i,
    // label: 'cluster ' + i,
    color: COLOR_ALL[i],
  });
}
const optionsData = ref({
  one: [
    {
      title: {
        text: "Duration (days)",
      },
      xAxis: {
        name: "asfdfsda",
      },
      yAxis: {},
      series: [
        {
          type: "scatter",
          data: [
            [10, 5],
            [0, 8],
            [6, 10],
            [2, 12],
            [8, 9],
          ],
        },
      ],
    },
    {
      xAxis: {},
      yAxis: {},
      series: [
        {
          type: "scatter",
          data: [
            [10, 5],
            [0, 8],
            [6, 10],
            [2, 12],
            [8, 9],
          ],
        },
      ],
    },
  ],
  two: [
    {
      //   title: {
      //     text: "Duration (days)",
      //   },
      xAxis: {
        axisLabel: {
          text: "Optimization steps",
        },
      },
      yAxis: {},
      series: [
        {
          type: "scatter",
          data: [
            [10, 5],
            [0, 8],
            [6, 10],
            [2, 12],
            [8, 9],
          ],
        },
      ],
    },
    {
      xAxis: {},
      yAxis: {},
      series: [
        {
          type: "scatter",
          data: [
            [10, 5],
            [0, 8],
            [6, 10],
            [2, 12],
            [8, 9],
          ],
        },
      ],
    },
  ],
});
//表格
const tableOptions = reactive({
  data: changedTask,
  colWidths: [100, 245, 250, 150, 170, 170],
  colHeaders: [
    "Critical",
    "Code",
    "Name",
    "Duration(Baseline)",
    "Duration(New)",
    "Ratio",
  ],
  tableName: "one",
});
const tableOptions2 = reactive({
  data: allResources,
  colWidths: [100, 245, 250, 250, 100, 200,100,100],
  colHeaders: ["ID", "Code", "Type", "Name", "Distribution", "Max", "Span"],
  tableName: "two",
});
const tableOptions3 = reactive({
  data: TaskResource.value,
  colWidths: [100, 245, 250, 150, 100, 100,100,100,100],
  colHeaders: [
    "Critical",
    "Task Code",
    "Resource Name",
    "Task Name",
    "Duration(Old)",
    "Duration(New)",
    "Utils(Old)",
    "Utils(Nes)",
    "ToTal Planned Units",
  ],
  tableName: "three",
});
</script>

<style lang="scss" scoped>
.optimize-content {
  margin: 20px auto;
  width: 1200px;
  max-width: 100%;
  border-radius: 6px;
  .content-row {
    width: 100%;
    display: flex;
    -webkit-box-pack: justify;
    justify-content: space-between;
    -webkit-box-align: center;
    align-items: center;
    margin-bottom: 20px;
    h2 {
      font-size: 24px;
      font-weight: 700;
      font-family: "Inter", sans-serif;
      line-height: 30px;
      letter-spacing: -0.5px;
      display: flex;
      color: #545454;
      .chip {
        display: inline-flex;
        border-radius: 16px;
        padding: 0 12px;
        white-space: nowrap;
        font-weight: normal;
        background: #dadada;
        margin: 0 5px;
        small {
          font-size: 12px;
        }
      }
      .chip.primary {
        color: #ffffff;
        background: #40a795;
      }
    }
    .row-btn {
      color: #40aa97 !important;
      border: 0 !important;
      background: #eaf5f3 !important;
      box-shadow: 1px 2px 2px rgba(207, 234, 229, 0.25) !important;
      border-radius: 8px !important;
      min-width: 100px !important;
      width: auto !important;
      font-weight: bold !important;
      text-transform: uppercase !important;
      font-size: 1rem !important;
      font-family: "Inter", sans-serif !important;
      line-height: 1.75;
      letter-spacing: 0.02857em;
      padding: 10px 20px !important;
      &:hover {
        background: #eaf5f3 !important;
        box-shadow: 1px 2px 2px rgba(207, 234, 229, 0.25),
          inset 1px 1px 5px #c2dad6 !important;
      }
    }
    .back {
      height: 40px;
      color: #40aa97 !important;
      border: 0 !important;
      background: #fff !important;
      border-radius: 8px !important;
      min-width: 100px !important;
      width: auto !important;
      font-weight: bold !important;
      text-transform: uppercase !important;
      font-size: 1rem !important;
      font-family: "Inter", sans-serif !important;
      line-height: 1.75;
      letter-spacing: 0.02857em;
      padding: 10px 20px !important;
      &:hover {
        background: #ffffff !important;
        box-shadow: inset 1px 1px 5px #e8e8e8 !important;
      }
    }
    .report {
      height: 40px;
      color: #fff !important;
      border: 0 !important;
      background: #40aa97 !important;
      box-shadow: 1px 2px 2px rgba(207, 234, 229, 0.25) !important;
      border-radius: 8px !important;
      min-width: 100px !important;
      width: auto !important;
      font-weight: bold !important;
      text-transform: uppercase !important;
      font-size: 1rem !important;
      font-family: "Inter", sans-serif !important;
      line-height: 1.75;
      letter-spacing: 0.02857em;
      padding: 10px 20px !important;
      &:hover {
        background: #258372 !important;
        box-shadow: 1px 2px 2px #cfeae5, inset 2px 3px 5px rgba(0, 0, 0, 0.25) !important;
      }
    }
  }
  .content-box {
    width: 100%;
    .sub-content {
      background: #ffffff;
      margin-bottom: 40px;
      padding: 20px;
      border-radius: 16px;
      .table {
        border: 1px solid rgba(224, 224, 224, 1);
        border-radius: 4px;
        color: rgba(0, 0, 0, 0.87);
        .pagin {
          height: 52px;
          display: flex;
          align-items: center;
          justify-content: flex-end;
        }
      }
    }
    .box-one {
      margin-top: 60px;
      width: 100%;
      display: flex;
      flex-wrap: wrap;
      align-items: flex-start;
      justify-content: space-between;
      margin-bottom: 20px;
      -webkit-box-pack: justify;
    }
    .box-two {
      width: 100%;
      display: flex;
      flex-wrap: wrap;
      align-items: flex-start;
      justify-content: space-between;
      margin-bottom: 20px;
      -webkit-box-pack: justify;
    }
    .content-row {
      width: 100%;
      display: flex;
      -webkit-box-pack: justify;
      justify-content: space-between;
      -webkit-box-align: center;
      align-items: center;
      margin-bottom: 20px;
      h2 {
        font-size: 24px;
        font-weight: 700;
        font-family: "Inter", sans-serif;
        line-height: 30px;
        letter-spacing: -0.5px;
        display: flex;
        color: #545454;
      }
    }
    .row-btn {
      color: #40aa97 !important;
      border: 0 !important;
      background: #eaf5f3 !important;
      box-shadow: 1px 2px 2px rgba(207, 234, 229, 0.25) !important;
      border-radius: 8px !important;
      min-width: 100px !important;
      width: auto !important;
      font-weight: bold !important;
      text-transform: uppercase !important;
      font-size: 1rem !important;
      font-family: "Inter", sans-serif !important;
      line-height: 1.75;
      letter-spacing: 0.02857em;
      padding: 10px 20px !important;
      &:hover {
        background: #eaf5f3 !important;
        box-shadow: 1px 2px 2px rgba(207, 234, 229, 0.25),
          inset 1px 1px 5px #c2dad6 !important;
      }
    }
    .chart {
      margin-bottom: 20px;
      background: #ffffff;
      border-radius: 16px;
      padding: 20px;
      width: 46%;
      .chart-title {
        position: relative;
        text-align: center;
        display: flex;
        align-items: center;
        justify-content: space-between;
        .chart-text {
          width: 100%;
          text-align: left;
          font-size: 18px;
          font-family: "Lato", sans-serif;
          line-height: 20px;
        }
      }
      .svg {
        width: 100%;
        height: 400px;
        overflow: hidden;
      }
    }
  }
}
</style>
