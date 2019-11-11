import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// 导入mint-ui的css样式表,老版本可直接按需导入,2.0x需要导入全局css样式
import 'mint-ui/lib/style.css'
// 按需求导入mint-ui顶部固定栏
import { Header } from 'mint-ui';
// 导入mui css 样式表
import './lib/mui/css/mui.min.css'
// 导入扩展字体图标css样式表
import './lib/mui/css/icons-extra.css'
Vue.component(Header.name, Header);

Vue.config.productionTip = false

new Vue({
  router,/* 挂载路由实例 */
  store,
  render: h => h(App)
}).$mount('#app')
