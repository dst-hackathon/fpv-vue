<template lang="html">
  <div :style="style.main">
    <div class="toolbar">
      <nav class="level">
        <!-- Left Side -->
        <div class="level-left">
          <floor-plan-selector class="level-left" @selected="selectedFloor = $event.floor" />
        </div>

        <!-- Right Side -->
        <div class="level-right">
          <create-desk :canvas="canvas" :active="activeCommand === 'create-desk'" @click="toggleCommand('create-desk')" :floor="selectedFloor" />
          <remove-desk :desk="selectedDesk"/>
        </div>
      </nav>
    </div>

    <floor-canvas
      :floor="selectedFloor"
      @ready="canvas = $event.canvas"
      @deskSelected="selectedDesk = $event.desk"
      @deskDeselected="selectedDesk = null" />

    <detail-panel :width="detailWidth" v-show="selectedDesk">
      <desk-detail-panel :desk="selectedDesk" :fieldOptions="deskFieldOptions" />
    </detail-panel>
  </div>
</template>

<script>
import _ from 'lodash';

import CreateDesk from './canvas/commands/create-desk';
import RemoveDesk from './canvas/commands/remove-desk';

import FloorCanvas from './canvas/floor-canvas';
import DetailPanel from './detail-panel';
import DeskDetailPanel from './desk-detail-panel';
import FloorPlanSelector from './floor-plan-selector';

export default {
  components: {
    CreateDesk,
    RemoveDesk,
    FloorCanvas,
    DetailPanel,
    DeskDetailPanel,
    FloorPlanSelector,
  },

  data() {
    return {
      canvas: null,
      activeCommand: '',
      selectedFloor: null,
      selectedDesk: null,
    };
  },

  computed: {
    style() {
      return {
        main: {
          'margin-right': `${this.detailWidth}px`
        }
      };
    },

    deskFieldOptions() {
      return {
        employeeId: { hidden: true },
        firstName: { hidden: true },
        lastName: { hidden: true },
      };
    },

    detailWidth() {
      if (this.selectedDesk) {
        return 300;
      } else {
        return 0;
      }
    },
  },

  methods: {
    toggleCommand(command) {
      if (this.activeCommand === command) {
        this.activeCommand = null;
      } else {
        this.activeCommand = command;
      }
    },

    showLoadingScreen() {
      alert( 'loading' );
    },
  }
};
</script>

<style lang="css" scoped>
  .toolbar {
    padding: 10px;
  }

  .loadingScreen {
    position: fixed;
    width: 100%;
    height: 100%;
    background-color: black;
    z-index: 99999999;
  }
</style>
