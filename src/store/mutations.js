import _ from 'lodash';
import * as types from './types';

export default {

  [types.UPDATE_PLANS]: function(state, { plans }) {
    state.plans = plans;
  },

  [types.UPDATE_BUILDINGS]: function(state, { buildings, planId}) {
    let plans = state.plans;
    let plan = _.find(plans, {'id': planId});
    if (plan) {
      plan.buildings = buildings;
    }
  },

  [types.UPDATE_FLOORS]: function(state, { floors, buildingId }) {
    const buildings = _.flatMap(state.plans, _.property('buildings'));
    const building = _.find(buildings, { id: buildingId });

    if (building) {
      building.floors = floors;
    }
  },

  [types.UPDATE_DESKS]:function(state, { desks, floorId }) {
    const floors = _.flatMap(state.plans, _.property('floors'));
    const floor = _.find(floors, { id: floorId });

    if (floor) {
      floor.desks = desks;
    }
  },

  [types.LOGIN]: function(state) {
    state.login.status = 'authenticated';
  },

  [types.GET_CURRENT_ACCOUNT]: function(state, { user }) {
    state.login.user = user;
  },

  [types.DELETE_DESK]: function(state, { desk }) {
    
  },
};
