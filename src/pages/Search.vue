<template>
  <div class="search">
    <div class="header">
      <div class="left" @click="back">
        <i class="iconfont iconjiantou"></i>
      </div>
      <div class="center">
        <i class="iconfont iconsearch search_ipt"></i>
        <input
          class="search_ipt"
          type="text"
          placeholder="请输入搜索关键字"
          v-model="keyword"
          style="background: transparent"
        />
      </div>
      <div class="right" @click="search">搜索</div>
    </div>

    <div v-if="postList.length > 0">
      <van-card
        :desc="item.vod_actor"
        :title="item.vod_name"
        :thumb="item.vod_pic"
        :tag="item.vod_score"
        :centered="true"
        v-for="(item, index) in postList"
        :key="index"
        class="post-list"
      >
        <template #tags>
          <van-tag type="warning" class="tags_text">{{item.vod_blurb}}</van-tag>
        </template>
        <template #footer>
          <van-button plain type="primary" size="mini" @click="toDetail(item)">立即播放</van-button>
        </template>
      </van-card>
    </div>
    <div class="content" v-else>
      <div v-if="history.length > 0">
        <h3>历史记录</h3>
        <ul>
          <li v-for="item in history" :key="item" @click="hotSearch(item)">
            {{ item }}
          </li>
        </ul>
      </div>

      <div>
        <h3>热门搜索</h3>
        <ul>
          <li v-for="item in hotKeys" :key="item" @click="hotSearch(item)">
            {{ item }}
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import DoPost from "../components/DoPost";
import { getSearch } from "../api/api";
export default {
  components: {
    DoPost,
  },
  data() {
    return {
      keyword: "",
      postList: [],
      hotKeys: ["我和我的家乡", "装台", "金刚川", "四大才子"],
      history: JSON.parse(localStorage.getItem("history")) || [],
    };
  },
  methods: {
    async search() {
      const res = await getSearch({ ac: "detail", wd: this.keyword });
      if (res.data.list.length === 0) {
        this.$toast("未找到匹配内容");
        this.keyword = "";
      }
      // console.log(res.data.list);
      this.postList = res.data.list;
      // if (statusCode === 200) {
      //   this.postList = data
        this.history = this.history.filter(item => item !== this.keyword)
        this.history.unshift(this.keyword)
        localStorage.setItem('history', JSON.stringify(this.history))
      // }
    },
    back() {
      if (this.keyword) {
        this.keyword = "";
      } else {
        this.$router.back();
      }
    },
    hotSearch(item) {
      this.keyword = item;
      this.search();
    },
    //去详情页
    toDetail (info) {
      this.$router.push({
        path:"/post-detail",
      })
      this.$store.state.detailInfo = info
    }
  },
  watch: {
    keyword(value) {
      if (value === "") {
        this.postList = [];
      }
    },
  },
};
</script>

<style lang="scss" scope>
.search {
  height: 800px;
  .header {
    display: flex;
    border-bottom: 1px solid #ccc;
    height: 50px;
    line-height: 50px;
    .search_ipt{
      color: #333;
    }
    .left,
    .right {
      width: 50px;
      text-align: center;
    }
    .center {
      flex: 1;
      height: 34px;
      margin-top: 7px;
      border: 1px solid #ccc;
      border-radius: 17px;
      display: flex;
      padding-right: 20px;
      background: #fff;
      .iconfont {
        width: 40px;
        line-height: 34px;
        text-align: center;
      }
      input {
        flex: 1;
        font-size: 12px;
        background-color: #f7f7f7;
      }
    }
  }
  .post-list{
    background: #fff;
  }
  .content {
    padding: 20px;
    h3 {
      font-size: 18px;
      font-weight: 700;
      margin-bottom: 10px;
    }
    ul{
      margin-bottom: 10px;
    }
    li {
      // width: 20%;
      // height: 30px;
      line-height: 30px;
      text-align: center;
      display: inline-block;
      padding: 0 10px;
      margin-right: 20px;
      margin-bottom: 10px;
      border-radius: 10px;
      background: rgba($color: #2f4407, $alpha: 0.3);
    }
  }
  .tags_text{
    overflow : hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  }
}
</style>
