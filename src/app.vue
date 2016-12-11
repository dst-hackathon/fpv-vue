<template>
<div id="app">
  <nav-bar />

  <section class="route-outlet">
    <router-view></router-view>
  </section>

  <div id="modals">
  </div>

  <app-notification />
</div>
</template>

<script>
import NavBar from 'components/nav-bar';
import AppNotification from 'components/app-notification';
import { FETCH_ALL } from 'store/types';

export default {
  name: 'app',
  components: {
    NavBar,
    AppNotification,
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

@media print {
  .app-nav {
    display: none;
  }

  .route-outlet {
    padding: 0 !important;

    .sidebar {
      display: none;
    }

    .side-panel-container {
      display: none;
    }

    .content {
      margin: 0 !important;
    }
  }

  .paper-wrapper {
    height: auto;
    overflow-y: visible;

    .paper {
      margin: 0;
    }
  }
}
</style>

<style scoped>

.route-outlet {
  padding-top: 50px;
}
</style>
