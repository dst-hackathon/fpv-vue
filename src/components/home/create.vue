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

    <floor-canvas :readOnly="true" :floor="selectedFloor" @deskSelected="selectedDesk = $event.desk" @deskDeselected="selectedDesk = null"/>

    <detail-panel :width="detailWidth">
      <desk-detail-panel :desk="selectedDesk" :panelOptions="deskPanelOptions" :fieldOptions="deskFieldOptions" />
    </detail-panel>
  </div>
</template>

<script>
import FloorCanvas from './canvas/floor-canvas';
import DetailPanel from './detail-panel';
import DeskDetailPanel from './desk-detail-panel';
import Dropdown from './dropdown';
import Datepicker from 'vue-bulma-datepicker';
import FloorPlanSelector from './floor-plan-selector';

export default {

  data() {
    return {
      selectedFloor: null,
      selectedDesk: null,
      detailWidth: 300
    };
  },

  components: {
    FloorCanvas,
    DetailPanel,
    DeskDetailPanel,
    Dropdown,
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

    deskPanelOptions() {
      return { hidden: !this.selectedDesk };
    },

    deskFieldOptions() {
      return {
        deskCode: { readonly: true },
        employeeId: { readonly: false },
        firstName: { readonly: true },
        lastName: { readonly: true },
      };
    },

    floorOptions() {
      return [
        {text: "17th floor"},
        {text: "18th floor"}
      ];
    },

    buildingOptions() {
      return [
        {text: "RSU Tower"}
      ];
    }
  },
};
</script>

<style lang="css" scoped>
  .toolbar {
    padding: 10px;
  }
</style>
