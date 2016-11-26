<template lang="html">
  <div>
  </div>
</template>

<script>
import DeskShape from 'components/fabric/desk.fabric';

export default {
  props: {
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



  },

  destroyed() {
    this.deskShape.remove();
  }
};
</script>
