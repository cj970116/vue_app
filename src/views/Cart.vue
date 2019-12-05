<template>
  <div id="container">
    <!-- 购物车卡片页面 -->
    <div class="card" v-for="(item,index) in goodslist" :key="index">
      <div class="show">
        <van-switch v-model="checked[item.id]" @click="handelSwitch(item.id)" />
        <img :src="item.thumb_path" alt />
      </div>
      <div class="goodsinfo">
        <h3>{{item.title}}</h3>
        <p class="control">
          <span>¥{{item.sell_price}}</span>
          <car-numbox 
          :initCount="$store.getters.getInitValue[item.id]"
          :stock="$store.getters.getMax[item.id]"
          :id="item.id"></car-numbox>
          <a href="#" @click.prevent="remove(item.id,index)">删除</a>
        </p>
      </div>
    </div>
    <div class="Settlement">
      <h4>总计(不含运费)</h4>
      <p class="pay"><span>已选中<span class="number">{{$store.getters.getSummery}}</span>件,总价:¥<span class="number">{{$store.getters.getTotalPrice}}</span> 元</span><van-button type="danger">去结算</van-button></p>
    </div>
  </div>
</template>

<script>
import { get } from "../request/http";
import carNumbox from "../components/Numbox_cart";
export default {
  components: { carNumbox },
  created() {
    this.getCartinfo();
  },
  data() {
    return {
      checked: this.$store.getters.getSelected,
      goodslist: []
    };
  },
  methods: {
    getCartinfo() {
      let carlist = [];
      this.$store.state.car.forEach(item => carlist.push(item.id));
      if(carlist.length<=0){
        return
      }
      get(
        "http://www.liulongbin.top:3005/api/goods/getshopcarlist/" +carlist.join(",")
      ).then(res => {
        console.log(res.message);
        this.goodslist = res.message;
      });
    },
    // 删除goodsinfo内容,并提交id给vuex删除car数组内容
    remove(id,index){
      this.goodslist.splice(index,1)
      this.$store.commit('removeFromCar',id)
    },
    handelSwitch(id){
      this.$store.commit('changeSwitch',id)
    }
  }
};
</script>

<style lang="scss" scoped>
#container{
  padding: 10px;
}
.card {
  width: 100%;
  margin-bottom: 10px;
  background: whitesmoke;
  box-shadow: 0 0 5px gray;
  border-radius: 2px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 15vh;
  padding: 10px;
  .show {
    width: 35%;
    display: flex;
    justify-content: space-around;
    img {
      width: 6vh;
      height: 6vh;
    }
  }
  .goodsinfo {
    width: 60%;
    display: flex;
    height: 15vh;
    flex-direction: column;
    justify-content: space-between;
    h3 {
      font-size: 16px;
    }
    .control {
      display: flex;
      justify-content: space-between;
      span{
        color: orangered;
      }
    }
  }
}
.Settlement{
  width: 100%;
  height: 20vh;
  padding: 10px;
  box-shadow: 0 0 5px gray;
  border-radius: 2px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  .pay{
    display: flex;
    justify-content: space-between;
    align-items: center;
    .number{
      font-size: 26px;
      color: orangered;
    }
  }
}
</style>