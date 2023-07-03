import { defineStore, storeToRefs } from "pinia";
import { ref, computed, reactive } from "vue";
import { io } from "socket.io-client";
import { useWebSocket } from "vue-native-websocket";
// useStore 可以是 useUser、useCart 之类的任何东西
// 第一个参数是应用程序中 store 的唯一 id
// 选项式写法
// export const useCounterStore = defineStore(
//   "counter",

//   {
//     state: () => ({ count: 0 }),
//     // state: () => {
//     //   return { count: 0 }
//     // },
//     actions: {
//       increment() {
//         this.count++;
//       },
//     },
//   }
// );

// 组合式写法
export const useCounterStore = defineStore(
  "counter",
  () => {
    let setting = reactive({
      IgnoreProject: "true",
      Rate: 0.025,
      Ratio: [40, 150],
      Steps: 20,
    });
    let port = null;
    let file = {
      name: null,
      size: null,
    };
    let taskData=ref([])
    let truefile = ref(null);
    let baseData = ref([]);
    const count = ref(0);
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
    async function connectWebsocket() {
      // const URL = `ws://api.frontline-optimizer.com:${port.toString()}/`;

      // const URL = `ws://wss.frontline-optimizer.com:${port.toString()}/`;
      // const URL = `wss://ws.postman-echo.com/raw`;
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
      socket.onclose = function () {
        console.log("连接关闭");
      };
      socket.onmessage = function (e) {
        
        let data=JSON.parse(JSON.parse(e.data))
        taskData.value.push(data)
        console.log(taskData.value);
      };
      // !连接
      // socket.on("connect", () => {
      //   console.log("连接成功");
      // });
    }
    return {
      count,
      setting,
      file,
      connectWebsocket,
      truefile,
    };
  },
  {}
);
