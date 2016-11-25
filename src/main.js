import Vue from 'vue';
import axios from 'axios';
import VueAxios from 'vue-axios';
import store from 'store';
import router from 'routes';
import App from './app';

Vue.use(VueAxios, axios);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  template: '<App/>',
  components: { App },
  router,
  store
});
