import * as Vue from 'vue'
import { createI18n } from 'vue-i18n'
import cookie from 'cookie'
// import { locale, lang } from 'bk-magic-vue'
import zh from '../language/lang/zh'
import en from '../language/lang/en'

const localLanguage = cookie.parse(document.cookie).blueking_language || 'zh-cn'
// 等组件语言升级后删掉这代码
// if (localLanguage === 'en') {
//   locale.use(lang.enUS);
// }
const i18n = createI18n({
  legacy: false,
  locale: 'zh-cn',
  fallbackLocale: 'zh-cn',
  missingWarn: false,
  globalInjection: true,
  messages: {
    'zh-cn': zh,
    en,
  },
})
// locale.i18n((key, value) => i18n.t(key, value));
window.language = localLanguage

export default i18n
