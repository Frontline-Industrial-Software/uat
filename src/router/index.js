import {
  createRouter,
  createWebHashHistory,
  createWebHistory,
} from 'vue-router'
// 路由守卫
import { Amplify, Auth } from 'aws-amplify'
import awsconfig from '@/utils/aws-exports'
//1. 定义要使用到的路由组件  （一定要使用文件的全名，得包含文件后缀名）
import Login from '@/view/login/login.vue'
import Dashboard from '@/view/dashborad/index.vue'
// 子路由
// import InputData from "../components/dashborad/inputData/index.vue";
// import BaselineSummary from "../components/dashborad/baselineSummary/index.vue";
// import OptimizedReport from "../components/dashborad/optimizedReport/index.vue";
// import optimizedSummary from "../components/dashborad/optimizedSummary/index.vue";

import NotFound from '@/components/404/404.vue'
//2. 路由配置
const routes = [
  //redirect 重定向也是通过 routes 配置来完成，下面就是从 / 重定向到 /index
  {
    path: '/',
    redirect: '/dashboard/inputdata',
  },
  { path: '/Login', component: Login, name: 'login' },
  { path: '/NotFound', component: NotFound, name: 'NotFound' },
  {
    path: '/:catchAll(.*)',
    redirect: '/NotFound',
  },
  {
    path: '/dashboard',
    component: Dashboard,
    name: 'dashboard',
    redirect: 'inputData',
    children: [
      {
        path: 'inputData',
        component: () => import('@/view/dashborad/inputData/index.vue'),
        name: 'InputData',
      },
      {
        path: 'baselineSummary',
        component: () => import('@/view/dashborad/baselineSummary/index.vue'),
        name: 'BaselineSummary',
        beforeEnter: (to, from, next) => {
          if (!from.name) {
            next({ name: 'InputData' })
          }
          next()
        },
      },
      {
        path: 'optimizedReport',
        component: () =>
          import('@/view/dashborad/optimizedReport/optimizedReport.vue'),
        name: 'OptimizedReport',
        beforeEnter: (to, from, next) => {
          if (!from.name) {
            next({ name: 'InputData' })
          }
          next()
        },
      },
      {
        path: 'optimizedSummary',
        component: () => import('@/view/dashborad/optimizedSummary/index.vue'),
        name: 'optimizedSummary',
        beforeEnter: (to, from, next) => {
          if (!from.name) {
            next({ name: 'InputData' })
          }
          next()
        },
      },
    ],
  },
]

Amplify.configure(awsconfig)
// 3. 创建路由实例
const router = createRouter({
  // （1）采用hash 模式
  history: createWebHashHistory(),
  // （2）采用 history 模式
  // history: createWebHistory(),
  routes, //使用上方定义的路由配置
})

// 创建 beforeEach 导航守卫
router.beforeEach(async (to, from, next) => {
  // console.log(to);
  if (to.fullPath.includes('dashboard')) {
    try {
      const userInfo = await Auth.currentAuthenticatedUser()
      if (!to.fullPath.includes('inputdata')) {
      }
      next()
    } catch (error) {
      next({ name: 'login' })
    }
  } else if (to.name === 'login') {
    next()
  } else {
    next()
  }
  // console.log(userInfo);
  // 获取当前认证状态的用户信息
})
// 4. 导出router
export default router
