import { defineStore, storeToRefs } from "pinia";
import { ref, computed, reactive } from "vue";

import { useRouter } from "vue-router";
import NProgress from "nprogress";
import "nprogress/nprogress.css";

const router = useRouter();
// 组合式写法
export const useCounterStore = defineStore(
  "counter",
  () => {
    // 默认设置
    let setting = reactive({
      IgnoreProject: "true",
      Rate: 0.025,
      Ratio: [0.5, 2],
      Steps: 20,
    });
    let end = reactive({ data: false });
    // 导航栏控制
    let active = ref(0);
    let port = null;
    // 后端处理项目信息
    let file = {
      name: null,
      size: null,
    };
    let ConstraintsFile = ref(null);
    // 任务数据
    let taskData = ref([]);
    let dataArray = reactive({
      baseline: { all: [], data: [] },
      Balanced: { all: [], data: [] },
      Fastest: { all: [], data: [] },
      Minimum_Resources: { all: [], data: [] },
      Levelled_Resources: { all: [], data: [] },
    });
    let selectedData = ref(null);
    // 真实文件名称
    let truefile = ref(null);
    const count = ref(0);
    let SummaryData = ref(null);
    // size大小转换函数
    function formatBytes(size) {
      if (!size) return "";
      var num = 1024.0; //byte
      if (size < num) return size + "B";
      if (size < Math.pow(num, 2)) return (size / num).toFixed(2) + "KB"; //kb
      if (size < Math.pow(num, 3))
        return (size / Math.pow(num, 2)).toFixed(2) + "MB"; //M
      if (size < Math.pow(num, 4))
        return (size / Math.pow(num, 3)).toFixed(2) + "G"; //G
      return (size / Math.pow(num, 4)).toFixed(2) + "T"; //T
    }
    // 建立websocket连接
    async function connectWebsocket() {
      const URL = "wss://api.frontline-optimizer.com/websockets";
      const socket = new WebSocket(
        // 此处填写你要连接的ws地址
        URL
      );
      // 设置请求头
      socket.onrequestheaders = (headers) => {
        headers["Content-Type"] = "application/x-www-form-urlencoded";
      };
      socket.onopen = function () {
        console.log("成功");
        // NProgress.configure({ minimum: 0.5 });
        // NProgress.start();
        NProgress.set(0.5);
        // taskData.value=[]
        /*

        
         * 连接成功
         * */
        let data = {
          fileName: file.name,
          size: formatBytes(file.size),
          setting: {
            considerActualDates: true,
            considerDataDate: true,
            optimizationSteps: setting.Steps,
            learningRate: setting.Rate,
            minDurationRatio: setting.Ratio[0],
            maxDurationRatio: setting.Ratio[1],
          },
        };

        data = JSON.stringify(data);
        if (file.name) {
          socket.send(data);
        } else {
          return;
        }

        // 发送心跳防止ws协议自动断联
      };
      socket.onclose = function () {};
      // 发送

      socket.onmessage = function (e) {
        let data = JSON.parse(JSON.parse(e?.data));
        switch (data?.result?.group) {
          case "baseline":
            if (dataArray.baseline.all.length === 0) { // 检查数组是否为空
              dataArray.baseline.all.push(data);
              dataArray.baseline.data.push([
                data.result.projectDurationDays,
                data.result.maxResourceUnit,
                data,
              ]);
            }
            break;
          case "Balanced":
            dataArray.Balanced.all.push(data);
            dataArray.Balanced.data.push([
              data.result.projectDurationDays,
              data.result.maxResourceUnit,
              data,
            ]);
            break;
          case "Fastest":
            dataArray.Fastest.all.push(data);
            dataArray.Fastest.data.push([
              data.result.projectDurationDays,
              data.result.maxResourceUnit,
              data,
            ]);
            break;
          case "Minimum_Resources":
            dataArray.Minimum_Resources.all.push(data);
            dataArray.Minimum_Resources.data.push([
              data.result.projectDurationDays,
              data.result.maxResourceUnit,
              data,
            ]);
            break;
          case "Levelled_Resources":
            dataArray.Levelled_Resources.all.push(data);
            dataArray.Levelled_Resources.data.push([
              data.result.projectDurationDays,
              data.result.maxResourceUnit,
              data,
            ]);
            break;
          default:
            break;
        }
        if (data.name && data.result?.group !== "baseline") {
          taskData.value.push([
            data.result.projectDurationDays,
            data.result.maxResourceUnit,
            data.name,
            data.result.group,
            data.result,
          ]);
        } else if (!data.name) {
          end.data = true;
          NProgress.done();
          // taskData.value=[]
        }
      };
    }
    return {
      count,
      setting,
      file,
      connectWebsocket,
      truefile,
      taskData,
      active,
      selectedData,
      end,
      SummaryData,
      dataArray,
      ConstraintsFile,
    };
  },
  {}
);
