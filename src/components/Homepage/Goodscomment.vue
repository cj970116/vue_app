<template>
  <div>
    <v-gcomment :url="'http://www.liulongbin.top:3005/api/getcomments/'+id+'?pageindex=1'"></v-gcomment>
  </div>
</template>

<script>
import vGcomment from "../Comment_goods";
export default {
  components: { vGcomment },
  data() {
    return {
      id: this.$route.params.id,
      pageindex: 1
    };
  }
};
</script>

<style>
</style>