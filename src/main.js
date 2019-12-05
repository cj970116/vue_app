import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// 导入axios
import axios from 'axios';
import VueAxios from 'vue-axios'
Vue.use(VueAxios, axios)
Vue.prototype.$axios = axios
import Qs from 'qs'
// 导入过滤器
import filters from './assets/js/filters'
Object.keys(filters).forEach(key => {  
  Vue.filter(key, filters[key])  
})

// 导入mint-ui的css样式表,老版本可直接按需导入,2.0x需要导入全局css样式
import 'mint-ui/lib/style.css'

// 按需求导入mint-ui顶部固定栏
import { Header } from 'mint-ui';

// 导入mui css 样式表
import './assets/mui/css/mui.css'
// 导入animate动画库
import animate from 'animate.css'

// 导入扩展字体图标css样式表
import './assets/mui/css/icons-extra.css'

// 按需引入mint-ui中swipe组件实现轮播
// import { Swipe, SwipeItem } from 'mint-ui';
// 导入vant-ui按钮组件和评分组件
import { Button,Rate,Tab,Tabs,Lazyload,ImagePreview,NavBar,Icon,Switch,Swipe,SwipeItem,Stepper,Image,Loading,Toast} from 'vant';
Vue.use(Button);
Vue.use(Rate);
Vue.use(Tab).use(Tabs);
Vue.use(Lazyload);
Vue.use(ImagePreview);
Vue.use(NavBar);
Vue.use( Icon);
Vue.use(Swipe).use(SwipeItem)
Vue.use(Stepper)
Vue.use(Image)
Vue.use( Loading)
Vue.use( Toast)
Vue.use(Switch)


Vue.component(Swipe.name, Swipe);
Vue.component(SwipeItem.name, SwipeItem);

Vue.component(Header.name, Header);

Vue.config.productionTip = false



new Vue({
  router,/* 挂载路由实例 */
  store,
  render: h => h(App)
}).$mount('#app')
