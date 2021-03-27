const namespaced = true

const state = {
    authToken: {},
    authRole: "",
}

const mutations = {
    setAuthToken (state, token) {
        state.authToken = token
      },
      setAuthRole (state, role) {
        state.authRole = role
      },
}

const actions = {
    setAuthToken ({ commit }, token) {
        commit('setAuthToken', token)
      },
      setAuthRole ({ commit }, role) {
        commit('setAuthRole', role)
      },
}

export default {
    namespaced,
    state,
    mutations,
    actions,
}