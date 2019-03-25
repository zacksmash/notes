// Import libraries
import 'foundation-sites';
import _ from 'lodash';
import $ from 'jquery';
import axios from 'axios';
import router from './router';
import Echo from 'laravel-echo'
import Pusher from 'pusher-js';

// Vue Dependencies
import Vue from 'vue';
import Vuex from 'vuex';
import VueRouter from 'vue-router';
import VueAxios from 'vue-axios';
import VueEcho from 'vue-echo';

// Attach jQuery to the window object
try {
  window.$ = window.jQuery = $;
  window.axios = axios;
} catch (e) {}

// Setup the Base URL for all API requests
let baseURL = `${location.protocol}//${location.hostname}`;

// If there's a port (Browsersync) add it
if (location.port) {
  baseURL = baseURL + ':' + location.port;
}

// Set the Axios base URL
window.axios.defaults.baseURL = `${baseURL}/api`;

const tokenName = 'auth_token';

/**
 * Register Vue Plugins
 */
Vue.use(Vuex);
Vue.use(VueRouter);
Vue.use(VueAxios, axios);

// Setup Laravel Echo
Vue.use(VueEcho, {
  broadcaster: 'pusher',
  key: process.env.MIX_PUSHER_APP_KEY,
  cluster: process.env.MIX_PUSHER_APP_CLUSTER,
  encrypted: true,
  auth: {
    headers: {
      'Authorization': `Bearer ${localStorage.getItem(tokenName)}`
    }
  }
});

// Attach routes to Router
Vue.router = router;

// Configure Vue Auth settings
Vue.use(require('@websanova/vue-auth'), {
  auth: require('@websanova/vue-auth/drivers/auth/bearer.js'),
  http: require('@websanova/vue-auth/drivers/http/axios.1.x.js'),
  router: require('@websanova/vue-auth/drivers/router/vue-router.2.x.js'),
  tokenDefaultName: tokenName,
  forbiddenRedirect: {
    path: '/unauthorized'
  },
  notFoundRedirect: {
    path: '/not-found'
  },
});

/**
 * Register Global Components
 */
Vue.component('example-component', require('./components/ExampleComponent'));
