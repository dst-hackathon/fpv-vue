import axios from 'axios';
import * as types from './types';
var qs = require('qs');

export default {

  [types.GET_PLANS]: function({ commit }) {
    return axios.get('/api/plans')
      .then(({ data: plans }) => {
        commit(types.UPDATE_PLANS, { plans });

        return plans;
      });
  },

  [types.GET_BUILDINGS]: function({ commit }, planId) {
    return axios.get(`/api/buildings?planId=${planId}`)
      .then(({ data: buildings }) => {
        commit(types.UPDATE_BUILDINGS, { buildings, planId });

        return buildings;
      });
  },

  [types.GET_FLOORS]: function({ commit }, buildingId) {
    axios.get(`/api/floors?buildingId=${buildingId}`)
      .then(({ data: floors }) => {
        commit(types.UPDATE_FLOORS, { floors, buildingId });
      });
  },
  
  [types.SET_FLOOR]: function({ commit }, {buildingId, floorId}) {
	commit(types.SELECT_FLOOR, { floorId, buildingId });
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

  [types.GET_MASTER_PLAN]: async function({ dispatch, commit, state }) {
    // ensure plans are retrieved
    await dispatch(types.GET_PLANS);

    const { data: masterPlan } = await axios.get('/api/plans/master');
    const buildings = await dispatch(types.GET_BUILDINGS, masterPlan.id);

    dispatch(types.GET_FLOORS, buildings[0].id);

    commit(types.UPDATE_MASTER_PLAN, {
      plan: masterPlan
    });
  },

  [types.DELETE_DESKS]: function({ commit }, { desk }) {
    console.log("Connecting DB to delete desk id " + desk.id);
    commit(types.DELETE_DESKS, { 'desk':desk });
    // return axios.delete('/api/desks/' + desk.id
    // ).then ( () => {
    //   commit(types.DELETE_DESKS, { 'desk':desk });
    // });
  },
};
