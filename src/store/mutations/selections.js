import * as types from 'store/types';

export default {
  [types.SELECT_PLAN]: function(state, { planId }) {
    state.selection.planId = planId;
    state.selection.buildingId = null;
  },

  [types.SELECT_BUILDING]: function(state, { buildingId }) {
    state.selection.buildingId = buildingId;
    state.selection.floorId = null;
  },

  [types.SELECT_FLOOR]: function(state, { floorId }) {
    state.selection.floorId = floorId;
  },

};
