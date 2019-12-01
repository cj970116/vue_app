<template>
  <div id="app">
    <!-- 使用mint-ui组件做顶部固定栏 -->
    <van-nav-bar title="电影坞"  fixed >
      <div slot="left" v-show="flag">
        <van-icon name="arrow-left"  @click="goBack" size='20px'></van-icon>
        <span class="back">返回</span>
      </div>
    </van-nav-bar>
    <!-- 使用muitabbar做底部 -->
    <nav class="mui-bar mui-bar-tab">
      <router-link class="mui-tab-item " to="/home">
        <span class="mui-icon mui-icon-home"></span>
        <span class="mui-tab-label">首页</span>
      </router-link>
      <router-link class="mui-tab-item" to="/member">
        <span class="mui-icon mui-icon-contact"></span>
        <span class="mui-tab-label">会员</span>
      </router-link>
      <router-link class="mui-tab-item" to="/cart">
        <span class="mui-icon mui-icon-extra mui-icon-extra-cart"
          ><span class="mui-badge" id="badge">0</span></span
        >
        <span class="mui-tab-label">购物车</span>
      </router-link>
      <router-link class="mui-tab-item" to="/search">
        <span class="mui-icon mui-icon-search"></span>
        <span class="mui-tab-label">搜索</span>
      </router-link>
    </nav>
    <transition
    enter-active-class="animated fadeInLeft"
    leave-active-class="animated fadeOutLeft"
    mode="out-in"
    :duration="800"
    >
      <router-view />
    </transition>
  </div>
</template>
<script>
export default {
  data(){
    return{
      flag:false
    }
  },
  methods:{
    // 路由回退
    goBack(){
      this.$router.back()
    }
  },
  watch:{
    "$route.path":function(newVal,oldVal){
      if(newVal=='/home'){
        this.flag = false
      }else{
        this.flag = true
      }
    }
  }
}
</script>
<style>
#app {
  padding-top:46px;
  padding-bottom: 50.4px;
  position: relative;
  overflow-x: hidden;
}

.back{
  color: #1989fa;
}

</style>
