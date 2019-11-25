<template>
  <div>
    <ul class="mui-table-view mui-table-view-chevron">
      <li class="mui-table-view-cell mui-media" 
      v-for="(item,index) in newsList"
      :key="index"
      >
        <router-link class="mui-navigate-right" :to="'/home/newsinfo/'+item.id"><!-- 路由的链接拼接上数组的id -->
          <img class="mui-media-object mui-pull-left" :src="getImages(item.images.small)" />
          <div class="mui-media-body">
            <h1>{{item.title}}</h1>
            <p class="mui-ellipsis">类型:{{item.genres.join()}}</p>
            <p class="mui-ellipsis">主演:{{item.directors[0].name}}</p>
            <p class="mui-ellipsis">
              <span>上映时间:{{item.mainland_pubdate}}</span>
              <span>时长:{{item.durations[0]}}</span>
            </p>
          </div>
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script>
import  { home} from '../request/api'
export default {
    created(){
        this.getNews()
    },
    data(){
        return{
            newsList:[],
        }
    },
    methods:{
        getNews(){
          home().then(response=>{
             this.newsList = response.subjects.slice(0,20)
             console.log(response)
          })
        },
        getImages(_url){
          if(_url!==undefined){
            let _u=_url.substring(7)
            return 'https://images.weserv.nl/?url='+_u  /* 这是一个专门缓存图片的网址 */
          }
        },
       
    }
};
</script>

<style lang="scss" scoped>
.mui-media {
  background: #EBEEF5;
  box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
  .mui-navigate-right{
    img{
      width: 100%;
      height: 100%;
    }
  }
  h1 {
    font-size: 18px;
  }
  span {
    font-size: 12px;
  }
  .mui-ellipsis {
    display: flex;
    justify-content: space-between;
  }
}
</style>
