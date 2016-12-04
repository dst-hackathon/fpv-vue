<template lang="html">
  <layout>
    <div slot="left">
      <div>
        <h4 class="title is-4">Review Plan</h4>

        <plan-selector v-model="planId" />
        <hr>
        <div class="menu">
          <p class="menu-label">Change Requests</p>
          <ul class="menu-list">
            <li v-for="changeset in changesets">
              <a
                @click.prevent="selectChangeset(changeset)"
                :class="{ 'is-active': changesetId === changeset.id }">
                {{ changeset.effectiveDate }}
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>

    <div slot="right">
      <plan-activity :activities="activities" />
    </div>

    <div>
      CONTENT HERE
    </div>
  </layout>
</template>

<script>
import _ from 'lodash';

import Layout from 'components/home/layout';
import PlanSelector from 'components/home/plan-selector';
import PlanActivity from 'components/home/plan-activity';

import { FETCH_PLAN_CHANGESETS, FETCH_CHANGESET_ITEMS } from 'store/types';
import sortChangesetsByDate from 'components/helpers/sort-changesets-by-date';
import compactChangeset from 'components/helpers/compact-changeset';

export default {
  components: {
    Layout,
    PlanSelector,
    PlanActivity,
  },

  data() {
    return {
      planId: null,
      changesetId: null,
    };
  },

  computed: {
    changesets() {
      const changesets = _.get(this, 'plan.changesets', []);
      const persistedChangesets = _.filter(changesets, cs => !cs.isNew);
      const sortedChangesets = sortChangesetsByDate(persistedChangesets);

      // TODO: WIP changesets / completed changesets
      // TODO: changesets with no change? i.e. moving in circle

      return sortedChangesets;
    },

    activities() {
      if (!this.changesetId) {
        return [];
      }

      const changeset = _.find(this.changesets, { id: this.changesetId });
      const compacted = compactChangeset(changeset);

      return compacted.changesetItems;
    },

    plan() {
      const plans = this.$store.state.plans;

      return _.find(plans, { id: this.planId });
    }
  },

  watch: {
    planId(planId) {
      this.changesetId = null;

      if (!planId) {
        return;
      }

      this.$store.dispatch(FETCH_PLAN_CHANGESETS, { planId });
    }
  },

  methods: {
    selectChangeset(changeset) {
      this.changesetId = changeset.id;

      this.$store.dispatch(FETCH_CHANGESET_ITEMS, { changesetId: this.changesetId });
    }
  }
};
</script>

<style lang="css">
</style>
