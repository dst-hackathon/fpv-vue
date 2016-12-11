<template lang="html">
  <layout :showRight="false">
    <div slot="left">
      <div>
        <h4 class="title is-4">Review Plan</h4>

        <plan-selector v-model="planId" />

        <div v-if="changesets && changesets.length > 0">
          <hr>

          <changeset-list
            v-show="pendingChangesets.length > 0"
            title="Pending Requests"
            :changesets="pendingChangesets"
            :selectedId="changesetId"
            @selectChangeset="selectChangeset" />

          <changeset-list
            v-show="completedChangesets.length > 0"
            title="Completed Requests"
            :changesets="completedChangesets"
            :selectedId="changesetId"
            @selectChangeset="selectChangeset" />
          </div>
        </div>
      </div>
    </div>

    <div class="paper-wrapper">
      <div class="paper">
        <div class="paper-actions">
          <!-- disabled for now, need feedback on when changeset can be made completed -->
          <a class="paper-action"
            v-show="changesetNotCompleted && false"
            @click="markComplete">
            <span class="icon is-small">
              <i class="fa fa-check"></i>
            </span>
            <span>mark complete</span>
          </a>

          <a class="paper-action" @click="print">
            <span class="icon is-small">
              <i class="fa fa-print"></i>
            </span>
            <span>print</span>
          </a>
        </div>
        <div class="content">
          <h3><strong>Desk Moving Form</strong></h3>

          <p class="has-text-right">Effective Date: {{ changeset ? changeset.effectiveDate : '______________' }}</p>

          <table class="desk-moving table is-bordered">
            <thead>
              <tr>
                <th class="no">No.</th>
                <th class="firstname">Name</th>
                <th class="lastname">Surname</th>
                <th class="work-phone">Ext</th>
                <th class="team">Team</th>
                <th class="floor">Floor</th>
                <th class="current-desk">Current<br>desk</th>
                <th class="new-desk">New<br>desk</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(activity, index) in formActivities">
                <td>{{ index + 1 }}</td>
                <td>{{ activity.employee.firstname }}</td>
                <td>{{ activity.employee.lastname }}</td>
                <td>{{ activity.employee.work }}</td>
                <td>{{ activity.employee.businessUnit }}</td>
                <td>{{ floorFor(activity.fromDesk) }}</td>
                <td>{{ deskCodeFor(activity.fromDesk) }}</td>
                <td>{{ deskCodeFor(activity.toDesk) }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </layout>
</template>

<script>
import _ from 'lodash';

import Layout from 'components/home/layout';
import PlanSelector from 'components/home/plan-selector';
import PlanActivity from 'components/home/plan-activity';
import ChangesetList from 'components/home/plan-review/changeset-list';

import { FETCH_PLAN_CHANGESETS, FETCH_CHANGESET_ITEMS, COMPLETE_CHANGESET } from 'store/types';
import sortChangesetsByDate from 'components/helpers/sort-changesets-by-date';
import compactChangeset from 'components/helpers/compact-changeset';

export default {
  components: {
    Layout,
    PlanSelector,
    PlanActivity,
    ChangesetList,
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

    pendingChangesets() {
      return _.reject(this.changesets, { status: 'COMPLETE' });
    },

    completedChangesets() {
      return _.filter(this.changesets, { status: 'COMPLETE' });
    },

    changeset() {
      return _.find(this.changesets, { id: this.changesetId });
    },

    plan() {
      const plans = this.$store.state.plans;

      return _.find(plans, { id: this.planId });
    },

    activities() {
      if (!this.changeset) {
        return [];
      }

      const compacted = compactChangeset(this.changeset);

      return compacted.changesetItems;
    },

    formActivities() {
      const maxRows = 20;
      const stubbedRows = maxRows - this.activities.length;

      const emptyActivity = {
        employee: {},
      };
      const emptyActivities = _.times(stubbedRows, _.constant(emptyActivity));

      return this.activities.concat(emptyActivities);
    },

    changesetNotCompleted() {
      return this.changeset && this.changeset.status !== 'COMPLETE';
    },
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
    selectChangeset({ changeset }) {
      this.changesetId = changeset.id;

      this.$store.dispatch(FETCH_CHANGESET_ITEMS, { changesetId: this.changesetId });
    },

    floorFor(desk) {
      return desk && desk.floor.name;
    },

    deskCodeFor(desk) {
      return desk && desk.code;
    },

    print() {
      window.print();
    },

    markComplete() {
      this.$store.dispatch(COMPLETE_CHANGESET, {
        changeset: this.changeset
      });
    }
  }
};
</script>

<style lang="scss" scoped>
  @import '~bulma/sass/utilities/variables';

  .paper-wrapper {
    // 50px for nav height
    height: calc(100vh - 50px);
    overflow-y: auto;
  }

  .paper {
    width: 21cm;
    height: 29.7cm;
    background: white;
    margin: 30px auto;
    box-shadow: 0 0 .5rem #9da5ab;
    padding: 45px;
    position: relative;
  }

  .paper-actions {
    position: absolute;
    right: 45px;
    top: 15px;
    display: flex;
  }

  .paper-action {
    display: flex;
    align-items: center;
    margin-left: 10px;

    .icon {
      margin-right: 5px;
    }
  }

  .desk-moving.table {
    th.no {
      width: 50px;
    }

    th.work-phone {
      width: 55px;
    }

    th.team {
      width: 55px;
    }

    th.floor {
      width: 55px;
    }

    th.current-desk {
      width: 75px;
    }

    th.new-desk {
      width: 75px;
    }
  }

</style>
