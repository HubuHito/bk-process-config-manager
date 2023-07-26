import { InfoBox, Message, Notify } from 'bkui-vue'

// bkDiff 组件体积较大且不是很常用，因此注释掉。如果需要，打开注释即可
// import { bkDiff } from 'bk-magic-vue'

// components use
// bkDiff 组件体积较大且不是很常用，因此注释了。如果需要，打开注释即可
// Vue.use(bkDiff)

// directives use
// window.$vueApp.use(bkClickoutside);// todo
// window.$vueApp.use(bkTooltips);// todo
// window.$vueApp.use(bkLoading);// todo
// bkOverflowTips.setDefaultProps({
//   delay: [400, 0],
// });
// window.$vueApp.use(bkOverflowTips);// todo

// Vue prototype mount
window.$vueApp.config.globalProperties.$bkInfo = InfoBox
window.$vueApp.config.globalProperties.$bkMessage = Message
window.$vueApp.config.globalProperties.$bkNotify = Notify
