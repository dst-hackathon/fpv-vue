import axios from './axios';

export default {
  find: async function({ planId }) {
    const { data: changesets } = await axios.get(`/api/changesets`, {
      params: {
        planId
      }
    });

    return changesets;
  },

  create: async function({ changeset }) {
    const { data: created } = await axios.post('/api/changesets', changeset);

    return created;
  }
};
