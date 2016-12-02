import Vue from 'vue';
import _ from 'lodash';
import * as types from 'store/types';

export default {
  [types.UPDATE_PLAN_CHANGESETS]: function(state, { planId, changesets }) {
    const plan = _.find(state.plans, { id: planId });

    Vue.set(plan, 'changesets', changesets);
  },

  [types.REPLACE_PLAN_CHANGESET]: function(state, { changeset, withChangeset }) {
    const plan = _.find(state.plans, { id: changeset.plan.id });

    plan.changesets = plan.changesets.map(cs => {
      if (cs.id === changeset.id) {
        return withChangeset;
      } else {
        return cs;
      }
    });
  },
};
