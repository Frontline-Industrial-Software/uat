<template>
  <el-upload
    class="upload-demo"
    action=""
    multiple
    :before-upload="beforeUpload"
    :limit="3"
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
import { useCounterStore } from "../../../store";
const store = useCounterStore();
import { ref } from "vue";
import { ElMessage, ElMessageBox } from "element-plus";
import api from "../../../api/index.js";
function sanitizeFileName(fileName) {
  // 使用正则表达式替换小数点和空格为下划线，但只保留最后一个后缀前的小数点
  return fileName.replace(/[\.\s](?=.*\..*$)/g, (match, offset) => {
    // 将除了最后一个后缀前的小数点外的其他小数点和空格全部替换成下划线
    if (offset < fileName.lastIndexOf(".")) {
      return "_";
    } else {
      return match;
    }
  });
}
const beforeUpload = async (file) => {
  const originalFileName = file.name; // 保存原始文件名
  const sanitizedFileName = sanitizeFileName(originalFileName); // 使用 sanitizeFileName 处理文件名
  const modifiedFile = new File([file], sanitizedFileName, { type: file.type }); // 创建新的文件对象，修改文件名
  store.truefile = file.name;

  store.file.size = modifiedFile.size; // 使用修改后的文件对象的 size 属性
  let a = await api.sendFile(modifiedFile); // 使用修改后的文件对象进行上传
  store.file.name = a.data.mapping[sanitizedFileName];
  console.log(store.file.name,modifiedFile);
  return false;
};
</script>
