<template>
  <van-tabbar
  v-model="active"
  active-color="#5351ca80"
  route>
  <van-tabbar-item name="home" replace to="/" icon="home-o">首页</van-tabbar-item>
  <van-tabbar-item name="category" replace to="/vol-class">
    <span>分类</span>
    <template #icon="props">
      <i class="icon iconfont icon-fenlei"></i>
    </template>
  </van-tabbar-item>
  <van-tabbar-item name="search" replace to="/search" icon="search">搜索</van-tabbar-item>
  <van-tabbar-item name="setting" replace>
    <span>专题</span>
    <template #icon="props">
      <i class="icon iconfont icon-biaoqiankuozhan_zhuanti-390"></i>
    </template>
    </van-tabbar-item>
</van-tabbar>
</template>

<script>

export default {
data() {
  return {
    active: 'home'
  }
},
}
</script>

<style lang="scss" scoped>
.icon-fenlei,
.icon-biaoqiankuozhan_zhuanti-390{
  font-size: 24px;
}
</style>