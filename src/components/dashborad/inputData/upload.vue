<template>
    <el-upload
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
  <script  setup>
  import { Delete, Edit, Search, Share, Upload } from '@element-plus/icons-vue'
  import { useCounterStore } from '../../../store'
  const store = useCounterStore()
  import { ref } from 'vue'
  import { ElMessage, ElMessageBox } from 'element-plus'
  import api  from "../../../api/index.js"

  

  const beforeUpload=(files)=>{
    console.log(files);
    store.file.name=files.name;
   api.sendFile(files)
  return false
  }

  const handleExceed = (files, uploadFiles) => {
    ElMessage.warning(
      `The limit is 3, you selected ${files.length} files this time, add up to ${
        files.length + uploadFiles.length
      } totally`
    )
  }
  
  const beforeRemove = (uploadFile, uploadFiles) => {
    return ElMessageBox.confirm(
      `Cancel the transfer of ${uploadFile.name} ?`
    ).then(
      () => true,
      () => false
    )
  }
  </script>
  