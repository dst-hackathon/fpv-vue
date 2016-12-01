import axios from './axios';

export default {
  find: async function({ floorId }) {
    const { data: deskAssignments } = await axios.get(`/api/desk-assignments`, {
      params: {
        floorId
      }
    });

    return deskAssignments;
  },
};
