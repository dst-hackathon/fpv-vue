<template lang="html" src="./template.html"></template>
<style scoped lang="scss" src="./style.scss"></style>

<script>
import $ from 'jquery';
import menus from './menus';
import { LOGOUT } from 'store/types';

require('tooltipster');

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
  },

  mounted() {
    this.$nextTick(() => {
      $(this.$el).find('[title]').tooltipster({
        side: 'right',
        theme: 'tooltipster-borderless',
        distance: 15,
        delay: 100
      });
    });
  }
};
</script>
