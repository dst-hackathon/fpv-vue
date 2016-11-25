<template lang="html">
  <div class="column is-4 is-offset-4">
    <h1 class="title">
      FPV Vue Login
    </h1>
    <div class="box">
      <label class="label">Username</label>
      <p class="control">
        <input class="input" type="text" placeholder="username">
      </p>
      <label class="label">Password</label>
      <p class="control">
        <input class="input" type="password" placeholder="password">
      </p>
      <hr>
      <p class="control">
        <button class="button is-primary" @click="login">Login</button>
        <button class="button is-default">Cancel</button>
      </p>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  methods: {
    login() {
      console.log('login');

      var qs = require('qs');

      this.axios.post('/api/authentication?cacheBuster='+ Date.now(), qs.stringify({
        'j_username': 'admin',
        'j_password': 'admin',
        'remember-me': true,
        'submit':'Login'
      }), {
        headers: {'Accept-Language': 'en-US'}
      })
      .then(function (response) {
        console.log('success');
        console.log(response);
      })
      .catch(function (error) {
        console.log('failed');
        console.log(error);
      });
      /*
      this.axios.get('/api/users').then((response) => {
        console.log(response.data);
      });*/
    },
  },
};
</script>

<style lang="css">
</style>
