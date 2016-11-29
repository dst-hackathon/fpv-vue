import defaultAxios from 'axios';
import qs from 'qs';
import _ from 'lodash';
import moment from 'moment';
import * as types from './types';

const PAGE_SIZE = '10000';
const axios = defaultAxios.create({
  params: {
    size: PAGE_SIZE
  }
});

export default {

  [types.FETCH_ALL]: async function({ commit }) {
    let { data: plans } = await axios.get(`/api/plans`);
    let { data: buildings } = await axios.get(`/api/buildings`);
    let { data: floors } = await axios.get(`/api/floors`);
    let { data: desks } = await axios.get(`/api/desks`);

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

  [types.FETCH_DESK_ASSIGNMENTS]: function({ commit }, { floorId }) {
    axios.get('/api/desk-assignments', {
      params: {
        floorId
      }
    }).then(({ data: assignments }) => {
      commit(types.UPDATE_DESK_ASSIGNMENTS, {
        floorId,
        assignments
      });
    });
  },

  [types.FETCH_PLAN_CHANGESETS]: async function({ commit }, { planId }) {
    const { data: changesets } = await axios.get(`/api/changesets?planId=${planId}`);

    commit(types.UPDATE_PLAN_CHANGESETS, {
      planId,
      changesets
    });

    // FIXME: return from state?
    return changesets;
  },

  [types.FETCH_CHANGESET_ITEMS]: async function({ commit }, { changesetId }) {
    const { data: changesetItems } = await axios.get(`/api/changeset-items?changesetId=${changesetId}`);

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
  },

  [types.LOGIN]: function({ commit }, { username, password }) {
    return axios.post('/api/authentication?d='+ Date.now(), qs.stringify({
      'j_username': username,
      'j_password': password,
    })).then( () => {
      commit(types.LOGIN);
    });
  },

  [types.GET_CURRENT_ACCOUNT]: function({ commit }) {
    return axios.get('/api/account?d='+ Date.now()
    ).then ( ({data: user}) => {
      commit(types.GET_CURRENT_ACCOUNT, { 'user': user });
    });
  },

  [types.CREATE_DESK]: function({ commit }, { desk }) {
    axios.post('/api/desks', desk)
      .then(({ data: desk }) => {
        commit(types.CREATE_DESK, { desk });
      });
  },

  [types.UPDATE_DESK]: function({ commit }, { desk }) {
    axios.put('/api/desks', desk)
      .then(({ data: desk }) => {
        commit(types.UPDATE_DESK, { desk });
      });
  },

  [types.DELETE_DESK]: function({ commit }, { desk }) {
    return axios.delete(`/api/desks/${desk.id}`)
      .then (() => {
        commit(types.DELETE_DESK, { desk });
      });
  },
};
