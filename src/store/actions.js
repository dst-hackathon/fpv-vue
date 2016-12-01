import defaultAxios from 'axios';
import _ from 'lodash';
import moment from 'moment';
import uuid from 'uuid/v1';
import * as types from './types';
import api from 'api';

const PAGE_SIZE = '10000';
const axios = defaultAxios.create({
  params: {
    size: PAGE_SIZE
  }
});

export default {

  [types.FETCH_ALL]: async function({ commit }) {
    let plans = await api.plans.findAll();
    let buildings = await api.buildings.findAll();
    let floors = await api.floors.findAll();
    let desks = await api.desks.findAll();

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

  [types.FETCH_DESK_ASSIGNMENTS]: async function({ commit }, { floorId }) {
    const assignments = await api.deskAssignments.find({ floorId });

    commit(types.UPDATE_DESK_ASSIGNMENTS, {
      floorId,
      assignments
    });
  },

  [types.FETCH_PLAN_CHANGESETS]: async function({ commit }, { planId }) {
    const changesets = await api.changesets.find({ planId });

    commit(types.UPDATE_PLAN_CHANGESETS, {
      planId,
      changesets
    });

    // FIXME: return from state?
    return changesets;
  },

  [types.FETCH_CHANGESET_ITEMS]: async function({ commit }, { changesetId }) {
    const changesetItems = await api.changesetItems.find({ changesetId });

    commit(types.UPDATE_CHANGESET_ITEMS, {
      changesetId,
      changesetItems
    });

    // FIXME: return from state?
    return changesetItems;
  },

  [types.FETCH_PLAN_CHANGESET]: async function({ commit, state, dispatch }, { planId, effectiveDate }) {
    const changesets = await dispatch(types.FETCH_PLAN_CHANGESETS, { planId });
    const changeset = _.find(changesets, changeset => {
      return moment(changeset.effectiveDate).isSame(effectiveDate);
    });

    if (changeset) {
      await dispatch(types.FETCH_CHANGESET_ITEMS, { changesetId: changeset.id });

      // FIXME: return from state?
      return changeset;
    }
    else {
      const newChangeset = {
        effectiveDate: effectiveDate,
        status: 'IN_PROGRESS',
        plan: {
          id: planId
        },
        changesetItems: [],
        id: uuid(),
        isNew: true,
      };

      commit(types.UPDATE_PLAN_CHANGESETS, {
        planId,
        changesets: changesets.concat(newChangeset)
      });
    }
  },

  [types.LOGIN]: async function({ commit }, { username, password }) {
    await api.sessions.authenticate({ username, password });

    commit(types.LOGIN);
  },

  [types.GET_CURRENT_ACCOUNT]: async function({ commit }) {
    commit(types.GET_CURRENT_ACCOUNT, {
      user: await api.accounts.getCurrent()
    });
  },

  [types.CREATE_DESK]: async function({ commit }, { desk }) {
    commit(types.CREATE_DESK, {
      desk: await api.desks.create({ desk })
    });
  },

  [types.UPDATE_DESK]: async function({ commit }, { desk }) {
    commit(types.UPDATE_DESK, {
      desk: await api.desks.update({ desk })
    });
  },

  [types.DELETE_DESK]: async function({ commit }, { desk }) {
    await api.desks.delete({ desk });

    commit(types.DELETE_DESK, { desk });
  },

  [types.CREATE_CHANGESET_ITEM]: async function({ state, commit }, { changesetItem }) {
    let { changeset } = changesetItem;

    if (changeset.isNew) {
      const created = await api.changesets.create({
        changeset: _.omit(changeset, ['id', 'isNew'])
      });

      commit(types.REPLACE_PLAN_CHANGESET, {
        changeset,
        withChangeset: {
          ...created,
          changesetItems: []
        }
      });

      changesetItem.changeset = created;
    }

    const created = await api.changesetItems.create({ changesetItem });

    commit(types.CREATE_CHANGESET_ITEM, {
      changesetItem: changesetItem
    });
  },

  [types.REMOVE_DESK_OWNER]: async function({ commit, dispatch }, { changeset, fromDesk }) {
    dispatch(types.CREATE_CHANGESET_ITEM, {
      changesetItem: {
        changeset,
        employee: fromDesk.employee,
        fromDesk: fromDesk,
        toDesk: null
      }
    });
  },

  [types.ASSIGN_DESK_OWNER]: async function({ commit, dispatch }, { changeset, owner, fromDesk, toDesk }) {

    if (toDesk && toDesk.employee) {
      await dispatch(types.REMOVE_DESK_OWNER, {
        changeset,
        fromDesk: toDesk
      });
    }

    dispatch(types.CREATE_CHANGESET_ITEM, {
      changesetItem: {
        changeset,
        employee: owner,
        fromDesk: fromDesk,
        toDesk: toDesk
      }
    });
  }
};
