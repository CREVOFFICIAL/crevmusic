import Vue from 'vue';
import Router from 'vue-router';
import Home from '../pages/Home.vue';
import Main from '../pages/Main.vue';
import RecommendPlaylist from '../pages/RecommendPlaylist.vue';
import Search from '../pages/Search.vue';
import List from '../pages/List.vue';
import Login from '../pages/Login.vue';
import Error404 from '../pages/Error404.vue';

import store from '../../store';

Vue.use(Router);

function requireAuth (to, from, next) {
  if (!store.getters.isAuthenticated) {
    next({
      path: '/'
    });
  } else {
    next();
  }
}

const router = new Router({
  mode: 'history',
  base: __dirname,
  routes: [
    {
      path: '/',
      component: Home,
      name: 'home'
    },
    {
      path: '/main',
      redirect: '/main/list',
      component: Main,
      name: 'main',
      children: [
        {
          path: 'list',
          component: List,
          name: 'list',
          children: [
            {
              path: ':id',
              component: RecommendPlaylist,
              props: true,
              name: 'detail'
            }
          ]
        },
        {
          path: '/search',
          component: Search,
          name: 'search'
        }
      ],
      beforeEnter: requireAuth
    },
    {
      path: '/login',
      component: Login,
      name: 'login'
    },
    {
      path: '*',
      name: '404',
      component: Error404
    }
  ]
});

export default router;