// i18n.js
 
import { createI18n } from 'vue-i18n'
import zh from './zh'
import en from './en'
import ja from './ja' // 日本語
import es from './es' // Español
const i18n = createI18n({
    legacy: false,  // 没有该参数可能会报错
    locale: 'English',
    messages: {
        '中文':zh,
        'English':en,
        '日本語': ja,
        'Español': es,
    }
})
export default i18n