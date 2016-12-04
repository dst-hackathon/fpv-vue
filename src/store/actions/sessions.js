import * as types from 'store/types';
import api from 'api';

export default {
  [types.LOGIN]: async function({ commit }, { username, password }) {
    await api.sessions.authenticate({ username, password });

    commit(types.LOGIN);
  },

  [types.GET_CURRENT_ACCOUNT]: async function({ commit }) {
    commit(types.GET_CURRENT_ACCOUNT, {
      user: await api.accounts.getCurrent()
    });
  },
};
