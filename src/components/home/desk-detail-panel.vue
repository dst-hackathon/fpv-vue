<template lang="html">
  <div class="">
    <h3 class="desk-code title is-4">Desk #<strong>{{ desk.code }}</strong></h3>

    <div v-if="!!editingDesk">
      <label class="label">Desk Code</label>
      <p class="control">
        <input type="text"
          class="input"
          v-model="editingDesk.code"
          @keyup.enter="commitEdit"
          ref="deskCode">
      </p>

      <p class="control">
        <button class="button is-primary" @click="commitEdit">Update</button>
        <button class="button is-link" @click="cancelEdit">Cancel</button>
      </p>
    </div>

    <p class="control has-addons action-buttons" v-show="!editingDesk">

      <button class="button" @click="startEdit">
        <span class="icon is-small">
          <i class="fa fa-pencil"></i>
        </span>
        <span>Edit</span>
      </button>

      <button class="button" @click="startRemove()">
        <span class="icon is-small">
          <i class="fa fa-trash"></i>
        </span>
        <span>Remove</span>
      </button>
    </p>
  </div>
</template>

<script>
import _ from 'lodash';
import { UPDATE_DESK, DELETE_DESK } from 'store/types';

export default {
  props: ['desk'],

  data() {
    return {
      editingDesk: null
    };
  },

  methods: {
    startEdit() {
      this.editingDesk = _.cloneDeep(this.desk);

      this.$nextTick(() => {
        this.$refs.deskCode.focus();
      });
    },

    cancelEdit() {
      this.editingDesk = null;
    },

    commitEdit() {
      this.$store.dispatch(UPDATE_DESK, { desk: this.editingDesk });
      this.editingDesk = null;
    },

    startRemove() {
      if (confirm(`Do you want to remove desk: ${this.desk.code}?`)) {
        this.$store
          .dispatch(DELETE_DESK, { desk: this.desk })
          .catch(() => {
            alert('Cannot remove this desk.');
          });
      }
    }
  }
};
</script>

<style lang="css">
</style>
