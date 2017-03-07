<template>
<div>
  <side-menu />

  <keep-alive>
    <router-view></router-view>
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
};
</script>

<style scoped>
</style>
