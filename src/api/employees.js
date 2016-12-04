import axios from './axios';

export default {
  search: async function({ query }) {
    const { data: employees } = await axios.get(`/api/employees/search`, {
      params: {
        name: query
      }
    });

    return employees;
  }
};
