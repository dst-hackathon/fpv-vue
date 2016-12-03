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

import ScrollableCanvas from './scrollable-canvas';
import ResponsiveCanvas from './responsive-canvas';

import dragula from 'dragula';

export default {
  mixins: [ScrollableCanvas, ResponsiveCanvas],

  components: {
    Desk
  },

  props: ['readOnly', 'floor', 'showOwner', 'changeset', 'enableDeskDrop'],

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

    enableDeskDrop(enabled) {
      if (enabled) {
        this.drake = dragula({
          removeOnSpill: true,
          copy: true,

          isContainer: function (el) {
            const classList = el.classList;
            const dragable = classList.contains('desk') && classList.contains('draggable');

            return dragable;
          },
        });

        this.drake.on('drop', (el, to, from) => {
          const fromId = parseInt(from.dataset.id, 10);
          const fromDesk = _.find(this.effectiveDesks, { id: fromId });

          const toId = parseInt(to.dataset.id, 10);
          const toDesk = _.find(this.effectiveDesks, { id: toId });

          el.remove();

          this.$emit('updateOwner', {
            desk: toDesk,
            owner: fromDesk.employee
          });
        });

        this.drake.on('cancel', (el, to, from) => {
          const fromId = parseInt(from.dataset.id, 10);
          const fromDesk = _.find(this.effectiveDesks, { id: fromId });

          this.$emit('removeOwner', {
            desk: fromDesk
          });
        });

      } else {
        this.drake.destroy();
        this.drake = null;
      }
    }
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

    invalidate() {
      this.canvas.renderAll();
    },

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
