<template lang="html">
  <div :style="style.main">
    <div class="toolbar">
      <nav class="level">
        <!-- Left Side -->
        <div class="level-left">
          <FloorPlanSelector class="level-right" @selected="onFloorPlanSelected" />
          <div>
            <label class="label">Effective Date</label>
            <datepicker :config="{ static: true }" v-model="effectiveDate">
            </datepicker>
          </div>
        </div>

        <!-- Right Side -->
        <div class="level-right">
        </div>
      </nav>
    </div>

    <floor-canvas
      :readOnly="true"
      :floor="selectedFloor"
      :showEmployee="true"
      @deskSelected="selectedDesk = $event.desk"
      @deskDeselected="selectedDesk = null"/>

    <detail-panel :width="300">
      <!-- <desk-assignment-panel /> -->
      <h3 class="title is-4">Activities</h3>

      <div v-for="activity in activities">
        <div class="media">
          <div class="media-left">
            <figure class="image is-48x48">
              <img :src="employeeImage(activity.employee)">
            </figure>
          </div>
          <div class="media-content">
            <p class="title is-5">{{ activity.employee.firstname }} {{ activity.employee.lastname }}</p>
            <p class="subtitle is-6">{{ activity.employee.code }}</p>
          </div>
        </div>

        <p>From: {{ activity.fromDesk && activity.fromDesk.code }}</p>
        <p>To: {{ activity.toDesk && activity.toDesk.code }}</p>
        <hr>
      </div>
    </detail-panel>
  </div>
</template>

<script>
import moment from 'moment';
import FloorCanvas from './canvas/floor-canvas';
import DetailPanel from './detail-panel';
import DeskAssignmentPanel from './desk-assignment-panel';
import Datepicker from 'vue-bulma-datepicker';
import FloorPlanSelector from './floor-plan-selector';
import { FETCH_DESK_ASSIGNMENTS } from 'store/types';

export default {

  data() {
    return {
      selectedPlan: null,
      selectedFloor: null,
      selectedDesk: null,
      effectiveDate: ''
    };
  },

  components: {
    FloorCanvas,
    DetailPanel,
    DeskAssignmentPanel,
    Datepicker,
    FloorPlanSelector,
  },

  computed: {
    style() {
      return {
        main: {
          'margin-right': `${this.detailWidth}px`
        }
      };
    },

    changeset() {
      if (!this.selectedPlan) return null;

      const changesets = this.selectedPlan.changesets;

      return _.find(changesets, changeset => {
        return moment(changeset.effectiveDate).isSame(this.effectiveDate);
      });
    },

    activities() {
      return this.changeset && this.changeset.items || [];
    }
  },

  watch: {
    ['selectedFloor.id'](floorId) {
      if (!floorId) {
        return;
      }

      this.$store.dispatch(FETCH_DESK_ASSIGNMENTS, {
        floorId
      });
    },

    ['selectedPlan.id'](planId) {
      if (!planId) {
        return;
      }

      this.$store.dispatch('FETCH_CHANGESETS', {
        planId,
      });
    },

    ['changeset.id'](changesetId) {
      if (!changesetId) {
        return;
      }

      this.$store.dispatch('FETCH_CHANGESET_ITEMS', {
        changesetId
      });
    }
  },

  methods: {
    onFloorPlanSelected({ plan, floor }) {
      this.selectedPlan = plan;
      this.selectedFloor = floor;
    },

    employeeImage(employee) {
      const { image, imageContentType } = employee;

      return `data:${imageContentType};base64,${image}`;
    }
  },
};
</script>

<style lang="css" scoped>
  .toolbar {
    padding: 10px;
  }
</style>
