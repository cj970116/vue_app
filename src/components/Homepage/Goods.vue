<template>
  <div class="goodslist">
      <router-link class="goodsitem" v-for="(item,index) in goodslist" :key="index" tag="div" :to="'/home/goods/goodsinfo/'+item.id">
          <img :src="item.img_url" alt="">
          <h5>{{item.title}}</h5>
          <p class="price"><del>￥{{item.market_price}}</del><span>￥{{item.sell_price}}</span></p>
          <p class="bottomtips"><span>热卖中</span><span>库存{{item.stock_quantity}}</span></p>
      </router-link>
      <van-button type="danger" size="large" @click="getMore">加载更多</van-button>
  </div>
</template>

<script>
import {goods} from '../../request/api'
export default {
    created(){
        this.getgoods()
    },
    data(){
        return{
            goodslist:[],
            pageIndex:1
        }
    },
    methods:{
        getgoods(){
            this.$axios.get('http://www.liulongbin.top:3005/api/getgoods?pageindex='+this.pageIndex).then(res=>{
                console.log(res)
                this.goodslist = this.goodslist.concat(res.data.message.slice(1,7))
            })
        },
        getMore(){
            this.pageIndex++
            this.getgoods()
        }
    }
}
</script>

<style lang="scss" scoped>
    .goodslist{
        background-color:aliceblue;
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        padding: 2vw;
        .goodsitem{
            width: 49%;
            height:42vh;
            display: flex;
            flex-direction: column;
            justify-content: space-around;
            align-items: center;
            margin-bottom: 2vw;
            box-shadow: 0 0 1vw gray;
            img{
                width: 100%;
            }
            .bottomtips{
                width: 100%;
                display: flex;
                justify-content: space-around;
            }
            .price{
                width: 100%;
                display: flex;
                justify-content: space-around;
                align-items: center;
                span{
                    font-size: 16px;
                    font-weight: bold;
                    color: orange;
                }
            }
        }
    }
</style>