<template>
  <div>
  </div>
</template>

<script>
export default {
  data() {
    return {

    }
  },

  props: ['user'],

  created() {
    this.$http.post(`auth/email/verify/${this.user}?expires=${this.$route.query.expires}&signature=${this.$route.query.signature}`, {
      user: this.$auth.user().id
    })
    .then((res) => {
      if (res.status === 200) {
        this.$auth.user(res.data.user);
        return this.$router.push({name: 'dashboard'});
      }
    })
  }
}
</script>
