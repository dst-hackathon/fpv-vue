import Vue from 'vue';
import axios from 'axios';
import VueAxios from 'vue-axios';
import VueRouter from 'vue-router';
import Login from 'components/login';
import Home from 'components/home';
import App from './app';

Vue.use(VueRouter);
Vue.use(VueAxios, axios);

const routes = [{
  name: 'login',
  path: '/login',
  component: Login,
}, {
  name: 'home',
  path: '/home',
  component: Home,
}, {
  path: '/*',
  redirect: 'login',
}];

const router = new VueRouter({
  routes,
});

/* eslint-disable no-new */
new Vue({
  el: '#app',
  template: '<App/>',
  components: { App },
  router,
});
