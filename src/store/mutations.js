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

  [types.UPDATE_MASTER_PLAN]: function(state, { plan }) {
    state.masterPlanId = plan.id;
  },
  
  [types.DELETE_DESKS]: function(state, { desk }) {
    var planId = desk.floor.building.plan.id;
    var buildingId = desk.floor.building.id;
    var floorId = desk.floor.id;
    var deskId = desk.id;

    const plan = _.find(state.plans, { id: planId });
    const building = _.find(plan.buildings, { id: buildingId });
    const floor = _.find(building.floors, { id: floorId });

    // Remove selected desk on the floor. The function _.remove() is not work.
    var remainDesks = [];
    var deskOnFloor = floor.desks;
    for (var i = 0; i < deskOnFloor.length; i++) {
      if (deskOnFloor[i] !== desk) {
        remainDesks.push(deskOnFloor[i]);
      }
    }
    floor.desks = remainDesks;
  },
};