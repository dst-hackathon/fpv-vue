import Vue from 'vue';
import _ from 'lodash';
import * as types from 'store/types';

export default {
  [types.BROADCAST_NOTIFICATION]: function(state, { route, message }) {
    const current = state.notifications[route] || [];

    Vue.set(state.notifications, route, current.concat({
      message
    }));
  },

  [types.DISMISS_NOTIFICATION]: function(state, { route }) {
    const current = state.notifications[route];

    current.pop();
  }
};
