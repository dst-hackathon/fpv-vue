import moment from 'moment';
import api from 'api';
import * as types from 'store/types';
import { findPlanById } from 'store/helpers';
import createNewChangeset from 'store/helpers/create-new-changeset';

export default {
  [types.FETCH_PLAN_CHANGESETS]: async function({ state, commit }, { planId }) {
    const plan = findPlanById(state, planId);
    const changesets = plan.changesets || await api.changesets.find({ planId });

    commit(types.UPDATE_PLAN_CHANGESETS, {
      planId,
      changesets
    });

    // FIXME: return from state?
    return changesets;
  },

  [types.FETCH_PLAN_CHANGESET]: async function({ commit, state, dispatch }, { planId, effectiveDate }) {
    const plan = findPlanById(state, planId);
    const changesets = plan.changesets || await dispatch(types.FETCH_PLAN_CHANGESETS, { planId });
    const changeset = _.find(changesets, changeset => {
      const sameDay = moment(changeset.effectiveDate).isSame(effectiveDate);

      return !changeset.isNew && sameDay;
    });

    if (changeset) {
      await dispatch(types.FETCH_CHANGESET_ITEMS, { changesetId: changeset.id });

      // FIXME: return from state?
      return changeset;
    }
    else {
      const newChangeset = createNewChangeset({
        effectiveDate,
        planId
      });

      commit(types.UPDATE_PLAN_CHANGESETS, {
        planId,
        changesets: changesets.concat(newChangeset)
      });
    }
  },
};
