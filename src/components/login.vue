<template lang="html">
  <div class="column is-4 is-offset-4">
    <h1 class="title">
      FPV Vue Login
    </h1>
    <div class="box">
      <label class="label">Username</label>
      <p class="control">
        <input class="input" type="text" v-model="username" placeholder="username">
      </p>
      <label class="label">Password</label>
      <p class="control">
        <input class="input" type="password" v-model="password" placeholder="password">
      </p>
      <hr>
      <p class="control">
        <button class="button is-primary" @click="login">Login</button>
        <button class="button is-default">Cancel</button>
      </p>
      <span>{{loading}}</span>
    </div>
  </div>
</template>

<script>
var data = {
  username:'',
  password:'',
  loading:'',
};

export default {
  data() {
    return data;
  },
  methods: {
    login() {

      data.loading = "Attempt to Login ...";
      
      var qs = require('qs');
      this.axios.post('/api/authentication?cacheBuster='+ Date.now(), qs.stringify({
        'j_username': data.username,
        'j_password': data.password,
      }))
      .then(function (response) {
        console.log('success');
        console.log(response);
      })
      .catch(function (error) {
        console.log('failed');
        console.log(error);
      });
    },
  },
};
</script>

<style lang="css">
</style>
