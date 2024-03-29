import { createVuetify } from 'vuetify'
import { aliases, mdi } from 'vuetify/iconsets/mdi'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import 'vuetify/styles'
// import '@mdi/font/css/materialdesignicons.css'

const icons = {
  defaultSet: 'mdi',
  aliases,
  sets: {
    mdi,
  }
}
export default createVuetify({
    components,
    directives,
  icons
})