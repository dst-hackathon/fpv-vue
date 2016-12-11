<template lang="html">
  <layout :showRight="!!selectedPlan">
    <div slot="left">
      <div>
        <h4 class="title is-4">Manage Plan</h4>

        <floor-plan-selector />
        <label class="label">Effective Date</label>
        <datepicker v-model="effectiveDate"
          :minDate="new Date()" />
      </div>
    </div>

    <div slot="right">
      <desk-assignment-panel
        v-show="selectedDesk"
        :desk="selectedDesk"
        :style="{ 'margin-bottom': '20px' }"
        :editable="effectiveDateIsFuture"
        @removeOwner="removeDeskOwner"
        @updateOwner="updateDeskOwner" />

      <action-tabs
        v-show="!selectedDesk"
        :activities="activities"
        @clickEmployee="scrollToEmployee"
        @clickDesk="scrollToDesk" />
    </div>

    <div>
      <floor-canvas
        :readOnly="true"
        :floor="selectedFloor"
        :scrollTarget="scrollTarget"
        :showOwner="true"
        :changeset="changeset"
        :enableDeskDrop="!!changeset"
        @deskSelected="selectedDesk = $event.desk"
        @deskDeselected="selectedDesk = null"
        @removeOwner="removeDeskOwner"
        @updateOwner="updateDeskOwner" />
    </div>
  </layout>
</template>

<script>
import moment from 'moment';

import Layout from 'components/home/layout';
import FloorPlanSelector from 'components/home/floor-plan-selector';
import FloorCanvas from 'components/home/canvas/floor-canvas';
import DeskAssignmentPanel from './desk-assignment-panel';
import Datepicker from './datepicker';
import ActionTabs from './action-tabs';

import api from 'api';
import compactChangeset from 'components/helpers/compact-changeset';
import { FETCH_DESK_ASSIGNMENTS, FETCH_PLAN_CHANGESET, FETCH_PLAN_CHANGESETS } from 'store/types';
import { REMOVE_DESK_OWNER, ASSIGN_DESK_OWNER } from 'store/types';
import { BROADCAST_NOTIFICATION, DISMISS_NOTIFICATION } from 'store/types';

import dragula from 'dragula';

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
    Datepicker,
    ActionTabs,
  },

  computed: {
    changeset() {
      // no change should be allowed for the past or today
      if (!this.selectedPlan || !this.effectiveDateIsFuture) {
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

    selectedPlan() {
      return this.$store.getters.selectedPlan;
    },

    selectedFloor() {
      return this.$store.getters.selectedFloor;
    },

    effectiveDateIsFuture() {
      const now = moment();

      return moment(this.effectiveDate).isAfter(now);
    },

    hasChangeset() {
      return !!this.changeset;
    },

    canChangeSelectedFloor() {
      return this.selectedFloor && this.effectiveDateIsFuture;
    }
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
    },

    hasChangeset(hasChangeset) {
      if (hasChangeset) {
        this.enableDragAndDrop();
      } else {
        this.disableDragAndDrop();
      }
    },

    canChangeSelectedFloor: async function(canChange) {
      if (canChange && this.noChangeWarning) {
        this.$store.dispatch(DISMISS_NOTIFICATION, {
          id: this.noChangeWarning.id
        });

        this.noChangeWarning = null;
      }


      if (!canChange && !this.noChangeWarning) {
        this.noChangeWarning = await this.$store.dispatch(BROADCAST_NOTIFICATION, {
          message: `You are viewing today's plan. No changes are allowed.`
        });
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
      const ownerCurrentDesk = await this.findCurrentDesk({ owner });

      this.$store.dispatch(ASSIGN_DESK_OWNER, {
        changeset: this.changeset,

        owner,
        fromDesk: ownerCurrentDesk,
        toDesk: targetDesk,
      });
    },

    findCurrentDesk: async function({ owner }) {
      const recentOwnerActivity = _.findLast(this.activities, ['employee.id', owner.id]);

      if (recentOwnerActivity) {
        return recentOwnerActivity.toDesk;
      } else {
        return await api.desks.findOne({
          employeeId: owner.id,
          planId: this.selectedPlan.id
        });
      }
    },

    scrollToDesk: async function({ desk }) {
      const floor = desk.floor;
      const building = floor.building;

      await this.$store.dispatch("SELECT_BUILDING", { buildingId: building.id });
      await this.$store.dispatch("SELECT_FLOOR", { floorId: floor.id });

      // get desk from state as a desk in passed from activity panel is a clone.
      const desks = this.$store.getters.desks;
      this.scrollTarget = _.find(desks, { id: desk.id });
    },

    scrollToEmployee: async function({ employee }) {
      const desk = await this.findCurrentDesk({ owner: employee });

      if (desk) {
        this.scrollToDesk({ desk });
      } else {
        this.$store.dispatch(BROADCAST_NOTIFICATION, {
          message: `${employee.firstname} ${employee.lastname} has not been assigned to any desk`,
          timeout: 10000
        });
      }
    },

    enableDragAndDrop() {
      this.drake = dragula({
        copy: true,
        removeOnSpill: true,
        isContainer(el) {
          return el.classList.contains('desk') || el.classList.contains('employee-info');
        },
        moves(el) {
          return el.classList.contains('draggable');
        },
        accepts(el, target) {
          return target.classList.contains('desk');
        }
      });

      this.drake.on('drop', (el, target) => {
        el.classList.add('dropped');
        el.remove();

        const desks = this.$store.getters.desks;
        const deskId = parseInt(target.dataset.id);
        const desk = _.find(desks, { id: deskId });
        const owner = JSON.parse(el.dataset.employee);

        this.updateDeskOwner({
          desk,
          owner,
        });
      });
    },

    disableDragAndDrop() {
      if (this.drake) {
        this.drake.destroy();
        this.drake = null;
      }
    }
  },
};
</script>

<style lang="scss">
</style>
