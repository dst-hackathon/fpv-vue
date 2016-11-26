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
        </div>
      </nav>
    </div>

    <floor-canvas v-show="floor" :floor="floor" @ready="canvas = $event.canvas" :top="110" :right="200" />

    <detail-panel :width="detailWidth">
      <desk-detail-panel :desk="selectedDesk" />
    </detail-panel>
  </div>
</template>

<script>
import _ from 'lodash';
import CreateDesk from './canvas/commands/create-desk';
import FloorCanvas from './canvas/floor-canvas';
import DetailPanel from './detail-panel';
import DeskDetailPanel from './desk-detail-panel';
import desksMock from '../../../static/json/desks-mock.json';

export default {
  components: {
    FloorCanvas,
    CreateDesk,
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

    selectedDesk() {
      const selectedId = this.$store.state.floorManagement.selected.deskId;

      return _.find(desksMock, { id: selectedId });
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
