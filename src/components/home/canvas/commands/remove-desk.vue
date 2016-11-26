<template lang="html">
  <button class="button" @click="removeDesk(desk)">
    <span class="icon">
      <i class="fa fa-minus"></i>
    </span>
    <span>Remove Desk</span>
  </button>
</template>

<script>
import * as types from 'store/types';

export default {
  props: ['desk'],
  methods: {
    removeDesk(desk) {
      if(desk == null) {
        alert("You have not selected any desk yet.");
        return;
      }

      if(confirm("Do you want to remove desk: " + desk.code + "?")) {
        console.log("Removing desk code " + desk.code + ", id " + desk.id);
        
        var _this = this;
        _this.$store.dispatch(types.DELETE_DESKS, {'deskId':desk.id})
        .then(function (response) {
          console.log("Removed desk code " + desk.code + ", id " + desk.id);
          return;
        })
        .catch(function (error) {
          console.log("Fail:: Could not remove desk code " + desk.code + ", id " + desk.id);
          console.log(error);
        });
      }
    },
  }
};
</script>

<style lang="css">
</style>
