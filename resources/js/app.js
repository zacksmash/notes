import './bootstrap';
import Vue from 'vue';
import router from './router';
import store from './store';

// Boot up app
let notes = new Vue({
  el: '#app',
  router,
  store,
  mounted() {
    this.$router.afterEach((to, from) => {
      if (this.$auth.check()) {
        if (!to.meta.verify) {
          if (!this.$auth.user().email_verified_at) {
            this.$router.push({
              name: 'verifyReminder'
            });
          }
        }
      }
    })
  }
})
