import { createApp } from 'vue'
import ArcoVue from '@arco-design/web-vue'
import ArcoVueIcon from '@arco-design/web-vue/es/icon'

import globalComponents from '@/components'
import App from './App.vue'
import router from './router'
import store from './store'
import i18n from '@/i18n'
import directives from './directives'

// 官方样式
// import '@arco-design/web-vue/dist/arco.css'
// MineShop-V2样式
import '@arco-themes/vue-mine-admin-v2/index.less'
import './style/skin.less'
import './style/index.css'
import './style/global.less'

import tool from '@/utils/tool'
import * as common from '@/utils/common'
import packageJson from '../package.json'

const app = createApp(App)

app.use(ArcoVue, {})
.use(ArcoVueIcon)
.use(router)
.use(store)
.use(i18n)
.use(directives)
.use(globalComponents)

// 注册ma-icon图标
const modules = import.meta.globEager('./assets/ma-icons/*.vue')
for (const path in modules) {
  const name = path.match(/([A-Za-z0-9_-]+)/g)[2]
  const componentName = `MaIcon${name}`
  app.component(componentName, modules[path].default)
}

app.config.globalProperties.$tool = tool
app.config.globalProperties.$common = common
app.config.globalProperties.$title = import.meta.env.VITE_APP_TITLE

app.mount('#app')

tool.capsule('MineShop', `v${packageJson.version} release`)
console.log('MineShop 官网  https://www.mineadmin.com')
console.log('MineShop 文档  https://doc.mineadmin.com')
console.log('MineShop Github https://github.com/kanyxmo/MineShop')
console.log('MineShop-Vue Github https://github.com/kanyxmo/MineShop-Vue')
console.log('请不要吝啬您的 star，谢谢 ~ 🤩🤩🤩')