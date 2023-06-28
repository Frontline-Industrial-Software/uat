<template>
    <el-upload
      v-model:file-list="fileList"
      class="upload-demo"
      action=""
      multiple
      :before-upload="beforeUpload"
      :limit="3"
      :on-exceed="handleExceed"
    >
    <el-button :icon="Upload" color="rgb(42, 123, 108)" style="color: white;" type="primary">
      Upload
    </el-button>
    </el-upload>
  </template>
  <script lang="ts" setup>
  import { Delete, Edit, Search, Share, Upload } from '@element-plus/icons-vue'
  import { ref } from 'vue'
  import { ElMessage, ElMessageBox } from 'element-plus'
  import api  from "../../../api/index.js"
  import type { UploadProps, UploadUserFile } from 'element-plus'
  
  const fileList = ref<UploadUserFile[]>([
  ])
  const beforeUpload=(file)=>{
    console.log(file);
   api.sendFile(file)
  return false
  }

  const handleExceed: UploadProps['onExceed'] = (files, uploadFiles) => {
    ElMessage.warning(
      `The limit is 3, you selected ${files.length} files this time, add up to ${
        files.length + uploadFiles.length
      } totally`
    )
  }
  
  const beforeRemove: UploadProps['beforeRemove'] = (uploadFile, uploadFiles) => {
    return ElMessageBox.confirm(
      `Cancel the transfer of ${uploadFile.name} ?`
    ).then(
      () => true,
      () => false
    )
  }
  </script>
  