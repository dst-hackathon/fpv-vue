import Vue from 'vue';
import VueRouter from 'vue-router';
import Login from 'components/login/index';
import Home from 'components/home/index';
import PlanManagement from 'components/home/plan-management';
import BuildingManagement from 'components/home/building-management';
import PlanReview from 'components/home/plan-review';

Vue.use(VueRouter);

const routes = [{
  name: 'login',
  path: '/login',
  component: Login,
}, {
  name: 'home',
  path: '/home',
  redirect: 'plan',

  component: Home,
  children: [
    {
      name: 'plan',
      path: '/plan',
      component: PlanManagement,
    },
    {
      name: 'building',
      path: '/building',
      component: BuildingManagement,
    },
    {
      name: 'review',
      path: '/review',
      component: PlanReview,
    },
  ]
}, {
  path: '/*',
  redirect: 'login',
}];

export default new VueRouter({
  routes,
});
