import Vue from 'vue';
import * as types from 'store/types';
import { findPlanById } from './helpers';

export default {
  [types.UPDATE_PLAN_CHANGESETS]: function(state, { planId, changesets }) {
    const plan = findPlanById(state, planId);

    Vue.set(plan, 'changesets', changesets);
  },

  [types.REPLACE_PLAN_CHANGESET]: function(state, { changeset, withChangeset }) {
    const plan = findPlanById(state, changeset.plan.id);

    plan.changesets = plan.changesets.map(cs => {
      if (cs.id === changeset.id) {
        return withChangeset;
      } else {
        return cs;
      }
    });
  },
};
