<template>
  <div class="contain">
    <div class="box">
      <div class="mainEchar1">
        <div id="main">
          <div
            ref="main"
            style="width: 1500px; height: 610px; display: none"
            id="myEcharts"
          ></div>
          <TreeTable
            :newData="store.selectedData ? store.selectedData.tasks : []"
            :baseData="
              store.selectedData ? store.selectedData.baselineTasks : []
            "
          />
        </div>

        <!-- <Gantt/> -->
      </div>
    </div>
  </div>
</template>

<script setup>
import {
  ref,
  onMounted,
  onUnmounted,
  watch,
  watchEffect,
  computed,
  onActivated,
} from 'vue'

import Card from '@/components/card/index.vue'
import NextButton from '@/components/next/next.vue'
import * as echarts from 'echarts'
import { useRouter } from 'vue-router'
import ecStat from 'echarts-stat'
import { useCounterStore } from '@/store'
const store = useCounterStore()
const router = useRouter()
import api from '@/api/index.js'
import { onBeforeRouteLeave, onBeforeRouteUpdate } from 'vue-router'
import Dialog from '@/components/dialog/dialog.vue'
import TreeTable from './treetable.vue'

// 按钮
</script>

<style lang="scss" scoped>
.right-items {
  display: flex;
  justify-content: space-evenly;
  align-content: space-around;
  flex-wrap: wrap;
  height: 50%;
  width: 100%;
  .t-content {
    display: flex;
    justify-content: center;
    align-items: center;
    .f {
      color: #545454;
      font-weight: 700;
      font-size: 32px;
    }
  }
  .b-content {
    border-top: 1px solid #f0f1f3;
    padding: 0px 16px;
  }
  .bottom {
    color: #b5b5b5;
    // text-align: center;
    > span {
      font-weight: 700;
      font-size: 20px;
    }
  }
  .title {
    width: 100%;
    height: 15%;
    color: #b5b5b5;
    padding: 8px 16px;
  }
  .content {
    display: flex;

    flex-wrap: wrap;
    width: 100%;
    height: 80%;
    > div {
      width: 100%;
      height: 50%;
      display: flex;
      flex-wrap: wrap;
      > div {
        // background-color: #40a795;
        width: 50%;
        height: 100%;
        text-align: center;
      }
    }
  }
  .right-item {
    box-shadow: 1px 1px 20px rgba(205.06, 205.06, 205.06, 0.25);
    margin: 4px;
    box-sizing: border-box;
    background-color: #fff;
    border-radius: 16px;
    width: 48%;
    height: 49%;
    display: flex;
    flex-wrap: wrap;
  }
}
.types {
  display: flex;
  width: 1350px;
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
  display: flex;
  min-width: 100%;
}
.box {
  margin: 0 auto;
  min-width: 1400px;
  // max-width: 1400px;
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
  // border-radius: 16px;
  // width: 1200px;
  // height: 180px;
  margin-bottom: 24px;
  // padding-bottom: 30px;
  // border-radius: 15px;
  display: flex;
  justify-content: space-between;
  // background-color: #fff;
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
  // width: 1400px;
  border-radius: 16px;
  height: 1500px;
  margin-bottom: 20px;

  padding: 20px;
  border-radius: 15px;
  // background-color: #fff;
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
  width: 1400px;
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
  width: 1400px;
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
    font-size: 1rem;
  }
}
.resources-title {
  padding: 10px;
  font-weight: 600;
}
.type {
  padding-left: 5px;
}
.DateContent {
  display: flex;
  width: 100%;
  justify-content: right;
  span {
    width: 60px;
    color: black;
    text-align: center;
  }
  /* 悬停状态 */
  span:hover {
    background-color: #f0f0f0;
  }

  // /* 点击状态 */
  // span:active {
  //   background-color: #e0e0e0;
  //   color: #40a795;
  // }
}
.activeDate {
  color: #40a795 !important;
  background-color: #f0f0f0 !important;
}
#main {
  display: flex;
  justify-content: center;
  flex-wrap: nowrap;
  // flex-direction: row-reverse;
  width: 2000px;
}
</style>
