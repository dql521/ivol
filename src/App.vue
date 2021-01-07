<template>
  <div :class="[actives?'actives':'app']">
    <!-- <keep-alive include="home"> -->
    <router-view></router-view>
    <!-- </keep-alive> -->
    <footer-nav v-if="isShowNav" :activeNavIndex="activeNavIndex"></footer-nav>
  </div>
</template>

<script>
import FooterNav from './components/DoFooterNav'
export default {
components: {
  "footer-nav": FooterNav,
},
data() {
  return {
    isShowNav: true,
    activeNavIndex: 0,
    navTabs: ['home', 'category', 'search', 'Me'],
    actives: false
  }
},
created() {
  //在页面刷新时将vuex里的信息保存到localStorage里
window.addEventListener("beforeunload",()=>{
  localStorage.setItem("messageStore",JSON.stringify(this.$store.state))
})
 
//在页面加载时读取localStorage里的状态信息
localStorage.getItem("messageStore") && this.$store.replaceState(Object.assign(this.$store.state,JSON.parse(localStorage.getItem("messageStore"))));
},
watch: {
  activeNavIndex(newValue) {
    if(newValue === 0) {
      this.$router.push('/home')
    }
  },
  '$store.state.actives':function (val) {
    this.actives = val
  }
}
}
</script>

<style lang="scss">
.app {
  // height: 100%;
  font: 12px/1.5 'Microsoft YaHei', '宋体', Tahoma, Arial, sans-serif;
  color: #333;
  background: linear-gradient(#5351ca80 10%,#ffffff 20%); 
}
.actives{
  // height: 100%;
  font: 12px/1.5 'Microsoft YaHei', '宋体', Tahoma, Arial, sans-serif;
  color: #fff;
  background: #333;
}
</style>
