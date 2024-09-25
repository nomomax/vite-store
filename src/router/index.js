import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue')
    },
    {
      path: '/login',
      component: () => import('../views/LoginView.vue')
    },
    {
      path: '/dashboard',
      component: () => import('../views/DashboardView.vue'),
      children: [
        {
          path: 'products',
          component: () => import('../views/ProductsView.vue')
        },
        {
          path: 'orders',
          component: () => import('../views/OrdersView.vue')
        },
        {
          path: 'coupons',
          component: () => import('../views/CouponsView.vue')
        },
      ]
    },
    {
      path: '/user',
      component: () => import('../views/UserboardView.vue'),
      children: [
        {
          path: 'cart',
          component: () => import('../views/UserCart.vue')
        },
        {
          path: 'product/:productId',
          component: () => import('../views/UserProduct.vue')
        },
        {
          path: 'checkout/:orderId',
          component: () => import('../views/UserCheckout.vue')
        },
      ]
    },
  ]
})

export default router
