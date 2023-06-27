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
              <v-icon
              size="large"
              icon="mdi-format-list-bulleted"
            ></v-icon>
            </v-btn>
          </template>
          <v-list>
            <v-list-item>
              <div>
                <v-btn variant="plain" style="display: block">Log Out</v-btn>
                <v-btn variant="plain">Back V1.0</v-btn>
              </div>
            </v-list-item>
          </v-list>
        </v-menu>
        <div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SvgIcon from "@jamescoyle/vue-icon";
import { mdiFormatListBulleted } from "@mdi/js";
export default {
  name: "my-component",
  components: {
    SvgIcon,
  },
  data() {
    return {
      path: mdiFormatListBulleted,
    };
  },
};
</script>

<style lang="scss" scoped>
.main {
  width: 1200px;
  display: flex;
  justify-content: space-between;
  align-items: center;
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
