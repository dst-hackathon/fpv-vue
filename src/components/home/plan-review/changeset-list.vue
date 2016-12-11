<template lang="html">
  <div class="changeset-list">
    <p class="menu-label">{{ title }}</p>
    <ul class="menu-list">
      <li v-for="changeset in changesets">
        <a
          @click.prevent="selectChangeset(changeset)"
          :class="{ 'is-active': selectedId === changeset.id }">
          {{ changeset.effectiveDate }}
        </a>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: ['changesets', 'title', 'selectedId'],

  methods: {
    selectChangeset(changeset) {
      this.$emit('selectChangeset', { changeset });
    }
  }
};
</script>

<style lang="css">
.changeset-list {
  margin-bottom: 20px;
}
</style>
