import _ from 'lodash';
import dragula from 'dragula';

export default function (config) {
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

    methods: {
      findDeskById: config.findDeskById,

      onDeskDrop(el, to, from) {
        const fromId = parseInt(from.dataset.id, 10);
        const fromDesk = this.findDeskById(fromId);

        const toId = parseInt(to.dataset.id, 10);
        const toDesk = this.findDeskById(toId);

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

        // FIXME: should we enable owner remove?
        // const fromId = parseInt(from.dataset.id, 10);
        // const fromDesk = this.findDeskById(fromId);
        //
        // this.$emit('removeOwner', {
        //   desk: fromDesk
        // });
      },

      onDeskDropOver(el, container, source) {
        this.dragDropSameSource = (container === source);
      },

      onDeskDropOut(el, container, source) {
        if (container === source) {
          this.dragDropSameSource = false;
        }
      }
    }
  };
};
