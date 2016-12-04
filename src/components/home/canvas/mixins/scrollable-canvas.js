export default {
  props: ['scrollTarget'],

  created() {
    this.$once('ready', () => {
      // canvas is ready
      this.$watch('scrollTarget', this.onScrollTargetChange);
    });

    this.$on('imageLoaded', this.onImageLoaded);
  },

  methods: {
    onScrollTargetChange(target) {
      if (!target) {
        return;
      }

      this.selectCanvasObject(target);
      this.scrollToTarget(target);
    },

    selectCanvasObject(target) {
      if (!this.canvas) {
        return;
      }

      const objects = this.canvas.getObjects();
      const object = _.find(objects, [ 'entity.id', target.id ]);

      if (object) {
        this.canvas.setActiveObject(object);
      }
    },

    scrollToTarget(target) {
      const wrapper = this.$el;
      if (!wrapper) {
        return;
      }

      const boundingRect = wrapper.getBoundingClientRect();
      const scrollLeft = target.x + (target.width / 2) - (boundingRect.width / 2);
      const scrollTop = target.y + (target.height / 2) - (boundingRect.height / 2);

      wrapper.scrollLeft = scrollLeft;
      wrapper.scrollTop = scrollTop;

      if (!this.canvas.backgroundImage) {
        this._pendingScrollTarget = target;
      }
    },

    onImageLoaded() {
      // background image is loaded, scroll to pending position
      if (this._pendingScrollTarget && this.canvas.backgroundImage) {
        this.scrollToTarget(this._pendingScrollTarget);

        this._pendingScrollTarget = null;
      }
    }
  }
};
