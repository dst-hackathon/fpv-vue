<template lang="html">
  <div class="control">
    <label class="label">{{ label }}</label>
    <p class="select">
      <select @change="updateValue($event.target.value)" :selectedIndex="-1">
        <option>{{ placeholder }}</option>
        <option v-for="option in options" :selected="isSelected(option)" :value="option[valueProp]">
          {{ option[textProp] }}
        </option>
      </select>
    </p>
  </div>
</template>

<script>
export default {
  props: [
    'label',
    'options',
    'value',
    'valueProp',
    'textProp',
    'className',
    'placeholder',
  ],

  methods: {
    isSelected(option) {
      return this.value && option[this.valueProp] === this.value;
    },

    updateValue(value) {
      this.$emit('input', value);
    }
  }
};
</script>

<style lang="scss" scoped>
  .select {
    display: block;

    > select {
      width: 100%;
    }
  }
</style>
