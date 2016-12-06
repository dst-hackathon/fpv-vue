<template lang="html">
  <div>
    <p class="control has-icon">
      <input type="text" class="input"
      placeholder="Search for associates"
      v-model="query"
      @focus="$event.target.select()">
      <i class="fa fa-search"></i>
    </p>

    <div v-for="employee in results"
      @click="$emit('employeeClick', { employee })">

      <employee-info :employee="employee" class="employee-info"/>
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

  data() {
    return {
      query: '',
      results: [],
    };
  },

  watch: {
    query: _.debounce(function(query) {
      if (query.length < 1) {
        this.results = [];

        return;
      }

      api.employees.search({ query })
        .then(results => this.results = results);
    }, 100)
  },

  methods: {
    onClick() {
      console.log('clicked');
    }
  }
};
</script>

<style lang="scss">
.employee-info {
  cursor: pointer;
}
</style>
