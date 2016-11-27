import Vue from 'vue';
import _ from 'lodash';
import * as types from './types';

export default {

  [types.LOGIN]: function(state) {
    state.login.status = 'authenticated';
  },

  [types.GET_CURRENT_ACCOUNT]: function(state, { user }) {
    state.login.user = user;
  },

  [types.UPDATE_PLANS]: function(state, { plans }) {
    state.plans = plans;
  },

  'UPDATE_DESK_ASSIGNMENTS': function(state, { floorId, assignments }) {
    const floor = _
      .chain(state.plans)
      .flatMap('buildings')
      .flatMap('floors')
      .find({ id: floorId })
      .value();

    floor.desks.forEach((desk) => {
      const assignment = _.find(assignments, [ 'desk.id', desk.id ]);

      Vue.set(desk, 'employee', assignment && assignment.employee);
    });
  },

  [types.CREATE_DESK]: function(state, { desk }) {
    const floor = _
      .chain(state.plans)
      .flatMap('buildings')
      .flatMap('floors')
      .find({ id: desk.floor.id })
      .value();

    floor.desks.push(desk);
  },

  [types.UPDATE_DESK]: function(state, { desk }) {
    const storedDesk = _
      .chain(state.plans)
      .flatMap('buildings')
      .flatMap('floors')
      .flatMap('desks')
      .find({ id: desk.id })
      .value();

    _.assignIn(storedDesk, desk);
  },

  [types.DELETE_DESK]: function(state, { desk }) {
    const floor = _
      .chain(state.plans)
      .flatMap('buildings')
      .flatMap('floors')
      .find({ id: desk.floor.id })
      .value();

    floor.desks = _.reject(floor.desks, { id: desk.id });
  },
};
