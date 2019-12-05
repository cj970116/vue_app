<template>
  <div class="mui-numbox">
    <!-- "-"按钮，点击可减小当前数值 -->
    <button class="mui-btn mui-numbox-btn-minus" type="button" @click="sub">-</button>
    <input class="mui-numbox-input" type="number" readonly v-model="value" />
    <!-- "+"按钮，点击可增大当前数值 -->
    <button class="mui-btn mui-numbox-btn-plus" type="button" @click="add">+</button>
  </div>
</template>

<script>
export default {
  name: "carNumbox",
  props: ["initCount","stock","id"],
  data() {
    return {
      value: this.initCount,
      max: this.stock
    };
  },
  methods: {
    // 控制加减范围(1<value<max)
    // 不在这个范围的,过大点击加就重置为最大值,过小就重置为1
    add() {
      if (this.value < this.max && this.value >= 1) {
        this.value++;
      }
      if (this.value > this.max) {
        this.value = this.max;
      } else if (this.value < 1) {
        this.value = 1;
      }
    },
    sub() {
      if (this.value <= this.max && this.value > 1) {
        this.value--;
      }
      if (this.value < 1) {
        this.value = 1;
      } else if (this.value > this.max) {
        this.value = this.max;
      }
    }
  },
  //注意:watch最好不要写箭头函数
  watch: {
    // 监听value变化,一旦其发生改变,调用vuex中的方法,更新car数组数据,将id和value作为参数传递
    value: function(newval, oldval) {
        let goodsUpdate = {id:this.id,count:this.value}
        this.$store.commit('updateCar',goodsUpdate)
    }
  }
};
</script>

<style>
</style>