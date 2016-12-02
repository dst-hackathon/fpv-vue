<template>
  <div>
    <h3 class="title is-4">Plan Activity</h3>
    <hr>

    <div v-for="activity in activities">
      <div class="media">
        <div class="media-left">
          <figure class="">
            <img class="employee-image" :src="employeeImage(activity.employee)">
          </figure>
        </div>
        <div class="media-content">
          <p class="title is-5">{{ activity.employee.firstname }} {{ activity.employee.lastname }}</p>
          <p class="subtitle is-6">{{ activity.employee.code }}</p>
        </div>
      </div>

      <p>From: {{ activity.fromDesk && activity.fromDesk.code }}</p>
      <p>To: {{ activity.toDesk && activity.toDesk.code }}</p>
      <hr>
    </div>
  </div>
</template>

<script>
  import api from 'api';

  export default {
    props: ['activities'],

    methods: {
      employeeImage(employee) {
        return api.images.employee(employee.id);
      }
    }
  };
</script>

<style scoped>
  .employee-image {
    height: 48px;
    width: 48px;
    object-fit: cover;
  }
</style>
