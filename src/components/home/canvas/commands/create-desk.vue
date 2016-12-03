<template lang="html">
  <div class="">
    <button class="button" :class="{ 'is-primary': active }" @click="$emit('click')">
      <span class="icon">
        <i class="fa fa-plus"></i>
      </span>
      <span>Add Desk</span>
    </button>
  </div>
</template>

<script>
import Vue from 'vue';
import _ from 'lodash';
import { CREATE_DESK } from 'store/types';
import DeskShape from 'components/fabric/desk.fabric';
import DeskModal from './desk-modal';

export default {
  components: {
    DeskModal,
  },

  props: ['title', 'active', 'canvas', 'floor'],
  data() {
    return {
      pendingDesk: null,
    };
  },

  watch: {
    active(active) {
      if (active) {
        this.activate();
      } else {
        this.deactivate();
      }
    }
  },

  created() {
    this.canvasEvents = {
      'mouse:down': (args) => this.canvasMousedown(args),
      'mouse:up': (args) => this.canvasMouseup(args),
      'mouse:move': (args) => this.canvasMousemove(args),
    };
  },

  methods: {
    activate() {
      this.canvas.on(this.canvasEvents);
    },

    deactivate() {
      this.canvas.off(this.canvasEvents);
    },

    canvasMousedown({ e }) {
      const alreadyHasObject = this.canvas.findTarget(e);
      if (alreadyHasObject) {
        return;
      }

      this.origin = this.canvas.getPointer(e);
      this.deskOverlay = new DeskShape();
      this.canvas.add(this.deskOverlay);
    },

    canvasMouseup(options) {
      const deskOverlay = this.deskOverlay;
      if (!deskOverlay) {
        return;
      }

      if(deskOverlay.width < 10 || deskOverlay.height < 10)
      {
        //desk too small, probably user click canvas but not want to add a desk
        this.deskOverlay.remove();
        this.deskOverlay = null;
        return;
      }

      this.pendingDesk = {
        ...this.deskOverlay.toEntity(),

        code: '',
        floor: _.pick(this.floor, 'id')
      };

      this.showModal();
    },

    canvasMousemove({ e }) {
      if (!this.deskOverlay) {
        return;
      }

      const pointer = this.canvas.getPointer(e);
      const dx = pointer.x - this.origin.x;
      const dy = pointer.y - this.origin.y;

      this.deskOverlay.set({
        left: this.origin.x + Math.min(0, dx),
        top: this.origin.y + Math.min(0, dy),
        width: Math.abs(dx),
        height: Math.abs(dy)
      });

      this.deskOverlay.setCoords();
      this.canvas.renderAll();
    },

    showModal: function() {
      const Modal = Vue.extend(DeskModal);
      const modal = this.modal = new Modal({
        propsData: {
          desk: this.pendingDesk
        }
      });

      modal.$once('ok', this.addPendingDesk);
      modal.$once('close', () => {
        this.clearPendingDesk();

        this.$nextTick().then(() => modal.$destroy());
      });

      document.getElementById('modals').appendChild(modal.$mount().$el);
    },

    addPendingDesk() {
      this.$store.dispatch(CREATE_DESK, {
        desk: this.pendingDesk
      });
    },

    clearPendingDesk() {
      this.deskOverlay.remove();
      this.deskOverlay = null;
      this.pendingDesk = null;
    }
  }
};
</script>

<style lang="css">
</style>
