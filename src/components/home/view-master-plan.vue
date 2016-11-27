<template lang="html">
  <div>
    <div class="toolbar">
      <nav class="level">
        <!-- Left Side -->
        <div class="level-left">

        </div>

        <!-- Right Side -->
        <div class="level-right">

        </div>
      </nav>
    </div>

    <floor-canvas />
  </div>
</template>

<script>
import * as types from 'store/types';
import FloorCanvas from './canvas/floor-canvas';

export default {
  components: {
    FloorCanvas,
  },
};
</script>

<style lang="css">
</style>
