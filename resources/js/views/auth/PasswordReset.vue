<template>
  <div>
    <div class="row">
      <div class="large-5 medium-7 small-12 columns">
        <div v-if="!token">
          <form @submit.prevent="sendResetEmail">
            <input type="email" v-model="user.email" placeholder="Email">
            <button class="button">Send Email</button>
          </form>
        </div>

        <div v-else>
          <form @submit.prevent="resetPassword">
            <input type="email" v-model="user.email" placeholder="Email">
            <input type="password" v-model="user.password" placeholder="Password">
            <input type="password" v-model="user.password_confirmation" placeholder="Confirm Password">
            <button class="button">Reset Password</button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      user: {
        email: '',
        password: '',
        password_confirmation: ''
      }
    }
  },

  props: ['token'],

  methods: {
    sendResetEmail() {
      this.$http.post('/auth/password/remind', {
        email: this.user.email
      })
      .then((res) => {
        //
      })
      .catch((error) => {
        //
      })
    },

    resetPassword() {
      this.$http.post('/auth/password/reset', {
        email: this.user.email,
        password: this.user.password,
        password_confirmation: this.user.password_confirmation,
        token: this.token
      })
      .then((res) => {
        this.$auth.login({
          params: {
            email: this.user.email,
            password: this.user.password
          },
          success: function() {
            //
          },
          error: function (error) {
            //
          },
          rememberMe: true,
          fetchUser: true,
          redirect: '/',
        });
      })
      .catch((error) => {
        //
      });
    },
  }
}
</script>
