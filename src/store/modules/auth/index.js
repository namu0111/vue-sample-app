const namespaced = true

const state = {
    authToken: {},
}

const mutations = {
    setAuthToken (state, token) {
        state.authToken = token
      },
}

const actions = {
    setAuthToken ({ commit }, token) {
        commit('setAuthToken', token)
      },
}

export default {
    namespaced,
    state,
    mutations,
    actions,
}