<template>
  <div class="info">
<!-- 标题 -->
    <h1 class="title">
      <span>{{moviesInfo.title}}</span>
    </h1>
<!-- 三重表达式控制台会出错,但正常渲染,这里在data中包装下rating -->
<!-- element-ui的评分组件 -->
    <div class="rate">
      <el-rate
        v-model="value"
        disabled
        text-color="#ff9900"
        score-template="{value}"
        >
      </el-rate>
      <span>{{rating.average}}分</span>
    </div>

<!--子标题  -->
    <p class="subTitle">
      <span>{{moviesInfo.wish_count}}人想看</span>
      <span>国内上映日期:{{moviesInfo.mainland_pubdate}}</span>
    </p>
    <hr>
<!-- 海报图展示 -->
    <div class="showPhotos" v-for="item in photos" :key="item.id"><img :src="getImages(item.thumb)" alt=""></div>
<!-- 电影简介 -->
    <p class="summary">{{moviesInfo.summary}}</p>
<!-- 主演信息 -->
    <h2>主演</h2>
    <div class="casts"><p v-for="item in casts" :key="item.id"><img :src="getImages(item.avatars.large)" alt=""><span>{{item.name}}</span></p></div>
<!-- 评论表单 -->
    <form class="mui-input-group">
    <div class="input-row">
        <textarea placeholder="请输入评论内容(最多120字)" v-model="inputvalue"></textarea>
    </div>
    <van-button class="button" type="primary" size="large" @click="postComment">发表评论</van-button>
    <ul class="mui-table-view">
      <li v-for="item in comments" :key="item.id" class="mui-table-view-cell">
        <p>{{item.content}}</p>
        <div class="user">
          <div><img :src="item.author.avatar" width="30px" alt=""></div>
          <div><p>{{item.author.name}}</p><p>发表于:{{item.created_at}}</p></div>
        </div>
      </li>  
    </ul>
    </form>
    
  </div>
</template>

<script>
import {post} from '../request/http.js'
export default {
  created(){
    this.getInfo();
  },
  data() {
    return {
        moviesInfo:{},
        photos:[],
        rating:{},
        casts:[],
        comments:[],
        id:this.$route.params.id,
        value:0,
        inputvalue:''
    };
  },
  methods: {
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
          this.photos = response.data.photos.slice(0,4)/* 电影海报 */
          this.rating = response.data.rating /* 电影评分 */
          this.casts = response.data.casts /* 主演的信息 */
          this.comments = response.data.popular_comments
          this.value = this.rating.average/2
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
    postComment(){
      this.$axios({
        method:'GET',
        url:"/movie/subject/"+this.id,
      }).then(()=>{
        let cmt = {
          content:this.inputvalue,
          author:{name:'匿名用户',avatar:'../assets/images/logo.png'},
          created_at:Date.now()
        }
        this.comments.unshift(cmt)
        this.inputvalue=''
      })
    }

  }
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
    .input-row{
      margin-top: 30px 0;
      textarea{
        height: 100px;
      }
    }
    .button{
      margin: 30px 0;
    }
    .mui-table-view{
      .mui-table-view-cell{
        text-indent: 2em;
        display: flex;
        flex-direction: column;
        .user{
          display: flex;
          justify-content:start;
         img{
           border-radius: 50%
         }
        }
      }
    }
  }
</style>
