<template>
  <div>
    <mt-swipe :auto="4000">
      <mt-swipe-item v-for="(item, index) in imgList" :key="index"
        ><img :src="getImages(item.images.large)" alt="" class="swpImg"
      /></mt-swipe-item>
    </mt-swipe>
    <ul class="mui-table-view mui-grid-view mui-grid-9">
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
        <router-link to="/home/newslist">
          <img src="../assets/images/01.png" alt="" />
          <div class="mui-media-body">即将上映</div></router-link>
      </li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
        <a href="#">
          <img src="../assets/images/6.png" alt="" />
          <div class="mui-media-body">图片分享</div></a>
      </li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
        <a href="#">
          <img src="../assets/images/4.png" alt="" />
          <div class="mui-media-body">商品购买</div></a>
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

export default {
  created() {
    this.getLunbo();
  },
  data() {
    return {
      imgList: []
    };
  },
  methods: {
    getLunbo() {
      this.$axios({
        method:'GET',
        url:"  https://douban.uieee.com/v2/movie/in_theaters",
        header:{"Content-Type":"json"}
      }).then(
        response => {
          // console.log(response);
         this.imgList =response.data.subjects.slice(0,5)
        },
        err => {
          alert(err);
        }
      );
    },
    getImages(_url){
          if(_url!==undefined){
            let _u=_url.substring(7)
            return 'https://images.weserv.nl/?url='+_u  /* 这是一个专门缓存图片的网址 */
          }
        }
  }
};
</script>

<style scoped>
.mint-swipe {
  height: 430px;
  width: 100%;
  background: thistle;
}
.swpImg {
  width: 100%;
  height: 100%;
}
.mui-col-sm-3 {
  width: 33.3%;
}
.mui-table-view-cell img {
  width: 40px;
  height: 40px;
}
</style>
