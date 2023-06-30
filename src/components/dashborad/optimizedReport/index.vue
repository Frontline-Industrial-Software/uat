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
      <el-button class="row-btn">Export Report</el-button>
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
          <el-table
            :data="tableData"
            height="400px"
            style="width: 100%"
            :header-cell-style="{ padding: 0, background: '#F0F1F3' }"
          >
            <el-table-column width="100px">
              <template #header>
                <div class="title">
                  <span>Critical</span>
                  <div class="icon">
                    <div class="icon-sub">
                      <el-icon><Top /></el-icon>
                      <!-- <el-icon><Bottom /></el-icon> -->
                    </div>
                    <div class="icon-sub">
                      <el-icon
                        class="morefilled"
                        style="transform: rotate(90deg)"
                        ><MoreFilled
                      /></el-icon>
                    </div>
                  </div>
                </div>
              </template>
              <template #default="scope">
                <div
                  style="
                    display: flex;
                    align-items: center;
                    justify-content: center;
                  "
                >
                  <div class="circle"></div>
                </div>
              </template>
            </el-table-column>
            <el-table-column>
              <template #header>
                <div class="title">
                  <span>Critical</span>
                  <div class="icon">
                    <div class="icon-sub">
                      <el-icon><Top /></el-icon>
                    </div>
                    <div class="icon-sub">
                      <el-icon
                        class="morefilled"
                        style="transform: rotate(90deg)"
                        ><MoreFilled
                      /></el-icon>
                    </div>
                  </div>
                </div>
              </template>
              <template #default="scope">
                {{ scope.row.name }}
              </template>
            </el-table-column>
            <el-table-column>
              <template #header>
                <div class="title">
                  <span>Critical</span>
                  <div class="icon">
                    <div class="icon-sub">
                      <el-icon><Top /></el-icon>
                    </div>
                    <div class="icon-sub">
                      <el-icon
                        class="morefilled"
                        style="transform: rotate(90deg)"
                        ><MoreFilled
                      /></el-icon>
                    </div>
                  </div>
                </div>
              </template>
              <template #default="scope">
                {{ scope.row.name }}
              </template>
            </el-table-column>
            <el-table-column>
              <template #header>
                <div class="title">
                  <span>Critical</span>
                  <div class="icon">
                    <div class="icon-sub">
                      <el-icon><Top /></el-icon>
                    </div>
                    <div class="icon-sub">
                      <el-icon
                        class="morefilled"
                        style="transform: rotate(90deg)"
                        ><MoreFilled
                      /></el-icon>
                    </div>
                  </div>
                </div>
              </template>
              <template #default="scope">
                {{ scope.row.name }}
              </template>
            </el-table-column>
            <el-table-column>
              <template #header>
                <div class="title">
                  <span>Critical</span>
                  <div class="icon">
                    <div class="icon-sub">
                      <el-icon><Top /></el-icon>
                    </div>
                    <div class="icon-sub">
                      <el-icon
                        class="morefilled"
                        style="transform: rotate(90deg)"
                        ><MoreFilled
                      /></el-icon>
                    </div>
                  </div>
                </div>
              </template>
              <template #default="scope">
                {{ scope.row.name }}
              </template>
            </el-table-column>
            <el-table-column>
              <template #header>
                <div class="title">
                  <span>Critical</span>
                  <div class="icon">
                    <div class="icon-sub">
                      <el-icon><Top /></el-icon>
                    </div>
                    <div class="icon-sub">
                      <el-icon
                        class="morefilled"
                        style="transform: rotate(90deg)"
                        ><MoreFilled
                      /></el-icon>
                    </div>
                  </div>
                </div>
              </template>
              <template #default="scope">
                {{ scope.row.name }}
              </template>
            </el-table-column>
            <el-table-column>
              <template #header>
                <div class="title">
                  <span>Critical</span>
                  <div class="icon">
                    <div class="icon-sub">
                      <el-icon><Top /></el-icon>
                    </div>
                    <div class="icon-sub">
                      <el-icon
                        class="morefilled"
                        style="transform: rotate(90deg)"
                        ><MoreFilled
                      /></el-icon>
                    </div>
                  </div>
                </div>
              </template>
              <template #default="scope">
                {{ scope.row.address }}
              </template>
            </el-table-column>
          </el-table>
          <div class="pagin">
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
          </div>
        </div>
      </div>
      <!-- All Resources -->
      <div class="sub-content">
        <div class="content-row">
          <h3>All Resources</h3>
        </div>
        <!-- 表格 -->
        <div class="table">
          <el-table
            :data="tableData"
            height="400px"
            style="width: 100%"
            :header-cell-style="{ padding: 0, background: '#F0F1F3' }"
          >
            <el-table-column width="100px">
              <template #header>
                <div class="title">
                  <span>Critical</span>
                  <div class="icon">
                    <div class="icon-sub">
                      <el-icon><Top /></el-icon>
                    </div>
                    <div class="icon-sub">
                      <el-icon
                        class="morefilled"
                        style="transform: rotate(90deg)"
                        ><MoreFilled
                      /></el-icon>
                    </div>
                  </div>
                </div>
              </template>
              <template #default="scope">
                <div
                  style="
                    display: flex;
                    align-items: center;
                    justify-content: center;
                  "
                >
                  <div class="circle"></div>
                </div>
              </template>
            </el-table-column>
            <el-table-column>
              <template #header>
                <div class="title">
                  <span>Critical</span>
                  <div class="icon">
                    <div class="icon-sub">
                      <el-icon><Top /></el-icon>
                    </div>
                    <div class="icon-sub">
                      <el-icon
                        class="morefilled"
                        style="transform: rotate(90deg)"
                        ><MoreFilled
                      /></el-icon>
                    </div>
                  </div>
                </div>
              </template>
              <template #default="scope">
                {{ scope.row.name }}
              </template>
            </el-table-column>
            <el-table-column>
              <template #header>
                <div class="title">
                  <span>Critical</span>
                  <div class="icon">
                    <div class="icon-sub">
                      <el-icon><Top /></el-icon>
                    </div>
                    <div class="icon-sub">
                      <el-icon
                        class="morefilled"
                        style="transform: rotate(90deg)"
                        ><MoreFilled
                      /></el-icon>
                    </div>
                  </div>
                </div>
              </template>
              <template #default="scope">
                {{ scope.row.name }}
              </template>
            </el-table-column>
            <el-table-column>
              <template #header>
                <div class="title">
                  <span>Critical</span>
                  <div class="icon">
                    <div class="icon-sub">
                      <el-icon><Top /></el-icon>
                    </div>
                    <div class="icon-sub">
                      <el-icon
                        class="morefilled"
                        style="transform: rotate(90deg)"
                        ><MoreFilled
                      /></el-icon>
                    </div>
                  </div>
                </div>
              </template>
              <template #default="scope">
                {{ scope.row.name }}
              </template>
            </el-table-column>
            <el-table-column>
              <template #header>
                <div class="title">
                  <span>Critical</span>
                  <div class="icon">
                    <div class="icon-sub">
                      <el-icon><Top /></el-icon>
                    </div>
                    <div class="icon-sub">
                      <el-icon
                        class="morefilled"
                        style="transform: rotate(90deg)"
                        ><MoreFilled
                      /></el-icon>
                    </div>
                  </div>
                </div>
              </template>
              <template #default="scope">
                {{ scope.row.name }}
              </template>
            </el-table-column>
            <el-table-column>
              <template #header>
                <div class="title">
                  <span>Critical</span>
                  <div class="icon">
                    <div class="icon-sub">
                      <el-icon><Top /></el-icon>
                    </div>
                    <div class="icon-sub">
                      <el-icon
                        class="morefilled"
                        style="transform: rotate(90deg)"
                        ><MoreFilled
                      /></el-icon>
                    </div>
                  </div>
                </div>
              </template>
              <template #default="scope">
                {{ scope.row.name }}
              </template>
            </el-table-column>
            <el-table-column>
              <template #header>
                <div class="title">
                  <span>Critical</span>
                  <div class="icon">
                    <div class="icon-sub">
                      <el-icon><Top /></el-icon>
                    </div>
                    <div class="icon-sub">
                      <el-icon
                        class="morefilled"
                        style="transform: rotate(90deg)"
                        ><MoreFilled
                      /></el-icon>
                    </div>
                  </div>
                </div>
              </template>
              <template #default="scope">
                {{ scope.row.address }}
              </template>
            </el-table-column>
          </el-table>
          <div class="pagin">
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
          </div>
        </div>
      </div>
      <!-- Task-Resources -->
      <div class="sub-content">
        <div class="content-row">
          <h3>Task-Resources</h3>
        </div>
        <!-- 表格 -->
        <div class="table">
          <el-table
            :data="tableData"
            height="400px"
            style="width: 100%"
            :header-cell-style="{ padding: 0, background: '#F0F1F3' }"
          >
            <el-table-column width="100px">
              <template #header>
                <div class="title">
                  <span>Critical</span>
                  <div class="icon">
                    <div class="icon-sub">
                      <el-icon><Top /></el-icon>
                    </div>
                    <div class="icon-sub">
                      <el-icon
                        class="morefilled"
                        style="transform: rotate(90deg)"
                        ><MoreFilled
                      /></el-icon>
                    </div>
                  </div>
                </div>
              </template>
              <template #default="scope">
                <div
                  style="
                    display: flex;
                    align-items: center;
                    justify-content: center;
                  "
                >
                  <div class="circle"></div>
                </div>
              </template>
            </el-table-column>
            <el-table-column>
              <template #header>
                <div class="title">
                  <span>Critical</span>
                  <div class="icon">
                    <div class="icon-sub">
                      <el-icon><Top /></el-icon>
                    </div>
                    <div class="icon-sub">
                      <el-icon
                        class="morefilled"
                        style="transform: rotate(90deg)"
                        ><MoreFilled
                      /></el-icon>
                    </div>
                  </div>
                </div>
              </template>
              <template #default="scope">
                {{ scope.row.name }}
              </template>
            </el-table-column>
            <el-table-column>
              <template #header>
                <div class="title">
                  <span>Critical</span>
                  <div class="icon">
                    <div class="icon-sub">
                      <el-icon><Top /></el-icon>
                    </div>
                    <div class="icon-sub">
                      <el-icon
                        class="morefilled"
                        style="transform: rotate(90deg)"
                        ><MoreFilled
                      /></el-icon>
                    </div>
                  </div>
                </div>
              </template>
              <template #default="scope">
                {{ scope.row.name }}
              </template>
            </el-table-column>
            <el-table-column>
              <template #header>
                <div class="title">
                  <span>Critical</span>
                  <div class="icon">
                    <div class="icon-sub">
                      <el-icon><Top /></el-icon>
                    </div>
                    <div class="icon-sub">
                      <el-icon
                        class="morefilled"
                        style="transform: rotate(90deg)"
                        ><MoreFilled
                      /></el-icon>
                    </div>
                  </div>
                </div>
              </template>
              <template #default="scope">
                {{ scope.row.name }}
              </template>
            </el-table-column>
            <el-table-column>
              <template #header>
                <div class="title">
                  <span>Critical</span>
                  <div class="icon">
                    <div class="icon-sub">
                      <el-icon><Top /></el-icon>
                    </div>
                    <div class="icon-sub">
                      <el-icon
                        class="morefilled"
                        style="transform: rotate(90deg)"
                        ><MoreFilled
                      /></el-icon>
                    </div>
                  </div>
                </div>
              </template>
              <template #default="scope">
                {{ scope.row.name }}
              </template>
            </el-table-column>
            <el-table-column>
              <template #header>
                <div class="title">
                  <span>Critical</span>
                  <div class="icon">
                    <div class="icon-sub">
                      <el-icon><Top /></el-icon>
                    </div>
                    <div class="icon-sub">
                      <el-icon
                        class="morefilled"
                        style="transform: rotate(90deg)"
                        ><MoreFilled
                      /></el-icon>
                    </div>
                  </div>
                </div>
              </template>
              <template #default="scope">
                {{ scope.row.name }}
              </template>
            </el-table-column>
            <el-table-column>
              <template #header>
                <div class="title">
                  <span>Critical</span>
                  <div class="icon">
                    <div class="icon-sub">
                      <el-icon><Top /></el-icon>
                    </div>
                    <div class="icon-sub">
                      <el-icon
                        class="morefilled"
                        style="transform: rotate(90deg)"
                        ><MoreFilled
                      /></el-icon>
                    </div>
                  </div>
                </div>
              </template>
              <template #default="scope">
                {{ scope.row.address }}
              </template>
            </el-table-column>
          </el-table>
          <div class="pagin">
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
          </div>
        </div>
      </div>
      <!-- Optimization Iteration Charts -->
      <div class="box-one">
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
      </div>
    </div>
    <!-- 尾部 -->
    <div class="content-row">
      <el-button class="back">BACK</el-button>
      <el-button class="report">Export Report</el-button>
    </div>
  </div>
