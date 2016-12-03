<template lang="html">
<div class="modal" :class="{ 'is-active': show }" v-if="show">
    <div class="modal-background" @click="close"></div>
    <div class="modal-card">
        <section class="modal-card-body">
            <label class="label">Desk Code</label>
            <p class="control">
                <input class="input" v-model="desk.code" type="text" placeholder="Enter desk code">
            </p>
        </section>
        <footer class="modal-card-foot">
            <a class="button is-primary" :disabled="deskCodeEmpty" @click="ok">Add Desk</a>
            <a class="button" @click="close">Cancel</a>
        </footer>
    </div>
</div>
</template>

<script>

export default {
  props: ['desk'],

  watch: {
    desk: {
      immediate: true,
      handler: function(desk) {
        this.show = !!desk;
      }
    }
  },

  data() {
    return {
      deskCode: "",
      active: false,
      show: false,
    };
  },

  computed: {
    deskCodeEmpty() {
      const code = this.desk && this.desk.code || '';

      return code.trim().length === 0;
    }
  },

  methods: {
    ok() {
      this.$emit('ok', {
        code: this.deskCode
      });

      this.close();
    },

    close() {
      this.show = false;
      this.$emit('close');
    }
  }
};
</script>

<style lang="scss">
  .modal-card {
    width: 400px;
  }

  .modal-card-body {
    border-top-right-radius: 5px;
    border-top-left-radius: 5px;
  }
</style>
