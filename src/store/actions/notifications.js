import * as types from 'store/types';
import router from 'routes';
import uuid from 'uuid/v1';

export default {
  [types.BROADCAST_NOTIFICATION]: function({ commit }, { message, timeout = 0 }) {
    const route = router.currentRoute.path;
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

  [types.DISMISS_NOTIFICATION]: function({ commit }, payload = {}) {
    const route = router.currentRoute.path;

    commit(types.DISMISS_NOTIFICATION, {
      id: payload.id,
      route,
    });
  },
};
