import Vue from 'vue';
import * as types from 'store/types';
import { findChangesetById } from './helpers';

export default {
  [types.CREATE_CHANGESET_ITEM]: function(state, { changesetItem }) {
    const changeset = findChangesetById(state, changesetItem.changeset.id);
    const items = changeset.changesetItems || [];

    Vue.set(changeset, 'changesetItems', items.concat(changesetItem));
  },

  [types.UPDATE_CHANGESET_ITEMS]: function(state, { changesetId, changesetItems }) {
    const changeset = findChangesetById(state, changesetId);

    Vue.set(changeset, 'changesetItems', changesetItems);
  },
};
