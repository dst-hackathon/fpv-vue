import Vue from 'vue';
import Vuex from 'vuex';
import _ from 'lodash';
import actions from './actions';
import mutations from './mutations';

Vue.use(Vuex);

export default new Vuex.Store({
  strict: process.env.NODE_ENV !== 'production',

  state: {
    plans: [{
      buildings: [{
        floors: [{
          // desk
        }]
      }]
    }],

    login: {},
  },

  getters: {
    buildings: function(state) {
      return _.flatMap(state.plans, 'buildings');
    },

    floors: function(state, getters) {
      return _.flatMap(getters.buildings, 'floors');
    },

    desks: function(state, getters) {
      return _.flatMap(getters.floors, 'desks');
    }
  },

  actions,
  mutations,
});
