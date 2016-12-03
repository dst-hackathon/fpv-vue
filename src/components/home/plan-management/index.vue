<template lang="html">
  <layout :showRight="showOwnerInfo || showActivityInfo">
    <div slot="left">
      <div>
        <h4 class="title is-4">Manage Plan</h4>

        <floor-plan-selector />
        <!-- <effective-date-selector v-model="effectiveDate" /> -->
        <label class="label">Effective Date</label>
        <datepicker v-model="effectiveDate"
          :minDate="new Date()" />
      </div>
    </div>

    <div slot="right">
      <desk-assignment-panel
        v-show="showOwnerInfo"
        :desk="selectedDesk"
        :style="{ 'margin-bottom': '20px' }"
        :editable="true"
        @removeOwner="removeDeskOwner"
        @updateOwner="updateDeskOwner" />

      <plan-activity
        :activities="activities"
        @scrollTo="scrollTo"
        v-show="!showOwnerInfo && showActivityInfo" />
    </div>

    <div>
      <floor-canvas
        :readOnly="true"
        :floor="selectedFloor"
        :scrollTarget="scrollTarget"
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
import FloorCanvas from 'components/home/canvas/floor-canvas';
import DeskAssignmentPanel from 'components/home/desk-assignment-panel';
import PlanActivity from 'components/home/plan-activity';
import Datepicker from './datepicker';

import api from 'api';
import compactChangeset from 'components/helpers/compact-changeset';
import { FETCH_DESK_ASSIGNMENTS, FETCH_PLAN_CHANGESET, REMOVE_DESK_OWNER, ASSIGN_DESK_OWNER } from 'store/types';

export default {

  data() {
    return {
      selectedDesk: null,
      effectiveDate: moment().format(),
      scrollTarget: null,
    };
  },

  components: {
    Layout,
    FloorPlanSelector,
    FloorCanvas,
    DeskAssignmentPanel,
    PlanActivity,
    Datepicker,
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

    selectedDesk(desk) {
      const deskId = desk && desk.id;
      const targetId = this.scrollTarget && this.scrollTarget.id;

      // target was scrolled to and selected
      // done!
      if (deskId === targetId) {
        this.scrollTarget = null;
      }
    }
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
    },

    scrollTo: async function({ desk }) {
      const floor = desk.floor;
      const building = floor.building;

      await this.$store.dispatch("SELECT_FLOOR", { floorId: floor.id });
      await this.$store.dispatch("SELECT_BUILDING", { buildingId: building.id });

      // get desk from state as a desk in passed from activity panel is a clone.
      const desks = this.$store.getters.desks;
      this.scrollTarget = _.find(desks, { id: desk.id });
    }
  },
};
</script>

<style lang="css">
</style>
