import axios from './axios';

export default {

  findOne: async function({ planId, employeeId }) {
    const { data: desk } = await axios.get('/api/desk-assignments/search/desk', {
      params: {
        employeeId,
        planId
      }
    });

    // return null since when not found
    // the api returns an empty string
    return desk || null;
  }
};
