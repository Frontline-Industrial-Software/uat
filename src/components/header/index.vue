<template>
  <div class="content-head">
    <div class="main">
      <div class="left">
        <img
          style="max-width: 200px; margin-right: 20px"
          src="../../static/logo.png"
          alt=""
        />
        <span>v2.2.1</span>
      </div>
      <div class="right">
        <v-menu>
          <template v-slot:activator="{ props }">
            <v-btn color="rgb(240, 241, 243)" v-bind="props">
              <v-icon size="large" icon="mdi-format-list-bulleted">
                
              </v-icon>
            </v-btn>
          </template>
          <v-list>
            <v-list-item>
              <div>
                <div>
                  <v-btn>
                    <v-icon start icon="mdi-laptop">
                    </v-icon>

                    <a style="text-decoration:none;color:black" href="https://app.frontline-optimizer.com/v1.0.0/" target="_blank"> Back to v1.0.0</a>
                   
                  </v-btn>
                </div>
                <div>
                  <v-btn @click="logout">
                    <v-icon start icon="mdi-arrow-left"></v-icon>
                    Log out    
                  </v-btn>
                </div>
              </div>
            </v-list-item>
          </v-list>
        </v-menu>
        <div></div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";
const router = useRouter();
function logout() { 
localStorage.clear();
router.push(`/login`);
}
</script>

<style lang="scss" scoped>
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
