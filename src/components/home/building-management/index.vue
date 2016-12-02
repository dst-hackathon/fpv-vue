<template lang="html">
  <layout :showRight="!!selectedFloor">
    <div slot="left">
      <div>
        <h4 class="title is-4">Manage Building</h4>

        <floor-plan-selector @selected="selectedFloor = $event.floor" />
      </div>
    </div>

    <div slot="right">
      <create-desk :canvas="canvas" :active="activeCommand === 'create-desk'" @click="toggleCommand('create-desk')" :floor="selectedFloor" />
      <remove-desk :desk="selectedDesk"/>

      <desk-detail-panel
        v-show="selectedDesk"
        :desk="selectedDesk"
        :fieldOptions="deskFieldOptions"
        @discardChange="selectedDesk = null" />
    </div>

    <div>
      <floor-canvas
        :floor="selectedFloor"
        @ready="canvas = $event.canvas"
        @deskSelected="selectedDesk = $event.desk"
        @deskDeselected="selectedDesk = null" />
    </div>
  </layout>
</template>

<script>
import CreateDesk from 'components/home/canvas/commands/create-desk';
import RemoveDesk from 'components/home/canvas/commands/remove-desk';

import FloorCanvas from 'components/home/canvas/floor-canvas';
import DeskDetailPanel from 'components/home/desk-detail-panel';
import Layout from 'components/home/layout';
import FloorPlanSelector from 'components/home/floor-plan-selector';

export default {
  components: {
    CreateDesk,
    RemoveDesk,
    FloorCanvas,
    Layout,
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
    deskFieldOptions() {
      return {
        employeeId: { hidden: true },
        firstName: { hidden: true },
        lastName: { hidden: true },
        employeeImage: { hidden: true },
      };
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
