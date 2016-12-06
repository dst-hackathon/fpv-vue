<template>
  <div>
    <h3 class="title is-4">Plan Activity</h3>

    <div>
      <div v-for="activity in activities" class="activity">
        <employee-info :employee="activity.employee" />

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

        <slot name="footer" :activity="activity">
        </slot>
      </div>
    </div>
  </div>
</template>

<script>
  import api from 'api';
  import EmployeeInfo from 'components/home/employee-info';

  export default {
    components: {
      EmployeeInfo
    },

    props: ['activities'],

    methods: {

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

  .activity {
    border-bottom: 1px solid $grey-lighter;
    margin: 0 -5px;
    padding: 10px 5px;

  }

  .activity-movement .icon {
    line-height: 18px;
    color: $info-invert;
  }
</style>
