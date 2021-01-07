import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../pages/Login.vue'
import VodPlay from '../pages/VodPlay.vue'
import Profile from '../pages/Profile.vue'
import VolClass from '../pages/VolClass.vue'
import Follow from '../pages/Follow.vue'
import Test from '../pages/Test.vue'
import MyComments from '../pages/MyComments.vue'
import MyStar from '../pages/MyStar.vue'
import Home from '../pages/Home.vue'
import PostDetail from '../pages/PostDetail.vue'
import TabManage from '../pages/TabManage.vue'
import Search from '../pages/Search.vue'

Vue.use(VueRouter)

const router = new VueRouter({
  routes: [
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/vodPlay',
      name: 'vodPlay',
      component: VodPlay
    },
    {
      path: '/profile',
      name: 'profile',
      component: Profile
    },
    {
      path: '/vol-class',
      name: 'vol-class',
      component: VolClass
    },
    {
      path: '/follow',
      name: 'follow',
      component: Follow
    },
    {
      path: '/test',
      name: 'test',
      component: Test
    },
    {
      path: '/my-comments',
      name: 'my-comments',
      component: MyComments
    },
    {
      path: '/my-star',
      name: 'my-star',
      component: MyStar
    },
    {
      path: '/post-detail',
      name: 'post-detail',
      component: PostDetail
    },
    {
      path: '/tab-manage',
      name: 'tab-manage',
      component: TabManage
    },
    {
      path: '/search',
      name: 'search',
      component: Search
    }
  ]
})

const originalPush = VueRouter.prototype.push
 
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

const AuthUrls = [
  '/profile',
  '/edit-profile',
  '/follow',
  'my-comments',
  '/my-star',
  '/tab-manage'
]
router.beforeEach(function (to, from, next) {
  const token = localStorage.getItem('token')
  if (AuthUrls.includes(to.path)) {
    if (token) {
      next()
    } else {
      router.push('/login')
    }
  } else {
    next()
  }
})

export default router
