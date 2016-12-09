<template lang="html">
  <div class="media">
    <figure class="media-left draggable" :data-employee="employeeJson">
      <div class="employee-tag">
        <span>{{employee.firstname}}</span>
        <br>
        <span>{{employee.work}}</span>
      </div>
      <img class="employee-image" :src="employeeImage">
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
    },

    employeeJson() {
      return JSON.stringify(this.employee);
    },
  },
};
</script>

<style lang="scss" scoped>
.gu-transit, .gu-mirror, .dropped {
  .employee-image {
    display: none;
  }

  .employee-tag {
    display: block;
  }
}

.employee-image {
  height: 48px;
  width: 48px;
  object-fit: cover;
}

.employee-tag {
  background: black;
  color: white;
  padding: 5px;

  font-size: 14px;
  display: none;
}
</style>
