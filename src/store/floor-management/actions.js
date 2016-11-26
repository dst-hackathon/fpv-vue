<<<<<<< HEAD
import axios from 'axios';
=======
>>>>>>> d3824b9bf76618410a4e9538e357a0fb8f3ef8fe
import * as types from './types';
import commitThrough from 'store/commit-through';

export default {

  ...commitThrough([
    types.SELECT_DESK,
    types.DESELECT_DESK,
  ]),

  [types.CREATE_DESK]: function({ commit }, { floorId, desk }) {
    delete desk.id;
    debugger;
    axios.post(`api/desks?floorId=${floorId}`, desk )
      .then(({ data: desk }) => {
        commit(types.CREATE_DESK, { floorId, desk });
      });
  },
};
