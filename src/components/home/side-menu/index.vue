<template lang="html" src="./template.html"></template>
<style scoped lang="scss" src="./style.scss"></style>

<script>
import menus from './menus';
import { LOGOUT } from 'store/types';

export default {
  data() {
    return {
      menus,
    };
  },

  computed: {
    selectedMenu() {
      return this.$route.name;
    }
  },

  methods: {
    select(menu) {
      this.$router.push({ name: menu.name });
    },

    logout() {
      this.$store.dispatch(LOGOUT);
    }
  }
};
</script>
