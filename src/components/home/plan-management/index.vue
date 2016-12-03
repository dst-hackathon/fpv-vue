<template lang="html">
  <layout :showRight="showInfo">
    <div slot="left">
      <div>
        <h4 class="title is-4">Manage Plan</h4>

        <floor-plan-selector />
        <effective-date-selector v-model="effectiveDate" />
      </div>
    </div>

    <div slot="right">
      <desk-assignment-panel
        v-show="showOwnerInfo"
        :desk="selectedDesk"
        :style="{ 'margin-bottom': '20px' }"
        :editable="effectiveDateIsFuture"
        @removeOwner="removeDeskOwner"
        @updateOwner="updateDeskOwner" />

      <plan-activity
        :activities="activities"
        v-show="!showOwnerInfo && showActivityInfo" />
    </div>

    <div>
      <floor-canvas
        :readOnly="true"
        :floor="selectedFloor"
        :showOwner="true"
        :changeset="changeset"
        @deskSelected="selectedDesk = $event.desk"
        @deskDeselected="selectedDesk = null" />
    </div>
  </layout>
</template>

<script>
import moment from 'moment';

import Layout from 'components/home/layout';
import FloorPlanSelector from 'components/home/floor-plan-selector';
import EffectiveDateSelector from './effective-date-selector';
import FloorCanvas from 'components/home/canvas/floor-canvas';
import DeskAssignmentPanel from 'components/home/desk-assignment-panel';
import PlanActivity from 'components/home/plan-activity';

import api from 'api';
import compactChangeset from 'components/helpers/compact-changeset';
import { FETCH_DESK_ASSIGNMENTS, FETCH_PLAN_CHANGESET, REMOVE_DESK_OWNER, ASSIGN_DESK_OWNER } from 'store/types';

export default {

  data() {
    return {
      selectedDesk: null,
      effectiveDate: '',
    };
  },

  components: {
    Layout,
    FloorPlanSelector,
    EffectiveDateSelector,
    FloorCanvas,
    DeskAssignmentPanel,
    PlanActivity,
  },

  computed: {
    changeset() {
      if (!this.selectedPlan || !this.effectiveDate) {
        return null;
      }

      const changesets = this.selectedPlan.changesets;
      const changeset = _.find(changesets, changeset => {
        return moment(changeset.effectiveDate).isSame(this.effectiveDate);
      });

      return compactChangeset(changeset);
    },

    activities() {
      return this.changeset && this.changeset.changesetItems || [];
    },

    showOwnerInfo() {
      return this.selectedDesk;
    },

    showActivityInfo() {
      return this.activities.length;
    },

    showInfo() {
      return this.showOwnerInfo || this.showActivityInfo;
    },

    effectiveDateIsFuture() {
      const now = moment();

      return moment(this.effectiveDate).isAfter(now);
    },

    selectedPlan() {
      return this.$store.getters.selectedPlan;
    },

    selectedFloor() {
      return this.$store.getters.selectedFloor;
    },
  },

  watch: {
    'selectedFloor.id' (floorId) {
      if (!floorId) {
        return;
      }

      this.$store.dispatch(FETCH_DESK_ASSIGNMENTS, {
        floorId
      });
    },
  },

  created() {
    this.$watch(
      () => ({
        planId: this.selectedPlan && this.selectedPlan.id,
        effectiveDate: this.effectiveDate
      }),
      (newValue, oldValue) => {
        if (!this.selectedPlan || !this.effectiveDate || _.isEqual(newValue, oldValue)) {
          return null;
        }

        this.$store.dispatch(FETCH_PLAN_CHANGESET, {
          planId: this.selectedPlan.id,
          effectiveDate: this.effectiveDate
        });
      }
    );
  },

  methods: {
    removeDeskOwner({ desk }) {
      this.$store.dispatch(REMOVE_DESK_OWNER, {
        changeset: this.changeset,
        fromDesk: desk,
      });
    },

    updateDeskOwner: async function({ desk: targetDesk, owner }) {
      const recentOwnerActivity = _.findLast(this.activities, ['employee.id', owner.id]);
      const ownerCurrentDesk = recentOwnerActivity ?
        recentOwnerActivity.toDesk :
        await this.findCurrentDesk({ owner });

      this.$store.dispatch(ASSIGN_DESK_OWNER, {
        changeset: this.changeset,

        owner,
        fromDesk: ownerCurrentDesk,
        toDesk: targetDesk,
      });
    },

    findCurrentDesk: async function({ owner }) {
      return await api.desks.findOne({
        employeeId: owner.id,
        planId: this.selectedPlan.id
      });
    }
  },
};
</script>

<style lang="css">
</style>
