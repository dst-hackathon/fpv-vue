import axios from 'axios';
import * as types from './types';

export default {

  [types.GET_PLANS]: function({ commit }) {
    axios.get('/api/plans')
      .then(({ data: plans }) => {
        commit(types.UPDATE_PLANS, { plans });
      });
  },

  [types.GET_FLOORS]: function({ commit }, { buildingId }) {
    axios.get(`/api/floors?buildingId=${buildingId}`)
      .then(({ data: floors }) => {
        commit(types.UPDATE_FLOORS, { floors, buildingId });
      });
  },

  [types.GET_BUILDINGS]: function({ commit }, { planId }) {
    axios.get('/api/buildings', {
      params: {
        planId: planId
      }
    }).then(({ data: buildings }) => {
        commit(types.UPDATE_BUILDINGS, { planId, buildings });
      });
  }
};
