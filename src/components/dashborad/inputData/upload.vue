<template>
  <el-upload
  :disabled="!checkData?.auth"
    class="upload-demo"
    action=""
    multiple
    :before-upload="beforeUpload"
    :limit="3"
    @click="check"
  >
    <el-button
      :icon="Upload"
      color="rgb(42, 123, 108)"
      style="color: white"
      type="primary"
    >
      Upload
    </el-button>
  </el-upload>
</template>
<script setup>
import { Delete, Edit, Search, Share, Upload } from "@element-plus/icons-vue";
import { Amplify, Auth } from "aws-amplify";
import { useCounterStore } from "../../../store";
const store = useCounterStore();
import { ref,computed } from "vue";
import { ElMessage, ElMessageBox } from "element-plus";
import api from "../../../api/index.js";
function sanitizeFileName(fileName) {
  // 找到最后一个小数点的位置
  const lastDotIndex = fileName.lastIndexOf('.');
  // 如果找到小数点，则替换除了最后一个小数点之前的所有符号为下划线
  if (lastDotIndex !== -1) {
    return fileName.replace(/[^\w\d](?=.*\..*$)/g, (match, offset) => {
      // 将除了最后一个小数点之前的符号替换成下划线
      if (offset < lastDotIndex) {
        return "_";
      } else {
        return match;
      }
    });
  }
  // 如果没有小数点，则直接替换所有符号为下划线
  return fileName.replace(/[^\w\d]/g, "_");
}
// let checkData=computed(async ()=>{

//   console.log(bol.auth);
// return bol.auth
// })
let checkData=ref()
setTimeout(async () => {
  const userInfo = await Auth.currentAuthenticatedUser();
  let bol=await api.checkUser(userInfo.attributes.email)
  checkData.value=bol
}, 0);

// let checkData=ref(bol)
// console.log(checkData.value);
async function check(){
  // const userInfo = await Auth.currentAuthenticatedUser();
  // if (userInfo.attributes.email) {
  //  let bol=await api.checkUser(userInfo.attributes.email)

   if (checkData.value.auth) {
   }else{
    ElMessage.error(`${checkData.value.message} only use demo`)
  }
  // }
}


const beforeUpload = async (file) => {

  const originalFileName = file.name; // 保存原始文件名
  const sanitizedFileName = sanitizeFileName(originalFileName); // 使用 sanitizeFileName 处理文件名
  const modifiedFile = new File([file], sanitizedFileName, { type: file.type }); // 创建新的文件对象，修改文件名
  store.truefile = file.name;

  store.file.size = modifiedFile.size; // 使用修改后的文件对象的 size 属性
  let a = await api.sendFile(modifiedFile); // 使用修改后的文件对象进行上传
  
  store.file.name = a.data.mapping[sanitizedFileName];
  // 上传成功后清除之前文件并还原
  if (a.data.mapping[sanitizedFileName]) {
    store.newUpload=true
  }
  // clear()

  console.log(store.file.name,modifiedFile);
  return false;
};
</script>
