<template>
  <div class="home">
    <van-swipe :auto="4000">
      <van-swipe-item v-for="(item, index) in imgList" :key="index">
        <van-image :src="getImages(item.images.large)" alt="" class="swpImg">
          <template v-slot:loading>
            <van-loading type="spinner" size="20"/>
          </template>
        </van-image>
      </van-swipe-item>
    </van-swipe>
    <ul class="mui-table-view mui-grid-view mui-grid-9">
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
        <router-link to="/home/newslist">
          <img src="../assets/images/01.png" alt="" />
          <div class="mui-media-body">正在热映</div></router-link>
      </li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
        <router-link to="/home/rank">
          <img src="../assets/images/yerank.png" alt="" />
          <div class="mui-media-body">高分排行</div></router-link>
      </li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
        <router-link to="/home/goods">
          <img src="../assets/images/4.png" alt="" />
          <div class="mui-media-body">商品购买</div></router-link>
      </li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
        <a href="#">
          <img src="../assets/images/3.png" alt="" />
          <div class="mui-media-body">留言反馈</div></a>
      </li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
        <a href="#">
          <img src="../assets/images/5.png" alt="" />
          <div class="mui-media-body">视频中心</div></a>
      </li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
        <a href="#">
          <img src="../assets/images/2.png" alt="" />
          <div class="mui-media-body">联系我们</div></a>
      </li>
    </ul>
  </div>
</template>
icon
<script>
import axios from "axios";
import  { home} from '../request/api'

export default {
  created() {
    this.getLunbo();
  },
  data() {
    return {
      imgList: [],
    };
  },
  methods: {
    getLunbo(){
      home({header:{"Content-Type":"json"}}).then(
        response => {
          console.log(response);
         this.imgList =response.subjects.slice(0,5)
        },
        err => {
          console.log('失败');
        }
      )
     
    }
    ,
   
    getImages(_url){
          if(_url!==undefined){
            let _u=_url.substring(7)
            return 'https://images.weserv.nl/?url='+_u  /* 这是一个专门缓存图片的网址 */
          }
        }
  },
  
};
</script>

<style scoped>
.van-swipe {
  height: 60vh;
  width: 100%;
  background: thistle;
}
.swpImg {
  width: 100%;
  height: 100%;
}
.mui-col-sm-3 {
  width:33.3%;
}
.mui-grid-view.mui-grid-9 .mui-table-view-cell{
  padding:5px;
}
.mui-table-view-cell img {
  width: 5vh;
  height: 5vh;
}
</style>
