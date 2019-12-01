<template>
  <div class="info">
    <!-- 标题 -->
    <h1 class="title">
      <span>{{moviesInfo.title}}</span>
    </h1>
    <!-- 三重表达式控制台会出错,但正常渲染,这里在data中包装下rating -->
    <div class="rate">
      <!-- vant-ui评分组件 ,vulue值需除以2,10分制,五颗星星 -->
      <van-rate v-model="value" readonly  allow-half/>
      <span>{{rating.average}}分</span>
    </div>

    <!--子标题  -->
    <p class="subTitle">
      <span>{{moviesInfo.wish_count}}人想看</span>
      <span>国内上映日期:{{moviesInfo.mainland_pubdate}}</span>
    </p>
    <hr>
    <!-- 海报图展示 -->
    <div class="showPhotos" v-for="(item,index) in photos" :key="index">
      <img v-lazy="getImages(item.thumb)" @click="preview(index)"><!-- 绑定点击事件触发图片预览方法 -->
    </div>
    <!-- 电影简介 -->
    <p class="summary">{{moviesInfo.summary}}</p>
    <!-- 主演信息 -->
    <h2>主演</h2>
    <div class="casts"><p v-for="(item,index) in casts" :key="index"><img :src="getImages(item.avatars.large)" alt="" ><span>{{item.name}}</span></p></div>
    <!-- 自定义评论组件,把拼接好的url传给子组件 -->
    <v-mcomment :url="'/movie/subject/'+id"></v-mcomment>
  </div>
</template>

<script>
import {post} from '../../request/http.js'
import vMcomment from '@/components/Comment_movies.vue'
import { ImagePreview } from 'vant';
export default {
  name:'v-info',
  components:{vMcomment},
  created(){
    this.getInfo();
  },
  data() {
    return {
        moviesInfo:{},
        photos:[],
        photosList:[],
        rating:{},
        casts:[],
        id:this.$route.params.id,
        value:0,
    };
  },
  methods: {
    // 发送请求获取电影信息
    getInfo() {
      // 拿到路由传递的参数
      this.$axios({
        method: "GET",
        url:"/movie/subject/"+this.id,/* url拼接上每个电影的id */
        header: { "Content-Type": "json" }
      }).then(
        response => {
          console.log(response)
          this.moviesInfo = response.data /* 单个电影的所有数据 */
          
          this.rating = response.data.rating /* 电影评分 */
          this.casts = response.data.casts /* 主演的信息 */
          this.comments = response.data.popular_comments
          this.value = this.rating.average/2
          this.photos = response.data.photos.slice(0,4)/* 电影海报 */
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
    },
    // 发表评论的方法
    addComment(){
      this.$axios({
        method:'GET',
        url:"/movie/subject/"+this.id,
      }).then(()=>{
        let cmt = {
          content:this.inputvalue,
          author:{name:'匿名用户',avatar:'https://img1.doubanio.com/icon/u2126832-179.jpg'},
          created_at:new Date()
        }
        this.comments.unshift(cmt)
        this.inputvalue=''
      })
    },
    // 图片预览功能
    preview(index){
        let list =[]
        for(let i=0;i<this.photos.length;i++){
          list.push(this.getImages(this.photos[i].thumb))
        }
        ImagePreview({
          images:list,
          startPosition:index,/* 开始位置索引 */
          onClose() {
            // do something
          }
          });
    },
  },
};
</script>

<style lang="scss" scoped>
  .info{
    .title{
      text-align: center;
    }
    .rate{
      display: flex;
      justify-content: center;
      span{
        font-size: 20px
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
        width: 100%;
        border-radius: 10px;
        box-shadow: 0 0 2px gray;
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
