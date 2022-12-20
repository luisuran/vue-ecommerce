import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/user',
    name: 'user',
    component: () => import(/* webpackChunkName: "about" */ '../views/UserView.vue')
  },
  {
    path: '/admin',
    name: 'admin',
    component: () => import(/* webpackChunkName: "about" */ '../views/AdminView.vue')
  },
  {
    path: '/carrito',
    name: 'carrito',
    component: () => import(/* webpackChunkName: "about" */ '../views/CarritoView.vue')
  },
  {
    path: '*',
    name: 'not-found',
    component: () => import(/* webpackChunkName: "not-found" */ '../views/NotFoundView.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
