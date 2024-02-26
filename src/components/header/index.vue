<template>
  <div v-if="store.loginStatus" class="content-head">
    <div class="main">
      <div class="left">
        <img
          style="max-width: 200px; margin-right: 20px"
          src="../../static/logo.png"
          alt=""
        />
        <span>v2.2.2</span>
      </div>
      <div class="right">
        <div v-if="store.email">
          <span class="email">{{ store.email }}</span>

          <!-- <el-avatarasda sa 
            class="avatarsa"
            src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
          /> -->
          <el-avatar>user</el-avatar>
        </div>

        <div
          class="fd hover-effect"
          @click="
            () => {
              dialogVisible = true
            }
          "
          v-else
        >
          <el-icon :size="20" class="feedBtn">
            <User />
          </el-icon>
          <div class="text">Login</div>
        </div>
        <el-avatar style="background-color: rgb(240, 241, 243)">
          <span style="height: 30px">
            <el-icon
              :size="30"
              color="#409EFC"
              v-if="store.email.indexOf('@frontlinec.com') !== -1"
              @click="
                () => {
                  api.userlogs()
                }
              "
            >
              <svg
                t="1708570056365"
                class="icon"
                viewBox="0 0 1024 1024"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                p-id="6097"
                width="200"
                height="200"
              >
                <path
                  d="M275.681468 968.553688h182.140477a27.525872 27.525872 0 0 0 27.441321-27.441321 27.516477 27.516477 0 0 0-27.441321-27.441321H275.681468c-58.997431 0-107.022092-48.024661-107.022092-107.031486V195.010936c0-58.997431 48.015266-107.022092 107.022092-107.022092h487.424c58.997431 0 107.022092 48.015266 107.022092 107.022092v224.312367a27.525872 27.525872 0 0 0 27.441321 27.441321 27.516477 27.516477 0 0 0 27.441321-27.441321V195.010936c0-89.181945-72.713394-161.904734-161.89534-161.904734H275.681468c-89.181945 0-161.904734 72.722789-161.904734 161.904734v611.628624c0.685798 89.181945 72.722789 161.914128 161.904734 161.914128z"
                  fill="#262435"
                  p-id="6098"
                ></path>
                <path
                  d="M290.017468 294.141651h398.23266a27.525872 27.525872 0 0 0 27.441322-27.441321 27.516477 27.516477 0 0 0-27.441322-27.441321h-398.23266a27.525872 27.525872 0 0 0-27.441321 27.441321 27.525872 27.525872 0 0 0 27.441321 27.441321zM546.928734 483.985615a27.525872 27.525872 0 0 0-27.450716-27.441321H290.017468c-15.08756 0-27.441321 12.344367-27.441321 27.441321s12.344367 27.441321 27.441321 27.441321h228.784147c15.773358-0.009394 28.127119-12.353761 28.127119-27.441321zM290.017468 673.838972c-15.08756 0-27.441321 12.344367-27.441321 27.441322s12.344367 27.441321 27.441321 27.441321h70.317798c15.08756 0 27.441321-12.344367 27.441321-27.441321s-12.344367-27.441321-27.441321-27.441322h-70.317798zM715.353248 514.893505c-119.34767 0-217.125578 97.204844-217.125578 217.125578 0 119.920734 97.214239 217.134972 217.125578 217.134972 119.338275 0 217.134972-97.223633 217.134972-217.134972 0-119.338275-97.223633-217.125578-217.134972-217.125578z m0 383.643009c-91.756037 0-165.953761-74.18833-165.953762-165.953762 0-91.756037 74.761394-165.953761 165.953762-165.953761s165.953761 74.197725 165.953761 165.953761-74.207119 165.953761-165.953761 165.953762z"
                  fill="#262435"
                  p-id="6099"
                ></path>
                <path
                  d="M704.371083 832.108037c0.685798 0 0.685798 0 0 0l1.371596 1.371596 0.685798 0.676404s0.676404 0 0.676404 0.685798c0 0 0.685798 0 0.685798 0.685798 0 0 0.685798 0 0.685798 0.676404 0 0 0.676404 0 0.676404 0.685798 0 0 0.695193 0 0.695192 0.685798h12.344367s0.676404 0 0.676404-0.685798c0 0 0.685798 0 0.685798-0.685798 0 0 0.685798 0 0.685798-0.676404 0 0 0.676404 0 0.676404-0.685798 0 0 0.685798 0 0.685798-0.685798l0.685798-0.676404 0.685799-0.695193 0.685798-0.676403 93.982532-93.306129c6.857982-6.857982 6.857982-18.525945 0-25.383926-6.848587-6.848587-18.525945-6.848587-25.383927 0l-63.11222 63.121614V644.302679c0-9.601174-8.238972-17.840147-17.830752-17.840147-9.601174 0-17.840147 8.238972-17.840147 17.840147v132.236917L634.363303 713.417982c-6.857982-6.848587-18.525945-6.848587-25.383927 0-6.857982 6.857982-6.857982 18.525945 0 25.383926l95.391707 93.306129z"
                  fill="#262435"
                  p-id="6100"
                ></path>
              </svg>
            </el-icon>
          </span>
        </el-avatar>
        <!-- <div
          class="logout hover-effect"
          v-if="store.email"
          style="margin-left: 10px; margin-top: 10px"
          @click="logout"
        >
          <el-icon :size="20"><SwitchButton /></el-icon>
          <span class="text">Log out</span>
        </div> -->
        <FeedBack @close="closefeedback" :feedback="feeddialogVisible" />
        <LanguageButton style="margin-left: 30px" />

        <v-menu>
          <template v-slot:activator="{ props }">
            <img v-bind="props" src="/menu.svg" alt="" />
            <!-- <v-icon size="large" icon="mdi-format-list-bulleted"></v-icon> -->
          </template>
          <v-list style="font-size: 12px; font-weight: 600">
            <v-list-item
              @click="
                () => {
                  feeddialogVisible = true
                }
              "
            >
              Feed Back
            </v-list-item>
            <v-list-item @click="">Youtube Tutorials</v-list-item>
            <v-list-item
              @click="
                () => {
                  inviteVisible = true
                }
              "
            >
              Upgrade Features
            </v-list-item>
            <v-list-item @click="logout">Log out</v-list-item>
          </v-list>
        </v-menu>
      </div>
    </div>
  </div>
  <Login @close="closeDialogVisible" :dialogVisible="dialogVisible" />
  <Invite @close="closeinviteVisible" :dialogVisible="inviteVisible" />
