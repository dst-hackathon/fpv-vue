<template>
  <div>
    <h3 class="title is-4">Plan Activity</h3>

    <div>
      <div v-for="activity in activities" class="activity">
        <div class="media">
          <figure class="media-left">
            <p>
              <img class="employee-image" :src="employeeImage(activity.employee)">
            </p>
          </figure>

          <div class="media-content">
            <div class="content">
              <strong>{{ activity.employee.firstname }} {{ activity.employee.lastname }}</strong>
              <br>
              <span>{{ activity.employee.code }}</span>
            </div>
          </div>
        </div>

        <div class="activity-movement">
          <div v-if="activityType(activity) === 'assigned-to'">
            <span class="icon is-small"><i class="fa fa-map-marker"></i></span>
            assigned to <a @click.prevent="scrollTo(activity.toDesk)">{{ deskCodeFor(activity.toDesk) }}</a>
          </div>
          <div v-else-if="activityType(activity) === 'removed-from'">
            <span class="icon is-small"><i class="fa fa-remove"></i></span>
            removed from <a @click.prevent="scrollTo(activity.fromDesk)">{{ deskCodeFor(activity.fromDesk ) }}</a>
          </div>
          <div v-else>
            <span class="icon is-small"><i class="fa fa-refresh"></i></span>
            moved from <a @click.prevent="scrollTo(activity.fromDesk)">{{ deskCodeFor(activity.fromDesk ) }}</a>
            to <a @click.prevent="scrollTo(activity.toDesk)">{{ deskCodeFor(activity.toDesk) }}</a>
          </div>
        </div>
      </div>
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
      },

      activityType(activity) {
        if (!activity.fromDesk) {
          return 'assigned-to';
        }

        if (!activity.toDesk) {
          return 'removed-from';
        }

        return 'moved';
      },

      deskCodeFor(desk) {
        return desk && desk.code;
      },

      scrollTo(desk) {
        this.$emit('scrollTo', { desk });
      }
    },

  };
</script>

<style scoped lang="scss">
  @import '~bulma/sass/utilities/variables';

  .employee-image {
    height: 48px;
    width: 48px;
    object-fit: cover;
  }

  .activity {
    border-bottom: 1px solid $grey-lighter;
    padding-bottom: 5px;
  }

  .activity:not(:first-child) {
    padding-top: 10px;
  }

  .activity-movement .icon {
    line-height: 18px;
    color: $info-invert;
  }
</style>
