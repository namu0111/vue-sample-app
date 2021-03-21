import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import NoAuth from '../views/NoAuth.vue'
import Addresses from '../views/Addresses.vue'
import AddressForm from '../views/AddressForm.vue'
import firebase from 'firebase'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home,
    meta: { requiresAuth: true },
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue'),
    meta: { requiresAuth: true },
  },
  {
    path: '/addresses',
    name: 'addresses',
    component: Addresses,
    meta: { requiresAuth: true },
  },
  {
    path: '/addresses/:address_id?/edit',
    name: 'address_edit',
    component: AddressForm,
    meta: { requiresAuth: true },
  },
  {
    path: '/no-auth',
    name: 'NoAuth',
    component: NoAuth,
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth)
  if (requiresAuth) {
    firebase.auth().onAuthStateChanged(function (user) {
      if (user) {
        next()
      } else {
        next({
          name: 'NoAuth',
        })
      }
    })
  } else {
    next() // next() を常に呼び出すようにしてください!
  }
})

export default router
