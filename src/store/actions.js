import * as types from './types';

export default {

  [types.GET_PLANS]: function({ commit }) {
    const plans = { test: '123' };

    commit(types.UPDATE_PLANS, { plans });
  }
};
