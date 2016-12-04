import axios from './axios';

export default {

  findAll: async function() {
    const { data: desks } = await axios.get('/api/desks');

    return desks;
  },

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
  },

  create: async function({ desk }) {
    const { data: created } = await axios.post('/api/desks', desk);

    return created;
  },

  update: async function({ desk }) {
    const { data: updated } = await axios.put('/api/desks', desk);

    return updated;
  },

  delete: async function({ desk }) {
    await axios.delete(`/api/desks/${desk.id}`);
  }
};
