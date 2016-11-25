import axios from 'axios';
import * as types from './types';

export default {

  [types.GET_PLANS]: function({ commit }) {
    axios.get('/api/plans')
      .then(({ data: plans }) => {
        commit(types.UPDATE_PLANS, { plans });
      });
  }
};
