import Vue from 'vue'
import Vuex from 'vuex'
import firebase from 'firebase'


Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    login_user: {},
    miniVariant: true,
    addresses: []
  },
  mutations: {
    setLoginUser (state, user) {
      state.login_user = user
    },
    deleteLoginUser (state) {
      state.login_user = null
    },
    toggleSideMenu (state) {
      state.miniVariant = !state.miniVariant
    },
    addAddress (state, address) {
      state.addresses.push(address)
    },
  },
  actions: {
    setLoginUser ({ commit }, user) {
      commit('setLoginUser', user)
    },
    deleteLoginUser ({ commit }) {
      commit('deleteLoginUser')
    },
    login () {
      const google_auth_provider = new firebase.auth.GoogleAuthProvider()
      firebase.auth().signInWithRedirect(google_auth_provider)
    },
    logout () {
      firebase.auth().signOut()
    },
    onAuth({ commit }) {
      firebase.auth().onAuthStateChanged(user => {
          user = user ? user : {};
          commit('onAuthStateChanged', user);
          commit('onUserStatusChanged', user.uid ? true : false);
      });
    },
    toggleSideMenu ({ commit }) {
      commit('toggleSideMenu')
    },
    addAddress ({ commit }, address) {
      commit('addAddress', address)
    },
  },
  getters: {
    userName: state => state.login_user ? state.login_user.displayName : '',
    uid: state => state.login_user ? state.login_user.uid : null,
  },
  modules: {
  }
})
