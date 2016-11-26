<template lang="html">
  <button class="button" @click="removeDesk(desk)">
    <span class="icon">
      <i class="fa fa-minus"></i>
    </span>
    <span>Remove Desk</span>
  </button>
</template>

<script>
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
        
        // var _this = this;
        // _this.$store.dispatch(types.DELETE_DESK, desk.id)
        // .then(function (response) {
        //   console.log("success removed desk id " + desk.id);
        //   data.loginStatus = "";
        //   return _this.$store.dispatch(types.GET_CURRENT_ACCOUNT, {});
        // })
        // .fail(function (error) {
        //   console.log("can not remove desk code " + desk.code + ", id " + desk.id);
        // });
      }
    },
  }
};
</script>

<style lang="css">
</style>
