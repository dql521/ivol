import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    actives: false,//控制是否深色主题
    typeTab: [
      {
        name: "推荐",
        id: "0",
        minor: []
      },
      { name: "电影",
        id: "1",
        minor: [
          { name: "全部",  id: "1,6,7,8,9,10,11,12" },
          { name: "动作片",id: "6" },
          { name: "喜剧片",id: "7" },
          { name: "爱情片",id: "8" },
          { name: "科幻片",id: "9" },
          { name: "恐怖片",id: "10" },
          { name: "剧情片",id: "11" },
          { name: "战争片",id: "12" }
        ]
      },
      { name: "电视剧",
        id: "2",
        minor: [
          { name: "全部", id: "2,13,14,15,16" },
          { name: "国产剧", id: "13" },
          { name: "港台剧", id: "14" },
          { name: "日韩剧", id: "15" },
          { name: "欧美剧", id: "16" }
        ]
      },
      { name: "综艺",
        id: "3",
        minor: [
          { name: "全部", id: "3" }
        ]
      },
      { name: "动漫",
        id: "4",
        minor: [
          { name: "全部", id: "4" }
        ]
      }
    ],
    detailInfo: '',
    hotList: ''
  },
  mutations: {
  },
  actions: {
  },
  modules: {
  }
})
