import Vue from "vue";
import VueRouter from "vue-router";
// 重写push方法,处理报错
const routerPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return routerPush.call(this, location).catch(error=> error)
}
// 导入路由组件
import Member from "@/views/Member.vue";
import Cart from "@/views/Cart.vue";
import Search from "@/views/Search.vue";
import Home from "@/views/Home.vue";
import Newslist from "@/components/Homepage/Newslist.vue"
import Newsinfo from "@/components/Homepage/Newsinfo.vue"
import Rank from "@/components/Homepage/Rank.vue"
import Rankinfo from "@/components/Homepage/Rankinfo.vue"
import Goods from "@/components/Homepage/Goods.vue"
import Goodsinfo from "@/components/Homepage/Goodsinfo.vue"
import Goodsdesc from "@/components/Homepage/Goodsdesc.vue"
import Goodscomment from "@/components/Homepage/Goodscomment.vue"

Vue.use(VueRouter);

// 定义路由规则
const routes = [
  {
    path:'/',
    redirect:'/home',
  },
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
  },
  {
    path:"/home/newslist",
    component:() => import('@/components/Homepage/Newslist.vue')
  },
  {
    path:"/home/newslist/newsinfo/:id",
    component:() => import('@/components/Homepage/Newsinfo.vue')
  },
  {
    path:"/home/rank",
    component:() => import('@/components/Homepage/Rank.vue')
  },
  {
    path:'/home/rank/rankinfo/:id',
    component:()=>import('@/components/Homepage/Rankinfo.vue')
  },
  {
    path:'/home/goods',
    component:()=>import('@/components/Homepage/Goods.vue')
  },
  {
    path:'/home/goods/goodsinfo/:id',
    component:()=>import('@/components/Homepage/Goodsinfo.vue'),
  },
  {
    name:'desc',
    path:'/home/goods/desc/:id',
    component:()=>import('@/components/Homepage/Goodsdesc.vue'),
  },
  {
    name:'comment',
    path:'/home/goods/comment/:id',
    component:()=>import('@/components/Homepage/Goodscomment.vue'),
  }

];

const router = new VueRouter({
  // mode: "history",
  base: process.env.BASE_URL,
  routes,
  linkActiveClass: "mui-active"/* 路由高亮类改名 */
});

export default router;
