<template lang="html">
  <div class="desk" :style="deskStyle" @click="onClick" :data-id="desk.id">
    <div class="name" v-if="showOwner && owner">
      {{ ownerTag }}
    </div>
  </div>
</template>

<script>
import DeskShape from 'components/fabric/desk.fabric';

export default {
  props: {
    modificationLocked: {
      type: Boolean,
      default: false
    },
    desk: {
      default: {}
    },
    showOwner: {
      type: Boolean
    }
  },

  data() {
    return {
      deskStyle: {
        top: 0,
        left: 0,
        width: 0,
        height: 0,
      }
    };
  },

  computed: {
    dimensions() {
      // when shape is created, transform the shape by scaling it
      // this is what Fabric.js expects when we resize a shape.
      if (this.deskShape) {
        return {
          scaleX: this.desk.width / this.deskShape.width,
          scaleY: this.desk.height / this.deskShape.height
        };
      }

      return {
        width: this.desk.width,
        height: this.desk.height
      };
    },

    position() {
      return {
        left: this.desk.x,
        top: this.desk.y
      };
    },

    owner() {
      return this.desk.employee;
    },

    ownerTag() {
      return this.owner && this.owner.firstname || '';
    }
  },

  watch: {
    dimensions(dimensions) {
      this.deskShape.set({
        ...dimensions
      });

      this.$emit('invalidated');
    },

    position(position) {
      this.deskShape.setAbsolutePosition(position);

      this.$emit('invalidated');
    },

    // TODO: revise this
    desk: {
      deep: true,
      handler() {
        this.$nextTick(() => {
          this.deskShape.entity = this.desk;

          this.updateMaskPosition();
        });
      }
    },
  },

  methods: {
    updateMaskPosition() {
      if (!this.showOwner) {
        return;
      }

      // position desk mask
      const { left: shapeLeft, top: shapeTop } = this.deskShape.getAbsolutePosition();
      const shapeWidth = this.deskShape.getWidth();
      const shapeHeight = this.deskShape.getHeight();

      this.deskStyle.left = `${shapeLeft}px`;
      this.deskStyle.top = `${shapeTop}px`;
      this.deskStyle.width = `${shapeWidth}px`;
      this.deskStyle.height = `${shapeHeight}px`;
    },

    onClick() {
      const canvas = this.deskShape.canvas;

      canvas.setActiveObject(this.deskShape);
    }
  },

  created() {
    this.deskShape = new DeskShape({
      entity: this.desk,

      hasControls: !this.modificationLocked,
      lockMovementX: this.modificationLocked,
      lockMovementY: this.modificationLocked,

      ...this.dimensions,
      ...this.position,
    });

    if (this.showOwner) {
      this.updateMaskPosition();

      this.deskShape.on('moving', () => {
        this.updateMaskPosition();
      });
    }

    this.deskShape.on('selected', () => {
      this.$emit('selected', {
        desk: this.desk,
      });
    });

    this.deskShape.on('deselected', () => {
      this.$emit('deselected', {
        desk: this.desk,
      });
    });

    this.$emit('created', { shape: this.deskShape });
  },

  destroyed() {
    this.deskShape.remove();
  },
};
</script>

<style>
  .desk {
    position: absolute;
    cursor: pointer;
  }

  .name {
    background: black;
    color: white;
    padding: 5px;

    font-size: 10px;
    transform: perspective(1px) scale(0.9);
  }
</style>
