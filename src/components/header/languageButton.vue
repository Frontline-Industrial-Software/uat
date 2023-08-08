<template>
  <el-dropdown>
    <span class="el-dropdown-link">
      <v-icon icon="mdi-translate"></v-icon>
      <el-icon class="el-icon--right">
        <arrow-down />
      </el-icon>
    </span>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item
          v-for="(item, index) in languageOption"
          :key="index"
          @click="toggle(item)"
          >{{item}}</el-dropdown-item
        >
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<script lang="ts" setup>
import { ArrowDown } from "@element-plus/icons-vue";
import { useI18n } from "vue-i18n";
import LanguageButton from "./languageButton.vue";
// 核心思想就是改变 useI18n 解构出来的locale
// 笔者 这里为了和页面中的其他变量 区别  - 取别名 i18nLanguage。
const { locale: i18nLanguage } = useI18n();

const toggle = (languageKey) => {
  i18nLanguage.value = languageKey; // zh en
};
let languageOption = ["中文", "English",'日本語','Español'];
const { t } = useI18n();
</script>
<style scoped>
.example-showcase .el-dropdown-link {
  cursor: pointer;
  color: var(--el-color-primary);
  display: flex;
  align-items: center;
}

:deep(:focus-visible) {

  outline: none;

}
</style>
