<template lang="html">
<div class="modal" :class="{ 'is-active': active }">
    <div class="modal-background"></div>
    <div class="modal-card">
        <header class="modal-card-head">
            <p class="modal-card-title">Please insert Desk Code</p>
            <button class="delete"></button>
        </header>
        <section class="modal-card-body">
            <label class="label">Desk Code</label>
            <p class="control">
                <input class="input" v-model="deskCode" type="text" placeholder="D01">
            </p>
        </section>
        <footer class="modal-card-foot">
            <a class="button is-primary" @click="ok">Ok</a>
            <a class="button">Cancel</a>
        </footer>
    </div>
</div>
</template>

<script>
import { SET_CURRENT_DESKCODE,CREATE_DESK } from 'store/floor-management/types';
import { GET_DESKS } from 'store/types';
import * as types from 'store/floor-management/types';

export default {
  props: ['active','callback'],
  data() {
      return {
          deskCode: "",
      } ;
  },
  methods: {
      ok() {
          console.log("Ok");
          console.log("desk-modal: deskCode="+this.deskCode);
          var _this = this;
          this.$store.dispatch(SET_CURRENT_DESKCODE, { 'deskCode': _this.deskCode } ).then(
              _this.createDesk()
          );
      },
      createDesk() {
          var _this = this;
          this.$store.dispatch(CREATE_DESK, { 
              'deskCode': _this.$store.state.floorManagement.modal.deskCode,
              'desk': _this.$store.state.floorManagement.modal.desk,
              'floorId': _this.$store.state.floorManagement.selected.floorId,
            } ).then(
                _this.refreshDesks()
            );
        },
        refreshDesks() {
            var _this = this;
            this.$store.dispatch(GET_DESKS, _this.$store.state.floorManagement.selected.floorId);
        },
  }
};
</script>

<style lang="css">
</style>