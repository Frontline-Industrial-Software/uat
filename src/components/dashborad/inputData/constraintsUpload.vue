<template>
  <el-upload
    class="upload-demo"
    :disabled="!store.file.name"
    action=""
    multiple
    :before-upload="beforeUpload"
    :limit="3"
  >
    <el-button
      :icon="Upload"
      :disabled="!store.file.name"
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

const beforeUpload = async (files) => {
  let a = await api.sendConstraintsFile(files, store.file.name);
  console.log(a);
  store.ConstraintsFile = a;
  console.log(store.ConstraintsFile);
  return false;
};
</script>
