<template>
  <div>
    <el-dialog
      v-model="props.dialogVisible"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      @close="handleCancel"
      class="upgrade-dialog"
      width="40%"
    >
      <template #header="{ close, titleId, titleClass }">
        <div class="my-header">
          <p
            style="font-size: 28px; font-weight: 700"
            :id="titleId"
            :class="titleClass"
          >
            Upgrade for More Benefits
          </p>
          <p style="color: #b5b5b5; font-size: 18px">
            The file is too big for the guest version
          </p>
        </div>
      </template>
      <div class="upgrade-content">
        <p>
          Upgrade to upload projects with more than 1000 of activities. Enjoy
          enhanced
          <a href="https://app.frontline-optimizer.com/freemium">Frontline</a>
          capabilities with better support and protection.
        </p>

        <p>
          Create an account or contact us at
          <a href="mailto:luis@frontlinec.com">luis@frontlinec.com</a>
          and
          <a href="mailto:ricky@frontlinec.com">ricky@frontlinec.com</a>
          .
        </p>
        <p>Thank you for your trust and support!</p>
      </div>
      <template #footer>
        <span class="dialog-footer">
          <span
            style="
              text-decoration: underline;
              color: #00beae;
              font-weight: 700;
              margin-right: 30px;
            "
          >
            Create an account
          </span>
          <el-button
            style="color: white; background-color: #00beae; font-weight: 700"
            type="primary"
          >
            Upload new file
          </el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
const props = defineProps(['dialogVisible'])
const emit = defineEmits(['close'])
function handleCancel() {
  emit('close')
}
</script>

<style lang="scss" scoped>
.my-header {
}
.upgrade-dialog {
  max-width: 500px;
  text-align: center;
}

.upgrade-content {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
  color: black;
  font-size: 24px;
  font-weight: 400;
  flex-wrap: wrap;
  > p {
    width: 100%;
    text-align: center;
  }
}

h2 {
  color: #3498db;
}

p {
  margin-bottom: 15px;
}

a {
  color: #2ecc71;
  text-decoration: none;
  font-weight: bold;
}

.thank-you {
  font-style: italic;
  color: #7f8c8d;
}
// 对话框圆角
.el-dialog__wrapper {
  .el-dialog {
    border-radius: 10px;
  }
}
</style>
