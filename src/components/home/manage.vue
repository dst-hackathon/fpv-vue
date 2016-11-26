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
      <desk-detail-panel :desk="selectedDesk" :options="deskFieldOoptions" />
    </detail-panel>
    <desk-modal :active="showModal">
    </desk-modal>
  </div>
</template>

<script>
import _ from 'lodash';
import CreateDesk from './canvas/commands/create-desk';
import FloorCanvas from './canvas/floor-canvas';
import DetailPanel from './detail-panel';
import DeskDetailPanel from './desk-detail-panel';
import DeskModal from './desk-modal.vue';
import desksMock from '../../../static/json/desks-mock.json';
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

    selectedDesk() {
      const selectedId = this.$store.state.floorManagement.selected.deskId;

      return _.find(desksMock, { id: selectedId });
    },

    deskFieldOoptions() {
      return {
        deskCode: { readonly: false },
        employeeId: { readonly: true },
        firstName: { readonly: true },
        lastName: { readonly: true },
      };
    },

    showModal(){
      return this.$store.state.floorManagement.modal.showModal;
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
