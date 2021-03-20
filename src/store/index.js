import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    miniVariant: true,
    addresses: []
  },
  mutations: {
    toggleSideMenu (state) {
      state.miniVariant = !state.miniVariant
    },
    addAddress (state, address) {
      state.addresses.push(address)
    },
  },
  actions: {
    toggleSideMenu ({ commit }) {
      commit('toggleSideMenu')
    },
    addAddress ({ commit }, address) {
      commit('addAddress', address)
    }
  },
  modules: {
  }
})
