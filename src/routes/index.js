import Vue from 'vue';
import VueRouter from 'vue-router';
import Login from 'components/login/index';
import Home from 'components/home/index';

Vue.use(VueRouter);

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

export default new VueRouter({
  routes,
});
