import Vue from 'vue'
import VueRouter from 'vue-router'
import local from '@/utils/local'
// 引入组件
import Login from '@/views/login/Login.vue'  // 登录组件
import Layout from '@/views/layout/Layout.vue' // 布局大组件

Vue.use(VueRouter)

/* 解决重复跳转到一个路由 警告你的信息 */
//获取原型对象上的push函数
const originalPush = VueRouter.prototype.push
//修改原型对象中的push方法
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

/* 路由配置 */
const routes = [
  // 登录
  {
    path: '/login',
    component: Login,
    visible: false,
  },
  // 后台首页
  {
    path: '/',
    component: Layout,
    redirect: '/home',
    visible: true,
    meta: { title: '后台首页', path: '/home', icon: 'icon-home' },
    children: [
      {
        path: '/home',
        component: () => import('@/views/home/Home.vue')
      }
    ]
  },
]

const router = new VueRouter({
  routes
})

/* 全局前置路由守卫 */
router.beforeEach((to, from, next) => {
  // 登录状态
  let isLogin = local.get('t_k') ? true : false;

  if (isLogin) {
    next() // 走你
  } else {
    // 如果去的是登录
    if (to.path === '/login') {
      next() // 走你
    } else {
      next({ path: '/login' }) // 如果去别的页面 就跳转到登录
    }
  }
})

/**
 * 动态路由
 */
const dynamicRoutes = [
  // 订单管理
  {
    path: '/order',
    component: Layout,
    redirect: '/order/order-list',
    visible: true,
    meta: { title: '订单管理', path: '/order', icon: 'icon-order1' },
    children: [
      {
        meta: { title: '订单列表', path: '/order/order-list' },
        path: '/order/order-list',
        component: () => import('@/views/order/OrderList.vue')
      },
      {
        meta: { title: '订单编辑', path: '/order/order-edit' },
        name: 'order-edit', // 命名式路由
        path: '/order/order-edit',
        component: () => import('@/views/order/OrderEdit.vue')
      }
    ]
  },
  // 商品管理
  {
    path: '/goods',
    component: Layout,
    visible: true,
    redirect: '/goods/goods-list',
    meta: { title: '商品管理', path: '/goods', icon: 'icon-goods' },
    children: [
      {
        meta: { title: '商品列表', path: '/goods/goods-list' },
        path: '/goods/goods-list',
        component: () => import('@/views/goods/GoodsList.vue')
      },
      {
        meta: { title: '商品添加', path: '/goods/goods-add', roles: ['super'] },
        path: '/goods/goods-add',
        component: () => import('@/views/goods/GoodsAdd.vue')
      },
      {
        meta: { title: '商品分类', path: '/goods/goods-cate' },
        path: '/goods/goods-cate',
        component: () => import('@/views/goods/GoodsCate.vue'),
      }
    ]
  },
  // 店铺管理
  {
    path: '/shop',
    component: Layout,
    visible: true,
    meta: { title: '店铺管理', path: '/shop', icon: 'icon-shop', roles: ['super'] },
    children: [
      {
        path: '',
        component: () => import('@/views/shop/Shop.vue')
      }
    ]
  },
  // 账号管理
  {
    path: '/account',
    component: Layout,
    visible: true,
    redirect: '/account/account-list',
    meta: { title: '账号管理', path: '/account', icon: 'icon-user' },
    children: [
      {
        meta: { title: '账号添加', path: '/account/account-add', roles: ['super'] },
        path: '/account/account-add',
        component: () => import('@/views/account/AccountAdd.vue')
      },
      {
        meta: { title: '账号列表', path: '/account/account-list', roles: ['super'] },
        path: '/account/account-list',
        component: () => import('@/views/account/AccountList.vue')
      },
      {
        meta: { title: '修改密码', path: '/account/password-modify' },
        path: '/account/password-modify',
        component: () => import('@/views/account/PasswordModify.vue')
      },
      {
        meta: { title: '个人中心', path: '/account/personal' },
        path: '/account/personal',
        component: () => import('@/views/account/Personal.vue')
      },
    ]
  },
  // 销售统计
  {
    path: '/total',
    component: Layout,
    visible: true,
    redirect: '/total/goods-total',
    meta: { title: '销售统计', path: '/total', icon: 'icon-sum', roles: ['super'] },
    children: [
      {
        meta: { title: '商品统计', path: '/total/goods-total' },
        path: '/total/goods-total',
        component: () => import('@/views/total/GoodsTotal.vue')
      },
      {
        meta: { title: '订单统计', path: '/total/order-total' },
        path: '/total/order-total',
        component: () => import('@/views/total/OrderTotal.vue')
      }
    ]
  },
]

const options404 = [
  {
    visible: false,
    path: '*',
    redirect: '/error404'
  },
  {
    visible: false,
    path: '/error404',
    component: () => import('@/views/error/Error404.vue')
  }
]

/**
 * 判断是否有权限
 * @param {单个路由对象} router 
 * @param {当前用户角色} role 
 * @returns 返回true就是有权限 false就是没有权限
 */
const hasPremission = (router, role) => {
  // 如果在meta中配置了 roles
  if (router.meta && router.meta.roles) {
    return router.meta.roles.includes(role) // 看roles是不是包含当前用户角色 如果包含 就是true 否则就是false
  } else {
    // 没有在meta中配置 roles 证明这个对象不需要做权限 都可以访问
    return true;
  }
}

/**
 * 计算出当前角色有权限访问哪些路由
 * @param {全部的动态路由} dynamicRoutes 
 * @param {当前用户角色} role 
 * @returns {有权限访问的路由}
 */
const calcAccessRoutes = (dynamicRoutes, role) => {
  let accessRoutes = dynamicRoutes.filter(v => {
    if (hasPremission(v, role)) {

      if (v.children && v.children.length) {
        // 递归
        v.children = calcAccessRoutes(v.children, role)
      }

      return true;
    } else {
      return false;
    }
  })

  return accessRoutes
}

/**
 * 计算有权限访问的菜单
 * @param {有权限访问的路由 已经算好了} routes
 * @returns {要在导航显示的菜单}
 */
const calcMenus = (routes) => {
  let menus = routes.filter(v => v.visible)
  return menus;
}

/**
 * 计算动态路由
 */
export const calcDynamicRoutes = () => {
  let role = local.get('role')

  if (!role) return;

  // 把有权限访问的路由算出来
  let accessRoutes = calcAccessRoutes(dynamicRoutes, role)
  let result = [...routes, ...accessRoutes, ...options404];

  // 计算有权限访问的菜单
  let menus = calcMenus(result)
  local.set('menus', menus)

  // 把算出来的加入路由实例对象中
  router.addRoutes(result)

}

calcDynamicRoutes(); // 刷新也调用一次计算动态路由方法

export default router