</template>
    
<script setup>
import Echarts from "./Echarts.vue";
import { ref, reactive } from "vue";
const childComponent = ref(null);
//数据块的种类（比如图中有6种颜色的数据块）显示在头部里面的
var CLUSTER_COUNT = 6;
var DIENSIION_CLUSTER_INDEX = 2;//维度？
//区分不同数据的颜色
var COLOR_ALL = [
  '#e61717',
  '#00beae',
  '#cccccc',
];
var pieces = [];
for (var i = 0; i < CLUSTER_COUNT; i++) {
  pieces.push({
    value: i,
    // label: 'cluster ' + i,
    color: COLOR_ALL[i]
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
const tableData = [
  {
    date: "2016-05-03",
    name: "Tom",
    address: "No. 189, Grove St, Los Angeles",
  },
  {
    date: "2016-05-02",
    name: "Tom",
    address: "No. 189, Grove St, Los Angeles",
  },
  {
    date: "2016-05-04",
    name: "Tom",
    address: "No. 189, Grove St, Los Angeles",
  },
  {
    date: "2016-05-01",
    name: "Tom",
    address: "No. 189, Grove St, Los Angeles",
  },
  {
    date: "2016-05-08",
    name: "Tom",
    address: "No. 189, Grove St, Los Angeles",
  },
  {
    date: "2016-05-06",
    name: "Tom",
    address: "No. 189, Grove St, Los Angeles",
  },
  {
    date: "2016-05-07",
    name: "Tom",
    address: "No. 189, Grove St, Los Angeles",
  },
  {
    date: "2016-05-07",
    name: "Tom",
    address: "No. 189, Grove St, Los Angeles",
  },
  {
    date: "2016-05-07",
    name: "Tom",
    address: "No. 189, Grove St, Los Angeles",
  },
  {
    date: "2016-05-07",
    name: "Tom",
    address: "No. 189, Grove St, Los Angeles",
  },
  {
    date: "2016-05-07",
    name: "Tom",
    address: "No. 189, Grove St, Los Angeles",
  },
  {
    date: "2016-05-07",
    name: "Tom",
    address: "No. 189, Grove St, Los Angeles",
  },
];
const paginData = reactive({ pageNum: 1, pageSize: 25 });
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
        .title {
          height: 56px;
          display: flex;
          align-items: center;
          color: rgba(0, 0, 0, 0.87);
          font-weight: 400;
          font-size: 0.875rem;
          letter-spacing: 0.01071em;
          cursor: pointer;
          -webkit-tap-highlight-color: transparent;
          position: relative;
          &:hover span {
            width: 20px;
            text-overflow: ellipsis;
            overflow: hidden;
            white-space: nowrap;
          }
          &:hover .icon {
            display: flex;
          }
          .icon {
            position: absolute;
            width: 80%;
            right: 0px;
            height: 25px;
            display: none;
            align-items: center;
            justify-content: space-between;
            margin-left: 10px;
            .icon-sub {
              width: 25px;
              height: 25px;
              border-radius: 50%;
              display: flex;
              justify-content: center;
              align-items: center;
              &:hover {
                background-color: rgba(0, 0, 0, 0.04);
              }
            }
          }
        }
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