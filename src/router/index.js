import Vue from 'vue'
import VueRouter from 'vue-router'
import { authGuard } from '../auth/authGuard';
import Home from '../views/Home.vue'
import NoAuth from '../views/NoAuth.vue'
import Addresses from '../views/Addresses.vue'
import AddressForm from '../views/AddressForm.vue'
import Profile from "../views/Profile.vue";

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home,
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue'),
    beforeEnter: authGuard,
  },
  {
    path: '/addresses',
    name: 'addresses',
    component: Addresses,
    beforeEnter: authGuard,
  },
  {
    path: '/addresses/:address_id?/edit',
    name: 'address_edit',
    component: AddressForm,
    beforeEnter: authGuard,
  },
  {
    path: "/profile",
    name: "profile",
    component: Profile,
    beforeEnter: authGuard,
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
