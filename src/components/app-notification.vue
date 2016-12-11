<template lang="html">
  <div class="notification is-info" v-show="!!notification">
    <button class="delete" @click="dismiss"></button>
    {{ notification && notification.message }}
  </div>
</template>

<script>
import { DISMISS_NOTIFICATION } from 'store/types';

export default {
  computed: {
    notifications() {
      const notifications = this.$store.state.notifications;
      const route = this.$route.path;
      const routeNotifications = notifications[route];

      return routeNotifications || [];
    },

    notification() {
      return this.notifications[this.notifications.length - 1];
    },
  },

  methods: {
    dismiss() {
      this.$store.dispatch(DISMISS_NOTIFICATION);
    }
  },
};
</script>

<style lang="scss" scoped>
.notification {
    position: fixed;
    top: 65px;
    left: 50%;
    transform: translateX(-50%);
    z-index: 2000;
}
</style>
