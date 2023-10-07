<script setup>
import { onMounted, ref, watch } from 'vue'
import { useRouter, useRoute, onBeforeRouteLeave } from 'vue-router'
import { Authenticator, useAuthenticator } from '@aws-amplify/ui-vue'
import '@aws-amplify/ui-vue/styles.css'
import { Amplify } from 'aws-amplify'
import awsconfig from '@/utils/aws-exports'
import { useCounterStore } from '@/store'
const store = useCounterStore()
let auth = ref(null)
const router = useRouter()
auth.value = useAuthenticator()
Amplify.configure(awsconfig)

watch(
  auth,
  (newdata) => {
    if (auth.value.authStatus === 'authenticated') {
      router.push('/dashboard/inputdata')
    }
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
  <div class="content">
    <div class="introduce">
      <span>
        <img class="logo" src="@/static/logo.png" alt="Frontline Logo" />
      </span>
      <h1>Optimization Platform</h1>
      Find the best sequence of activities with optimal resource loading
      <p>to ace your project</p>
    </div>
    <div class="auth">
      <Authenticator :form-fields="formFields"></Authenticator>
    </div>
  </div>
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
