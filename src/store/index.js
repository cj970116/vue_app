import Vue from 'vue'
import Vuex from 'vuex'
// vuex中的this指向vuex对象,这里需要手动导入axios
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // 存放请求后的url返回的电影的id,可供所有组件调用,用于拼接url
    moviesId:[]
  },
  mutations: {
    getAxios(state){
      axios.get('https://douban.uieee.com/v2/movie/in_theaters')
      .then(response=>{
        let list=[]
        list = response.data.subjects
        for(let i of list){
          state.moviesId.push(i.id)
        }
      },err=>{alert(err)}
      )
    }
  },
  actions: {

  },
  modules: {
  },
  getters:{
    curId:function(state){
      return state.moviesId
    }
  }
})
