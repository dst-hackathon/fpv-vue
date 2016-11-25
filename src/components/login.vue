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
        <button class="button is-default" @click="cancel">Cancel</button>
      </p>
      <span>{{loginStatus}}</span>
    </div>
  </div>
</template>

<script>
var data = {
  username:'admin',
  password:'admin',
  loginStatus:'',
};

export default {
  data() {
    return data;
  },
  methods: {
    login() {
      data.loginStatus = "Attempt to Login ...";
      
      var qs = require('qs');
      var _this = this;
      _this.axios.post('/api/authentication?d='+ Date.now(), qs.stringify({
        'j_username': data.username,
        'j_password': data.password,
      }))
      .then(function (response) {
        console.log('login success');
        data.loginStatus = "";
        console.log(response);
        return _this.axios.get('/api/account?d='+ Date.now());
      })
      .then(function (response){
        console.log('fetch account data success');
        data.loginStatus = "";
        console.log(response.data);
        _this.$router.push('home');
      })
      .catch(function (error) {
        console.log('failed');
        data.loginStatus = "Did you enter wrong username or password ?";
        console.log(error);
      });
    },
    cancel() {
      data.loginStatus = "";
      data.username = "";
      data.password = "";      
    }
  },
};
</script>

<style lang="css">
</style>
