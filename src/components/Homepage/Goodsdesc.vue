<template>
  <div class="desc">
      <h3 class='title'>{{desc.title}}</h3>
      <hr>
      <div class="content"  v-html="desc.content"></div>
  </div>
</template>

<script>
export default {
    created(){
        this.getdesc()
    },
    data(){
        return{
           desc:{}
        }
    },
    methods:{
        getdesc(){
            this.$axios.get('http://www.liulongbin.top:3005/api/goods/getdesc/'+this.$route.params.id)
            .then(res=>{
               this.desc = res.data.message[0]
               console.log(res.data);
            })
        }
    }
}
</script>

<style lang="scss">
    .desc{
        .title{
            font-size: 16px;
            text-align: center;
        }
        .content{
            padding: 5vw;
            .gomeImgLoad{
                width: 100%;
                height: 100%;
            }
        }
    }
</style>