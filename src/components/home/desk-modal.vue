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
import { SET_CURRENT_DESKCODE } from 'store/floor-management/types';

var data = {
    deskCode: "",
};

export default {
  props: ['active'],
  data(){
      return data;
  },
  methods: {
      ok() {
          console.log("Ok");
          this.$store.dispatch(SET_CURRENT_DESKCODE, this.deskCode);
      }
  }
};
</script>

<style lang="css">
</style>