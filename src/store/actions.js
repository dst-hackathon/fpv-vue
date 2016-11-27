import axios from 'axios';
import qs from 'qs';
import _ from 'lodash';
import * as types from './types';

export default {

  [types.FETCH_ALL]: async function({ commit }) {
    let { data: plans } = await axios.get('/api/plans');
    let { data: buildings } = await axios.get('/api/buildings');
    let { data: floors } = await axios.get('/api/floors');
    let { data: desks } = await axios.get('/api/desks');

    // construct nested plans and flatten parent for child resource
    desks = desks.map(desk => {
      return {
        ...desk,

        floor: _.pick(desk.floor, 'id')
      };
    });

    floors = floors.map(floor => {
      return {
        ...floor,

        desks: _.filter(desks, [ 'floor.id', floor.id ]),
        building: _.pick(floor.building, 'id')
      };
    });

    buildings = buildings.map(building => {
      return {
        ...building,

        floors: _.filter(floors, [ 'building.id', building.id ]),
        plan: _.pick(building.plan, 'id')
      };
    });

    plans = plans.map(plan => {
      return {
        ...plan,

        buildings: _.filter(buildings, [ 'plan.id', plan.id ])
      };
    });

    commit(types.UPDATE_PLANS, { plans });
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

  [types.UPDATE_DESK]: function({ commit }, { desk }) {
    commit(types.UPDATE_DESK, { desk });
  },

  [types.DELETE_DESK]: function({ commit }, { desk }) {
    console.log("Connecting DB to delete desk id " + desk.id);
    commit(types.DELETE_DESK, { 'desk':desk });
    // return axios.delete('/api/desks/' + desk.id
    // ).then ( () => {
    //   commit(types.DELETE_DESK, { 'desk':desk });
    // });
  },
};
