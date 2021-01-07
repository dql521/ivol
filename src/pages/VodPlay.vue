<template>
  <div class="vod_play">
    <!-- 头部 -->
    <title-bar>{{detailInfo.vod_name}}</title-bar>

    <!-- 播放区域 -->
    <div class="main">
      <video-player class="video-player vjs-custom-skin"
        ref="videoPlayer"
        :playsinline="true"
        :options="playerOptions">
      </video-player>
    </div>
    <!-- 选集，下载等 -->
    <div class="vod_downl">
      <div>
        <i class="icon iconfont icon-home1"></i>
        <p>首页</p>
      </div>
      <a>
        <i class="icon iconfont icon-xiazai"></i>
        <p>下载</p>
      </a>
      <div>
        <i class="icon iconfont icon-dashang"></i>
        <p>支持</p>
      </div>
    </div>
    <!-- 剧集选择 -->
    <div class="series">
      <span>播放源：</span>
      <van-tabs
      v-model="active"
      class="series_tab"
      color="#5351ca80"
      @click="getTabUrl">
        <van-tab
        :title="item"
        v-for="(item, index) in playFrom"
        :key="index">
        </van-tab>
      </van-tabs>
      <ul class="vod_numb">
            <li v-for="(i, index) in urlObj"
            :key="index"
            :class="[selIndex == index? 'selIndex' : 'indexList']"
            @click="selVodNumb(index,i)">{{i.type}}</li>
          </ul>
    </div>
    <!-- 剧情介绍 -->
    <div class="post-commnet">
     <p class="commnet_title">剧情描述：</p>
      <TextOverflow :content="detailInfo.vod_blurb"></TextOverflow>   
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
      active: 0, //tab默认值
      selIndex: 0, //选集默认值
      playerOptions: {
      playbackRates: [0.5, 1.0, 1.5, 2.0], // 可选的播放速度
      autoplay: true, // 如果为true,浏览器准备好时开始回放。
      muted: false, // 默认情况下将会消除任何音频。
      loop: false, // 是否视频一结束就重新开始。
      preload: 'auto', // 建议浏览器在<video>加载元素后是否应该开始下载视频数据。auto浏览器选择最佳行为,立即开始加载视频（如果浏览器支持）
      language: 'zh-CN',
      aspectRatio: '16:9', // 将播放器置于流畅模式，并在计算播放器的动态大小时使用该值。值应该代表一个比例 - 用冒号分隔的两个数字（例如"16:9"或"4:3"）
      fluid: true, // 当true时，Video.js player将拥有流体大小。换句话说，它将按比例缩放以适应其容器。
      sources: [{
       type: "application/x-mpegURL", // 类型
       src: '' // url地址
      }],
      hls: true,
      poster: '', // 封面地址
      notSupportedMessage: '此视频暂无法播放，请稍后再试', // 允许覆盖Video.js无法播放媒体源时显示的默认信息。
      controlBar: {
        timeDivider: true, // 当前时间和持续时间的分隔符
        durationDisplay: true, // 显示持续时间
        remainingTimeDisplay: false, // 是否显示剩余时间功能
        fullscreenToggle: true // 是否显示全屏按钮
      }
    },
    playUrl: '', //播放数据
    playFrom: '', //片源列表
    urlObj: [] //集数列表
    }
  },
  created () {
    // console.log(this.detailInfo);
    this.getTabUrl(0)
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

    getTabUrl (index) {
      var url1 = []
      this.urlObj = []
      this.playFrom = this.detailInfo.vod_play_from.split('$$$')
      this.playUrl = this.detailInfo.vod_play_url.split('$$$') //分离不同源剧集
     url1 = this.playUrl[index].split('#') //分离具体剧集
     url1.map(item => {  
      this.urlObj.push({
        type: item.split('$')[0],
        url: item.split('$')[1]
      })
    })
    this.selVodNumb(0,this.urlObj[0])
    },
    selVodNumb (index,i) {
      this.selIndex = index
      
      this.playerOptions.sources[0].src = i.url
      console.log(this.playerOptions.sources[0].src);
    }
  },
  watch: {
    "$store.state.detailInfo": function () {
      this.detailInfo = this.$store.state.detailInfo
    },
    "playerOptions.sources.src": function () {
      
    }
  }
}
</script>

<style lang="scss" scoped>
.vod_play {
  margin-bottom: 48px;
  .vod_downl{
    display: flex;
    width: 100%;
    height: 60px;
    justify-content: center;
    align-items: center;
    margin-top: 10px;
    div,a{
      width: 60px;
      height: 60px;
      text-align: center;
    }
    i{
      font-size: 24px;
    }
    a{
      margin: 0 10px;
      color: #333;
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
  .series{
    padding: 10px;
    font-size: 15px;
    .series_tab{
      margin: 0 10px;
    }
    .vod_numb{
      font-size: 10px;
      display: flex;
      overflow: scroll;
      flex-wrap: wrap;
      margin-top: 10px;
      // align-content: space-around;
      .indexList{
        padding: 5px 10px;
        text-align: center;
        margin: 5px 5px;
        border: 1px solid #333;
      }
      .selIndex{
        padding: 5px 10px;
        text-align: center;
        margin: 5px 5px;
        background: #5351ca80;
        color: #fff;
      }
    }
  }
}
</style>
