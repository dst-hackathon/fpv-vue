<template>
  <div>
    <canvas ref="canvas" :width="width" :height="height"></canvas>
  </div>
</template>

<script>
import fabric from 'fabric';

export default {
  data() {
    return {
      planSrc: null,
      width: 800,
      height: 600,
      fabricCanvas: null
    };
  },
  watch: {
    planSrc: 'planSrcObserver',
  },
  methods: {
    initComponents() {
      var fabricCanvas = new fabric.Canvas(this.$refs.canvas);
      fabricCanvas.on('mouse:down', this.onCanvasMouseDown);

      this.fabricCanvas = fabricCanvas;
    },
    planSrcObserver: function (val, oldVal) {
      this.setCanvasPlanSrc(val);
    },
    onCanvasMouseDown: function (event) {
      var fabricCanvas = this.fabricCanvas;

      // Create desk mark rect only when there is no selected object
      // Let Fabric handle object manipulation
      if (fabricCanvas.getActiveObject()) {
        return;
      }

      var pointer = fabricCanvas.getPointer(event.e);
      var posX = pointer.x;
      var posY = pointer.y;

      this.addDeskMarkRect(this.createDeskMarkRect(posX, posY));
    },
    createDeskMarkRect: function (posX, posY) {
      // Create desk mark
      var rect = new fabric.Rect({
        left: posX,
        top: posY,
        width: 100,
        height: 100,
        fill: 'red',
      });
      return rect;
    },
    addDeskMarkRect: function (deskMarkRect) {
      this.fabricCanvas.add(deskMarkRect);
    },
    setCanvasPlanSrc: function (src) {
      var fabricCanvas = this.fabricCanvas;
      fabricCanvas.setBackgroundImage(src, fabricCanvas.renderAll.bind(fabricCanvas), {
        originX: 'left',
        originY: 'top'
      });
    }
  },
  mounted() {
    this.initComponents();
  },
};
</script>

<style scoped>
</style>