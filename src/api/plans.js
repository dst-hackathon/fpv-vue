import axios from './axios';

export default {
  findAll: async function() {
    const { data: plans } = await axios.get('/api/plans');

    return plans;
  }
};
