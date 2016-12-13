import axios from './axios';

export default {
  search: async function({ query }) {
    const { data: employees } = await axios.get(`/api/employees/search`, {
      params: {
        name: query
      }
    });

    return employees;
  },

  find: async function({ page = 0, size = 30, sort } = {}) {
    const { data: employees } = await axios.get(`/api/employees`, {
      params: {
        page,
        size,
        sort
      }
    });

    return employees;
  }
};
