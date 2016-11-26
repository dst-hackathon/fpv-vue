import Vue from 'vue';
import Vuex from 'vuex';
import actions from './actions';
import mutations from './mutations';
import floorManagement from './floor-management';

Vue.use(Vuex);

export default new Vuex.Store({
  strict: process.env.NODE_ENV !== 'production',

  modules: {
    floorManagement
  },

  state: {
    plans: [],
    login: {},
  },

  actions,
  mutations
});
