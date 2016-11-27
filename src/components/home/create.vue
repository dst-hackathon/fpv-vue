<template lang="html">
  <div :style="style.main">
    <div class="toolbar">
      <nav class="level">
        <!-- Left Side -->
        <div class="level-left">
        </div>

        <!-- Right Side -->
        <div class="level-right">
          <FloorPlanSelector class="level-right" @selected="selectedFloor = $event.floor" />
          <div>
            <label class="label">Effective Date</label>
            <datepicker placeholder="European Format ('d-m-Y')" :config="{ dateFormat: 'd-m-Y', static: true, wrap: true }"></datepicker>
          </div>
        </div>
      </nav>
    </div>

    <floor-canvas
      :readOnly="true"
      :floor="selectedFloor"
      :showEmployee="true"
      @deskSelected="selectedDesk = $event.desk"
      @deskDeselected="selectedDesk = null"/>

    <detail-panel :width="detailWidth" v-show="selectedDesk">
      <desk-detail-panel :desk="selectedDesk" :fieldOptions="deskFieldOptions" />
    </detail-panel>
  </div>
</template>

<script>
import FloorCanvas from './canvas/floor-canvas';
import DetailPanel from './detail-panel';
import DeskDetailPanel from './desk-detail-panel';
import Datepicker from 'vue-bulma-datepicker';
import FloorPlanSelector from './floor-plan-selector';

export default {

  data() {
    return {
      selectedFloor: null,
      selectedDesk: null,
    };
  },

  components: {
    FloorCanvas,
    DetailPanel,
    DeskDetailPanel,
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

    detailWidth() {
      if (this.selectedDesk) {
        return 300;
      } else {
        return 0;
      }
    },

    deskFieldOptions() {
      return {
        deskCode: { readonly: true },
        employeeId: { readonly: false },
        firstName: { readonly: true },
        lastName: { readonly: true },
      };
    },
  },

  watch: {
    ['selectedFloor.id'](floorId) {
      if (!floorId) {
        return;
      }

      this.$store.dispatch('FETCH_DESK_ASSIGNMENTS', {
        floorId
      });
    }
  }
};
</script>

<style lang="css" scoped>
  .toolbar {
    padding: 10px;
  }
</style>
