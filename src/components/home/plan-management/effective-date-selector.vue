<template lang="html">
  <div>
    <label class="label">Effective Date</label>

    <p class="control has-addons">
      <datepicker :config="{ single: true, minDate: new Date() }"
        class="control effective-date"
        placeholder=""
        @input="$emit('input', $event)"
        ref="datepicker" />

      <a class="button" @click.stop="toggle"><i class="fa fa-calendar"></i></a>
    </p>
  </div>
</template>

<script>
import Datepicker from 'vue-bulma-datepicker';

export default {
  components: {
    Datepicker,
  },

  methods: {
    toggle() {
      const { datepicker } = this.$refs.datepicker;

      datepicker.toggle();
    }
  }
};
</script>

<style lang="css" scoped>
.control.effective-date {
  width: 100%;
}
</style>
