<template lang="html">
  <button class="button" @click="refresh()">    
    <span>Refresh</span>
  </button>
</template>

<script>
import * as types from 'store/types';

export default {
  methods: {
    refresh() {
        var _this = this;
        _this.$store.dispatch(types.GET_DESKS, 1)
        .then(function (response) {
          console.log("refresh success");
          return;
        })
        .catch(function (error) {
          console.log("Fail to refresh");
          console.log(error);
        });
      }
  }
};
</script>

<style lang="css">
</style>
