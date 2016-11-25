import _ from 'lodash';
import * as types from './types';

export default {

  [types.UPDATE_PLANS]: function(state, { plans }) {
    state.plans = plans;
  },

  [types.UPDATE_BUILDINGS]: function(state, { planId, buildings }) {
    let plans = state.plans;
    let plan = _.findKey(plans, {'id': planId});
    plan.buildings = buildings;
  },

  [types.UPDATE_FLOORS]: function(state, { floors, buildingId }) {
    const buildings = _.flatMap(state.plans, _.property('buildings'));
    const building = _.find(buildings, { id: buildingId });

    if (building) {
      building.floors = floors;
    }
  }
};
