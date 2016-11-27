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

<style scoped>

.route-outlet {
  padding-top: 50px;
}
</style>
