<template lang="html">
  <layout>
    <div slot="left">
      <div>
        <h4 class="title is-4">Review Plan</h4>

        <plan-selector v-model="planId" />

        <div v-if="changesets && changesets.length > 0">
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
    </div>

    <div slot="right">
      <plan-activity :activities="activities">

        <template slot="footer" scope="props">
          <a class="accept">
            <span class="icon"><i class="fa fa-check"></i></span>
          </a>

          <a class="deny">
            <span class="icon"><i class="fa fa-remove"></i></span>
          </a>
        </template>
      </plan-activity>
    </div>

    <div class="paper-wrapper">
      <div class="paper">
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
    },

    floorFor(desk) {
      return desk && desk.floor.name;
    },

    deskCodeFor(desk) {
      return desk && desk.code;
    },
  }
};
</script>

<style lang="scss">
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

  .deny {
    margin-left: 20px;
    color: $red;
  }

</style>
