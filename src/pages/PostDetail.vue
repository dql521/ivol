<template>
  <div class="post-detail">
    <!-- 头部 -->
    <title-bar>影片详情</title-bar>

    <!-- 影片信息 -->
    <div class="main">
     <img class="vod_pic"  :src="detailInfo.vod_pic"/>
     <div class="vod_info">
       <p class="vod_title">{{detailInfo.vod_name}}</p>
       <p class="vod_remarks">{{detailInfo.vod_remarks}}</p>
       <div class="vod_actor">地区：{{detailInfo.vod_area}}</div>
       <div class="vod_actor">类型：{{detailInfo.type_name}}</div>
       <div class="vod_actor">主演：{{actor}}</div>
       <div class="vod_actor">语种：{{detailInfo.vod_lang}}</div>
       <div class="vod_actor">{{detailInfo.vod_year}}/{{detailInfo.vod_class}}</div>
     </div>
    </div>
    <!-- 评分以及播放按钮 -->
    <div class="vod_score">
      <div class="douban">豆瓣评分：{{detailInfo.vod_score}}</div>
      <van-rate
        v-model="score"
        allow-half
        readonly
        :size="60"
        color="#ffd21e"
        void-icon="star"
        void-color="#eee"/>
        <div class="play">
          <i class="play_icon icon iconfont icon-play"></i>
          <div class="play_btn" @click="toPlay">开始播放</div>
        </div>
    </div>
    <!-- 剧情介绍 -->
    <div class="post-commnet">
     <p class="commnet_title">剧情描述：</p>
      <TextOverflow :content="detailInfo.vod_blurb"></TextOverflow>
    </div>
    <div class="reco_box">
      <div class="text_title">热门推荐</div>
      <do-post :post="hotList"></do-post>
    </div>
    </div>
</template>

<script>
import TextOverflow from '../components/TextOverflow'
import TitleBar from '../components/DoHeader'
import DoPost from '../components/DoPost'
export default {
  components: {
    TitleBar,
    TextOverflow,
    DoPost
  },
  data () {
    return {
      detailInfo: this.$store.state.detailInfo,
      score: 0.0,
      hotList:''
    }
  },
  created () {
    this.score = Number(this.detailInfo.vod_score) / 2
    this.hotList = this.$store.state.hotList
    // this.getDetail()
    // this.getCommentList()
  },
  computed: {
    actor (value) {
      if (this.detailInfo.vod_actor == '') {
        return '暂无数据'
      }
      return this.detailInfo.vod_actor
    }
  },
  methods: {
    toPlay(){
      this.$router.push({
        path:"/vodPlay"
      })
    }
  },
  watch: {
    "$store.state.detailInfo": function () {
      this.detailInfo = this.$store.state.detailInfo
      this.score = Number(this.detailInfo.vod_score) / 2
    }
  }
}
</script>

<style lang="scss" scoped>
.post-detail {
  .main {
    padding: 10px;
    display: flex;
    .vod_pic{
      width: 112px;
      height: 148px;
    }
    .vod_info{
      flex: 1;
      padding: 0 20px;
      font-size: 13px;
      line-height: 20px;
      overflow: hidden;
      text-overflow:ellipsis;
      white-space: nowrap;
      .vod_title{
        font-size: 15px;
        font-weight: 700;
      }
      .vod_remarks{
        color: rgb(255, 123, 0);
      }

    }
  }
  .vod_score{
    display: flex;
    width: 90%;
    height: 50px;
    background: rgba(135, 206, 235, 0.5);
    margin: auto;
    border-radius: 8px;
    font-size: 16px;
    // line-height: 50px;
    color: #fff;
    padding: 0 10px;
    // justify-content: center;
    align-items: center;
    .douban{
      margin-right: 10px;
    }
    .play{
      display: flex;
      align-items: center;
    }
    .play_btn{
      font-size: 13px;
      text-align: center;
    }
    .play_icon{
      margin: 0 5px;
      font-size: 16px;
      color: #fff;
    }
  }
  .post-commnet {
    width: 100%;
    padding: 10px;
    .commnet_title{
      font-size: 14px;
      line-height: 28px;
      font-weight: 700;
      border-bottom: 1px solid oldlace;
      margin-bottom: 5px;
    }
  }
  .text_title{
    width: 100%;
    height: 30px;
    line-height: 30px;
    background: #fff;
    padding-left: 10px;
    font-size: 18px;
  }
}
</style>
