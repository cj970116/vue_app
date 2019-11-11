import Vue from "vue";
import VueRouter from "vue-router";
// 导入路由组件
import Member from "@/views/Member.vue";
import Cart from "@/views/Cart.vue";
import Search from "@/views/Search.vue";
import Home from "@/views/Home.vue";

Vue.use(VueRouter);

// 定义路由规则
const routes = [
  {
    path: "/home",
    component:() => import('@/views/Home.vue')
  },
  {
    path: "/member",
    component:() => import('@/views/Member.vue')
  },
  {
    path: "/cart",
    component:() => import('@/views/Cart.vue')
  },
  {
    path: "/search",
    component:() => import('@/views/Search.vue')
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
  linkActiveClass: "mui-active"/* 路由高亮类改名 */
});

export default router;