</template>

<script setup>
import { ref } from 'vue'
import api from '@/api/index.js'
import Login from '@/components/loginbox/index.vue'
import Invite from '@/components/invite/index.vue'
import FeedBack from '@/components/feedback/index.vue'
import { useRouter } from 'vue-router'
import { useCounterStore } from '@/store'
import { Authenticator } from '@aws-amplify/ui-vue'
import { Amplify, Auth } from 'aws-amplify'
let feeddialogVisible = ref(false)
function closefeedback() {
  feeddialogVisible.value = false
}
let dialogVisible = ref(false)
function closeDialogVisible() {
  dialogVisible.value = false
}
let inviteVisible = ref(false)
function closeinviteVisible() {
  inviteVisible.value = false
}
const store = useCounterStore()
const router = useRouter()
const handleSignOut = async () => {
  try {
    await Auth.signOut()
  } catch (error) {
    console.error('Error signing out', error)
  }
}
function logout() {
  handleSignOut()
  store.loginStatus = false
  localStorage.clear()

  store.isVip = ''
  store.email = ''
  ElMessage({
    showClose: true,
    message: 'SignOut Success',
    type: 'success',
  })
  router.push(`/login`)
}
</script>

<style lang="scss" scoped>
.hover-effect {
  transition: background-color 0.3s; /* 添加过渡效果 */
  border-radius: 5px;
  padding: 10px;
}

.hover-effect:hover {
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
}
.avatar {
  vertical-align: text-bottom;
}
.fd {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  margin-right: 10px;
  margin-top: 10px;
}
.text {
  font-size: 13px;
}
.logout {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  margin-left: 4px;
  margin-top: 30px;
}
.text {
  font-size: 13px;
}
.right {
  display: flex;
  justify-content: space-around;
  align-items: center;
  .email {
    padding-right: 20px;
  }
}
:deep(.v-btn--variant-elevated) {
  box-shadow: 0px;
}
.main {
  width: 1200px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 90px;
  .left {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
}
.content-head {
  width: 100%;
  box-sizing: border-box;
  min-height: 55px;
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
