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
          <span @click="toggleCommand('create-desk')">
            <create-desk :canvas="canvas" :active="activeCommand === 'create-desk'"/>
          </span>
          <remove-desk :desk="selectedDesk"/>
        </div>
      </nav>
    </div>

    <floor-canvas
      :floor="selectedFloor"
      @ready="canvas = $event.canvas"
      @deskSelected="selectedDesk = $event.desk"
      @deskDeselected="selectedDesk = null" />

    <detail-panel :width="detailWidth">
      <desk-detail-panel :desk="selectedDesk" v-show="!!selectedDesk" :fieldOptions="deskFieldOptions" />
    </detail-panel>

    <desk-modal :active="showModal">
    </desk-modal>
  </div>
</template>

<script>
import _ from 'lodash';

import CreateDesk from './canvas/commands/create-desk';
import RemoveDesk from './canvas/commands/remove-desk';

import FloorCanvas from './canvas/floor-canvas';
import DetailPanel from './detail-panel';
import DeskDetailPanel from './desk-detail-panel';
import DeskModal from './desk-modal.vue';
import FloorPlanSelector from './floor-plan-selector';

export default {
  components: {
    CreateDesk,
    RemoveDesk,
    FloorCanvas,
    DetailPanel,
    DeskDetailPanel,
    DeskModal,
    FloorPlanSelector,
  },

  data() {
    return {
      canvas: null,
      activeCommand: '',
      detailWidth: 300,
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

    showModal(){
      return this.$store.state.floorManagement.modal.showModal;
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

    showDeskCodeModal(callback){
      this.showModal = true;
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
