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
    width: String,
    location: {
      type: String,
      default: 'right'
    },
    offset: {
      type: String,
      default: '0'
    },
  },

  computed: {
    style() {
      return {
        main: {
          width: this.width,
          [this.location]: this.offset,
        }
      };
    }
  }
};
</script>

<style lang="css" scoped>
  .main {
    position: absolute;
    top: 50px;
    bottom: 0;
    padding: 20px 0 50px;
    min-width: 45px;
    max-height: 100vh;
    background: #fff;
    box-shadow: 0 0 .5rem #9da5ab;
    z-index: 1000;
  }
</style>
