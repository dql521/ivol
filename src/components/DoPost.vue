<template>
  <div class="hm-post">
    <!-- 单图类 -->
    <div
    class="post_box"
    v-for="(item, index) in post"
    :key="index"
    @click="toDetail(item)">
        <img :src="item.vod_pic" alt="">
        <p>{{item.vod_name}}</p>
        <div class="badge">{{item.type_name}}</div>
    </div>
   </div>
</template>
<script>
export default {
  props: {
    post: {
      type: Array
    }
  },
  methods:{
    toDetail (info) {
      this.$router.push({
        path:"/post-detail"
      })
      this.$store.state.detailInfo = info
    }
  }
}
</script>

<style lang="scss" scoped>
.hm-post {
  width: 100%;
  display: flex;
  // justify-content: space-between;
  flex-wrap: wrap;
  padding: 5px 5px;
  margin-bottom: 48px;
  align-content: space-around;
}
.post_box{
  width: 112px;
  height: 170px;
  margin-right: 4px;
  position: relative;
  .badge{
    position: absolute;
    top: 5px;
    left: 5px;
    width: 40px;
    height: 20px;
    line-height: 20px;
    text-align: center;
    background: rgb(211, 247, 11);
  }
  img{
    width: 112px;
    height: 148px;
  }
  p{
    text-align: center;
    overflow: hidden;
    text-overflow:ellipsis;
    white-space: nowrap;
  }
}
.post_box::after {
  flex: 1;
  // margin-right: -5px;
    // content: '';
    // flex: auto;    /* 或者flex: 1 */
}
// .post_box::not(:nth-child(3n)) {
//     margin-right: calc(3% / 2);
// }

</style>
