import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'
//import store from '../store/index.js'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/home',
    name: 'home.user',
    component: () => import(/* webpackChunkName: "about" */ '../views/UserView.vue')
  },
  {
    path: '/admin',
    name: 'admin',
    component: () => import(/* webpackChunkName: "about" */ '../views/AdminView.vue')
  },
  {
    path: '/admin/new_product',
    name: 'admin.new_product',
    component: () => import(/* webpackChunkName: "about" */ '../views/NewProductView.vue')
  },
  {
    path: '/admin/product/:id',
    name: 'admin.product',
    component: () => import(/* webpackChunkName: "about" */ '../views/ProductView.vue')
  },
  {
    path: '/carrito',
    name: 'carrito',
    component: () => import(/* webpackChunkName: "about" */ '../views/CarritoView.vue')
  },
  {
    path: '/product/:id',
    name: 'product',
    component: () => import(/* webpackChunkName: "about" */ '../views/ProductoDetalleView.vue')
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

// Redirección a home si no está logueado
/*
router.beforeEach((to, from, next) => {
  console.log(store.state.getLoggedUser);
  if (to.path !== '/' && !store.state.getLoggedUser) {
    next({ path: '/' })
  } else {
    next()
  }
})
*/

export default router
