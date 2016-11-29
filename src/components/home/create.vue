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
      :changeset="changeset"
      @deskSelected="selectedDesk = $event.desk"
      @deskDeselected="selectedDesk = null"/>

    <detail-panel :width="detailWidth">
      <!-- <desk-assignment-panel /> -->
      <div>
        <h3 class="title is-4">Activity</h3>
        <hr>

        <div v-for="activity in activities">
          <div class="media">
            <div class="media-left">
              <figure class="">
                <img class="employee-image" :src="employeeImage(activity.employee)">
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
import { FETCH_DESK_ASSIGNMENTS, FETCH_PLAN_CHANGESET } from 'store/types';

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
      if (!this.selectedPlan || !this.effectiveDate) {
        return null;
      }

      const changesets = this.selectedPlan.changesets;

      return _.find(changesets, changeset => {
        return moment(changeset.effectiveDate).isSame(this.effectiveDate);
      });
    },

    activities() {
      return this.changeset && this.changeset.changesetItems || [];
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
      () => _.pick(this, 'selectedPlan', 'effectiveDate'),
      (newValue, oldValue) => {
        if (!this.selectedPlan || !this.effectiveDate || _.isEqual(newValue, oldValue)) {
          return null;
        }

        this.$store.dispatch('FETCH_PLAN_CHANGESET', {
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

  .employee-image {
    height: 48px;
    width: 48px;
    object-fit: cover;
  }
</style>
