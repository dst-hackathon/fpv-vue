<template lang="html">
  <div>
    <select v-model="selectedFloor">
      <option value="-1">Please select</option>
      <option v-for="floor in floorObj" :value="floor.id">
        {{floor.name}}
      </option>
    </select>
  </div>
</template>

<script>
import { GET_FLOORS } from 'store/types';
import { SET_FLOOR } from 'store/types';
import { GET_DESKS } from 'store/types';

export default {
  data() {
    return {
        selectedFloor: -1,
    };
  },
  created() {
    this.$store.dispatch(GET_FLOORS,  1 );
  },
  computed: {
    floorObj() {
      return this.$store.state.plans[0].buildings[0].floors;
    },
  },
  watch: {
    selectedFloor(val) {
      var _this = this;
      
      this.showLoadingScreen();
      this.$store.dispatch(SET_FLOOR, {
        buildingId: 1,
        floorId: val,
      });
      
      this.$store.dispatch(GET_DESKS, val);
    }
  },
  
  methods: {
    showLoadingScreen() {
      this.$emit('showLoadingScreen');
    },
  },
};
</script>

<style lang="css">
</style>
