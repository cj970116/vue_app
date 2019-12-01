<template>
  <div class="goodsinfo">
    <transition @before-enter="beforeEnter" @enter="enter" @after-enter="afterEnter">
      <div class="ball" v-show="flag" ref="ball"></div>
    </transition>
    <van-swipe :autoplay="3000">
      <van-swipe-item v-for="(item, index) in images" :key="index">
        <img v-lazy="item.src" />
      </van-swipe-item>
    </van-swipe>
    <div class="mui-card" v-for="item in goodsinfo" :key="item.id">
      <!--页眉，放置标题-->
      <div class="mui-card-header">{{ item.title }}</div>
      <!--内容区-->
      <div class="mui-card-content">
        <p class="price">
          <del>￥{{ item.market_price }}</del>
          <span>￥{{ item.sell_price }}</span>
        </p>
        <div class="stepper">
          <span>购买数量</span>
          <div class="mui-numbox">
            <!-- "-"按钮，点击可减小当前数值 -->
            <button class="mui-btn mui-numbox-btn-minus" type="button" @click="sub">-</button>
            <input class="mui-numbox-input" type="number" v-model="value" ref="numbox" />
            <!-- "+"按钮，点击可增大当前数值 -->
            <button class="mui-btn mui-numbox-btn-plus" type="button" @click="add">+</button>
          </div>
        </div>
        <br />
        <p class="btn">
          <!-- 点击添加购物车flag变为true -->
          <button type="button" class="mui-btn mui-btn-warning" @click.prevent="addCart">加入购物车</button>
          <button type="button" class="mui-btn mui-btn-danger">立即购买</button>
        </p>
      </div>
    </div>
    <div class="mui-card" v-for="(item, index) in goodsinfo" :key="index">
      <!--页眉，放置标题-->
      <div class="mui-card-header header">商品参数</div>
      <!--内容区-->
      <div class="mui-card-content goodsArg">
        <p>商品货号:{{ item.goods_no }}</p>
        <p>库存:{{ item.stock_quantity }}件</p>
        <p>上架时间:{{ item.add_time | dateFormat }}</p>
      </div>
      <!--页脚，放置补充信息或支持的操作-->
      <div class="mui-card-footer">
        <button type="button" class="mui-btn mui-btn-primary mui-btn-outlined" @click="desc">图文介绍</button>
        <button type="button" class="mui-btn mui-btn-danger mui-btn-outlined" @click="comment">商品评论</button>
      </div>
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
export default {
  created() {
    this.getImages();
    this.getGoodsInfo();
  },
  data() {
    return {
      id: this.$route.params.id,
      images: [],
      goodsinfo: [],
      value: 1,
      flag: false
    };
  },
  methods: {
    beforeEnter(el) {
      // 获取this.refs值时需要反复测试
      // 注意:1. refs的值在mounted时取不到,updated时才可以取到
      //     2. style.left的值后面需要加上'px'
      // 思路:在input输入框位置挂上ref ,动态获取(0,0)坐标点和input输入框的水平与垂直距离差,以此来作为小球起始位置
      // console.log(this.$refs.numbox[0].getBoundingClientRect().left);
      el.style.left = this.$refs.numbox[0].getBoundingClientRect().left + "px";
      el.style.top = this.$refs.numbox[0].getBoundingClientRect().top + "px";
      el.style.transform = "translate(0,0)";
    },
    enter(el, done) {
      // 思路:1. 动态获取小球的初始位置与购物车徽标位置的横纵坐标差
      //      2. 以此作为小球位移的横纵坐标值 
      el.offsetWidth;/* 必需加上这句,否者小球瞬移看不见轨迹 */
      const ballPosition = this.$refs.ball.getBoundingClientRect();
      const badgePosition = document
        .getElementById("badge")
        .getBoundingClientRect();
      const xDist = badgePosition.left - ballPosition.left;
      const yDist = badgePosition.top - ballPosition.top;
      el.style.transform = `translate(${xDist}px, ${yDist}px)`;/* 模板语法 */
      el.style.transition = "all 0.5s cubic-bezier(.4,-0.3,1,.68)";
      done();/* 表示执行afterEnter */
    },
    afterEnter(el) {
      this.flag = !this.flag;
    },
    getImages() {
      this.$axios
        .get("http://www.liulongbin.top:3005/api/getthumimages/" + this.id)
        .then(res => {
          this.images = res.data.message;
        });
    },
    getGoodsInfo() {
      this.$axios
        .get("http://www.liulongbin.top:3005/api/goods/getinfo/" + this.id)
        .then(res => {
          // console.log(res.data);
          this.goodsinfo = res.data.message;
        });
    },
    add() {
      // 控制加减范围
      if (this.value <= 9) {
        this.value++;
      } else {
        return;
      }
    },
    sub() {
      if (this.value > 1) {
        this.value--;
      } else {
        return;
      }
    },
    // 点击添加购物车时小球显示
    addCart() {
      this.flag = !this.flag;
    },
    // 编程式导航
    desc(id) {
      id = this.id;
      this.$router.push({ name: "desc", params: { id } });
    },
    comment(id) {
      id = this.id;
      this.$router.push({ name: "comment", params: { id } });
    }
  }
};
</script>

<style lang="scss" scoped>
.van-swipe {
  height: 35vh;
  background: white;
  box-shadow: 0 0 2vw gray;
  border-radius: 2vw;
  margin: 10px;
}
.van-swipe-item {
  text-align: center;
  img {
    width: 60%;
    height: 100%;
  }
}
.stepper {
  display: flex;
  justify-content: space-around;
  align-items: center;
}
.mui-card {
  padding: 0vw 5vw;
  .header {
    padding: 0;
  }
}
.price {
  display: flex;
  justify-content: space-around;
  span {
    font-size: 20px;
    font-weight: bold;
    color: tomato;
  }
}

.btn {
  display: flex;
  justify-content: space-between;
}

.mui-card-footer {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  .mui-btn {
    margin: 1vw;
    width: 100%;
  }
}

.ball {
  position: absolute;
  top: 0;
  left: 0;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: orangered;
  z-index: 99;
}
</style>
