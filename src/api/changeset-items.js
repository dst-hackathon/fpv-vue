import axios from './axios';

export default {
  find: async function({ changesetId }) {
    const { data: changesets } = await axios.get(`/api/changeset-items`, {
      params: {
        changesetId
      }
    });

    return changesets;
  },

  create: async function({ changesetItem }) {
    const { data: created } = await axios.post('/api/changeset-items', changesetItem);

    return created;
  },
};
