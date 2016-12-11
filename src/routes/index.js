import Vue from 'vue';
import VueRouter from 'vue-router';
import store from '../store';
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
  beforeEnter: (to, from, next) => {
    if (store.state.login.authenticated) {
      next(false);
    } else {
      next();
    }
  }
}, {
  name: 'home',
  path: '/home',
  redirect: 'plan',

  meta: {
    requiresAuth: true
  },

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

const router = new VueRouter({
  routes,
});

router.beforeEach(function redirectToLoginWhenNotAuth(to, from, next) {
  const requiresAuth = to.matched.some(route => route.meta.requiresAuth);


  if (requiresAuth && !store.state.login.authenticated) {
    next({
      name: 'login',
      query: {
        from: to.fullPath
      }
    });
  } else {
    next();
  }
});

store.watch(state => store.state.login.authenticated, function redirectToHomeWhenAuth(authenticated) {
  const redirectFrom = store.state.route.query.from;

  if (authenticated) {
    router.push(redirectFrom || { name: 'home' });
  } else {
    router.push({ name: 'login' });
  }
});

export default router;
