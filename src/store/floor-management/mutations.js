import * as types from './types';

export default {

  [types.SELECT_DESK]: function(state, { desk }) {
    state.selected.deskId = desk.id;
  },

  [types.DESELECT_DESK]: function(state) {
    state.selected.deskId = null;
  },

  [types.CREATE_DESK]: function(state, { floorId,desk }) {
    state.selected.desks.push(desk);
  },

  [types.SET_CURRENT_DESKCODE]: function(state, { deskCode }) {
    console.log("SET_CURRENT_DESKCODE: deskCode = "+ deskCode);
    state.modal.deskCode = deskCode;
    state.modal.showModal = false;
  },

  
  [types.SHOW_MODAL]: function(state, {desk}) {
    console.log("SHOW_MODAL: desk"+ desk);
    state.modal.desk = desk;
    state.modal.showModal = true;
  },
};
