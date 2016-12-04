<template>
<div>
  <side-menu v-model="selectedMenu" />

  <keep-alive>
    <component :is="homeComponent" />
  </keep-alive>
</div>
</template>

<script>
import SideMenu from './side-menu';
import { findMenuByName } from './side-menu/menus';

export default {
  components: {
    SideMenu,
  },

  data() {
    return {
      selectedMenu: 'Plan'
    };
  },

  computed: {
    homeComponent() {
      if (!this.selectedMenu) {
        return null;
      }

      return findMenuByName(this.selectedMenu).component;
    }
  }
};
</script>

<style scoped>
</style>
