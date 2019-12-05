<template>
  <div class="mui-numbox">
    <!-- "-"按钮，点击可减小当前数值 -->
    <button class="mui-btn mui-numbox-btn-minus" type="button" @click="sub">-</button>
    <input class="mui-numbox-input" type="number" v-model="value" ref="count" />
    <!-- "+"按钮，点击可增大当前数值 -->
    <button class="mui-btn mui-numbox-btn-plus" type="button" @click="add">+</button>
  </div>
</template>

<script>
export default {
  name: "numBox",
  props: ["max"],
  data() {
    return {
      value: 1
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
    value: function() {
      this.$emit("getCount", this.value);
    },
  }
};
</script>

<style>
</style>