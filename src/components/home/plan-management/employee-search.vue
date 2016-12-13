<template lang="html">
  <div class="employee-search">
    <p class="control has-icon">
      <input type="text"
      class="input"
      placeholder="Search for associates"
      v-model="query"
      ref="input"
      @focus="$event.target.select()">

      <i class="fa fa-search"></i>
    </p>

    <div class="results">
      <div v-for="employee in results"
        @click="$emit('clickEmployee', { employee })">

      <employee-info :employee="employee" />
    </div>
    </div>
  </div>
</template>

<script>
import _ from 'lodash';
import EmployeeInfo from 'components/home/employee-info';
import api from 'api';

export default {
  components: {
    EmployeeInfo,
  },

  props: ['focus'],

  data() {
    return {
      query: '',
      results: [],
    };
  },

  watch: {
    query: _.debounce(function(query) {
      if (query.length < 1) {
        this.results = this.initialResults || [];

        return;
      }

      api.employees.search({ query })
        .then(results => this.results = results);
    }, 100),

    focus(focus) {
      if (focus) {
        this.$refs.input.focus();
      }
    }
  },

  created: async function() {
    this.results = this.initialResults = await api.employees.find({
      sort: 'firstname'
    });
  }
};
</script>

<style lang="scss" scoped>
@import '~bulma/sass/utilities/variables';

.employee-search {
  display: flex;
  flex-direction: column;
}

.employee-info {
  border-bottom: 1px solid $grey-lighter;
  padding: 5px 0px;
}

.results {
  overflow-y: auto;
}
</style>
