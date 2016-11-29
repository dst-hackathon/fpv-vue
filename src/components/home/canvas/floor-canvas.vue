<template lang="html">
  <div class="canvas-wrapper" ref="wrapper" :style="{ height }">
    <canvas ref="canvas">
    </canvas>

    <div class="desks">
      <desk v-for="desk in effectiveDesks"
        ref="desks"
        :desk="desk"
        :key="desk.id"
        :modificationLocked="readOnly"
        :showOwner="showOwner"
        @invalidated="invalidate()"
        @created="deskCreated($event)"
        @selected="relayEvent('deskSelected', $event)"
        @deselected="relayEvent('deskDeselected', $event)" />
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import _ from 'lodash';
import Canvas from 'components/fabric/canvas.fabric';
import resolveFutureDesks from 'components/helpers/resolve-future-desks';
import Desk from './desk';

export default {
  components: {
    Desk
  },

  props: ['readOnly', 'floor', 'showOwner', 'changeset'],

  data() {
    return {
      height: null,
    };
  },

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

    this.reposition();
  },

  methods: {
    async updateImage(floor) {
      const floorId = floor && floor.id;
      if (!floorId) {
        return;
      }

      // const { image, imageContentType } = await this.getImageUrl({ floorId });
      const imageUrl = await this.getImageUrl({ floorId });

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
    },

    reposition() {
      const wrapper = this.$refs.wrapper;
      const boundingRect = wrapper.getBoundingClientRect();

      this.height = `${boundingRect.height - boundingRect.top}px`;
    },

    getImageUrl({ floorId }) {
      // TODO: create api layer?
      return axios.get(`/api/floors/${floorId}/image`)
        .then(({ data: { image, imageContentType }}) => `data:${imageContentType};base64,${image}`);
    },

    relayEvent(eventName, e) {
      this.$emit(eventName, e);
    }
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
