<template lang="html">
  <div class="notification is-primary" v-show="!!message">
    <button class="delete" @click="dismiss"></button>
    {{ message }}
  </div>
</template>

<script>
export default {
  computed: {
    routeMessages() {
      const notifications = this.$store.state.notifications;
      const route = this.$route.name;
      const routeNotifications = notifications[route];

      if (routeNotifications) {
        return routeNotifications.map(note => note.message);
      }
      else {
        return [];
      }
    },

    message() {
      return this.routeMessages && this.routeMessages[0];
    },
  },

  methods: {
    dismiss() {
      this.$store.dispatch('DISMISS_NOTIFICATION');
    }
  },

  created() {
    // this.$store.dispatch('BROADCAST_NOTIFICATION', { message: 'Hello World' });
  }
};
</script>

<style lang="scss" scoped>
.notification {
    position: fixed;
    top: 55px;
    left: 50%;
    transform: translateX(-50%);
    z-index: 2000;
}
</style>
