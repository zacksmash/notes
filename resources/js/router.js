// Import VueRouter
import VueRouter from 'vue-router';

// Router configuration
export default new VueRouter({
  linkActiveClass: 'is-active',

  mode: 'history',

  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return {
        x: 0,
        y: 0
      }
    }
  },

  routes: [
    {
      path: '/',
      name: 'dashboard',
      component: require('./views/Dashboard'),
      meta: {
        auth: true
      }
    },
    {
      path: '/login',
      name: 'login',
      component: require('./views/auth/Login'),
      meta: {
        auth: false
      }
    },
    {
      path: '/register',
      name: 'register',
      component: require('./views/auth/Register'),
      meta: {
        auth: false
      }
    },
    {
      path: '/password/reset/:token?',
      name: 'passwordReset',
      props: true,
      component: require('./views/auth/PasswordReset'),
      meta: {
        auth: false
      }
    },
    {
      path: '/email/verify/:user',
      name: 'verifyUser',
      props: true,
      component: require('./views/auth/VerifyUser'),
      meta: {
        auth: true,
        verify: true
      }
    },
    {
      path: '/email/verify/',
      name: 'verifyReminder',
      props: true,
      component: require('./views/auth/VerifyReminder'),
      meta: {
        auth: true
      }
    },
    {
      path: '/unauthorized',
      name: 'error403',
      component: require('./views/errors/403')
    }, {
      path: '*',
      name: 'error404',
      component: require('./views/errors/404')
    }
  ]
});
