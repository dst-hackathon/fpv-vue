<template lang="html">
  <div>
    <label class="label">{{label}}</label>
    <p class="control">
      <span class="select">
        <select>
          <option v-for="option in options">{{ option.text }}</option>
        </select>
      </span>
    </p>
  </div>
</template>

<script>
export default {
  props: {
    label: {
      type: String,
      default: "Label"
    },
    options: {
      type: Array,
      default: []
    }
  }
};
</script>

<style lang="css" scoped>
  .control {
    padding-right: 10px;
    padding-bottom: 10px;
  }
</style>
