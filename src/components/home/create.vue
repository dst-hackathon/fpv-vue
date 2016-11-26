<template lang="html">
  <div>
    <floor-canvas :readOnly=true :floor="floor" @ready="canvas = $event.canvas" :top="110" :right="200" />
  </div>
</template>

<script>
import FloorCanvas from './canvas/floor-canvas';
import desksMock from '../../../static/json/desks-mock.json';

export default {
  data() {
    return {
      floor: null,
    };
  },
  components: {
    FloorCanvas
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

<style lang="css">
</style>
