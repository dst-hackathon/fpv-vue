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
import {
  mapGetters
} from 'vuex';
import * as types from 'store/types';
import FloorCanvas from './canvas/floor-canvas';

export default {
  components: {
    FloorCanvas
  },

  computed: {
    ...mapGetters([
      'masterPlan'
    ])
  },

  created() {
    this.fetchMasterPlan();
  },

  methods: {
    fetchMasterPlan() {
      this.$store.dispatch(types.GET_MASTER_PLAN);
    }
  }
};
</script>

<style lang="css">
</style>
