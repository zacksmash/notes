<template>
  <div>
    <div class="row">
      <div class="large-5 medium-7 small-12 columns">
        <form @submit.prevent="login">
          <input type="email" v-model="user.email" placeholder="Email">
          <input type="password" v-model="user.password" placeholder="Password">
          <button class="button">Submit</button>
        </form>
        <hr>
        <ul>
          <li>
            <router-link :to="{ name: 'register' }">Sign Up</router-link>
          </li>

          <li>
            <router-link :to="{ name: 'passwordReset' }">Reset Password</router-link>
          </li>
        </ul>
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
      }
    }
  },

  methods: {
    login() {
      this.$auth.login({
        params: this.user,
        success: function (res) {},
        error: function ({response}) {},
        rememberMe: true,
        redirect: '/',
        fetchUser: true,
      });
    }
  }
}
</script>
