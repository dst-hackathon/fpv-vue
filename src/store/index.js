import Vue from 'vue';
import Vuex from 'vuex';
import _ from 'lodash';
import actions from './actions';
import mutations from './mutations';
import floorManagement from './floor-management';
import desksMock from '../../static/json/desks-mock.json';

Vue.use(Vuex);

export default new Vuex.Store({
  strict: process.env.NODE_ENV !== 'production',

  modules: {
    floorManagement
  },

  state: {
    plans: [{
      id: 1,
      buildings: [{
        id: 1,
        floors: [{
          ...desksMock[0].floor,

          desks: _.map(desksMock, desk => _.omit(desk, 'image'))
        }]
      }]
    }],
    login: {},

    masterPlanId: null,
  },

  actions,
  mutations,

  getters: {
    masterPlan(state) {
      const plans = state.plans;
      const masterPlanId = state.masterPlanId;

      return _.find(plans, { id: masterPlanId});
    }
  }
});
