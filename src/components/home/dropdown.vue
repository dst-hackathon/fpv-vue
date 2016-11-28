<template lang="html">
  <div>
    <label class="label">{{ label }}</label>
    <p class="control">
      <span class="select">
        <select :style="{ width: this.width || 'auto' }" @change="updateValue($event.target.value)" :selectedIndex="-1">
          <option>{{ placeholder }}</option>
          <option v-for="option in options" :selected="isSelected(option)" :value="option[valueProp]">
            {{ option[textProp] }}
          </option>
        </select>
      </span>
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
    'width',
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

<style lang="css" scoped>
  .control {
    padding-right: 10px;
  }
</style>
