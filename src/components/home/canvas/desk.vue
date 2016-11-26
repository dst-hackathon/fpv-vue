<template lang="html">
  <div>
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
    }
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
    }
  },

  methods: {
    lockPosition() {
      this.deskShape.lockMovementX = true;
      this.deskShape.lockMovementY = true;
    },

    lockSize() {
      this.deskShape.lockScalingX = true;
      this.deskShape.lockScalingY = true;
      this.deskShape.setControlsVisibility({
         mt: false,
         mb: false,
         ml: false,
         mr: false,
         bl: false,
         br: false,
         tl: false,
         tr: false,
       });
    },

    lockRotation() {
      this.deskShape.lockRotation = true;
      this.deskShape.setControlsVisibility({
         mtr: false,
      });
    }
  },

  created() {
    this.deskShape = new DeskShape({
      id: this.desk.id,

      ...this.dimensions,
      ...this.position
    });

        var person = new fabric.Image.fromURL('/static/img/location.png', (img) => {
      img.setLeft(this.position.left + this.dimensions.width/2 - 25);
      img.setTop(this.position.top - this.dimensions.height/2);
      img.setWidth(50);
      img.setHeight(50);
    var group = new fabric.Group([this.deskShape, img]);
    this.$emit('created', { shape: group });
    });


    if(this.modificationLocked) {
      this.lockPosition();
      this.lockSize();
      this.lockRotation();
    }

    this.$emit('created', { shape: this.deskShape });
  },

  destroyed() {
    this.deskShape.remove();
  }
};
</script>
