import * as types from 'store/types';

export default {
  [types.LOGIN]: function(state) {
    state.login.status = 'authenticated';
    state.login.authenticated = true;
  },

  [types.GET_CURRENT_ACCOUNT]: function(state, { user }) {
    state.login.user = user;
  },

  [types.LOGOUT]: function(state) {
    state.login.status = '';
    state.login.user = null;
    state.login.authenticated = false;
  }
};
