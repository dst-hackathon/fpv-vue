import axios from 'axios';
import * as types from './types';
var qs = require('qs');

export default {

  [types.GET_PLANS]: function({ commit }) {
    axios.get('/api/plans')
      .then(({ data: plans }) => {
        commit(types.UPDATE_PLANS, { plans });
      });
  },

  [types.GET_BUILDINGS]: function({ commit }, planId) {
    axios.get(`/api/buildings?planId=${planId}`)
      .then(({ data: buildings }) => {
        commit(types.UPDATE_BUILDINGS, { buildings, planId });
      });
  },

  [types.GET_FLOORS]: function({ commit }, buildingId) {
    axios.get(`/api/floors?buildingId=${buildingId}`)
      .then(({ data: floors }) => {
        commit(types.UPDATE_FLOORS, { floors, buildingId });
      });
  },

  [types.GET_DESKS]: function({ commit }, floorId) {
    axios.get(`/api/desks?floorId=${floorId}`)
      .then(({ data: desks }) => {
        commit(types.UPDATE_DESKS, { desks, floorId });
      });
  },

  [types.LOGIN]: function({ commit }, { username, password }) {
    return axios.post('/api/authentication?d='+ Date.now(), qs.stringify({
      'j_username': username,
      'j_password': password,
    })).then( () => {
      commit(types.LOGIN);
    });
  },

  [types.GET_CURRENT_ACCOUNT]: function({ commit }) {
    return axios.get('/api/account?d='+ Date.now()
    ).then ( ({data: user}) => {
      commit(types.GET_CURRENT_ACCOUNT, { 'user': user });
    });
  },
};
