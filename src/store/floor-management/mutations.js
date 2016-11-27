import * as types from './types';

export default {

  [types.SET_CURRENT_DESKCODE]: function(state, { deskCode }) {
    state.modal.deskCode = deskCode;
    state.modal.showModal = false;

    this.$store.dispatch(CREATE_DESK, {
      floorId: 1,
      deskCode: this.$store.state.floorManagement.modal.deskCode,
      desk: desk,
    });
  },


  [types.SHOW_MODAL]: function(state) {
    state.modal.showModal = true;
  },
};
