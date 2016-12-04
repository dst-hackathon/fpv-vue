<template>
<div id="app">
  <nav-bar />

  <section class="route-outlet">
    <router-view></router-view>
  </section>

  <div id="modals">

  </div>
</div>
</template>

<script>
import NavBar from 'components/nav-bar';
import { FETCH_ALL } from 'store/types';

export default {
  name: 'app',
  components: {
    NavBar
  },

  created() {
    this.$store.dispatch(FETCH_ALL);
  }
};
</script>

<style lang="scss">
@import '~tooltipster/dist/css/tooltipster.bundle';
// @import '~tooltipster-follower/dist/css/tooltipster-follower.min';
@import '~Flatpickr/dist/flatpickr.min';
@import '~dragula/dist/dragula.min';

html {
  /*override bulma's*/
  overflow-y: hidden;
}
</style>

<style scoped>

.route-outlet {
  padding-top: 50px;
}
</style>
