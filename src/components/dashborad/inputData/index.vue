<template>
  <div class="contentData">
    <v-container class="container">
      <v-row no-gutters>
        <v-col>
          <v-sheet class="pa-2 ma-2">
            <h2>Upload schedule and enter optimization settings</h2>
          </v-sheet>
        </v-col>
      </v-row>

      <v-row no-gutters>
        <v-col>
          <v-sheet class="pa-2 ma-2">
            <h2>Schedule</h2>
            <h3>Upload your schedule (.xer or .xml)</h3>
          </v-sheet>
        </v-col>
        <v-col>
          <v-sheet class="pa-2 ma-2">
            <span>
              <v-btn color="rgb(42, 123, 108)" style="color: white"
                >Upload file</v-btn
              >
            </span>
            <span style="color: rgb(42, 123, 108); margin-left: 10px"
              >No file chosen</span
            >
          </v-sheet>
        </v-col>
        <v-col>
          <v-sheet class="pa-2 ma-2">
            or
            <span style="text-decoration: underline">use a demo project</span>
          </v-sheet>
        </v-col>
      </v-row>
      <v-divider></v-divider>
      <v-row no-gutters>
        <v-col>
          <v-sheet class="pa-2 ma-2">
            <h2>Constraints</h2>
            <h3>Upload your constraints (download template)</h3>
          </v-sheet>
        </v-col>
        <v-col>
          <v-sheet class="pa-2 ma-2">
            <span>
              <v-btn>Upload file</v-btn>
            </span>
            <span style="color: rgb(42, 123, 108); margin-left: 10px"
              >No file chosen</span
            >
          </v-sheet>
        </v-col>
        <v-col>
          <v-sheet class="pa-2 ma-2"> </v-sheet>
        </v-col>
      </v-row>
      <v-row no-gutters>
        <v-col>
          <v-sheet class="pa-2 ma-2">
            <h2>Optimization Settings</h2>
            <h3>Customize your optimization results</h3>
          </v-sheet>
        </v-col>
        <v-col>
          <v-sheet class="pa-2 ma-2">
            <label>Ignore Project Scheduled Dates</label>

            <v-radio-group v-model="inline" inline>
              <v-radio label="Yes" value="radio-1"></v-radio>
              <v-radio label="No" value="radio-2"></v-radio>
            </v-radio-group>
          </v-sheet>
        </v-col>
        <v-col>
          <v-sheet class="pa-2 ma-2">
            Learning Rate
            <p>
              <v-text-field variant="solo"></v-text-field>
            </p>
          </v-sheet>
        </v-col>
      </v-row>
      <v-row no-gutters>
        <v-col cols="4">
          <v-sheet class="pa-2 ma-2"> </v-sheet>
        </v-col>
        <v-col>
          <v-sheet class="pa-2 ma-2">
            Optimization Ratio (50% - 150%)
            <v-range-slider color="rgb(112, 191, 177)"></v-range-slider>
          </v-sheet>
        </v-col>
      </v-row>
      <v-row no-gutters>
        <v-col cols="4">
          <v-sheet class="pa-2 ma-2"> </v-sheet>
        </v-col>
        <v-col>
          <v-sheet class="pa-2 ma-2">
            Optimization Steps (20)
            <v-slider color="rgb(112, 191, 177)"></v-slider>
          </v-sheet>
        </v-col>
      </v-row>
      <v-row justify="space-between">
        <v-col>
          <v-sheet class="pa-2 ma-2"> </v-sheet>
        </v-col>
        <v-col>
          <v-sheet class="pa-2 ma-2"> </v-sheet>
        </v-col>
        <v-col>
          <v-sheet class="pa-2 ma-2">
           <div style="display: flex; justify-content: end;">
            <v-btn color="rgb(64, 170, 151)" style="color:white">Next</v-btn>
           </div>
          </v-sheet>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script setup></script>

<style lang="scss" scoped>
.contentData {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 60vh;
}
.main {
  width: 1200px;
}
.uploadFile {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.setting {
  .top {
    display: flex;
    justify-content: space-between;
  }
}
.container {
  max-width: 1200px;
  background: rgb(255, 255, 255);
  padding: 1px 20px 20px;
  border-radius: 16px;
}
h2 {
  font-weight: 700;
  color: #545454;
  font-size: 18px;
}
h3 {
  margin: 0px;
  color: rgb(136, 136, 136);
  font-weight: 300;
  font-size: 16px;
  line-height: 16px;
}
label {
  margin-bottom: 0px;
  font-weight: 400;
  display: flex;
  -webkit-box-align: center;
  align-items: center;
}
</style>
