<template lang="html">
  <div :style="style.main">
    <div class="toolbar">
      <nav class="level">
        <!-- Left Side -->
        <div class="level-left">
        </div>

        <!-- Right Side -->
        <div class="level-right">
          <dropdown :options="buildingOptions"/>
          <dropdown :options="floorOptions"/>
        </div>
      </nav>
    </div>
    <floor-canvas :readOnly=true :floor="floor" @ready="canvas = $event.canvas" :top="110" :right="200" />
    <detail-panel :width="detailWidth">
      <desk-detail-panel :desk="selectedDesk" :options="deskFieldOptions" />
    </detail-panel>
  </div>
</template>

<script>
import FloorCanvas from './canvas/floor-canvas';
import desksMock from '../../../static/json/desks-mock.json';
import DetailPanel from './detail-panel';
import DeskDetailPanel from './desk-detail-panel';
import Dropdown from './dropdown';

export default {

  data() {
    return {
      floor: null,
      detailWidth: 300
    };
  },
  components: {
    FloorCanvas,
    DetailPanel,
    DeskDetailPanel,
    Dropdown
  },

  computed: {
    style() {
      return {
        main: {
          'margin-right': `${this.detailWidth}px`
        }
      };
    },

    selectedDesk() {
      const selectedId = this.$store.state.floorManagement.selected.deskId;

      return _.find(desksMock, { id: selectedId });
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

  created() {
    // transform desks mock into a floor object
    const desk = desksMock[0];

    this.floor = {
      ...desk.floor,

      desks: desksMock
    };
  },
};
</script>

<style lang="css" scoped>
  .toolbar {
    padding: 10px;
  }
</style>
