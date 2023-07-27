// i18n.js
 
import { createI18n } from 'vue-i18n'
import zh from './zh'
import en from './en'
 
const i18n = createI18n({
    legacy: false,  // 没有该参数可能会报错
    locale: 'Engligh',
    messages: {
        '中文':zh,
        'Engligh':en
    }
})
 
export default i18n
 
