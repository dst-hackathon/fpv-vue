export default {
  props: ['pannable'],

  watch: {
    pannable: {
      immediate: true,
      handler(pannable, wasPannable) {
        if (pannable) {
          this.$nextTick(this.setupPanning);
        }
        else if (wasPannable) {
          this.cleanupPanning();
        }
      }
    }
  },

  destroyed() {
    if (this.pannable) {
      this.cleanupPanning();
    }
  },

  methods: {
    startPanning(event) {
      const wrapper = this.$el;

      this.panning = {
        origin: {
          x: event.x,
          y: event.y,
          scrollLeft: wrapper.scrollLeft,
          scrollTop: wrapper.scrollTop
        }
      };

      document.addEventListener('mouseup', this.stopPanning);
    },

    stopPanning() {
      this.panning = null;

      document.removeEventListener('mouseup', this.stopPanning);
    },

    doPanning(event) {
      if (!this.panning) {
        return;
      }

      const wrapper = this.$el;
      const origin = this.panning.origin;
      const dx = origin.x - event.x;
      const dy = origin.y - event.y;

      wrapper.scrollLeft = origin.scrollLeft + dx;
      wrapper.scrollTop = origin.scrollTop + dy;
    },

    setupPanning() {
      const wrapper = this.$el;

      wrapper.addEventListener('mousedown', this.startPanning);
      wrapper.addEventListener('mousemove', this.doPanning);
      wrapper.addEventListener('mouseup', this.stopPanning);
    },

    cleanupPanning() {
      const wrapper = this.$el;

      wrapper.removeEventListener('mousedown', this.startPanning);
      wrapper.removeEventListener('mousemove', this.doPanning);
      wrapper.removeEventListener('mouseup', this.stopPanning);
    }
  }
};
