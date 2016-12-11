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

// flatpickr allocates some space causing scroll bar
.flatpickr-calendar:not(.open) {
  display: none;
}

@media print {
  html {
    background-color: white;
  }

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

    .layout-content {
      margin: 0 !important;
    }
  }

  .paper-wrapper {
    height: auto !important;
    overflow-y: visible !important;

    .paper {
      margin: 0;
    }

    .paper-actions {
      display: none;
    }
  }
}
</style>

<style scoped>

.route-outlet {
  padding-top: 50px;
}
</style>
