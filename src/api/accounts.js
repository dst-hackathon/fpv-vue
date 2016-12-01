import axios from './axios';

export default {
  getCurrent: async function() {
    const { data: account } = await axios.get('/api/account');

    return account;
  }
};
