const namespaced = true

const state = {
    login_user: {},
}

const mutations = {
    setLoginUser (state, user) {
        state.login_user = user
    },
    deleteLoginUser (state) {
    state.login_user = null
    },
}

const actions = {
    setLoginUser ({ commit }, user) {
        commit('setLoginUser', user)
    },
    deleteLoginUser ({ commit }) {
    commit('deleteLoginUser')
    },
}

const getters = {
    userName: state => state.login_user ? state.login_user.name : '',
    userId: state => state.login_user ? state.login_user.sub : null,
}

export default {
    namespaced,
    state,
    mutations,
    actions,
    getters,
}
