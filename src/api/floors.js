import axios from './axios';

export default {
  findAll: async function() {
    const { data: floors } = await axios.get('/api/floors');

    return floors;
  }
};
