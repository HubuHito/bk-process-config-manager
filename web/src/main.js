/* eslint-disable import/first */
import './public-path'
import * as Vue from 'vue'

import App from '@/App'
import router from '@/router'
import store from '@/store'
import i18n from '@/language/i18n'
import { bus } from '@/common/bus'
// 全量引入 bkui-vue
import bkui, { InfoBox, Message, Notify } from 'bkui-vue'
// 全量引入 bkui-vue 样式
import 'bkui-vue/dist/style.css'

import {
  messageError,
  messageSuccess,
  messageInfo,
  messageWarn,
  deployNotify,
} from '@/common/bkmagic'
import cursor from './common/cursor'
import Test from './common/directives-test'
import AuthTag from '@/components/Auth/AuthTag'

import '@icon-cool/bk-icon-gsekit'
import '@/common/svg'
import { textTool } from '@/common/text-tool'
import http, { injectCSRFTokenToHeaders } from '@/api'
// import '@/mixins/emptyMixin.js';// todo
import StatusView from '@/components/StatusView'
import TableException from '@/components/Empty/TableException'

injectCSRFTokenToHeaders()
getUserInfo().then(() => {
  global.bus = bus
  global.i18n = i18n.global
  window.$vueApp = Vue.createApp(App)
  window.$vueApp.config.devtools = true
  window.$vueApp.component('StatusView', StatusView)
  window.$vueApp.component('TableException', TableException)
  global.mainComponent = window.$vueApp
  window.$vueApp.config.globalProperties.$bkInfo = InfoBox
  window.$vueApp.config.globalProperties.$bkMessage = Message
  window.$vueApp.config.globalProperties.$bkNotify = Notify
  window.$vueApp.config.globalProperties.$http = http
  window.$vueApp.config.globalProperties.messageError = messageError
  window.$vueApp.config.globalProperties.messageSuccess = messageSuccess
  window.$vueApp.config.globalProperties.messageInfo = messageInfo
  window.$vueApp.config.globalProperties.messageWarn = messageWarn
  global.showDeployTip = deployNotify
  window.$vueApp.config.globalProperties.$textTool = textTool
  window.$vueApp.config.globalProperties.routerAppend = (path, pathToAppend) =>
    path + (path.endsWith('/') ? '' : '/') + pathToAppend
  window.$vueApp.use(cursor)
  window.$vueApp.use(Test)
  window.$vueApp.component('AuthTag', AuthTag)
  window.$vueApp.use(store)
  window.$vueApp.use(router)
  window.$vueApp.use(i18n)
  window.$vueApp.use(bkui)
  window.$vueApp.mount('#app')

  try {
    const id = window.PROJECT_CONFIG.TAM_AEGIS_KEY
    if (id) {
      const aegis = new window.Aegis({
        id, // 项目key
        reportApiSpeed: true, // 接口测速
        reportAssetSpeed: true, // 静态资源测速
        spa: true,
      })
      window.__aegisInstance = aegis
      window.$vueApp.config.errorHandler = function (err, vm, info) {
        aegis.error(`Error: ${err.toString()}\nInfo: ${info}`)
      }
    }
  } catch (e) {
    console.warn('前端监控接入出错', e)
  }
})

async function getUserInfo() {
  try {
    const res = await store.dispatch('meta/ajaxGetUserInfo')
    this.username = res.data.username
    store.commit('updateUsername', res.data.username)
    store.commit('updateToggleStaticRouter', !!res.data.is_superuser)
    if (window.__aegisInstance) {
      window.__aegisInstance.setConfig({
        uin: res.data.username,
      })
    }
  } catch (e) {
    console.warn(e)
  }
}
