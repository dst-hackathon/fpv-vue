import Vue from 'vue';
import _ from 'lodash';
import * as types from 'store/types';

export default {
  [types.CREATE_CHANGESET_ITEM]: function(state, { changesetItem }) {
    const changeset = _
      .chain(state.plans)
      .flatMap('changesets')
      .find({ id: changesetItem.changeset.id })
      .value();

    const items = changeset.changesetItems || [];

    Vue.set(changeset, 'changesetItems', items.concat(changesetItem));
  },

  [types.UPDATE_CHANGESET_ITEMS]: function(state, { changesetId, changesetItems }) {
    const changeset = _
      .chain(state.plans)
      .flatMap('changesets')
      .find({ id: changesetId })
      .value();

    Vue.set(changeset, 'changesetItems', changesetItems);
  },
};
