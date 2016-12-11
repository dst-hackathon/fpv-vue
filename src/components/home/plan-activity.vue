<template>
  <div class="plan-activity">
    <h3 class="title is-4">Plan Activity</h3>

    <div v-if="hasActivities" class="activities">
      <div v-for="activity in activities" class="activity">
        <div @click="$emit('clickEmployee', { employee: activity.employee })">
          <employee-info :employee="activity.employee" class="employee-info" />
        </div>

        <div class="activity-movement">
          <div v-if="activityType(activity) === 'assigned-to'">
            <span class="icon is-small"><i class="fa fa-map-marker"></i></span>
            assigned to <a @click.prevent="clickDesk(activity.toDesk)">{{ deskCodeFor(activity.toDesk) }}</a>
          </div>
          <div v-else-if="activityType(activity) === 'removed-from'">
            <span class="icon is-small"><i class="fa fa-remove"></i></span>
            removed from <a @click.prevent="clickDesk(activity.fromDesk)">{{ deskCodeFor(activity.fromDesk ) }}</a>
          </div>
          <div v-else>
            <span class="icon is-small"><i class="fa fa-refresh"></i></span>
            moved from <a @click.prevent="clickDesk(activity.fromDesk)">{{ deskCodeFor(activity.fromDesk ) }}</a>
            to <a @click.prevent="clickDesk(activity.toDesk)">{{ deskCodeFor(activity.toDesk) }}</a>
          </div>
        </div>

        <slot name="footer" :activity="activity">
        </slot>
      </div>
    </div>
    <div v-else>
      <h5 class="title is-5">No activity on this date.</h5>
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

    computed: {
      hasActivities() {
        return this.activities && this.activities.length;
      }
    },

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
        if (!desk) {
          return '';
        }

        const desks = this.$store.getters.desks;
        const stateDesk = _.find(desks, { id: desk.id });

        return stateDesk.code;
      },

      clickDesk(desk) {
        this.$emit('clickDesk', { desk });
      }
    },

  };
</script>

<style scoped lang="scss">
  @import '~bulma/sass/utilities/variables';

  .plan-activity {
    display: flex;
    flex-direction: column;
  }

  .activities {
    overflow-y: auto;
    overflow-x: hidden;
  }

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
