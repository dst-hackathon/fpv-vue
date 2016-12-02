<template lang="html" src="./template.html"></template>
<style scoped lang="scss" src="./style.scss"></style>

<script>
import menus from './menus';

export default {
  data() {
    return {
      menus,

      selectedMenu: 'Plan'
    };
  },

  methods: {
    select(menu) {
      this.selectedMenu = menu.name;

      this.$emit('input', this.selectedMenu);
    }
  }
};
</script>
