<script setup>
  import { Authenticator } from "@aws-amplify/ui-vue";
  import "@aws-amplify/ui-vue/styles.css";
  import {
  Check,
  Delete,
  Edit,
  Message,
  Search,
  Star,
} from '@element-plus/icons-vue'
  import { Amplify } from 'aws-amplify';
  import awsconfig from '../utils/aws-exports';

  Amplify.configure(awsconfig);
</script>

<template>
  <div class="content"> 
    <el-button type="primary">Primary</el-button>
    <authenticator>
      <template v-slot="{ user, signOut }">
        <h1>Hello {{ user.username }}!</h1>
        <button @click="signOut">Sign Out</button>
      </template>
    </authenticator>
  </div>

</template>


<style lang="scss" scoped>
.content{
  width: 100vw;
  height: 100vh;
  background: linear-gradient(rgba(255, 204, 103, 0.196) 0%, rgba(0, 145, 132, 0.3) 100%);
  display: flex;
  -webkit-box-align: center;
  align-items: center;
  -webkit-box-pack: center;
  justify-content: center;
}
</style>