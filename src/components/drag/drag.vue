<template>
  <div>
    <div
      class="drop-area"
      @drop="handleFileDrop"
      @dragover.prevent
      @dragenter.prevent
    >
      <p>Or drag them here</p>
    </div>
  </div>
</template>

<script setup>
function handleFileDrop(event) {
  event.preventDefault()
  console.log(event)
  const files = event.dataTransfer.files
  console.log(files)
  // uploadfiles(files)
}
function uploadfiles() {
  console.log(files)
}
</script>

<style lang="scss" scoped></style>
