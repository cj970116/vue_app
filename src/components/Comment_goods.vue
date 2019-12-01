<template>
  <div>
    <form class="mui-input-group">
      <div class="input-row">
        <textarea
          placeholder="请输入评论内容(最多120字)"
          v-model="inputvalue"
        ></textarea>
      </div>
      <van-button class="button" type="info" size="large" @click.prevent="addComment">发表评论</van-button>
      <ul class="mui-table-view">
        <li v-for="item in comments" :key="item.id" class="mui-table-view-cell">
          <p>{{ item.content }}</p>
          <div class="user">
            <div>
              <p>{{ item.user_name }}</p>
              <p>发表于:{{ item.add_time | dateFormat }}</p>
            </div>
          </div>
        </li>
      </ul>
    </form>
  </div>
</template>

<script>
import {get} from '../request/http.js'
export default {
  name: "v-gcomment",
  props:['url'],
  created() {
    this.getInfo();
  },
  data() {
    return {
      comments: [],
      id: this.$route.params.id,
      inputvalue: ""
    };
  },
  methods: {
    getInfo() {
      // 拿到路由传递的参数
        get(this.url).then(response => {
         console.log(response)
         this.comments = response.message
       
      });
    },
    addComment() {
     get(this.url).then(response=> {
        let cmt = {
          content: this.inputvalue,
          user_name:'匿名用户',
          add_time: new Date()
        };
        this.comments.unshift(cmt);
        this.inputvalue = "";
      });
    }
  },
};
</script>

<style lang="scss">
.mui-input-group {
  .input-row {
    margin-top: 30px 0;
    textarea {
      height: 100px;
    }
  }
  .button {
    margin: 30px 0;
  }
  .mui-table-view {
    .mui-table-view-cell {
      text-indent: 2em;
      display: flex;
      flex-direction: column;
      .user {
        display: flex;
        align-content: center; 
        img {
          width: 40%;
          border-radius: 50%;
        }
      }
    }
  }
}
</style>
