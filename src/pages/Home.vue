<template>
  <div class="home">
    <div class="header">
      <div class="left">
        <i class="icon iconfont icon-heiyemoshi" @click="$store.state.actives = true"></i>
        <i class="icon iconfont icon-tianqitaiyangqichuang" @click="$store.state.actives = false"></i>
      </div>
    </div>
    <!-- 轮播图 -->
    <!-- <van-swipe  class="my_swep" :autoplay="3000">
      <van-swipe-item v-for="(item, index) in swipeList" :key="index">
      <div class="swep_box">
        <img :src="item.vod_pic">
      </div>
      </van-swipe-item>
    </van-swipe> -->
    <carousel-3d
    :autoplay="true"
    :autoplayTimeout="3000"
    :cunt="5"
    :border="0"
    class="my_swep"
    v-if="showSwp">
      <slide
      :index="index"
      class="swep_box"
      v-for="(item, index) in swipeList"
      :key="index"
      v-if="showSwp">
        <template>
            <img :src="item.vod_pic">
            <p>{{item.vod_name}}</p>
        </template>
      </slide>
    </carousel-3d>

    <!-- <van-tabs v-model="active" sticky animated swipeable>
      <van-tab :title="item.name" v-for="item in tabList" :key="item.id">
        <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
        <van-list
            v-model="loading"
            :finished="finished"
            finished-text="没有更多了"
            @load="onLoad"
            :immediate-check="false"
            :offset="50"
          >
        <do-post v-for="post in postList" :key="post.id" :post="post"></do-post>
        </van-list>
        </van-pull-refresh>
      </van-tab>
  </van-tabs> -->
  <!-- tabs首页导航 -->
  <!-- <van-tabs v-model="active" sticky animated swipeable>
      <van-tab :title="item.name" v-for="item in typeTab" :key="item.id">
      </van-tab>
  </van-tabs> -->

    <div class="text_title">热门推荐</div>
    <do-post :post="hotList"></do-post>
  </div>
</template>

<script>
import DoPost from '../components/DoPost'
import { Carousel3d, Slide } from 'vue-carousel-3d'
import { getTabInfo, getTuiVodInfo } from '../api/api'
export default {
  name: 'home',
  data () {
    return {
      active: 0,
      tabList: [],
      postList: [],
      pageIndex: 1,
      pageSize: 5,
      loading: true,
      refreshing: false,
      finished: false,
      typeTab: this.$store.state.typeTab, //首页展示tab
      swipeList: [], //轮播列表
      showSwp: false, //控制显示轮播
      hotList: [] //热门列表
      // swipeList2: '', //轮播列表2
      // swipeList3: '' //轮播列表3
    }
  },
  created(){
    this.getPostList()
  },
  mounted(){

  },
  methods: {
    async getPostList () {
      const res = await getTabInfo({ac:'list',pg:'1'})
      const { list } = res.data
      // console.log(res.data);
      const idsList = list.map(item => {
        return item.vod_id
      })
      const resp = await getTuiVodInfo({ac:'detail',ids:idsList.toString()})
      this.hotList = resp.data.list.slice(0,18)
      this.$store.state.hotList = resp.data.list.slice(17,20)
      this.swipeList = resp.data.list.slice(0,5)
      this.showSwp = true
      // console.log(resp.data.list.slice(0,5));
      // const { statusCode, data } = res.data
      // if (statusCode === 200) {
      //   this.postList = [...this.postList, ...data]
      //   this.loading = false
      //   setTimeout(() => {
      //     this.refreshing = false
      //   }, 1000)
      //   if (data.length < this.pageSize) {
      //     this.finished = true
      //   }
      // }
    },
    // async getPostList () {
    //   const id = this.tabList[this.active].id
    //   const res = await this.$axios.get('/post', {
    //     params: {
    //       category: id,
    //       pageIndex: this.pageIndex,
    //       pageSize: this.pageSize
    //     }
    //   })
    //   const { statusCode, data } = res.data
    //   if (statusCode === 200) {
    //     this.postList = [...this.postList, ...data]
    //     this.loading = false
    //     setTimeout(() => {
    //       this.refreshing = false
    //     }, 1000)
    //     if (data.length < this.pageSize) {
    //       this.finished = true
    //     }
    //   }
    // },
    onLoad () {
      setTimeout(() => {
        this.pageIndex++
        this.getPostList()
      }, 1000)
    },
    onRefresh () {
      this.loading = true
      this.pageIndex = 1
      this.postList = []
      this.finished = false
      this.onLoad()
    }
  },
  watch: {
    active (value) {
      this.pageIndex = 0
      this.postList = []
      this.finished = false
      this.loading = true
      this.onLoad()
    }
  },
  components: {
    DoPost,
    Carousel3d,
    Slide
  }
}
</script>

<style lang="scss" scoped>
.home {
  .header {
    height: 50px;
    line-height: 50px;
    display: flex;
    align-items: center;
    text-align: center;
    color: #fff;
    .left,
    .right {
      width: 70px;
      height: 30px;
      line-height: 5px;
      font-size: 48px;
      background: rgba($color: #000000, $alpha: 0.1);
      border-radius: 10px;
      margin-left: 10px;
      i{
        margin: 0 10px;
      }
    }
    .search {
      flex: 1;
      height: 36px;
      line-height: 36px;
      background-color: rgba(255, 255, 255, .5);
      margin-top: 7px;
      border-radius: 18px;
      span {
        font-size: 14px;
        margin-left: 5px;
      }
    }
    .iconnew {
      font-size: 50px;
    }
    .iconwode {
      font-size: 24px;
    }
  }
 .my_swep{
    // width: 100% !important;
    height: 170px !important;
 .swep_box{
      width: 112px !important;
      height: 170px !important;
      background: none !important;
      text-align: center !important;
      img{
        width: 112px !important;
        height: 148px !important;
      }
      p{
        font-size: 11px !important;
        overflow: hidden;
        text-overflow:ellipsis;
        white-space: nowrap;
        // padding-left: 5px !important;
      }
    }
  }
  .text_title{
    width: 100%;
    height: 30px;
    color: orangered;
    line-height: 30px;
    padding-left: 10px;
    font-size: 18px;
  }
}
</style>
