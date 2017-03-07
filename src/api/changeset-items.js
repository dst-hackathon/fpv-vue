import axios from './axios';
import _ from 'lodash';

function ref(entity) {
  return entity && _.pick(entity, 'id');
}

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
    const { data: created } = await axios.post('/api/changeset-items', {
      changeset: ref(changesetItem.changeset),
      employee: ref(changesetItem.employee),
      fromDesk: ref(changesetItem.fromDesk),
      toDesk: ref(changesetItem.toDesk),
    });

    return created;
  },
};
