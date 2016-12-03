export default {
  created() {
    window.addEventListener('resize', () => this.reposition());
  },

  mounted() {
    this.storeInitialPosition();
    this.reposition();
  },

  methods: {
    storeInitialPosition() {
      const wrapper = this.$el;
      const boundingRect = wrapper.getBoundingClientRect();

      this.initialPosition = boundingRect;
    },

    reposition() {
      const boundingRect = this.initialPosition;

      this.$el.style.height = `${window.innerHeight - boundingRect.top}px`;
    },
  },
};
