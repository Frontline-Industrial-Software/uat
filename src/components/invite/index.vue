<template>
  <div>
    <el-dialog
      v-model="props.dialogVisible"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      class="upgrade-dialog"
      title="Upgrade for More Benefits"
    >
      <div class="upgrade-content">
        <p>
          When the file size exceeds the limit, we invite you to upgrade to
          become an authorized user for access to greater storage space and
          additional advanced features.
        </p>
        <p>
          As an authorized user, you will benefit from the enhanced capabilities
          of frontline, ensuring better support and protection for your work or
          projects.
        </p>
        <p>
          Feel free to contact us via email at
          <a href="mailto:your.email@example.com">sales@frontlinec.com</a>
          .
        </p>
        <p class="thank-you">Thank you for your trust and support!</p>
      </div>
    </el-dialog>
  </div>
</template>

<script setup>
const props = defineProps(['dialogVisible'])
</script>

<style lang="scss" scoped>
.upgrade-dialog {
  max-width: 500px;
  text-align: center;
}

.upgrade-content {
  padding: 20px;
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
</style>
