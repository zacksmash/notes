<template>
  <div class="editor-container">
    <side-menu/>
    <editor/>
  </div>
</template>

<script>
import SideMenu from '../components/SideMenu';
import Editor from '../components/Editor';
import { mapActions } from 'vuex';

export default {
  data() {
    return {}
  },

  components: {
    Editor,
    SideMenu
  },

  methods: {
    logout() {
      this.$auth.logout({
        makeRequest: true,
        redirect: '/login'
      });
    },

    broadcast() {
      this.$echo.private(`Notes.User.${this.$auth.user().id}`)
      .listen('NoteCreated', ({note}) => {
        this.$store.commit('applyAddNote', note);
      })
      .listen('NoteUpdated', ({note}) => {
        this.$store.commit('applyUpdateNote', note);
      })
      .listen('NoteDeleted', ({note}) => {
        this.$store.commit('applyDeleteNote', note);
      });
    }
  },

  created() {
    this.$store.dispatch('getNotes');
  },

  mounted() {
    this.broadcast();
  }
}
</script>
