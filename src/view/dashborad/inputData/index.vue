<template>
  <div class="contentData">
    <v-container class="container">
      <v-row no-gutters>
        <v-col>
          <v-sheet class="pa-2 ma-2">
            <h2>{{ $t('inputData.title') }}</h2>
          </v-sheet>
        </v-col>
      </v-row>

      <v-row no-gutters>
        <v-col>
          <v-sheet class="pa-2 ma-2">
            <h2>{{ $t('inputData.oneData[0]') }}</h2>
            <h3>{{ $t('inputData.oneData[1]') }}</h3>
          </v-sheet>
        </v-col>
        <v-col>
          <v-sheet class="pa-2 ma-2">
            <div class="uploadBox">
              <Upload />
              <span
                v-if="!store.file.name"
                style="color: rgb(42, 123, 108); margin-left: 10px"
              >
                {{ $t('inputData.oneData[3]') }}
              </span>
              <span v-else style="color: rgb(42, 123, 108); margin-left: 10px">
                {{ store.truefile }}
              </span>
            </div>
          </v-sheet>
        </v-col>
        <v-col>
          <v-sheet class="pa-2 ma-2">
            {{ $t('inputData.oneData[4]') }}
            <span
              @click="uploadDemo()"
              style="text-decoration: underline; cursor: pointer"
            >
              {{ $t('inputData.oneData[5]') }}
            </span>
          </v-sheet>
        </v-col>
      </v-row>
      <v-divider></v-divider>
      <div :class="{ disabled: !store.file.name }">
        <v-row :disabled="!store.file.name" no-gutters>
          <v-col>
            <v-sheet class="pa-2 ma-2">
              <h2>{{ $t('inputData.twoData[0]') }}</h2>
              <h3>
                {{ $t('inputData.twoData[1]') }}
                <span
                  style="cursor: pointer; text-decoration: underline"
                  @click="downloadTemplate"
                >
                  {{ $t('inputData.twoData[2]') }}
                </span>
              </h3>
            </v-sheet>
          </v-col>
          <v-col>
            <v-sheet class="pa-2 ma-2">
              <div class="uploadBox">
                <ConstraintsUpload />
                <span style="color: rgb(42, 123, 108); margin-left: 10px">
                  {{ store.ConstraintsFile }}
                </span>
              </div>
              <div
                @click="
                  () => {
                    openSheet()
                  }
                "
              >
                {{ $t('Online editing') }}
              </div>
            </v-sheet>
          </v-col>
          <v-col>
            <v-sheet class="pa-2 ma-2"></v-sheet>
          </v-col>
        </v-row>
        <v-row no-gutters>
          <v-col>
            <v-sheet class="pa-2 ma-2">
              <h2>{{ $t('inputData.threeData[0]') }}</h2>
              <h3>{{ $t('inputData.threeData[1]') }}</h3>
            </v-sheet>
          </v-col>
          <v-col>
            <v-sheet class="pa-2 ma-2">
              <label>{{ $t('inputData.threeData[2]') }}</label>

              <v-radio-group
                :disabled="!store.file.name"
                v-model="store.setting.IgnoreProject"
                inline
              >
                <v-radio
                  :label="$t('inputData.threeData[3]')"
                  :value="true"
                ></v-radio>
                <v-radio
                  :label="$t('inputData.threeData[4]')"
                  :value="false"
                ></v-radio>
              </v-radio-group>
            </v-sheet>
          </v-col>

          <v-col>
            <v-sheet class="pa-2 ma-2">
              {{ $t('inputData.threeData[5]') }}
              <p>
                <v-text-field
                  :disabled="!store.file.name"
                  density="compact"
                  v-model="store.setting.Rate"
                  placeholder="0.025"
                  variant="outlined"
                ></v-text-field>
              </p>
            </v-sheet>
          </v-col>
        </v-row>
        <v-row no-gutters>
          <v-col></v-col>
          <v-col>
            <v-sheet class="pa-2 ma-2">
              <el-tooltip class="box-item" effect="dark" placement="top-end">
                <template #content>
                  <h4 style="color: white">False:</h4>
                  Tasks without explicitly assigned resources will not receive
                  any default resource allocation.
                  <br />

                  <h4 style="color: white">Any:</h4>
                  Any task without a specified resource will automatically be
                  allocated a default Labor resource at a rate of 1.0 unit per
                  hour.
                  <br />

                  <h4 style="color: white">All:</h4>
                  Default Labor resources are assigned to tasks only when there
                  are no existing resource or role definitions or when no tasks
                  are explicitly assigned to resources or roles.
                </template>
                <label>
                  {{ $t('How To Handle Tasks Without Resources?') }}
                </label>
              </el-tooltip>

              <el-select
                v-model="store.setting.considerDefaultResourceType"
                class="m-2"
                style="width: 300px"
                placeholder="Select"
                size="large"
              >
                <el-option
                  label="All:Fill default resource for all tasks"
                  value="all"
                />

                <el-option
                  label="Any:Fill default resource for unassigned tasks"
                  value="any"
                />
                <el-option
                  label="False:No default resource filled"
                  value="false"
                />
              </el-select>
            </v-sheet>
          </v-col>
          <v-col>
            <v-sheet class="pa-2 ma-2">
              <el-tooltip class="box-item" effect="dark" placement="top-end">
                <template #content>
                  <h4 style="color: white">Adjust task duration:</h4>
                  This option involves modifying the actual time required to
                  complete a task, aiming to align it with the available
                  resources.
                  <br />
                  For instance, this could mean shortening or extending the
                  duration of a task to fit within the constraints of the
                  available resources.
                  <br />
                  <h4 style="color: white">Adjust task-task lag:</h4>
                  This option revolves around altering the time gap between
                  tasks, ensuring a more reasonable schedule for the waiting
                  time between tasks considering the limitations in available
                  resources.
                  <br />
                  This adjustment might involve delaying the start time of the
                  subsequent task to accommodate the existing resource
                  constraints.
                  <br />
                </template>
                <label>
                  {{ $t('Method To Satisfy Resource Constraints') }}
                </label>
              </el-tooltip>
              <el-select
                v-model="store.setting.resourceConstraint"
                class="m-3"
                placeholder="Select"
                size="large"
                style="width: 300px"
              >
                <el-option label="Adjust task duration" :value="false" />
                <el-option label="Adjust task-task lag" :value="`lag`" />
                <el-option label="Adjust task-task logic " :value="`logic`" />
              </el-select>
            </v-sheet>
          </v-col>
        </v-row>
        <v-row no-gutters>
          <v-col cols="4">
            <v-sheet class="pa-2 ma-2"></v-sheet>
          </v-col>
          <v-col>
            <v-sheet class="pa-2 ma-2">
              {{
                `${$t('inputData.fourData[0]')}(${Math.floor(
                  store.setting.Ratio[0] * 100,
                )}% - ${Math.floor(store.setting.Ratio[1] * 100)}%)`
              }}

              <v-range-slider
                :disabled="!store.file.name"
                :max="10"
                :min="0.1"
                :step="0.1"
                v-model="store.setting.Ratio"
                color="rgb(112, 191, 177)"
              ></v-range-slider>
            </v-sheet>
          </v-col>
        </v-row>
        <v-row no-gutters>
          <v-col cols="4">
            <v-sheet class="pa-2 ma-2"></v-sheet>
          </v-col>
          <v-col>
            <v-sheet class="pa-2 ma-2">
              {{ $t('inputData.fiveData[0]') }} ({{ store.setting.Steps }})
              <v-slider
                :disabled="!store.file.name"
                :step="1"
                v-model="store.setting.Steps"
                color="rgb(112, 191, 177)"
              ></v-slider>
            </v-sheet>
          </v-col>
        </v-row>
        <v-row justify="space-between">
          <v-col>
            <v-sheet class="pa-2 ma-2"></v-sheet>
          </v-col>
          <v-col>
            <v-sheet class="pa-2 ma-2"></v-sheet>
          </v-col>
          <v-col>
            <v-sheet class="pa-2 ma-2">
              <!-- <div style="display: flex; justify-content: end">
                <v-btn
                  :disabled="!store.file.name"
                  @click="Port"
                  color="rgb(64, 170, 151)"
                  style="color: white"
                >
                  {{ $t('next') }}
                </v-btn>
              </div> -->
              <NextButton
                :style="'color:white'"
                :disabled="store.file.name"
                @clicked="Port"
                :title="'next'"
              />
            </v-sheet>
          </v-col>
        </v-row>
      </div>
    </v-container>
  </div>
  <Luckysheet
    ref="sheet"
    :open="dialogTableVisible"
    :url="TemplateUrl"
    @close="closeSheet"
  />
