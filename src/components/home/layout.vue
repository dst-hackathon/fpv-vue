<template lang="html">
  <div>
    <side-panel location="left" width="200px" offset="40px">
      <slot name="left">
      </slot>
    </side-panel>

    <div class="content" :style="style.content">
      <slot></slot>
    </div>

    <!-- <side-panel location="right" width="300px">
      <slot name="right">
      </slot>
    </side-panel> -->
  </div>
</template>

<script>
import SidePanel from './side-panel';

export default {
  components: {
    SidePanel,
  },

  computed: {
    style() {
      return {
        content: {
          'padding-left': '240px'
        }
      };
    }
  }
};
</script>

<style lang="css">
</style>
