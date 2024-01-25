<template>
  <div class="content-head">
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

          <!-- <el-avatar
            class="avatar"
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
          <span>
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
              <Document />
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
            <v-list-item @click="">
              <!-- <div>
                <div>
                  <v-btn elevation="0">
                    <a
                      style="text-decoration: none; color: black"
                      href="https://app.frontline-optimizer.com/v1.0.0/"
                      target="_blank"
                    >
                      <v-icon start icon="mdi-laptop"></v-icon>
                      Back to v1.0.0
                    </a>
                  </v-btn>
                </div>
           
              </div> -->
              <a
                style="text-decoration: none; color: black"
                href="https://app.frontline-optimizer.com/v1.0.0/"
                target="_blank"
              >
                Back to v1.0.0
              </a>
            </v-list-item>
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
