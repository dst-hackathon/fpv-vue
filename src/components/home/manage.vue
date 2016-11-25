<template lang="html">
  <div>
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

    <div >
      <floor-canvas v-show="floor" :floor="floor" @ready="canvas = $event.canvas" :top="110" />
    </div>
  </div>
</template>

<script>
import CreateDesk from './canvas/commands/create-desk';
import FloorCanvas from './canvas/floor-canvas';
import desksMock from '../../../static/json/desks-mock.json';

export default {
  components: {
    FloorCanvas,
    CreateDesk
  },

  data() {
    return {
      floor: null,
      canvas: null,
      activeCommand: ''
    };
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
