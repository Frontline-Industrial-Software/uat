import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router'
import { createPinia } from 'pinia'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
// Vuetify
import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import 'element-plus/dist/index.css'
import i18n from './language/i18n'
import 'vditor/dist/index.css'
import LogRocket from 'logrocket'
import VXETable from 'vxe-table'
import 'vxe-table/lib/style.css'
LogRocket.init('juicz6/dev')
const vuetify = createVuetify({ components, directives })
const app = createApp(App)
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}
app
  .use(router)
  .use(vuetify)
  .use(i18n)
  .use(VXETable)
  .use(createPinia())
  .mount('#app')
