<template lang="html">
<div class="">
  <dropdown
    v-model.number="selected"
    :options="plans"
    label="Plan"
    className="plan"
    valueProp="id"
    textProp="name" />
</div>
</template>

<script>
import Dropdown from 'components/dropdown';

export default {
  components: {
    Dropdown,
  },

  props: ['value'],

  computed: {
    plans() {
      return this.$store.state.plans;
    },

    selected: {
      get() {
        return this.value;
      },

      set(value) {
        this.$emit('input', value);
      }
    }
  },
};
</script>

<style lang="css">
</style>
