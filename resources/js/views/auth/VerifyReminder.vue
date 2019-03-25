<template>
  <div>
    Your account has not been verified. Check your email for a verification link.
    <button class="button" @click="resendEmail">Resend Verification Email</button>
  </div>
</template>

<script>
export default {
  data() {
    return {

    }
  },

  methods: {
    resendEmail() {
      this.$http.post('auth/email/resend')
      .then((res) => {
        if (res.status === 202) {
          this.$router.push({name: 'dashboard'});
        }
      });
    }
  },

  mounted() {
    if (this.$auth.user().email_verified_at) {
      this.$router.push({name: 'dashboard'});
    }
  }
}
</script>
