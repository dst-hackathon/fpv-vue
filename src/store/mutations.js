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
  }
};
