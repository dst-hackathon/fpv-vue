<template>
<div id="app">
  <nav-bar />

  <section class="route-outlet">
    <router-view></router-view>
  </section>
</div>
</template>

<script>
import NavBar from 'components/nav-bar';

export default {
  name: 'app',
  components: {
    NavBar
  },
};
</script>

<style scoped>

.route-outlet {
  padding-top: 50px;
}
</style>