</template>

<script setup>
import NextButton from '@/components/next/next.vue'
import { useCounterStore } from '@/store'
import { reactive, ref, onMounted, onActivated } from 'vue'
import Upload from './upload.vue'
import LogRocket from 'logrocket'
import Luckysheet from './luckysheet.vue'
import ConstraintsUpload from './constraintsUpload.vue'
import api from '@/api/index.js'
import { Amplify, Auth } from 'aws-amplify'
import { useRouter } from 'vue-router'

let dialogTableVisible = ref(false)
const router = useRouter()
const store = useCounterStore()
const sheet = ref(null)
onMounted(async () => {
  let userInfo
  try {
    userInfo = await Auth.currentAuthenticatedUser()
    // 在这里放置处理 userInfo 的逻辑
    // 例如，根据 userInfo 的值设置 store.loginStatus
    if (userInfo) {
      store.loginStatus = true
      store.email = userInfo.attributes.email
    } else {
      store.loginStatus = false
    }
  } catch (error) {
    store.loginStatus = false
  }
  await LogRocket.identify(userInfo.attributes.sub, {
    email: userInfo.attributes.email,
  })
}),
  async function openSheet() {
    if (!store.file.name) {
      return
    }
    dialogTableVisible.value = true
    await getTemplateUrl()
    sheet.value.start()
  }
