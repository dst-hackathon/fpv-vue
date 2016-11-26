<template lang="html">
  <aside class="menu sidebar">
    <p class="menu-label">{{title}}</p>
    <ul class="menu-list">
      <li v-for="menu in menuList" @click="onMenuClick(menu)">
        <a :class="{ 'is-active': selection === menu.value }">{{menu.name}}</a>
      </li>
    </ul>
  </aside>
</template>

<script>
export default {
  props: [ 'title', 'menuList', 'selection' ],

  methods: {
    onMenuClick(menu) {
      this.$emit('selected', menu);
    }
  }
};
</script>

<style lang="css" scoped>
  .margin-bottom-5 {
    margin-bottom: 5px;
  }

  .menu-label {
    padding-left: 10px;
  }

  .sidebar {
    position: fixed;
    top: 50px;
    left: 0;
    bottom: 0;
    padding: 20px 0 50px;
    min-width: 200px;
    max-height: 100vh;
    background: #fff;
    box-shadow: 0 2px 3px hsla(0,0%,7%,.1),0 0 0 1px hsla(0,0%,7%,.1);
    overflow-y: auto;
    overflow-x: hidden;
    z-index: 1000;
  }
</style>
