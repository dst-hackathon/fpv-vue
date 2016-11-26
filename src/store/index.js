import Vue from 'vue';
import Vuex from 'vuex';
import actions from './actions';
import mutations from './mutations';
import floorManagement from './floor-management';
import desksMock from '../../static/json/desks-mock.json';
import _ from 'lodash';

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
  },

  actions,
  mutations
});
