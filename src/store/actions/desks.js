import * as types from 'store/types';
import api from 'api';

export default {
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
};
