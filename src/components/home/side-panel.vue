<template lang="html">
  <div class="side-panel-container" :style="style.container">
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
        container: {
          width: this.width,
          [this.location]: this.offset,
        }
      };
    }
  }
};
</script>

<style lang="css" scoped>
  .side-panel-container {
    position: absolute;
    top: 50px;
    bottom: 0;
    padding-top: 20px;
    min-width: 45px;
    max-height: 100vh;
    background: #fff;
    box-shadow: 0 0 .5rem #9da5ab;
    z-index: 1000;
  }

  .container {
    height: 100%;
  }

  .container > * {
    height: 100%;
    display: flex;
    flex-direction: column;
  }
</style>
