import * as types from 'store/types';

export default {
  [types.UPDATE_PLANS]: function(state, { plans }) {
    state.plans = plans;
  },
};
