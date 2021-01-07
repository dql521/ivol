<template>
  <div class="vol_class">
    <do-header>影视分类</do-header>
    <div class="tab_box">
      <div class="tab_one">
        <div :class="['active',active == index?'sel':'']"
        v-for="(item, index) in typeTab"
        :key="item.id"
        @click="selTab(index)">{{item.name}}</div>
      </div>
      <div class="tab_one" v-if="typeTab2.length>2">
        <div :class="['active2',active2 == index?'sel':'']"
        v-for="(item, index) in typeTab2"
        :key="item.id"
        @click="selTabs(index)">{{item.name}}</div>
      </div>
      <div class="tab_one">
        <div :class="['active2',active3 == index?'sel':'']"
        v-for="(item, index) in yearTab"
        :key="item"
        @click="selYear(index)">{{item}}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
     active: 0,
     active2:0,
     active3:0,
     typeTab: [
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
    typeTab2:[],
    yearTab:['全部',2020,2019,2018,2017,2016,2015,2014,2013,2012,2011,2010]
    }
  },
  computed: {
   
  },
  created () {
    this.typeTab2 = this.typeTab[this.active].minor
  },
  methods: {
    selTab(index){
      this.active = index
    },
    selTabs(index){
      this.active2 = index
    },
    selYear(index){
      this.active3 = index
    }
  },
  watch:{
    'active':function (val) {
      this.typeTab2 = this.typeTab[this.active].minor
      this.active2 = 0
    }
  }
}
</script>

<style lang="scss" scoped>
  .vol_class {
  .tab_box{
    padding: 10px 20px;
    .tab_one{
      width: 100%;
      height: 40px;
      display: flex;
      flex-wrap: nowrap;
      overflow:auto;
      white-space:nowrap;
      .active{
        font-size: 16px;
        margin-right: 40px;
        line-height: 40px;
        flex-shrink:0;
      }
      .active2{
        flex-shrink:0;
        font-size: 15px;
        margin-right: 20px;
        line-height: 40px;
        
      }
      .sel{
       color: chartreuse;
       border-bottom: 4px solid chartreuse;
      }
    }

    
  }
 
}

</style>
