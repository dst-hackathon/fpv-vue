<template lang="html">
  <nav class="app-nav nav has-shadow">
    <div class="container is-fluid">
      <div class="nav-left">
        <a class="nav-item is-brand" href="#">
          <img src="../assets/logo_v2.png"/>
          <h3 class="title is-3">Floor Plan Visualizer</h3>
        </a>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
};
</script>

<style lang="scss" scoped>
  @import '~bulma/sass/utilities/variables';

  .nav {
    z-index: 1100;
    position: fixed;
    min-width: 100%;
    background-color: $grey-darker;

    * {
      color: white;
    }
  }
</style>
