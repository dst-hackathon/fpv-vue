import axios from 'axios';
import * as types from './types';
import commitThrough from 'store/commit-through';

export default {

  ...commitThrough([
    types.SELECT_DESK,
    types.DESELECT_DESK,
    types.SHOW_MODAL,
  ]),

  [types.CREATE_DESK]: function({ commit }, { floorId, deskCode, desk }) {
    delete desk.id;
    desk.code = deskCode;
    desk.floor = {};
    desk.floor.id = floorId;
    axios.post(`api/desks?floorId=${floorId}`, desk )
      .then(({ data: desk }) => {
        commit(types.CREATE_DESK, { floorId, desk });
    });
  },

  
  [types.SET_CURRENT_DESKCODE]: function({commit}, {deskCode}) {
    commit(types.SET_CURRENT_DESKCODE, { deskCode });
  },

};
