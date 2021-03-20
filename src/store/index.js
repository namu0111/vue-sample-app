import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    miniVariant: true,
  },
  mutations: {
    toggleSideMenu (state) {
      state.miniVariant = !state.miniVariant
    }
  },
  actions: {
    toggleSideMenu ({ commit }) {
      commit('toggleSideMenu')
    }
  },
  modules: {
  }
})
