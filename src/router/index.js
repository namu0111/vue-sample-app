import Vue from 'vue'
import VueRouter from 'vue-router'
import { authGuard } from '../auth/authGuard';
import Home from '../views/Home.vue'
import Callback from "../views/Callback.vue";
import Addresses from '../views/Addresses.vue'
import AddressForm from '../views/AddressForm.vue'
import Profile from "../views/Profile.vue";
import ContactForm from "../views/ContactForm.vue";
import ContactFormThanks from "../views/ContactFormThanks.vue";
import Error from "../components/Error.vue";

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home,
  },
  {
    path: '/callback',
    name: 'callback',
    component: Callback,
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
  {
    path: "/contact-form",
    name: "contact-form",
    component: ContactForm,
  },
  {
    path: "/contact-form-thanks",
    name: "contact-form-thanks",
    component: ContactFormThanks,
  },
  {
    path: "/error",
    name: "error",
    component: Error,
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
