import Vue from 'vue';
import _ from 'lodash';
import * as types from 'store/types';

export default {
  [types.BROADCAST_NOTIFICATION]: function(state, { route, message, id }) {
    const current = state.notifications[route] || [];

    Vue.set(state.notifications, route, current.concat({
      id,
      message
    }));
  },

  [types.DISMISS_NOTIFICATION]: function(state, { route, id }) {
    const notifications = state.notifications[route];
    let target;

    if (id) {
      target = _.find(notifications, { id });
    } else {
      target = _.last(notifications);
    }

    state.notifications[route] = _.without(notifications, target);
  }
};
