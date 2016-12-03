<template lang="html">
  <p class="control has-addons">
    <input class="input" type="text" :value="value" data-input>

    <a class="button" data-toggle><i class="fa fa-calendar"></i></a>
  </p>
</template>

<script>
import Flatpickr from 'flatpickr';

export default {
  props: ['value', 'minDate'],

  mounted() {
    this.datepicker = new Flatpickr(this.$el, {
      wrap: true,
      minDate: this.minDate,
      onValueUpdate: (date, str) => {
        this.$emit('input', str);
      }
    });
  }
};
</script>

<style lang="scss" scoped>
  .input {
    width: 100% !important;
  }
</style>
