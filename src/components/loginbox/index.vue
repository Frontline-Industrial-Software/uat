<script setup>
import { onMounted, ref, watch } from 'vue'
import { useRouter, useRoute, onBeforeRouteLeave } from 'vue-router'
import { Authenticator, useAuthenticator } from '@aws-amplify/ui-vue'
import '@aws-amplify/ui-vue/styles.css'
import { Amplify, Auth } from 'aws-amplify'
import awsconfig from '@/utils/aws-exports'
import { useCounterStore } from '@/store'
import api from '@/api/index.js'
const store = useCounterStore()
let auth = ref(null)
const router = useRouter()
auth.value = useAuthenticator()
Amplify.configure(awsconfig)
const props = defineProps(['dialogVisible'])
const emit = defineEmits(['close'])
watch(
  auth,
  async (newdata) => {
    const userInfo = await Auth.currentAuthenticatedUser()
    // console.log(userInfo);
    store.email = userInfo.attributes.email
    let bol = await api.checkUser(userInfo.attributes.email)
    store.isVip = bol
    store.loginStatus = true
    emit('close')
    // if (auth.value.authStatus === 'authenticated') {
    //   router.push('/dashboard/inputdata')
    // }
  },
  { deep: true },
)
let formFields = {
  confirmResetPassword: {
    confirmation_code: {
      type: '',
    },
  },
  confirmVerifyUser: {
    confirmation_code: {
      type: '',
    },
  },
  setupTOTP: {
    confirmation_code: {
      type: '',
    },
  },
  confirmSignUp: {
    confirmation_code: {
      type: '',
    },
  },
}
</script>

<template>
  <el-dialog v-model="props.dialogVisible">
    <div class="auth">
      <Authenticator :form-fields="formFields"></Authenticator>
    </div>
  </el-dialog>
</template>

<style lang="scss" scoped>
.amplify-button[data-variation='link']:hover {
  background: none;
  text-decoration: underline;
}
.content {
  min-width: 100vw;
  height: 100vh;
  background: linear-gradient(
    rgba(255, 204, 103, 0.196) 0%,
    rgba(0, 145, 132, 0.3) 100%
  );
  display: flex;
  -webkit-box-align: center;
  align-items: center;
  -webkit-box-pack: center;
  justify-content: center;
  overflow-x: auto;
}
.logo {
  width: 300px;
}
.auth {
  margin: 5rem;
}
</style>
