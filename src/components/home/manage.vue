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
          <refresh/>
        </div>
      </nav>
    </div>

    <floor-canvas v-show="selectedFloor" :floor="selectedFloor" @ready="canvas = $event.canvas" :top="110" :right="200" />

    <detail-panel :width="detailWidth">
      <desk-detail-panel :desk="selectedDesk" :panelOptions="deskPanelOptions" :fieldOptions="deskFieldOptions" />
    </detail-panel>
    <desk-modal :active="showModal">
    </desk-modal>
  </div>
</template>

<script>
import _ from 'lodash';
import { mapGetters } from 'vuex';
import CreateDesk from './canvas/commands/create-desk';
import RemoveDesk from './canvas/commands/remove-desk';
import Refresh from './canvas/commands/refresh';
import FloorCanvas from './canvas/floor-canvas';
import DetailPanel from './detail-panel';
import DeskDetailPanel from './desk-detail-panel';
import DeskModal from './desk-modal.vue';
var data = {
  floor: null,
  canvas: null,
  activeCommand: '',
  detailWidth: 300,
};
export default {
  components: {
    FloorCanvas,
    CreateDesk,
    RemoveDesk,
    Refresh,
    DetailPanel,
    DeskDetailPanel,
    DeskModal,
  },

  data() {
    return data;
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
        employeeId: { hidden: true },
        firstName: { hidden: true },
        lastName: { hidden: true },
      };
    },

    showModal(){
      return this.$store.state.floorManagement.modal.showModal;
    },

    ...mapGetters([
      'selectedFloor',
      'selectedDesk'
    ]),
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

  }
};
</script>

<style lang="css" scoped>
  .toolbar {
    padding: 10px;
  }
</style>
