<template lang="html">
  <div class="canvas-wrapper" ref="wrapper">
    <canvas ref="canvas">
    </canvas>

    <div class="desks">
      <desk v-for="desk in effectiveDesks"
        class="draggable"
        ref="desks"
        :desk="desk"
        :key="desk.id"
        :modificationLocked="readOnly"
        :showOwner="showOwner"
        @invalidated="invalidate()"
        @created="deskCreated($event)"
        @selected="$emit('deskSelected', $event)"
        @deselected="$emit('deskDeselected', $event)" />
    </div>
  </div>
</template>

<script>
import _ from 'lodash';
import Canvas from 'components/fabric/canvas.fabric';
import resolveFutureDesks from 'components/helpers/resolve-future-desks';
import Desk from './desk';
import api from 'api';

import ScrollableCanvas from './mixins/scrollable-canvas';
import ResponsiveCanvas from './mixins/responsive-canvas';
import DragDropCanvas from './mixins/dnd-canvas';

export default {
  mixins: [
    ScrollableCanvas,
    ResponsiveCanvas,
    DragDropCanvas({
      findDeskById(id) {
        return _.find(this.effectiveDesks, { id: id });
      }
    })
  ],

  components: {
    Desk
  },

  props: ['readOnly', 'floor', 'showOwner', 'changeset'],

  computed: {
    effectiveDesks() {
      const currentDesks = this.floor && this.floor.desks;
      const futureDesks = resolveFutureDesks(currentDesks, this.changeset);

      return futureDesks;
    }
  },

  watch: {
    effectiveDesks(effectiveDesks) {
      const activeObject = this.canvas.getActiveObject() || {};
      const activeEntityId = activeObject.entity && activeObject.entity.id;
      const selectedDesk = _.find(effectiveDesks, { id: activeEntityId });

      if (selectedDesk) {
        this.$emit('deskSelected', { desk: selectedDesk });
      }
    },
  },

  mounted() {
    this.canvas = new Canvas(this.$refs.canvas, {
      uniScaleTransform: true,
      selection: false,
      hoverCursor: this.readOnly ? 'pointer' : 'move'
    });

    this.$watch('floor', this.updateImage, {
      immediate: true
    });

    this.$emit('ready', {
      canvas: this.canvas
    });
  },

  methods: {
    updateImage(floor) {
      const floorId = floor && floor.id;

      if (!floorId) {
        this.canvas
          .setBackgroundImage(null)
          .setDimensions({
            width: 0,
            height: 0
          });

        this.invalidate();
        return;
      }

      this.canvas.setBackgroundImage(api.images.floor(floorId), (img) => {
        if (img) {
          this.canvas.setDimensions({
            width: img.width,
            height: img.height
          });
        }

        this.invalidate();
        this.$emit('imageLoaded');
      });
    },

    invalidate: _.debounce(function() {
      this.canvas.renderAll();
    }, 500),

    deskCreated({ shape }) {
      // use nextTick to wait for this.canvas as it requires mounting the DOM element
      this.$nextTick(() => {
        this.canvas.add(shape);

        if (this.scrollTarget && shape.entity.id === this.scrollTarget.id) {
          this.canvas.setActiveObject(shape);
        }
      });
    },
  }
};
</script>

<style lang="scss" scoped>
  .canvas-wrapper {
    height: 100vh;
    max-height: 100%;
    overflow: auto;
    position: relative;
  }
</style>
