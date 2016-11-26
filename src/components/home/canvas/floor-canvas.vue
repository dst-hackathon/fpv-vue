<template lang="html">
  <div class="canvas-wrapper" ref="wrapper" :style="{ height }">
    <canvas ref="canvas">
    </canvas>

    <div class="desks">
      <desk v-for="desk in desks" :desk="desk" :modificationLocked="readOnly" @invalidated="invalidate()" @created="deskCreated($event)" ref="desks" :key="desk.id"/>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import _ from 'lodash';
import Canvas from 'components/fabric/canvas.fabric';
import Desk from './desk';

export default {
  components: {
    Desk
  },

  props: ['floor', 'top', 'readOnly'],

  data() {
    return {
      height: null,
      image: null,
      imageContentType: null,
    };
  },

  computed: {
    desks() {
      return _.get(this, 'floor.desks');
    }
  },

  watch: {
    floor(floor) {
      // TODO: create api layer?
      axios.get(`/api/floors/${floor.id}/image`)
        .then(({ data }) => {
          this.image = data.image;
          this.imageContentType = data.imageContentType;
        });
    }
  },

  mounted() {
    this.canvas = new Canvas(this.$refs.canvas, {
      uniScaleTransform: true
    });

    this.$watch('image', this.updateImage, {
      immediate: true
    });

    this.$emit('ready', {
      canvas: this.canvas
    });

    this.height = `${this.$refs.wrapper.clientHeight - this.top}px`;
  },

  methods: {
    updateImage(image) {
      if (!this.image) {
        return;
      }

      const imageUrl = `data:${this.imageContentType};base64,${this.image}`;

      this.canvas.setBackgroundImage(imageUrl, (img) => {
        if (img) {
          this.canvas.setDimensions({
            width: img.width,
            height: img.height
          });
        }

        this.invalidate();
      });
    },

    invalidate() {
      this.canvas.renderAll();
    },

    deskCreated({ shape }) {
      // use nextTick to wait for this.canvas as it requires mounting the DOM element
      this.$nextTick(() => {
        this.canvas.add(shape);
      });
    }
  }
};
</script>

<style lang="scss" scoped>
  .canvas-wrapper {
    // need to manually set the top margin
    // height: calc(100vh - 110px);
    height: 100vh;
    max-height: 100%;
    overflow: auto;
  }
</style>
