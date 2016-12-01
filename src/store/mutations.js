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

  [types.UPDATE_DESK_ASSIGNMENTS]: function(state, { floorId, assignments }) {
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

  [types.UPDATE_PLAN_CHANGESETS]: function(state, { planId, changesets }) {
    const plan = _.find(state.plans, { id: planId });

    Vue.set(plan, 'changesets', changesets);
  },

  [types.UPDATE_CHANGESET_ITEMS]: function(state, { changesetId, changesetItems }) {
    const changeset = _
      .chain(state.plans)
      .flatMap('changesets')
      .find({ id: changesetId })
      .value();

    Vue.set(changeset, 'changesetItems', changesetItems);
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

  [types.CREATE_CHANGESET_ITEM]: function(state, { changesetItem }) {
    const changeset = _
      .chain(state.plans)
      .flatMap('changesets')
      .find({ id: changesetItem.changeset.id })
      .value();

    const { changesetItems } = changeset;

    changesetItems.push(changesetItem);
  }
};
