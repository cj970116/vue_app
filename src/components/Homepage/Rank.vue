<template>
  <div class="rank">
    <van-tabs>
      <van-tab v-for="index in 5" :title="(index-1)*4+1+'-'+index*4" :key="index">
          <router-link v-for="item in list.slice((index-1)*4,index*4)" 
          :key="item.id" 
          class="mui-card"
          tag="div"
          :to="'/home/rank/rankinfo/'+item.id">
              <div class="mui-card-header"><span>{{item.title}}</span><span>{{item.rating.average}}</span></div> 
              <img  v-lazy='getImages(item.images.large)' alt="">
              <div class="mui-card-footer">上映日期{{item.pubdates[1]}}</div>
          </router-link>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import { rank } from "../../request/api";
export default {
  created() {
    this.getRank();
  },
  data() {
    return {
      list: [],
    };
  },
  methods: {
    getRank() {
      rank().then(response => {
        console.log(response);
        this.list = response.subjects;
      });
    },
    getImages(_url) {
      if (_url !== undefined) {
        let _u = _url.substring(7);
        return "https://images.weserv.nl/?url=" + _u
      }
    }
  }
};
</script>

<style lang="scss" scoped>
   .mui-card{
       width: 85%;
       margin: 20px auto;
       border-radius: 10px;
       box-shadow: 0 0 10px silver;
       img{
           width:100%;
       }
   }
</style>
