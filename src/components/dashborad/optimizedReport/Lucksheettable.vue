<template>
  <div class="content">
    <div id="luckysheet"></div>
    <div v-show="isMaskShow" id="tip">Downloading</div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { exportExcel } from '@/utils/exportSheet'
import { isFunction } from '@/utils/is'
import LuckyExcel from 'luckyexcel'
const props = defineProps({
  url: Object,
})
// console.log(props.url);
// const emit = defineEmits(['close'])
onMounted(async () => {
  setTimeout(() => {
    const value = props.url

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
  }, 1000)
})
const isMaskShow = ref(false)
const selected = ref('')
const jsonData = ref({})

const loadExcel = (evt) => {
  const files = evt.target.files
  if (files == null || files.length == 0) {
    alert('No files wait for import')
    return
  }

  let name = files[0].name
  let suffixArr = name.split('.'),
    suffix = suffixArr[suffixArr.length - 1]
  if (suffix != 'xlsx') {
    alert('Currently only supports the import of xlsx files')
    return
  }
  luckyExcelInstance.loading(false)
  LuckyExcel.transformExcelToLucky(
    files[0],
    function (exportJson, luckysheetfile) {
      if (exportJson.sheets == null || exportJson.sheets.length == 0) {
        alert(
          'Failed to read the content of the excel file, currently does not support xls files!',
        )
        return
      }
      // console.log('exportJson', exportJson)
      jsonData.value = exportJson

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
}
const selectExcel = (evt) => {
  const value = selected.value
  const name = evt.target.options[evt.target.selectedIndex].innerText
  // console.log(value, name)
  if (value == '') {
    return
  }
  isMaskShow.value = true
  LuckyExcel.transformExcelToLucky(
    value,
    function (exportJson, luckysheetfile) {
      if (exportJson.sheets == null || exportJson.sheets.length == 0) {
        alert(
          'Failed to read the content of the excel file, currently does not support xls files!',
        )
        return
      }
      window.luckysheet.destroy()
      window.luckysheet.create({
        container: 'luckysheet', //luckysheet is the container id
        showinfobar: false,
        data: exportJson.sheets,
        title: exportJson.info.name,
        userInfo: exportJson.info.name.creator,
      })
    },
  )
  // LuckyExcel.transformExcelToLuckyByUrl(
  //   value,
  //   name,
  //   (exportJson, luckysheetfile) => {
  //     if (exportJson.sheets == null || exportJson.sheets.length == 0) {
  //       alert(
  //         'Failed to read the content of the excel file, currently does not support xls files!',
  //       )
  //       return
  //     }
  //     // console.log('exportJson', exportJson)
  //     jsonData.value = exportJson

  //     isMaskShow.value = false

  //     isFunction(window?.luckysheet?.destroy) && window.luckysheet.destroy()

  //     window.luckysheet.create({
  //       container: 'luckysheet', //luckysheet is the container id
  //       showinfobar: false,
  //       data: exportJson.sheets,
  //       title: exportJson.info.name,
  //       userInfo: exportJson.info.name.creator,
  //     })
  //   },
  // )
}
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
.el-dialog__header {
  height: 300px !important;
}
.content {
  margin-top: 20px;
}
#luckysheet {
  height: 95vh;
}

#uploadBtn {
  font-size: 16px;
}

#tip {
  background: rgba(255, 255, 255, 0.8);
  text-align: center;
  font-size: 40px;
  align-items: center;
  justify-content: center;
  display: flex;
}
</style>
