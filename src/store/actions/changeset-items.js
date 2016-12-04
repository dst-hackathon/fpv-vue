import api from 'api';
import * as types from 'store/types';

export default {
  [types.FETCH_CHANGESET_ITEMS]: async function({ commit }, { changesetId }) {
    const changesetItems = await api.changesetItems.find({ changesetId });

    commit(types.UPDATE_CHANGESET_ITEMS, {
      changesetId,
      changesetItems
    });

    // FIXME: return from state?
    return changesetItems;
  },

  [types.CREATE_CHANGESET_ITEM]: async function({ state, commit }, { changesetItem }) {
    let { changeset } = changesetItem;

    if (changeset.isNew) {
      const created = await api.changesets.create({
        changeset: _.omit(changeset, ['id', 'isNew'])
      });

      commit(types.REPLACE_PLAN_CHANGESET, {
        changeset,
        withChangeset: {
          ...created,
          changesetItems: []
        }
      });

      changesetItem.changeset = created;
    }

    const created = await api.changesetItems.create({ changesetItem });

    commit(types.CREATE_CHANGESET_ITEM, {
      changesetItem: changesetItem
    });
  },
};
