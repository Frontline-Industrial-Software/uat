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
          <v-sheet class="pa-2 ma-2" >
       <div class="uploadBox">
        <Upload/>
        <span v-if="!store.file.name" style="color: rgb(42, 123, 108); margin-left: 10px"
          >No file chosen</span
        >
        <span v-else style="color: rgb(42, 123, 108); margin-left: 10px"
          >{{store.file.name}}</span
        >
       </div>
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
      <div class="disabled">
        <v-row no-gutters>
          <v-col>
            <v-sheet class="pa-2 ma-2">
              <h2>Constraints</h2>
              <h3>Upload your constraints (download template)</h3>
            </v-sheet>
          </v-col>
          <v-col>
            <v-sheet class="pa-2 ma-2">
              <div class="uploadBox">
                <Upload/>
                <span style="color: rgb(42, 123, 108); margin-left: 10px"
                  >No file chosen</span
                >
               </div>
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
  
              <v-radio-group v-model="store.setting.IgnoreProject" inline>
                <v-radio label="Yes" value="true"></v-radio>
                <v-radio label="No" value="false"></v-radio>
              </v-radio-group>
            </v-sheet>
          </v-col>
          <v-col>
            <v-sheet class="pa-2 ma-2">
              Learning Rate
              <p>
                <v-text-field v-model="store.setting.Rate"  placeholder="0.025" variant="solo">
    
                </v-text-field>
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
              {{ `Optimization Ratio(${store.setting.Ratio[0]}% -${store.setting.Ratio[1]}%)`}}
              <v-range-slider :max="200" :min="1" :step="1"  v-model="store.setting.Ratio" color="rgb(112, 191, 177)"></v-range-slider>
            </v-sheet>
          </v-col>
        </v-row>
        <v-row no-gutters>
          <v-col cols="4">
            <v-sheet class="pa-2 ma-2"> </v-sheet>
          </v-col>
          <v-col>
            <v-sheet class="pa-2 ma-2">
              Optimization Steps ({{store.setting.Steps}})
              <v-slider :step="1" v-model="store.setting.Steps" color="rgb(112, 191, 177)"></v-slider>
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
              <v-btn @click="api.sendFile" color="rgb(64, 170, 151)" style="color:white">Next</v-btn>
             </div>
            </v-sheet>
          </v-col>
        </v-row>
      </div>
      
    </v-container>
  </div>
</template>

<script setup>
import { useCounterStore } from '../../../store'
import { reactive ,ref} from "vue";
import Upload from './upload.vue'
import api from "../../../api/index.js"
const store = useCounterStore()
</script>

<style lang="scss" scoped>
.uploadBox{
display: flex;
justify-content: start;
align-items: baseline;
}
.disabled{
opacity: 0.3;}
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
  width: 1200px;
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
