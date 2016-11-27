<template lang="html">
  <div class="desk" ref="desk">
    <div class="name" v-if="showEmployee && employee">
      {{ employee.code }}
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
    showEmployee: {
      type: Boolean
    },
    employee: Object
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

    employee() {
      return this.desk.employee;
    },
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

    desk: {
      deep: true,
      handler() {
        this.$nextTick(() => {
          this.deskShape.entity = this.desk;

          this.updateEmployeeTag();
        });
      }
    },
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
    },

    updateEmployeeTag() {
      if (!this.showEmployee || !this.employee) {
        return;
      }

      const deskEl = this.$refs.desk;

      // can't calculate from el as sometimes it will be in the memory
      // when we are on the different route.
      const elWidth = this.employee.code.length * 8;
      const elHeight = 25;

      const { left: shapeLeft, top: shapeTop } = this.deskShape.getAbsolutePosition();
      const shapeWidth = this.deskShape.getWidth();
      const shapeHeight = this.deskShape.getHeight();

      const left = shapeLeft + (shapeWidth / 2) - (elWidth / 2);
      const top = shapeTop + (shapeHeight / 2) - (elHeight / 2);

      deskEl.style.left = `${left}px`;
      deskEl.style.top = `${top}px`;
    }
  },

  created() {
    this.deskShape = new DeskShape({
      entity: this.desk,

      ...this.dimensions,
      ...this.position
    });

    // var person = new fabric.Image.fromURL('/static/img/location.png', (img) => {
    //   img.setLeft(this.position.left + this.dimensions.width/2 - 25);
    //   img.setTop(this.position.top - this.dimensions.height/2);
    //   img.setWidth(50);
    //   img.setHeight(50);
    //   var group = new fabric.Group([this.deskShape, img]);
    //   this.$emit('created', { shape: group });
    // });

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

    if (this.showEmployee) {
      this.deskShape.on('moving', () => {
        this.updateEmployeeTag();
      });
    }

    this.$emit('created', { shape: this.deskShape });

    if(this.modificationLocked) {
      this.lockPosition();
      this.lockSize();
      this.lockRotation();
    }
  },

  destroyed() {
    this.deskShape.remove();
  },

  mounted() {
    console.log('mounted');
    this.$nextTick(() => {
      this.updateEmployeeTag();
    });
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
