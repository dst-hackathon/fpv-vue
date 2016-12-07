<template lang="html">
  <div class="main">
    <employee-search
      v-show="selectedTab === 'associate'"
      :focus="selectedTab === 'associate'"
      @clickEmployee="relayEvent('clickEmployee', $event)" />

    <plan-activity
      :activities="activities"
      @clickDesk="relayEvent('clickDesk', $event)"
      v-show="selectedTab === 'activity'" />

    <div class="tabs is-centered">
      <ul>
        <li :class="{ 'is-active': selectedTab === 'activity' }" @click="selectedTab = 'activity'">
          <a>
            <span class="icon is-small"><i class="fa fa-bar-chart"></i></span>
            <span>Activity</span>
          </a>
        </li>
        <li :class="{ 'is-active': selectedTab === 'associate' }" @click="selectedTab = 'associate'">
          <a>
            <span class="icon is-small"><i class="fa fa-user"></i></span>
            <span>Associates</span>
          </a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import PlanActivity from 'components/home/plan-activity';
import EmployeeSearch from './employee-search';

export default {
  components: {
    PlanActivity,
    EmployeeSearch,
  },

  props: ['activities'],

  data() {
    return {
      selectedTab: 'activity'
    };
  },

  methods: {
    relayEvent(name, ...args) {
      this.$emit(name, ...args);
    }
  },
};
</script>

<style lang="scss" scoped>
@import '~bulma/sass/utilities/variables';

.main {
  height: 100%;
  display: flex;
  flex-direction: column;

  > *:not(.tabs) {
    flex-grow: 1;
  }
}

.tabs {
  flex-basis: 38px;
  flex-shrink: 0;

  ul {
    border-top: 1px solid $border;
    border-bottom: none;
  }

  a {
    border-bottom: none;
    border-top: 1px solid $border;
    margin-bottom: 0;
    margin-top: -2px;
  }

  a:hover {
    border-top-color: $text-strong;
  }

  li.is-active {
    a {
      border-top-color: $link;
    }
  }
}
</style>
