import Vue from 'vue'
import Router from 'vue-router'
import Home from '../pages/Home'
import Welcome from '../pages/Welcome'
import Details from '../pages/Details'
import Examine from '../pages/Examine'
import AccountList from '../pages/AccountList'
import NewAccount from '../pages/NewAccount'
import Index from '../pages/Index'
import FirstPage from '../pages/FirstPage'
import LoginAndRegistration from '../pages/LoginAndRegistration'
import UploadWorks from '../pages/UploadWorks'
import Personal from '../pages/Personal'
import Register from '../pages/Register'
import Login from '../pages/Login'
import FindPassword from '../pages/FindPassword'

Vue.use(Router)

const router = new Router({
  routes: [
    { path: '/', redirect: '/index' },
    {
      path: '/index',
      component: Index,
      redirect: '/index/firstPage',
      children: [
        {
          path: 'firstPage',
          component: FirstPage,
        },
        {
          path: 'loginAndRegistration',
          component: LoginAndRegistration,
          redirect: '/index/loginAndRegistration/login',
          children: [
            {
              path: 'register',
              component: Register
            },
            {
              path: 'login',
              component: Login
            },
            {
              path: 'findPassword',
              component: FindPassword
            }
          ]
        },
        {
          path: 'uploadWorks',
          component: UploadWorks,
        },
        {
          path: 'personal',
          component: Personal,
        }
      ]
    },
    {
      path: '/home',
      component: Home,
      redirect: '/home/welcome',
      children: [
        {
          path: 'welcome',
          component: Welcome
        },
        {
          path: 'details',
          component: Details,
        },
        {
          path: 'examine',
          component: Examine
        },
        {
          path: 'accountList',
          component: AccountList
        },
        {
          path: 'newAccount',
          component: NewAccount
        },
      ]
    }
  ]
})

router.beforeEach((to, from, next) => {
  if (to.path === '/index/firstPage' || to.path === '/index/loginAndRegistration' || to.path === '/index/loginAndRegistration/register' || to.path === '/index/loginAndRegistration/login' || to.path === '/index/loginAndRegistration/findPassword') return next()
  if (!window.sessionStorage.getItem('token')) {
    alert('请先登录!')
    next('/index/loginAndRegistration/login')
  }
  next()
})

export default router