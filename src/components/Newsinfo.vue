<template>
  <div class="info">
    <h1 class="title">
      <!-- 三重表达式控制台会出错,但正常渲染,这里在data中包装下rating -->
      <span>{{moviesInfo.title}}</span><span>{{rating.average}}分</span>
    </h1>
    <p class="subTitle">
      <span>{{moviesInfo.wish_count}}人想看</span>
      <span>国内上映日期:{{moviesInfo.mainland_pubdate}}</span>
    </p>
    <div class="showPhotos" v-for="item in photos" :key="item.id"><img :src="getImages(item.thumb)" alt=""></div>
    <p class="summary">{{moviesInfo.summary}}</p>
    <h2>主演</h2>
    <div class="casts"><p v-for="item in casts" :key="item.id"><img :src="getImages(item.avatars.large)" alt=""><span>{{item.name}}</span></p></div>
  </div>
</template>

<script>
export default {
  created(){
    this.getInfo();
  },
  data() {
    return {
        moviesInfo:{},
        photos:[],
        rating:{},
        casts:[]
    };
  },
  methods: {
    getInfo() {
      // 拿到路由传递的参数
      let i = this.$route.params.id;
      this.$axios({
        method: "GET",
        url:" https://douban.uieee.com/v2/movie/subject/" +this.$store.getters.curId[i],/* url拼接上每个电影的id */
        header: { "Content-Type": "json" }
      }).then(
        response => {
          console.log(response);
          this.moviesInfo = response.data /* 单个电影的所有数据 */
          this.photos = response.data.photos.slice(0,4)/* 电影海报 */
          this.rating = response.data.rating /* 电影评分 */
          this.casts = response.data.casts /* 主演的信息 */
        },
        err => {
          alert(err);
        }
      );
    },
    // 缓存图片的方法
     getImages(_url){
          if(_url!==undefined){
            let _u=_url.substring(7)
            return 'https://images.weserv.nl/?url='+_u  /* 这是一个专门缓存图片的网址 */
          }
        }
  }
};
</script>

<style lang="scss" scoped>
  .info{
    .title{
      text-align: center;
      // font-size: 22px;
      :nth-child(2){
        font-size: 20px;
        margin-left:10px; 
      }
    }
    .subTitle{
      display: flex;
      justify-content: space-around;
      span{
        color: steelblue;
      }
    }
    .showPhotos{
      img{
        width: 100%
      }
    }
    .summary{
      text-indent: 2em;
      color: black
    }
    .casts{
        display: flex;
        justify-content: space-around;
        flex-direction:row; 
        p{
          display: flex;
          flex-direction: column;
          align-items: center;
        }
        img{width: 80%}
    }
  }
</style>
