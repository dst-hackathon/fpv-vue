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
    //const buildings = _.flatMap(state.plans, _.property('buildings'));
    //const building = _.find(buildings, { id: buildingId });
    const building = state.plans[0].buildings[0];

    if (building) {
      building.floors = floors;
    }
  },

  [types.UPDATE_DESKS]:function(state, { desks, floorId }) {
    const floor = _.find(state.plans[0].buildings[0].floors, {'id': floorId});

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

  [types.DELETE_DESKS]: function(state, { desk }) {
    var buildingId = desk.floor.building.id;
    var floorId = desk.floor.id;
    var deskId = desk.id;

    console.log("buildingId " + buildingId
      + " floorId " + floorId
      + " deskId " + deskId
    );

    const buildings = _.flatMap(state.plans, _.property('buildings'));
    const building = _.find(buildings, { id: buildingId });

    const floors = _.flatMap(building, _.property('floors'));
    const floor = _.find(floors, { id: floorId });

    _.remove(floor.desks, desk);
  },
};
