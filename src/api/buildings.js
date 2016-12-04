import axios from './axios';

export default {
  findAll: async function() {
    const { data: buildings } = await axios.get('/api/buildings');

    return buildings;
  }
};
