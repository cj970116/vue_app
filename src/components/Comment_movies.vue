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
            <div><img :src="item.author.avatar" alt="" /></div>
            <div>
              <p>{{ item.author.name }}</p>
              <p>发表于:{{ item.created_at | dateFormat }}</p>
            </div>
          </div>
        </li>
      </ul>
    </form>
  </div>
</template>

<script>
export default {
  name: "v-mcomment",
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
      this.$axios({
        method: "GET",
        url: this.url/* url拼接上每个电影的id */,
        header: { "Content-Type": "json" }
      }).then(response => {
        if(response.data.popular_comments){
          this.comments=response.data.popular_comments
        }else{
          this.comments=response.data.message
        };
      });
    },
    addComment() {
      this.$axios({
        method: "GET",
        url: "/movie/subject/" + this.id
      }).then(() => {
        let cmt = {
          content: this.inputvalue,
          author: {
            name: "匿名用户",
            avatar: "https://img1.doubanio.com/icon/u2126832-179.jpg"
          },
          created_at: new Date()
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