function closeSheet() {
  dialogTableVisible.value = false
}
async function Port() {
  Object.keys(store.dataArray).forEach((key) => {
    store.dataArray[key].all = []
    store.dataArray[key].data = []
    store.dataArray[key].span = []
    store.dataArray[key].cost = []
  })
  // clear()
  store.selectedData = null
  store.wss = await store.connectWebsocket()
  router.push({ name: 'BaselineSummary' })
  store.active = 1
  store.end.data = false
}

async function uploadDemo() {
  store.ConstraintsFile = ''
  fetch('demo_project.xml')
    .then((r) => r.blob())
    .then(async (r) => {
      const files = new File([r], 'demo_project.xml')
      store.truefile = files.name
      store.file.size = files.size
      let a = await api.sendFile(files)
      store.file.name = a.data.mapping[files.name]
      store.originalplan.originalDurationDays =
        a.data.originalDurationDaysWithCalendar
      store.originalplan.newCriticalTasksLen = a.data.newCriticalTasksLen
      store.originalplan.maxResourceUnitAgg = a.data.maxResourceUnitAgg
      store.loginAndauthRequired = a.data.loginAndauthRequired
    })
}
let TemplateUrl = ref('')
async function getTemplateUrl() {
  TemplateUrl.value = await api.constraintsFileUrl(
    `${store.file.name.split('.')[0]}.xlsx`,
  )
  // console.log(TemplateUrl.value)
}
async function downloadTemplate() {
  if (!store.file.name) {
    return
  }
  await api.constraintsFileDownload(`${store.file.name.split('.')[0]}.xlsx`)
}
</script>

<style lang="scss" scoped>
.uploadBox {
  display: flex;
  justify-content: start;
  align-items: baseline;
}
.disabled {
  opacity: 0.3;
}
.contentData {
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: 200px;
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
  width: 1400px;
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
// .m-3{
//   width: 200px;
// }
</style>
