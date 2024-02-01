<template>
  <div class="content">
    <div id="luckysheets"></div>
    <div v-show="isMaskShow" id="tip">Waiting</div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { exportExcel } from '@/utils/exportSheet'
import { isFunction } from '@/utils/is'
import LuckyExcel from 'luckyexcel'
import { useCounterStore } from '@/store'
import api from '@/api/index.js'

const store = useCounterStore()
const props = defineProps({
  url: Object,
})

async function getexcelUrl() {
  if (store.SummaryData.group == 'baseline') {
    store.SummaryData.group = 'Balanced'
  }
  let Url = `${store.SummaryData.group}-${
    store.file.name.split('.')[0]
  }_FrontlineExport.${store.file.name.split('.')[1]}`
  // excelUrl.value = await api.getUrl(Url, store.truefile)
  let a = await api.getUrl(Url, store.truefile)
  return a
}
// function splitArrayIntoGroups(arr, groupSize) {
//   const result = []
//   for (let i = 0; i < arr.length; i += groupSize) {
//     result.push(arr.slice(i, i + groupSize))
//   }
//   return result
// }
function splitArrayIntoGroups(arr, elementsPerGroup) {
  const result = []

  for (let i = 0; i < arr.length; i += elementsPerGroup) {
    // 将每个小数组添加到结果数组中
    result.push(arr.slice(i, i + elementsPerGroup))
  }

  return result
}

// 定义一个函数，用于依次渲染数据
function renderDataSequentially(invideData, index) {
  if (index < invideData.length) {
    let data = [...invideData[index]]
    let updateRange = `A${index * data.length + 1}:BH${
      (index + 1) * data.length
    }`
    luckysheet.setRangeValue(data, { range: updateRange })
    // 延迟0.3秒后执行下一次渲染
    setTimeout(() => {
      renderDataSequentially(invideData, index + 1)
    }, 300)
  }
}
onMounted(async () => {
  const value = await getexcelUrl()

  const name = 'test'
  isMaskShow.value = true
  setTimeout(() => {
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
        console.log(window.luckysheet)
        console.log(luckysheet)
        isFunction(window?.luckysheet?.destroy) && window.luckysheet.destroy()
        let allData = exportJson.sheets[0].celldata
        allData = window.luckysheet.transToData(allData)
        let invideData = splitArrayIntoGroups(allData, 1000)
        exportJson.sheets[0].celldata = []
        exportJson.sheets[0].row = allData.length
        luckysheet.create({
          container: 'luckysheets', //luckysheet is the container id
          showinfobar: false,
          data: exportJson.sheets,
          title: exportJson.info.name,
          userInfo: exportJson.info.name.creator,
          editable: false,
        })
        renderDataSequentially(invideData, 0)
      },
    )
  }, 0)
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
  position: relative;
}
#luckysheets {
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
