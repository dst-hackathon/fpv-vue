import qs from 'qs';
import axios from './axios';

export default {
  authenticate: async function({ username, password }) {
    await axios.post('/api/authentication', qs.stringify({
      'j_username': username,
      'j_password': password,
    }));
  },
};
