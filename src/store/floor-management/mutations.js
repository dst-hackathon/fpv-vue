import * as types from './types';

export default {

  [types.SELECT_DESK]: function(state, { desk }) {
    state.selected.deskId = desk.id;
  },

  [types.DESELECT_DESK]: function(state) {
    state.selected.deskId = null;
  },

  [types.CREATE_DESK]: function(state, { floorId,desk }) {
    state.desks.push(desk);
  },

};
