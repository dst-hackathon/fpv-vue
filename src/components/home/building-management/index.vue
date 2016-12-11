<template lang="html">
  <layout :showRight="!!selectedDesk">
    <div slot="left">
      <div>
        <h4 class="title is-4">Manage Building</h4>

        <floor-plan-selector />
      </div>
    </div>

    <div slot="right">
      <desk-detail-panel
        v-show="selectedDesk"
        :desk="selectedDesk"
        :fieldOptions="deskFieldOptions"
        @discardChange="selectedDesk = null" />
    </div>

    <div ref="content">
      <floor-canvas
        :floor="selectedFloor"
        @ready="canvas = $event.canvas"
        @deskSelected="selectedDesk = $event.desk"
        @deskDeselected="selectedDesk = null" />

      <!-- create-desk command is always active -->
      <!-- TODO: extract as a JS component / service instead of being Vue -->
      <create-desk v-show="false" :canvas="canvas" :floor="selectedFloor" :active="canvas && selectedFloor" />
    </div>

  </layout>
</template>

<script>
import CreateDesk from 'components/home/canvas/commands/create-desk';

import FloorCanvas from 'components/home/canvas/floor-canvas';
import DeskDetailPanel from 'components/home/desk-detail-panel';
import Layout from 'components/home/layout';
import FloorPlanSelector from 'components/home/floor-plan-selector';

export default {
  components: {
    CreateDesk,
    FloorCanvas,
    Layout,
    DeskDetailPanel,
    FloorPlanSelector,
  },

  data() {
    return {
      canvas: null,
      activeCommand: '',
      selectedDesk: null,
    };
  },

  computed: {
    deskFieldOptions() {
      return {
        employeeId: { hidden: true },
        firstName: { hidden: true },
        lastName: { hidden: true },
        employeeImage: { hidden: true },
      };
    },

    selectedFloor() {
      return this.$store.getters.selectedFloor;
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
  }
};
</script>

<style lang="css" scoped>
</style>
