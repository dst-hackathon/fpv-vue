import uuid from 'uuid/v1';
import moment from 'moment';
import api from 'api';
import * as types from 'store/types';

export default {
  [types.FETCH_PLAN_CHANGESETS]: async function({ commit }, { planId }) {
    const changesets = await api.changesets.find({ planId });

    commit(types.UPDATE_PLAN_CHANGESETS, {
      planId,
      changesets
    });

    // FIXME: return from state?
    return changesets;
  },

  [types.FETCH_PLAN_CHANGESET]: async function({ commit, state, dispatch }, { planId, effectiveDate }) {
    const changesets = await dispatch(types.FETCH_PLAN_CHANGESETS, { planId });
    const changeset = _.find(changesets, changeset => {
      return moment(changeset.effectiveDate).isSame(effectiveDate);
    });

    if (changeset) {
      await dispatch(types.FETCH_CHANGESET_ITEMS, { changesetId: changeset.id });

      // FIXME: return from state?
      return changeset;
    }
    else {
      const newChangeset = {
        effectiveDate: effectiveDate,
        status: 'IN_PROGRESS',
        plan: {
          id: planId
        },
        changesetItems: [],
        id: uuid(),
        isNew: true,
      };

      commit(types.UPDATE_PLAN_CHANGESETS, {
        planId,
        changesets: changesets.concat(newChangeset)
      });
    }
  },
};
