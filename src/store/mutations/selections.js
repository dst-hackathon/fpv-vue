import * as types from 'store/types';

export default {
  [types.SELECT_PLAN]: function(state, { planId }) {
    state.selection.planId = planId;
  },

  [types.SELECT_BUILDING]: function(state, { buildingId }) {
    state.selection.buildingId = buildingId;
  },

  [types.SELECT_FLOOR]: function(state, { floorId }) {
    state.selection.floorId = floorId;
  },

};
