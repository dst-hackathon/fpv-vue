import * as types from 'store/types';
import uuid from 'uuid/v1';

export default {
  [types.BROADCAST_NOTIFICATION]: function({ state, commit }, { message, timeout = 0 }) {
    const route = state.route.path;
    const id = uuid();

    commit(types.BROADCAST_NOTIFICATION, {
      id,
      route,
      message
    });

    if (timeout) {
      setTimeout(() => {
        commit(types.DISMISS_NOTIFICATION, {
          id,
          route,
        });
      }, timeout);
    }

    return { id };
  },

  [types.DISMISS_NOTIFICATION]: function({ state, commit }, payload = {}) {
    const route = state.route.path;

    commit(types.DISMISS_NOTIFICATION, {
      id: payload.id,
      route,
    });
  },
};
