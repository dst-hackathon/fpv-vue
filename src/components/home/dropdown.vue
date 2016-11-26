<template lang="html">
  <div>
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
    options: {
      type: Array,
      default: []
    }
  }
};
</script>
