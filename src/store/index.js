import { defineStore } from "pinia";
import { ref, computed, reactive } from "vue";
import { io } from "socket.io-client";

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
    let file = {
      data: null,
      name: null,
    };
    let truefile=ref(null)
    let baseData=ref([])
    const count = ref(0);

   async function  connectWebsocket() {
      const URL ="ws://70f626fa.r5.cpolar.top/websockets";
      const socket = io(URL);
      // !连接
      socket.on("connect", () => {
        console.log("连接成功");
      });
    }
    return {
      count,
      setting,
      file,
      connectWebsocket,
      truefile
    };
  },
  {}
);
