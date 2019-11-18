<template>
  <div id="app">
    <!-- 使用mint-ui组件做顶部固定栏 -->
     <mt-header fixed title="vue案例"></mt-header>
     <!-- 使用muitabbar做底部 -->
     <nav class="mui-bar mui-bar-tab">
			<router-link class="mui-tab-item " to="/home">
				<span class="mui-icon mui-icon-home"></span>
				<span class="mui-tab-label">首页</span>
			</router-link>
			<router-link class="mui-tab-item" to="/Member">
				<span class="mui-icon mui-icon-contact"></span>
				<span class="mui-tab-label">会员</span>
			</router-link>
			<router-link class="mui-tab-item" to="Cart">
				<span class="mui-icon mui-icon-extra mui-icon-extra-cart"><span class="mui-badge">0</span></span>
				<span class="mui-tab-label">购物车</span>
			</router-link>
			<router-link class="mui-tab-item" to="Search">
				<span class="mui-icon mui-icon-search"></span>
				<span class="mui-tab-label">搜索</span>
			</router-link>
		</nav>
    <transition>
      <router-view/>
    </transition>
  </div>
</template>

<style>
#app{
  padding-top: 40px;
  overflow-x: hidden;
  position: relative;
}
.v-enter{
  opacity: 0;
  transform: translateX(100%)
}
.v-leave-to{
  opacity: 0;
  transform: translateX(-100%);
  position: absolute;
}

.v-enter-active,.v-leave-active{
  transition: all 0.5s ease;
}
</style>
