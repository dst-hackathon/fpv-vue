import _ from 'lodash';
import * as types from './types';

export default {

  [types.UPDATE_PLANS]: function(state, { plans }) {
    state.plans = plans;
  },

  [types.UPDATE_FLOORS]: function(state, { floors, buildingId }) {
    const buildings = _.flatMap(state.plans, _.property('buildings'));
    const building = _.find(buildings, { id: buildingId });

    if (building) {
      building.floors = floors;
    }
  },

  [types.LOGIN]: function(state) {
    state.login.status = 'authenticated';
  },

  [types.GET_CURRENT_ACCOUNT]: function(state, { user }) {
    state.login.user = user;
  },


};
