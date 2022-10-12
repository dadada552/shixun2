import Vue from "vue";
import Vuex from "vuex";
import myinfo from './modules/myinfo'
import mycar from './modules/mycar'
Vue.use(Vuex);
import per from 'vuex-persistedstate'
export default new Vuex.Store({
  state: {
    status: false
  },
  mutations: {
    changestatus(state, flag) {
      state.status = flag
    }
  },
  actions: {},
  modules: {
    myinfo,
    mycar
  },
  plugins: [
    per()
  ],
});