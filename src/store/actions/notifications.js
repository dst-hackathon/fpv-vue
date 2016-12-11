import * as types from 'store/types';
import router from 'routes';

export default {
  [types.BROADCAST_NOTIFICATION]: function({ commit }, { message }) {
    const route = router.currentRoute.name;

    commit(types.BROADCAST_NOTIFICATION, {
      route,
      message
    });
  },

  [types.DISMISS_NOTIFICATION]: function({ commit }) {
    const route = router.currentRoute.name;

    commit(types.DISMISS_NOTIFICATION, {
      route,
    });
  },
};
