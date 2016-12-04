import _ from 'lodash';
import dragula from 'dragula';

export default function (config) {
  let findDeskById;

  return {
    props: ['enableDeskDrop'],

    watch: {
      enableDeskDrop(enabled) {
        if (enabled) {
          this.drake = dragula({
            removeOnSpill: true,
            copy: true,

            isContainer: function (el) {
              const classList = el.classList;
              const dragable = classList.contains('desk') && classList.contains('draggable');

              return dragable;
            },
          });

          this.drake.on('drop', this.onDeskDrop);
          this.drake.on('cancel', this.onDeskDropCancel);
          this.drake.on('over', this.onDeskDropOver);
          this.drake.on('out', this.onDeskDropOut);

        } else {
          this.drake.destroy();
          this.drake = null;
        }
      }
    },

    created() {
      findDeskById = config.findDeskById.bind(this);
    },

    methods: {
      onDeskDrop(el, to, from) {
        const fromId = parseInt(from.dataset.id, 10);
        const fromDesk = findDeskById(fromId);

        const toId = parseInt(to.dataset.id, 10);
        const toDesk = findDeskById(toId);

        el.remove();

        this.$emit('updateOwner', {
          desk: toDesk,
          owner: fromDesk.employee
        });
      },

      onDeskDropCancel(el, to, from) {
        if (this.dragDropSameSource) {
          return;
        }

        const fromId = parseInt(from.dataset.id, 10);
        const fromDesk = findDeskById(fromId);

        this.$emit('removeOwner', {
          desk: fromDesk
        });
      },

      onDeskDropOver(el, container, source) {
        this.dragDropSameSource = (container === source);
      },

      onDeskDropOut(el, container, source) {
        this.dragDropSameSource = (container !== source);
      }
    }
  };
};
