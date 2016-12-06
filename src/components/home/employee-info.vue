<template lang="html">
  <div class="media">
    <figure class="media-left">
      <p>
        <img class="employee-image" :src="employeeImage">
      </p>
    </figure>

    <div class="media-content">
      <div class="content">
        <strong>{{ employee.firstname }} {{ employee.lastname }}</strong>
        <br>
        <span>{{ employee.code }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import api from 'api';

export default {
  props: ['employee'],

  computed: {
    employeeImage() {
      return api.images.employee(this.employee.id);
    }
  }
};
</script>

<style lang="scss">
.employee-image {
  height: 48px;
  width: 48px;
  object-fit: cover;
}
</style>
