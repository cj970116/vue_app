<template>
  <div>
    <ul class="mui-table-view mui-table-view-chevron">
      <li class="mui-table-view-cell mui-media">
        <a class="mui-navigate-right">
          <img class="mui-media-object mui-pull-left" src="/image/muwu.jpg" />
          <div class="mui-media-body">
            <h1>城</h1>
            <p class="mui-ellipsis">
              <span>发表时间:2019/11/13 16:53:31</span>
              <span>点赞:0次</span>
            </p>
          </div>
        </a>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
    created(){
        getNewsList()
    },
    data(){
        return{
            newsList:[]
        }
    },
    methods:{
        getNewsList(){
            this.$axios.get('http://gank.io/api/today').then(
                response=>{
                    console.log(response.data)
                },err=>{
                    alert(err.message)
                }
            )
        }
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
