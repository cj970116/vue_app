<template>
  <div>
    <ul class="mui-table-view mui-table-view-chevron">
      <li class="mui-table-view-cell mui-media" 
      v-for="(item,index) in newsList"
      :key="index"
      >
        <router-link class="mui-navigate-right" :to="'/home/newsinfo/'+index">
          <img class="mui-media-object mui-pull-left" :src="getImages(item.images.small)" />
          <div class="mui-media-body">
            <h1>{{item.title}}</h1>
            <p class="mui-ellipsis">
              <span>发表时间:{{item.mainland_pubdate}}</span>
              <span>点赞:0次</span>
            </p>
          </div>
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
    created(){
        this.getNews()
        this.$store.commit('getAxios')
    },
    data(){
        return{
            newsList:[],
            moviesId:[]
        }
    },
    methods:{
        getNews(){
            this.$axios({
              method:'GET',
              url:'https://douban.uieee.com/v2/movie/in_theaters',
              header:{"content-type":"application/json; charset=utf-8"}
            })
            .then(response=>{
                    // console.log(response)
                    this.newsList = response.data.subjects.slice(0,20)
                    let moviesList =[]
                    moviesList =response.data.subjects
                    for(let i of moviesList){
                        this.moviesId.push(i.id)
                    }
                }
            ).catch((err)=>{alert(err)})
            console.log(this.moviesId)
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
  h1 {
    font-size: 18px;
  }
  span {
    font-size: 12px;
  }
  .mui-ellipsis {
    color: slateblue;
    display: flex;
    justify-content: space-between;
  }
}
</style>
