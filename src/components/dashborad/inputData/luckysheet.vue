<template>
  <el-dialog
    @close="
      () => {
        emit('close')
      }
    "
    width="80%"
    :fullscreen="false"
    v-model="props.open"
  >
    <v-btn
      class="upload"
      color="rgb(64, 170, 151)"
      style="color: white"
      @click="up"
    >
      Upload
    </v-btn>
    <!-- <button class="upload" >上传</button> -->
    <div class="content">
      <div id="luckysheet"></div>
      <div v-show="isMaskShow" id="tip">Downloading</div>
    </div>
  </el-dialog>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'
import { exportExcel, exportExcelfile } from '@/utils/exportSheet'
import { isFunction } from '@/utils/is'
import LuckyExcel from 'luckyexcel'
import api from '../../../api/index.js'
const props = defineProps({
  open: Boolean,
  url: Object,
})
const emit = defineEmits(['close'])
onMounted(async () => {
  // start()
})
defineExpose({ start })

async function up() {
  // console.log('上传',luckysheet.getAllSheets());
  let buffer = await exportExcelfile(luckysheet.getAllSheets(), 'constraints')
  await api.sendConstraintsFile(buffer, 'constraints')
  // console.log(buffer);
}
function start() {
  setTimeout(() => {
    const value = props.url
    // console.log(value)
    const name = 'test'
    isMaskShow.value = true
    LuckyExcel.transformExcelToLuckyByUrl(
      value,
      name,
      (exportJson, luckysheetfile) => {
        if (exportJson.sheets == null || exportJson.sheets.length == 0) {
          alert(
            'Failed to read the content of the excel file, currently does not support xls files!',
          )
          return
        }
        // console.log('exportJson', exportJson)
        jsonData.value = exportJson

        isMaskShow.value = false

        isFunction(window?.luckysheet?.destroy) && window.luckysheet.destroy()

        window.luckysheet.create({
          container: 'luckysheet', //luckysheet is the container id
          showinfobar: false,
          data: exportJson.sheets,
          title: exportJson.info.name,
          userInfo: exportJson.info.name.creator,
        })
      },
    )
  }, 0)
}

function closeSheet() {
  // 在子组件中调用 emit 方法来触发 close 事件
  emit('close')
}
const isMaskShow = ref(false)
const selected = ref('')
const jsonData = ref({})

const downloadExcel = () => {
  // const value = selected.value;;
  //
  // if(value.length==0){
  //     alert("Please select a demo file");
  //     return;
  // }
  //
  // var elemIF = document.getElementById("Lucky-download-frame");
  // if(elemIF==null){
  //     elemIF = document.createElement("iframe");
  //     elemIF.style.display = "none";
  //     elemIF.id = "Lucky-download-frame";
  //     document.body.appendChild(elemIF);
  // }
  // elemIF.src = value;
  exportExcel(luckysheet.getAllSheets(), '下载')
}

// !!! create luckysheet after mounted
// onMounted(() => {
//   luckysheet.create({
//     container: "luckysheet",
//   });
// });
</script>

<style scoped>
.upload {
  margin-bottom: 200px;
  transform: translateY(-40px);
  width: 100px;
}
.dialog {
  height: 80vh;
}
.el-dialog__header {
  height: 300px !important;
}
.content {
  margin-top: 100px;
  height: 800px;
}
#luckysheet {
  margin: 0px;
  padding: 0px;
  position: absolute;
  width: 100%;
  left: 0px;
  top: 70px;
  bottom: 0px;
}

#uploadBtn {
  font-size: 16px;
}

#tip {
  position: absolute;
  z-index: 1000000;
  left: 0px;
  top: 0px;
  bottom: 0px;
  right: 0px;
  background: rgba(255, 255, 255, 0.8);
  text-align: center;
  font-size: 40px;
  align-items: center;
  justify-content: center;
  display: flex;
}
</style>
