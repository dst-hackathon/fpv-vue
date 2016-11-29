<template lang="html">
  <div class="desk" :style="deskStyle">
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
        left: 0
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
      return this.owner.firstname || '';
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

          this.updateOwnerTag();
        });
      }
    },
  },

  methods: {
    updateOwnerTag() {
      if (!this.showOwner || !this.owner) {
        return;
      }

      // can't calculate from el as sometimes it will be in the memory
      // when we are on the different route.
      const elWidth = this.ownerTag.length * 9;
      const elHeight = 25;

      const { left: shapeLeft, top: shapeTop } = this.deskShape.getAbsolutePosition();
      const shapeWidth = this.deskShape.getWidth();
      const shapeHeight = this.deskShape.getHeight();

      const left = shapeLeft + (shapeWidth / 2) - (elWidth / 2);
      const top = shapeTop + (shapeHeight / 2) - (elHeight / 2);

      this.deskStyle.left = `${left}px`;
      this.deskStyle.top = `${top}px`;
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

    if (this.showOwner) {
      this.updateOwnerTag();

      this.deskShape.on('moving', () => {
        this.updateOwnerTag();
      });
    }

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
  }

  .name {
    background: black;
    color: white;
    padding: 5px;

    font-size: 10px;
    transform: perspective(1px) scale(0.9);
  }
</style>
