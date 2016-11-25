<template lang="html">
  <div class="column is-4 is-offset-4">
    <h1 class="title">
      FPV Vue Login
    </h1>
    <div class="box">
      <label class="label">Username</label>
      <p class="control">
        <input class="input" type="text" v-model="username" v-on:keyup.enter="login" placeholder="username">
      </p>
      <label class="label">Password</label>
      <p class="control">
        <input class="input" type="password" v-model="password"  v-on:keyup.enter="login" placeholder="password">
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
import * as types from 'store/types';

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
      
      var _this = this;
      _this.$store.dispatch(types.LOGIN, {'username':data.username,'password': data.password })
      .then(function (response) {
        console.log('login: login success');
        data.loginStatus = "";
        return _this.$store.dispatch(types.GET_CURRENT_ACCOUNT, {});
      })
      .then(function (response){
        console.log('login: fetch account data success');
        data.loginStatus = "";
        _this.$router.push('home');
      })
      .catch(function (error) {
        console.log('login: failed');
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
