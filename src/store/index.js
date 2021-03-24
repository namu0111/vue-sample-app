import Vue from 'vue'
import Vuex from 'vuex'
import firebase from 'firebase'
import auth from './modules/auth';
import login_user from './modules/login_user';
// import createPersistedState from "vuex-persistedstate";
import createPersistedAuthState from "vuex-persistedstate";

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // login_user: {},
    miniVariant: true,
    addresses: [],
    // authToken: {},
  },  
  mutations: {
    // setAuthToken (state, token) {
    //   state.authToken = token
    // },
    // setLoginUser (state, user) {
    //   state.login_user = user
    // },
    // deleteLoginUser (state) {
    //   state.login_user = null
    // },
    toggleSideMenu (state) {
      state.miniVariant = !state.miniVariant
    },
    addAddress (state, address) {
      state.addresses.push(address)
    },
    updateAddress (state, { id, address }) {
      const index = state.addresses.findIndex(address => address.id === id)
      state.addresses[index] = address
    },
    deleteAddress (state, { id }) {
      const index = state.addresses.findIndex(address => address.id === id)
      state.addresses.splice(index, 1)
    },
  },
  actions: {
    // setAuthToken ({ commit }, token) {
    //   commit('setAuthToken', token)
    // },
    // setLoginUser ({ commit }, user) {
    //   commit('setLoginUser', user)
    // },
    // deleteLoginUser ({ commit }) {
    //   commit('deleteLoginUser')
    // },
    toggleSideMenu ({ commit }) {
      commit('toggleSideMenu')
    },
    addAddress ({ commit }, address) {
      commit('addAddress', address)
    },
    updateAddress ({ getters, commit }, { id, address }) {
      if (getters.uid) {
        firebase.firestore().collection(`users/${getters.uid}/addresses`).doc(id).update(address).then(() => {
          commit('updateAddress', { id, address })
        })
      }
    },
    deleteAddress ({ getters, commit }, { id }) {
      if (getters.uid) {
        firebase.firestore().collection(`users/${getters.uid}/addresses`).doc(id).delete().then(() => {
          commit('deleteAddress', { id })
        })
      }
    },
  },
  getters: {
    // userName: state => state.login_user ? state.login_user.name : '',
    // uid: state => state.login_user ? state.login_user.sub : null,
    getAddressById: state => id => state.addresses.find(address => address.id === id),
    contactName: state => state.addresses ? state.addresses[state.addresses.length -1].name : '',
    contactMail: state => state.addresses ? state.addresses[state.addresses.length -1].email : '',
    contactTelephone: state => state.addresses ? state.addresses[state.addresses.length -1].tel : '',
    contactAddress: state => state.addresses ? state.addresses[state.addresses.length -1].address : '',
  },
  modules: {
    auth,
    login_user,
  },
  strict: true,
  plugins: [
    createPersistedAuthState({
      key: 'Sample App',
      paths: ['auth.authToken','login_user.login_user'],
      storage: window.sessionStrage
  }),
  ]
})
