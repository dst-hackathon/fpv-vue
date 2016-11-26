<template lang="html">
  <div class="main" :style="style.main">
    <div class="container is-fluid">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    width: {
      type: Number
    }
  },

  computed: {
    style() {
      return {
        main: {
          width: `${this.width}px`
        }
      };
    }
  }
};
</script>

<style lang="css" scoped>
  .main {
    position: fixed;
    top: 50px;
    right: 0;
    bottom: 0;
    padding: 20px 0 50px;
    min-width: 45px;
    max-height: 100vh;
    background: #fff;
    box-shadow: 0 2px 3px hsla(0,0%,7%,.1),0 0 0 1px hsla(0,0%,7%,.1);
    overflow-y: auto;
    overflow-x: hidden;
    z-index: 1000;
  }
</style>
