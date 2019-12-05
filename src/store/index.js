import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);
// 使用JSON.parse将字符串转为数组
let car = JSON.parse(localStorage.getItem("car") || "[]");
export default new Vuex.Store({
  state: {
    car: car
  },
  mutations: {
    // 遍历car数组,若商品已存在购物车中,只增加商品数量,不再重新渲染,将更新后的car数组放入localStorage中
    getCar(state, goodsinfo) {
      let flag = false;
      for (let item of state.car) {
        if (item.id == goodsinfo.id) {
          item.count += parseInt(goodsinfo.count);
          flag = true;
        }
      }
      if (flag == false) {
        state.car.push(goodsinfo);
      }
      localStorage.setItem("car", JSON.stringify(state.car));
      // console.log(state.car)
    },
    // 在购物车页面更新商品数量,将其保存到car数组中,并保存到localStorage中
    updateCar(state, goodsUpdate) {
      for (let item of state.car) {
        if (item.id == goodsUpdate.id) {
          item.count = parseInt(goodsUpdate.count);
        }
      }
      localStorage.setItem("car", JSON.stringify(state.car));
    },
    removeFromCar(state, id) {
      state.car.some((item, index) => {
        if (item.id == id) {
          state.car.splice(index, 1);
          return;
        }
      });
      localStorage.setItem("car", JSON.stringify(state.car));
    },
    changeSwitch(state,id){
      state.car.some(item=>{
        if(item.id==id){
          item.selected = !item.selected
          return
        }
      })
      localStorage.setItem("car", JSON.stringify(state.car));
    }
  },
  getters: {
    //声明一个空对象,遍历car数组,使用键值对映射给对象添加属性和值,从而获取商品添加的数量
    getInitValue(state) {
      let obj = {};
      for (let item of state.car) {
        obj[item.id] = item.count;
      }
      return obj;
    },
    // 声明一个空对象,遍历car数组,使用键值对映射给对象添加属性和值,从而获取库存值,并将其设置为按钮加减的最大值
    getMax(state) {
      let obj = {};
      for (let item of state.car) {
        obj[item.id] = item.stock_quantity;
      }
      return obj;
    },
    getSelected(state) {
      let obj = {};
      for (let item of state.car) {
        obj[item.id] = item.selected;
      }
      return obj;
    },
    getSummery(state){
      let sum=0
      for(let item of state.car){
        if(item.selected){
          sum += item.count
        }
      }
      return sum
    },
    getTotalPrice(state){
      let total=0
      for(let item of state.car){
        if(item.selected){
          total+=item.price*item.count
        }
      }
      return total
    }
    
  }
});
