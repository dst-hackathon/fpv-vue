<template lang="html">
  <div>
    <side-panel location="left" width="250px" offset="40px" v-if="show.left" ref="sideLeft">
      <slot name="left">
      </slot>
    </side-panel>

    <div class="content" :style="style.content">
      <slot></slot>
    </div>

    <side-panel location="right" width="300px" v-if="show.right" ref="sideRight">
      <slot name="right">
      </slot>
    </side-panel>
  </div>
</template>

<script>
import SidePanel from './side-panel';

export default {
  components: {
    SidePanel,
  },

  props: {
    showLeft: {
      default: true
    },
    showRight: {
      default: true
    }
  },

  computed: {
    show() {
      return {
        right: this.showRight && this.$slots.right,
        left: this.showLeft && this.$slots.left
      };
    },

    style() {
      return {
        content: {
          'margin-left': this.show.left ? '290px' : 0,
          'margin-right': this.show.right ? '300px' : 0,
        }
      };
    },
  }
};
</script>

<style lang="css">
</style>
