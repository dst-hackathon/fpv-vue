<template lang="html">
  <div :style="style.main">
    <div class="toolbar">
      <nav class="level">
        <!-- Left Side -->
        <div class="level-left">
          <FloorPlanSelector class="level-right"
            @selected="onFloorPlanSelected" />
          <div>
            <label class="label">Effective Date</label>
            <datepicker :config="{ static: true }"
              v-model="effectiveDate">
            </datepicker>
          </div>
        </div>

        <!-- Right Side -->
        <div class="level-right">
        </div>
      </nav>
    </div>

    <floor-canvas :readOnly="true"
      :floor="selectedFloor"
      :showOwner="true"
      :changeset="changeset"
      @deskSelected="selectedDesk = $event.desk"
      @deskDeselected="selectedDesk = null" />

    <detail-panel :width="detailWidth" v-show="showInfo">
      <desk-assignment-panel :desk="selectedDesk" v-show="showOwnerInfo" :style="{ 'margin-bottom': '20px' }" :editable="changeset"
        @removeOwner="removeDeskOwner"
        @updateOwner="updateDeskOwner" />

      <plan-activity :activities="activities" v-show="!showOwnerInfo && showActivityInfo" />
    </detail-panel>
  </div>
</template>

<script>
  import axios from 'axios';
  import moment from 'moment';
  import FloorCanvas from './canvas/floor-canvas';
  import DetailPanel from './detail-panel';
  import DeskAssignmentPanel from './desk-assignment-panel';
  import Datepicker from 'vue-bulma-datepicker';
  import FloorPlanSelector from './floor-plan-selector';
  import PlanActivity from './plan-activity';
  import { FETCH_DESK_ASSIGNMENTS, FETCH_PLAN_CHANGESET, REMOVE_DESK_OWNER, ASSIGN_DESK_OWNER } from 'store/types';
  import compactChangeset from 'components/helpers/compact-changeset';
  import api from 'api';

  export default {

    data() {
      return {
        selectedPlan: null,
        selectedFloor: null,
        selectedDesk: null,
        effectiveDate: '',
        detailWidth: 300
      };
    },

    components: {
      FloorCanvas,
      DetailPanel,
      DeskAssignmentPanel,
      Datepicker,
      FloorPlanSelector,
      PlanActivity,
    },

    computed: {
      style() {
        return {
          main: {
            'margin-right': this.showInfo ? `${this.detailWidth}px` : 0
          }
        };
      },

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
      }
    },

    watch: {
      'selectedFloor.id'(floorId) {
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
      onFloorPlanSelected({ plan, floor }) {
        this.selectedPlan = plan;
        this.selectedFloor = floor;
      },

      removeDeskOwner({ desk }) {
        this.$store.dispatch(REMOVE_DESK_OWNER, {
          changeset: this.changeset,
          fromDesk: desk,
         });
      },

      updateDeskOwner: async function({ desk: targetDesk, owner }) {
        const recentOwnerActivity = _.findLast(this.activities, [ 'employee.id', owner.id ]);
        const ownerCurrentDesk = recentOwnerActivity
          ? recentOwnerActivity.toDesk
          : await this.findCurrentDesk({ owner });

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

<style lang="css" scoped>
  .toolbar {
    padding: 10px;
  }

</style>
