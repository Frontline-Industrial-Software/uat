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

const beforeUpload = async (files) => {
  store.truefile = files.name;
  store.file.size = files.size;
  let a = await api.sendFile(files);
  store.file.name = a.data.mapping[files.name];

  return false;
};

</script>
