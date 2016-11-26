<template lang="html">
  <div :style="style.main">
    <div class="toolbar">
      <nav class="level">
        <!-- Left Side -->
        <div class="level-left">

        </div>

        <!-- Right Side -->
        <div class="level-right">
          <span @click="toggleCommand('create-desk')">
            <create-desk :canvas="canvas" :active="activeCommand === 'create-desk'"/>
          </span>
          <remove-desk :desk="selectedDesk"/>
        </div>
      </nav>
    </div>

    <floor-canvas v-show="selectedFloor" :floor="selectedFloor" @ready="canvas = $event.canvas" :top="110" :right="200" />

    <detail-panel :width="detailWidth">
      <desk-detail-panel :desk="selectedDesk" :options="deskFieldOoptions" />
    </detail-panel>
  </div>
</template>

<script>
import _ from 'lodash';
import { mapGetters } from 'vuex';
import CreateDesk from './canvas/commands/create-desk';
import RemoveDesk from './canvas/commands/remove-desk';
import FloorCanvas from './canvas/floor-canvas';
import DetailPanel from './detail-panel';
import DeskDetailPanel from './desk-detail-panel';

export default {
  components: {
    FloorCanvas,
    CreateDesk,
    RemoveDesk,
    DetailPanel,
    DeskDetailPanel,
  },

  data() {
    return {
      floor: null,
      canvas: null,
      activeCommand: '',
      detailWidth: 300
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

    deskFieldOoptions() {
      return {
        employeeId: { hidden: true },
        firstName: { hidden: true },
        lastName: { hidden: true },
      };
    },

    ...mapGetters([
      'selectedFloor',
      'selectedDesk'
    ])
  },

  methods: {
    toggleCommand(command) {
      if (this.activeCommand === command) {
        this.activeCommand = null;
      } else {
        this.activeCommand = command;
      }
    }
  }
};
</script>

<style lang="css" scoped>
  .toolbar {
    padding: 10px;
  }
</style>
