<template>
  <div class="content">
    <div class="main">
      <div class="main-1">
        <h2>Upload the pojects you want to compare</h2>
        <p>Upload your schedules (.xer or .xml)</p>
        <div>
          <span>
            Uploaded:
            <span class="click-btn">Project 1, Project 2 and Project 3</span>
          </span>
          <button>Upload more files</button>
          <span class="text-btn"><Drag /></span>
        </div>
      </div>
    </div>
    <div class="main">
      <div class="main-2">
        <h2>Imput your prompt</h2>
        <p>
          Type how would you like Frontline to categorize your project tasks.
        </p>
        <div>
          <input type="text" />
          <button>Run prompt</button>
        </div>
      </div>
    </div>
    <div class="main">
      <div class="main-3">
        <h2>Categories (click button to analyse)</h2>
        <p>Analysing Project 1, Project 2 and Project 3</p>

        <div>
          <button>1</button>
          <button>2</button>
          <button>3</button>
          <button>4</button>
        </div>
      </div>
    </div>
    <div class="main"></div>
  </div>
</template>

<script setup>
import Drag from '@/components/drag/drag.vue'
</script>

<style lang="scss" scoped>
h2 {
  font-size: 24px;
  line-height: 30px;
}
p {
  font-size: 16px;
  line-height: 30px;
  color: #888888;
}
span {
  color: #888888;
}
.click-btn {
  color: #2a7b6c;
}
.text-btn {
  color: #448e81;
}
.click-btn2 {
  color: #00beae;
}
.content {
  width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  margin-top: 70px;
}
.main {
  background-color: white;
  width: 100%;
  margin: 16px 0px;
  border-radius: 16px;
  padding: 20px 20.9px;
}
</style>
