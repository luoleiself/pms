import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user: {}
  },
  mutations: {
    ["USER_LOGIN"](state, payload) {
      state.user = payload;
    },
    ["USER_LOGOUT"](state, payload) {
      state.user = payload;
    }
  },
  actions: {
    ["USER_LOGIN"]({ commit }, payload) {
      commit("USER_LOGIN", payload);
    },
    ["USER_LOGOUT"]({ commit }, payload) {
      commit("USER_LOGOUT", payload);
    }
  }
});
